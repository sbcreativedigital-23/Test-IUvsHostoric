import React from 'react';
import { TabId } from '../types';
import {
  Compass,
  LayoutDashboard,
  Radar,
  Scale,
  Swords,
  Zap,
  TableProperties,
  Dices,
  Flame,
  DollarSign,
  BookOpen,
  Bot
} from 'lucide-react';

interface HeaderProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onSelectTab }) => {
  const narrativeTabs: { id: TabId; label: string; badge?: string; icon: React.ReactNode }[] = [
    { id: 'narrative', label: 'Narrative Arc', badge: 'Overview', icon: <Compass className="w-3.5 h-3.5 text-red-400" /> },
    { id: 'dashboard', label: 'Executive Briefing', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
    { id: 'dominance', label: '1. Evolution of Dominance', badge: 'Theme 1', icon: <Radar className="w-3.5 h-3.5 text-red-400" /> },
    { id: 'resume', label: '2. Résumé vs. Machine', badge: 'Theme 2', icon: <Scale className="w-3.5 h-3.5 text-blue-400" /> },
    { id: 'market', label: '3. The Market Outlier', badge: 'Theme 3', icon: <DollarSign className="w-3.5 h-3.5 text-amber-400" /> },
  ];

  const analyticalTabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'h2h', label: 'Head-to-Head', icon: <Swords className="w-3.5 h-3.5 text-red-400" /> },
    { id: 'all5', label: 'All 5 Matrix', icon: <Scale className="w-3.5 h-3.5" /> },
    { id: 'efficiency', label: 'EPA Matrix', icon: <Zap className="w-3.5 h-3.5" /> },
    { id: 'simulator', label: 'H2H Simulator', icon: <Dices className="w-3.5 h-3.5" /> },
    { id: 'chat', label: 'AI Data Chat', icon: <Bot className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: 'master', label: 'Master Ledger', icon: <TableProperties className="w-3.5 h-3.5" /> },
    { id: 'glossary', label: 'Glossary of Terms', icon: <BookOpen className="w-3.5 h-3.5 text-red-400" /> },
  ];

  // Helper to test if a tab is currently active (treating 'radar' as 'dominance' if applicable)
  const isTabActive = (id: TabId) => {
    if (id === 'dominance' && (activeTab === 'dominance' || activeTab === 'radar')) return true;
    if (id === 'narrative' && (activeTab === 'narrative' || activeTab === 'overview')) return true;
    return activeTab === id;
  };

  return (
    <header className="bg-[#191919]/95 backdrop-blur-md border-b border-[#990000]/30 sticky top-0 z-40 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row justify-between items-center gap-4">
        <button
          onClick={() => onSelectTab('narrative')}
          className="flex items-center space-x-3.5 text-left cursor-pointer group focus:outline-none"
          title="Return to Narrative Arc Landing Page"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#990000] to-[#700000] flex items-center justify-center border border-[#990000]/80 shadow-lg shadow-black/60 flex-shrink-0 group-hover:scale-105 transition">
            <span className="font-serif font-black text-white text-xl tracking-tighter">IU</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-white bg-[#990000] px-2.5 py-0.5 rounded-full border border-[#700000] flex items-center gap-1 shadow-sm">
                <Flame className="w-3 h-3 text-[#EEEDEB] fill-[#EEEDEB] animate-pulse" />
                Championship Intelligence Suite
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white font-serif tracking-tight mt-0.5 flex items-center gap-2 group-hover:text-[#EEEDEB] transition">
              Indiana 2025 <span className="text-[#DCDDD9]/70 text-lg font-normal">vs.</span> Historical Titans
            </h1>
          </div>
        </button>

        <div className="flex items-center gap-2.5">
          <div className="bg-black/80 border border-[#DCDDD9]/20 px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-2.5 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[#EEEDEB]/70 text-[11px] uppercase tracking-wider">Historical Benchmark:</span>
            <span className="font-extrabold text-white">Indiana 2025 (16-0)</span>
            <span className="text-[10px] bg-[#990000] text-white px-1.5 py-0.5 rounded font-mono font-bold border border-[#700000]">
              #1 Net Z (4.63)
            </span>
          </div>

          <button
            onClick={() => onSelectTab('glossary')}
            id="btn-quick-glossary"
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border cursor-pointer ${
              activeTab === 'glossary'
                ? 'bg-[#990000] text-white border-[#700000] shadow-md'
                : 'bg-black/80 hover:bg-zinc-800 text-[#EEEDEB] hover:text-white border-[#DCDDD9]/20'
            }`}
            title="Open Glossary of Terms"
          >
            <BookOpen className="w-3.5 h-3.5 text-white" />
            <span className="hidden sm:inline">Glossary</span>
          </button>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-1 border-t border-[#DCDDD9]/15 pt-1.5 overflow-x-auto custom-scrollbar">
        {/* Storytelling Narrative Themes */}
        <div className="flex items-center space-x-1">
          {narrativeTabs.map((item) => {
            const active = isTabActive(item.id);
            return (
              <button
                key={item.id}
                id={`btn-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                className={`tab-btn px-3 py-2 text-xs sm:text-sm font-bold rounded-t-xl transition border-b-2 whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  active
                    ? 'border-[#990000] text-white bg-[#990000]/25 shadow-inner'
                    : 'border-transparent text-[#EEEDEB]/70 hover:text-white hover:bg-zinc-800/40'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded font-mono uppercase tracking-wider font-extrabold ${
                      active ? 'bg-[#990000] text-white' : 'bg-black/60 text-[#DCDDD9]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Subtle separator */}
        <div className="h-6 w-px bg-[#DCDDD9]/20 mx-2 flex-shrink-0"></div>

        {/* Deep Dive Analytical Tools */}
        <div className="flex items-center space-x-1">
          {analyticalTabs.map((item) => {
            const active = isTabActive(item.id);
            return (
              <button
                key={item.id}
                id={`btn-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                className={`tab-btn px-3 py-2 text-xs sm:text-sm font-semibold rounded-t-xl transition border-b-2 whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  active
                    ? 'border-[#990000] text-white bg-[#990000]/25 shadow-inner'
                    : 'border-transparent text-[#EEEDEB]/70 hover:text-white hover:bg-zinc-800/40'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
