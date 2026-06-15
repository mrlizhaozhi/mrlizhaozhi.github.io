import React, { useState, useEffect } from "react";
import { 
  ArrowUpRight, 
  Sparkles, 
  TrendingUp, 
  ShieldAlert, 
  Database,
  Layers,
  ArrowRight,
  MousePointerClick
} from "lucide-react";
import ConfettiPopper from "./components/ConfettiPopper";

// Custom SVG Icons with clean shapes
function LinkedInIcon({ isColored, isHovered }: { isColored: boolean; isHovered: boolean }) {
  const color = isColored || isHovered ? "#0A66C2" : "#FFFFFF";
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="transition-colors duration-300 pointer-events-none"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GithubIcon({ isColored, isHovered }: { isColored: boolean; isHovered: boolean }) {
  // Octocat custom brand color is slate-100 normally, vibrant neon-purple or gold on hover
  const color = isColored || isHovered ? "#A855F7" : "#FFFFFF";
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="transition-colors duration-300 pointer-events-none"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.303 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function KaggleIcon({ isColored, isHovered }: { isColored: boolean; isHovered: boolean }) {
  // Kaggle colors: Light blue #20BEFF
  const color = isColored || isHovered ? "#20BEFF" : "#FFFFFF";
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      className="transition-colors duration-300 pointer-events-none"
    >
      {/* Dynamic letter K for Kaggle with standard styling */}
      <path 
        d="M6 3v18H9V12.75L15.3 21H19.5L12.5 11.5L19 3H14.8L9 10.1V3H6Z" 
        fill={color} 
        className="transition-all duration-300"
      />
    </svg>
  );
}

function TableauIcon({ isColored, isHovered }: { isColored: boolean; isHovered: boolean }) {
  // Tableau has 5 colors: Blue, Red, Orange, Green, Grey. 
  // Let's create an elegant, precise representation of Tableau's star cross icon list.
  const active = isColored || isHovered;
  
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      className="transition-colors duration-300 pointer-events-none"
    >
      {/* Center Star Cross (Red or White) */}
      <line x1="12" y1="8" x2="12" y2="16" stroke={active ? "#E12D3D" : "#FFFFFF"} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="8" y1="12" x2="16" y2="12" stroke={active ? "#E12D3D" : "#FFFFFF"} strokeWidth="2.5" strokeLinecap="round"/>
      
      {/* Top Left Cross (Orange or White) */}
      <line x1="7" y1="5" x2="7" y2="9" stroke={active ? "#F68B1F" : "#FFFFFF"} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="5" y1="7" x2="9" y2="7" stroke={active ? "#F68B1F" : "#FFFFFF"} strokeWidth="1.8" strokeLinecap="round" />

      {/* Top Right Cross (Blue or White) */}
      <line x1="17" y1="5" x2="17" y2="9" stroke={active ? "#1F77B4" : "#FFFFFF"} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="15" y1="7" x2="19" y2="7" stroke={active ? "#1F77B4" : "#FFFFFF"} strokeWidth="1.8" strokeLinecap="round" />

      {/* Bottom Left Cross (Green or White) */}
      <line x1="7" y1="15" x2="7" y2="19" stroke={active ? "#2CA02C" : "#FFFFFF"} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="5" y1="17" x2="9" y2="17" stroke={active ? "#2CA02C" : "#FFFFFF"} strokeWidth="1.8" strokeLinecap="round" />

      {/* Bottom Right Cross (Deep Gray or White) */}
      <line x1="17" y1="15" x2="17" y2="19" stroke={active ? "#555555" : "#FFFFFF"} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="15" y1="17" x2="19" y2="17" stroke={active ? "#555555" : "#FFFFFF"} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [clickedProfiles, setClickedProfiles] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem("clicked_profiles");
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const [hoveredProfile, setHoveredProfile] = useState<string | null>(null);

  const handleProfileClick = (id: string) => {
    const updated = { ...clickedProfiles, [id]: true };
    setClickedProfiles(updated);
    try {
      localStorage.setItem("clicked_profiles", JSON.stringify(updated));
    } catch (e) {
      console.warn("Storage write failed", e);
    }
  };

  const triggerGiveMeFive = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowConfetti(true);
  };

  // Generated image path
  const bgImage = "/src/assets/images/financial_data_flow_1781519334247.jpg";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-900 overflow-x-hidden">
      {/* Page Border accent */}
      <div className="h-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-indigo-600 w-full" />

      {/* Confetti canvas animation */}
      <ConfettiPopper 
        trigger={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />

      {/* Header & Navigation */}
      <header className="max-w-6xl mx-auto px-6 py-6 md:py-8 flex justify-between items-center relative z-10">
        <div id="author-wordmark" className="font-serif text-2xl font-bold tracking-tight text-white hover:text-teal-400 transition-colors cursor-default">
          Li Zhaozhi
        </div>
        
        <nav>
          <a
            id="nav-give-me-five"
            href="#give-me-five"
            onClick={triggerGiveMeFive}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-teal-500/30 bg-teal-950/20 text-teal-300 font-medium text-sm hover:bg-teal-500/15 hover:border-teal-400/50 transition-all active:scale-95 duration-200 backdrop-blur-md"
          >
            <span>Give Me Five</span>
            <Sparkles className="w-4 h-4 text-teal-400 animate-pulse group-hover:scale-125 transition-transform" />
          </a>
        </nav>
      </header>

      {/* Hero / Introduction Area */}
      <section className="relative w-full border-y border-slate-900 bg-slate-950 overflow-hidden py-16 md:py-28 my-4">
        {/* Background photo of financial data flow with glowing deep masks */}
        <div className="absolute inset-0 z-0">
          <img
            src={bgImage}
            alt="Financial transaction flowing streams representing digital global data"
            className="w-full h-full object-cover opacity-[0.22] select-none pointer-events-none scale-105 filter saturate-[0.85] blur-[1px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950" />
        </div>

        {/* Content container */}
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900/80 border border-slate-800 rounded-full text-slate-400 text-xs tracking-wider uppercase mb-6 font-mono font-medium shadow-inner animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping inline-block" />
            Financial Technology & Strategy
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-relaxed md:leading-snug">
            Transforming financial services with automation and analytics
          </h1>

          <p className="mt-6 text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Li Zhaozhi leverages data-driven system automation, machine learning controls, 
            and modern database pipelines to de-risk investments and maximize operating agility in Tier-1 banking.
          </p>

          {/* Prompt action label for five */}
          <div className="mt-8 flex justify-center">
            <p className="text-xs text-slate-500 flex items-center gap-1.5 font-mono">
              <MousePointerClick className="w-3.5 h-3.5 text-teal-500 animate-bounce" />
              Click "Give Me Five" above to celebrate
            </p>
          </div>
        </div>
      </section>

      {/* Professional Competence Mini-Showcase */}
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <h2 className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-8 border-b border-slate-900 pb-3">
          Specialization Areas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-900 hover:border-slate-800 hover:bg-slate-900/60 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-teal-950/50 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-5">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white mb-2">Automated Risk Safeguards</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Designing real-time statistical monitors and fraud controls to mitigate high-frequency threats in credit and exchange processes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-900 hover:border-slate-800 hover:bg-slate-900/60 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white mb-2">Transactional Pipelines</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Synthesizing unstructured client histories into powerful customer health registers and SQL performance analytics models.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-900 hover:border-slate-800 hover:bg-slate-900/60 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-indigo-950/50 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-5">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white mb-2">CRM Behavior Mining</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Unlocking customer lifetime value matrices and predictive cohorts from massive legacy enterprise databases.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="featured-projects" className="max-w-6xl mx-auto px-6 py-12 md:py-20 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-slate-900 pb-5">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight">
              Featured Projects
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-md">
              A curated selection of repository assets detailing pipeline construction, modeling, and deep ledger querying.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500 mt-3 md:mt-0">
            3 repositories published on GitHub
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Project 1 */}
          <div className="group flex flex-col justify-between rounded-2xl bg-slate-900/40 border border-slate-900 hover:border-teal-500/30 hover:bg-slate-900/75 transition-all duration-300 shadow-xl relative overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs text-teal-400 font-mono font-medium mb-3 uppercase tracking-wider">
                <span className="px-2 py-0.5 rounded bg-teal-950/50 border border-teal-500/20">Model Engine</span>
                <span>Python</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-3 group-hover:text-teal-300 transition-colors">
                Bank Account Fraud Detection
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Advanced machine learning system targeting imbalanced bank application fraud datasets. Integrates deep feature engineering and custom evaluation thresholds optimal for financial risk minimization.
              </p>
            </div>
            
            <div className="px-6 pb-6 pt-0">
              <a
                href="https://github.com/mrlizhaozhi/bank-account-fraud-detection"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700/80 hover:bg-slate-900 transition-all font-medium text-sm group/btn"
              >
                <span>Explore Repository</span>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover/btn:text-teal-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>

          {/* Project 2 */}
          <div className="group flex flex-col justify-between rounded-2xl bg-slate-900/40 border border-slate-900 hover:border-purple-500/30 hover:bg-slate-900/75 transition-all duration-300 shadow-xl relative overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs text-purple-400 font-mono font-medium mb-3 uppercase tracking-wider">
                <span className="px-2 py-0.5 rounded bg-purple-950/50 border border-purple-500/20">Structured SQL</span>
                <span>PostgreSQL</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                Fraud Detection in E-Commerce
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                A robust SQL audit playground built to aggregate transaction journals, flag shell-buyer accounts, and calculate rolling anomalies using Window analytics and complex relational subqueries.
              </p>
            </div>
            
            <div className="px-6 pb-6 pt-0">
              <a
                href="https://github.com/mrlizhaozhi/fraud-detection-ecommerce-sql"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700/80 hover:bg-slate-900 transition-all font-medium text-sm group/btn"
              >
                <span>Explore Repository</span>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover/btn:text-purple-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>

          {/* Project 3 */}
          <div className="group flex flex-col justify-between rounded-2xl bg-slate-900/40 border border-slate-900 hover:border-indigo-500/30 hover:bg-slate-900/75 transition-all duration-300 shadow-xl relative overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs text-indigo-400 font-mono font-medium mb-3 uppercase tracking-wider">
                <span className="px-2 py-0.5 rounded bg-indigo-950/50 border border-indigo-500/20">CRM Analytics</span>
                <span>BI Ledger</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                Pagila Customer Insights Analytics
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Transforms generic CRM records into strategic customer cohorts. Maps key business performance markers, including regional customer churn speeds, product rental frequencies, and lifetime value curves.
              </p>
            </div>
            
            <div className="px-6 pb-6 pt-0">
              <a
                href="https://github.com/mrlizhaozhi/pagila-crm-customer-analytics"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700/80 hover:bg-slate-900 transition-all font-medium text-sm group/btn"
              >
                <span>Explore Repository</span>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover/btn:text-indigo-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Area */}
      <footer className="w-full bg-slate-950 border-t border-slate-900 py-12 mt-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Copyright Info - Bottom Left */}
          <div id="footer-copyright" className="text-slate-500 text-sm font-mono text-center md:text-left">
            2026 © Li Zhaozhi. All rights reserved.
          </div>

          {/* Social Profiles - Bottom Right */}
          <div id="footer-social-links" className="flex items-center gap-5">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/lizhaozhi"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleProfileClick("linkedin")}
              onMouseEnter={() => setHoveredProfile("linkedin")}
              onMouseLeave={() => setHoveredProfile(null)}
              className="p-1.5 rounded-lg hover:bg-slate-900/80 transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center relative group"
              title="LinkedIn Profile"
            >
              <LinkedInIcon 
                isColored={!!clickedProfiles["linkedin"]} 
                isHovered={hoveredProfile === "linkedin"} 
              />
              <span className="absolute -top-8 px-2 py-0.5 bg-slate-900 border border-slate-800 rounded text-slate-400 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {clickedProfiles["linkedin"] ? "Connected (Colored)" : "LinkedIn"}
              </span>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/mrlizhaozhi"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleProfileClick("github")}
              onMouseEnter={() => setHoveredProfile("github")}
              onMouseLeave={() => setHoveredProfile(null)}
              className="p-1.5 rounded-lg hover:bg-slate-900/80 transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center relative group"
              title="GitHub Profile"
            >
              <GithubIcon 
                isColored={!!clickedProfiles["github"]} 
                isHovered={hoveredProfile === "github"} 
              />
              <span className="absolute -top-8 px-2 py-0.5 bg-slate-900 border border-slate-800 rounded text-slate-400 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {clickedProfiles["github"] ? "Visited (Colored)" : "GitHub"}
              </span>
            </a>

            {/* Kaggle */}
            <a
              href="https://www.kaggle.com/mrlizhaozhi"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleProfileClick("kaggle")}
              onMouseEnter={() => setHoveredProfile("kaggle")}
              onMouseLeave={() => setHoveredProfile(null)}
              className="p-1.5 rounded-lg hover:bg-slate-900/80 transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center relative group"
              title="Kaggle Profile"
            >
              <KaggleIcon 
                isColored={!!clickedProfiles["kaggle"]} 
                isHovered={hoveredProfile === "kaggle"} 
              />
              <span className="absolute -top-8 px-2 py-0.5 bg-slate-900 border border-slate-800 rounded text-slate-400 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {clickedProfiles["kaggle"] ? "Visited (Colored)" : "Kaggle"}
              </span>
            </a>

            {/* Tableau */}
            <a
              href="https://public.tableau.com/app/profile/lizhaozhi"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleProfileClick("tableau")}
              onMouseEnter={() => setHoveredProfile("tableau")}
              onMouseLeave={() => setHoveredProfile(null)}
              className="p-1.5 rounded-lg hover:bg-slate-900/80 transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center relative group"
              title="Tableau Profile"
            >
              <TableauIcon 
                isColored={!!clickedProfiles["tableau"]} 
                isHovered={hoveredProfile === "tableau"} 
              />
              <span className="absolute -top-8 px-2 py-0.5 bg-slate-900 border border-slate-800 rounded text-slate-400 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {clickedProfiles["tableau"] ? "Active (Colored)" : "Tableau"}
              </span>
            </a>
          </div>

        </div>
      </footer>
    </div>
  );
}
