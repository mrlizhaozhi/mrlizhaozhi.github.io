import { useEffect, useRef } from "react";

interface ConfettiPopperProps {
  trigger: boolean;
  onComplete: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  shape: "circle" | "square" | "ribbon";
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  width: number;
  height: number;
  scaleX: number;
  scaleYSpeed: number;
}

const COLORS = [
  "#FFC107", // Gold
  "#FF5722", // Deep Orange
  "#E91E63", // Pink
  "#9C27B0", // Purple
  "#00BCD4", // Cyan
  "#4CAF50", // Green
  "#3F51B5", // Indigo
  "#00E676", // Neon Green
  "#FF3D00", // Red Orange
  "#29B6F6", // Sky Blue
];

export default function ConfettiPopper({ trigger, onComplete }: ConfettiPopperProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to cover screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles: "party popper of median size"
    const particlesCount = 80; // Median size count
    const particlesList: Particle[] = [];
    
    // Spawn point: Center of screen
    const spawnX = canvas.width / 2;
    const spawnY = canvas.height * 0.45; // slightly above middle for perfect framing

    for (let i = 0; i < particlesCount; i++) {
      // Explode radially
      const angle = Math.random() * Math.PI * 2;
      // Medium velocity explosion
      const speed = 4 + Math.random() * 12; 
      
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed - (3 + Math.random() * 4); // extra initial upward boost

      particlesList.push({
        x: spawnX,
        y: spawnY,
        vx,
        vy,
        size: 5 + Math.random() * 8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: ["circle", "square", "ribbon"][Math.floor(Math.random() * 3)] as Particle["shape"],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
        width: 4 + Math.random() * 8,
        height: 8 + Math.random() * 12,
        scaleX: Math.random() * 2 - 1,
        scaleYSpeed: 0.05 + Math.random() * 0.1,
      });
    }

    particlesRef.current = particlesList;
    startTimeRef.current = Date.now();

    const animate = () => {
      if (!ctx || !canvas) return;

      const elapsed = Date.now() - (startTimeRef.current || 0);
      if (elapsed >= 5000) {
        onComplete();
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update particles
      particlesRef.current.forEach((p, index) => {
        // Physics
        p.vy += 0.25; // gravity
        p.vx *= 0.98; // horizontal friction
        p.vy *= 0.98; // vertical friction
        p.x += p.vx;
        p.y += p.vy;

        p.rotation += p.rotationSpeed;
        p.scaleX = Math.sin(elapsed * p.scaleYSpeed); // spin ribbon effect

        // Shrink and fade as time progresses, especially in the last 1.5 seconds
        if (elapsed > 3500) {
          p.opacity = Math.max(0, 1 - (elapsed - 3500) / 1500);
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.scale(p.scaleX, 1);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        ctx.beginPath();
        if (p.shape === "circle") {
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === "square") {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else {
          // Ribbon
          ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        }
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [trigger, onComplete]);

  if (!trigger) return null;

  return (
    <canvas
      id="confetti-canvas"
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-screen h-screen"
    />
  );
}
