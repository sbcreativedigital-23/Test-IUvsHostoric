import React from 'react';
import { TabId, TeamKey } from '../types';
import { TEAMS, MARKET_PROFILES } from '../data/championshipData';
import {
  Compass,
  Radar,
  Scale,
  DollarSign,
  ArrowRight,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap,
  Swords,
  TableProperties,
  Dices,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Flame,
  BarChart3,
  Award,
  Bot
} from 'lucide-react';

interface NarrativeArcProps {
  onNavigateTab: (tab: TabId) => void;
  onSelectTeamForRadar?: (team: TeamKey) => void;
}

export const NarrativeArc: React.FC<NarrativeArcProps> = ({
  onNavigateTab,
  onSelectTeamForRadar
}) => {
  const iu = TEAMS.indiana;

  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-12 -bottom-12 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-5 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-widest text-red-400 bg-red-950/80 px-3 py-1 rounded-full border border-red-800/60 inline-flex items-center gap-1.5 shadow-sm">
              <Compass className="w-3.5 h-3.5 text-red-400" />
              The Central Thesis & Narrative Arc
            </span>
            <span className="text-xs text-zinc-400 font-mono">
              3 Core Pillars • 5 Undisputed Titans
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Deciphering the <span className="text-red-500">2025 Indiana Outlier</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-3xl">
            Curt Cignetti’s 16-0 Indiana Hoosiers mounted the most statistically disruptive campaign in modern college football history. Rather than fitting neatly into historical conventions, Indiana’s title run challenges accepted championship doctrine across three foundational investigative dimensions:
          </p>

          {/* Key Stat Strips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-zinc-950/80 border border-zinc-800/90 rounded-2xl p-3.5 shadow-inner">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Record</span>
              <span className="text-xl sm:text-2xl font-black text-white">16-0</span>
              <span className="text-[10px] text-zinc-500 block mt-0.5">First 16-game champion</span>
            </div>
            <div className="bg-zinc-950/80 border border-zinc-800/90 rounded-2xl p-3.5 shadow-inner">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Scoring Margin</span>
              <span className="text-xl sm:text-2xl font-black text-red-400">+29.9</span>
              <span className="text-[10px] text-zinc-500 block mt-0.5">#1 among modern champions</span>
            </div>
            <div className="bg-zinc-950/80 border border-zinc-800/90 rounded-2xl p-3.5 shadow-inner">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Net Efficiency Z</span>
              <span className="text-xl sm:text-2xl font-black text-blue-400">4.63</span>
              <span className="text-[10px] text-zinc-500 block mt-0.5">#1 normalized machine index</span>
            </div>
            <div className="bg-zinc-950/80 border border-zinc-800/90 rounded-2xl p-3.5 shadow-inner">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Against The Spread</span>
              <span className="text-xl sm:text-2xl font-black text-amber-400">75.0%</span>
              <span className="text-[10px] text-zinc-500 block mt-0.5">+9.2 avg cover margin (#1)</span>
            </div>
          </div>
        </div>
      </div>

      {/* The Three Pillars Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-400" />
              The Three Core Narrative Themes
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Select any thematic card to dive into its dedicated data visualization and analytical tools
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Theme 1: Evolution of Dominance */}
          <div
            id="card-theme-1"
            className="group bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 border border-red-950/80 hover:border-red-600/80 rounded-3xl p-6 sm:p-7 shadow-xl hover:shadow-red-950/30 transition duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-2xl pointer-events-none group-hover:bg-red-600/10 transition"></div>

            <div className="space-y-4 relative z-10">
              {/* Pillar Header */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-red-400 bg-red-950/90 px-2.5 py-1 rounded-full border border-red-800/80 flex items-center gap-1.5">
                  <Radar className="w-3 h-3 text-red-400" />
                  Narrative Theme 1
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  Radar DNA
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-red-400 transition">
                  Evolution of Dominance
                </h3>
                <p className="text-xs font-bold text-red-300/80 mt-0.5">
                  Structural Balance vs. Specialized Archetypes
                </p>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Breaks the traditional binary between offensive juggernauts (LSU 2019, Alabama 2020) and defensive fortresses (Michigan 2023). Indiana crafted a new archetype: <strong>The Modern Hybrid</strong>, pairing an elite scoring defense (11.7 PAPG) with relentless scoring efficiency (+29.9 margin).
              </p>

              {/* Key Highlights */}
              <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                <div className="flex items-center justify-between text-xs bg-zinc-950/80 p-2.5 rounded-xl border border-zinc-800">
                  <span className="text-zinc-400 font-medium">Scoring Defense (PAPG)</span>
                  <span className="font-mono font-bold text-white">11.7 <span className="text-zinc-500 text-[10px]">(2nd Best)</span></span>
                </div>
                <div className="flex items-center justify-between text-xs bg-zinc-950/80 p-2.5 rounded-xl border border-zinc-800">
                  <span className="text-zinc-400 font-medium">Net Scoring Margin</span>
                  <span className="font-mono font-bold text-red-400">+29.9 <span className="text-zinc-500 text-[10px]">(#1)</span></span>
                </div>
                <div className="flex items-center justify-between text-xs bg-zinc-950/80 p-2.5 rounded-xl border border-zinc-800">
                  <span className="text-zinc-400 font-medium">Radar Shape</span>
                  <span className="font-mono font-bold text-zinc-200">Balanced 5-Metric Polygon</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2 relative z-10">
              <button
                onClick={() => onNavigateTab('dominance')}
                className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-red-950/50 cursor-pointer"
              >
                <span>Explore Theme 1: Radar DNA</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-[11px] text-zinc-500 px-1">
                <span>Quick Compare:</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => {
                      if (onSelectTeamForRadar) onSelectTeamForRadar('alabama');
                      onNavigateTab('dominance');
                    }}
                    className="hover:text-zinc-300 font-mono transition cursor-pointer"
                  >
                    Bama '20
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => {
                      if (onSelectTeamForRadar) onSelectTeamForRadar('lsu');
                      onNavigateTab('dominance');
                    }}
                    className="hover:text-zinc-300 font-mono transition cursor-pointer"
                  >
                    LSU '19
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => {
                      if (onSelectTeamForRadar) onSelectTeamForRadar('michigan');
                      onNavigateTab('dominance');
                    }}
                    className="hover:text-zinc-300 font-mono transition cursor-pointer"
                  >
                    Mich '23
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Theme 2: The Résumé vs. The Machine */}
          <div
            id="card-theme-2"
            className="group bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 border border-blue-950/80 hover:border-blue-600/80 rounded-3xl p-6 sm:p-7 shadow-xl hover:shadow-blue-950/30 transition duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-600/10 transition"></div>

            <div className="space-y-4 relative z-10">
              {/* Pillar Header */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 bg-blue-950/90 px-2.5 py-1 rounded-full border border-blue-800/80 flex items-center gap-1.5">
                  <Scale className="w-3 h-3 text-blue-400" />
                  Narrative Theme 2
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  Efficiency vs. SOS
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-blue-400 transition">
                  Résumé vs. The Machine
                </h3>
                <p className="text-xs font-bold text-blue-300/80 mt-0.5">
                  Per-Play Efficiency vs. Gauntlet Resistance
                </p>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Investigates the central philosophical debate in college football analytics: Does unyielding statistical machine precision (4.63 Net Z-Score, +0.52 Net EPA) outweigh an SEC gauntlet résumé featuring 7 Top-25 and 4 Top-10 wins (LSU 2019)?
              </p>

              {/* Key Highlights */}
              <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                <div className="flex items-center justify-between text-xs bg-zinc-950/80 p-2.5 rounded-xl border border-zinc-800">
                  <span className="text-zinc-400 font-medium">Net Efficiency Z-Score</span>
                  <span className="font-mono font-bold text-blue-400">4.63 <span className="text-zinc-500 text-[10px]">(#1 All-Time)</span></span>
                </div>
                <div className="flex items-center justify-between text-xs bg-zinc-950/80 p-2.5 rounded-xl border border-zinc-800">
                  <span className="text-zinc-400 font-medium">Net EPA Per Play</span>
                  <span className="font-mono font-bold text-white">+0.52 <span className="text-zinc-500 text-[10px]">(~Tied #1)</span></span>
                </div>
                <div className="flex items-center justify-between text-xs bg-zinc-950/80 p-2.5 rounded-xl border border-zinc-800">
                  <span className="text-zinc-400 font-medium">Top-25 Wins Disparity</span>
                  <span className="font-mono font-bold text-zinc-300">IU 4 vs. LSU 7</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2 relative z-10">
              <button
                onClick={() => onNavigateTab('resume')}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-950/50 cursor-pointer"
              >
                <span>Explore Theme 2: Résumé vs Machine</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-[11px] text-zinc-500 px-1">
                <span>View Components:</span>
                <div className="flex gap-1.5">
                  <button onClick={() => onNavigateTab('resume')} className="hover:text-zinc-300 font-mono transition">
                    2-Axis Plot
                  </button>
                  <span>•</span>
                  <button onClick={() => onNavigateTab('resume')} className="hover:text-zinc-300 font-mono transition">
                    Gauntlet
                  </button>
                  <span>•</span>
                  <button onClick={() => onNavigateTab('resume')} className="hover:text-zinc-300 font-mono transition">
                    Trade-Offs
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Theme 3: The Market Outlier */}
          <div
            id="card-theme-3"
            className="group bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 border border-amber-950/80 hover:border-amber-600/80 rounded-3xl p-6 sm:p-7 shadow-xl hover:shadow-amber-950/30 transition duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/5 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-600/10 transition"></div>

            <div className="space-y-4 relative z-10">
              {/* Pillar Header */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-950/90 px-2.5 py-1 rounded-full border border-amber-800/80 flex items-center gap-1.5">
                  <DollarSign className="w-3 h-3 text-amber-400" />
                  Narrative Theme 3
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  Betting Inefficiency
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-amber-400 transition">
                  The Market Outlier
                </h3>
                <p className="text-xs font-bold text-amber-300/80 mt-0.5">
                  Institutional Blindness & Betting Inefficiency
                </p>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Demonstrates how institutional bookmakers and betting syndicates chronically lagged Indiana’s true caliber. Indiana shattered closing point spreads at a 75.0% ATS win rate with a +9.2 average cover margin, amassing +147.2 cumulative net cover points.
              </p>

              {/* Key Highlights */}
              <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                <div className="flex items-center justify-between text-xs bg-zinc-950/80 p-2.5 rounded-xl border border-zinc-800">
                  <span className="text-zinc-400 font-medium">Against The Spread (ATS)</span>
                  <span className="font-mono font-bold text-amber-400">75.0% <span className="text-zinc-500 text-[10px]">(12-4 Record)</span></span>
                </div>
                <div className="flex items-center justify-between text-xs bg-zinc-950/80 p-2.5 rounded-xl border border-zinc-800">
                  <span className="text-zinc-400 font-medium">Average Cover Margin</span>
                  <span className="font-mono font-bold text-white">+9.2 pts <span className="text-zinc-500 text-[10px]">(#1)</span></span>
                </div>
                <div className="flex items-center justify-between text-xs bg-zinc-950/80 p-2.5 rounded-xl border border-zinc-800">
                  <span className="text-zinc-400 font-medium">Value-Game Win Rate</span>
                  <span className="font-mono font-bold text-emerald-400">87.5% <span className="text-zinc-500 text-[10px]">(7-1 in tight lines)</span></span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2 relative z-10">
              <button
                onClick={() => onNavigateTab('market')}
                className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-zinc-950 text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 shadow-lg shadow-amber-950/50 cursor-pointer"
              >
                <span>Explore Theme 3: Market Outlier</span>
                <ArrowRight className="w-4 h-4 text-zinc-950" />
              </button>

              <div className="flex items-center justify-between text-[11px] text-zinc-500 px-1">
                <span>Market Tools:</span>
                <div className="flex gap-1.5">
                  <button onClick={() => onNavigateTab('market')} className="hover:text-zinc-300 font-mono transition">
                    Quadrant
                  </button>
                  <span>•</span>
                  <button onClick={() => onNavigateTab('market')} className="hover:text-zinc-300 font-mono transition">
                    Cumulative Curve
                  </button>
                  <span>•</span>
                  <button onClick={() => onNavigateTab('market')} className="hover:text-zinc-300 font-mono transition">
                    Game Log
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparative Synthesis Matrix */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-red-400" />
              Cross-Theme Comparative Matrix: All 5 Champions
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              How Indiana 2025 compares across the three investigative themes against each historical benchmark
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('all5')}
            className="self-start sm:self-auto text-xs text-red-400 hover:text-red-300 font-bold flex items-center gap-1 transition"
          >
            <span>Open All 5 Matrix</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800 text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                <th className="py-3 px-3">Champion Unit</th>
                <th className="py-3 px-3">Archetype</th>
                <th className="py-3 px-3">Theme 1: Dominance (PAPG / Margin)</th>
                <th className="py-3 px-3">Theme 2: Machine vs. Résumé</th>
                <th className="py-3 px-3">Theme 3: Market Inefficiency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-medium">
              <tr className="bg-red-950/20 text-white">
                <td className="py-3.5 px-3 font-bold text-red-400 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                  Indiana 2025 (16-0)
                </td>
                <td className="py-3.5 px-3 font-mono text-zinc-300">Modern Hybrid</td>
                <td className="py-3.5 px-3 text-zinc-200">
                  <span className="font-bold text-white">11.7 PAPG</span> / <span className="font-bold text-red-400">+29.9 Margin (#1)</span>
                </td>
                <td className="py-3.5 px-3 text-zinc-200">
                  <span className="font-bold text-blue-400">4.63 Net Z (#1)</span> • 4 Top-25 Wins
                </td>
                <td className="py-3.5 px-3 text-zinc-200">
                  <span className="font-bold text-amber-400">75.0% ATS (#1)</span> • +9.2 Cover Margin
                </td>
              </tr>

              <tr className="hover:bg-zinc-800/40 text-zinc-300 transition">
                <td className="py-3 px-3 font-bold text-zinc-200">Alabama 2020 (13-0)</td>
                <td className="py-3 px-3 font-mono text-zinc-400">Explosive Offense</td>
                <td className="py-3 px-3">19.4 PAPG / +29.1 Margin</td>
                <td className="py-3 px-3">4.41 Net Z • 6 Top-25 Wins (#10 SOS)</td>
                <td className="py-3 px-3">69.2% ATS • +4.9 Cover Margin</td>
              </tr>

              <tr className="hover:bg-zinc-800/40 text-zinc-300 transition">
                <td className="py-3 px-3 font-bold text-zinc-200">LSU 2019 (15-0)</td>
                <td className="py-3 px-3 font-mono text-zinc-400">Explosive Offense</td>
                <td className="py-3 px-3">21.9 PAPG / +26.5 Margin</td>
                <td className="py-3 px-3">3.85 Net Z • <span className="text-white font-semibold">7 Top-25 Wins (Crown)</span></td>
                <td className="py-3 px-3">66.7% ATS • +5.4 Cover Margin</td>
              </tr>

              <tr className="hover:bg-zinc-800/40 text-zinc-300 transition">
                <td className="py-3 px-3 font-bold text-zinc-200">Georgia 2022 (15-0)</td>
                <td className="py-3 px-3 font-mono text-zinc-400">Scrimmage Balance</td>
                <td className="py-3 px-3">14.3 PAPG / +26.8 Margin</td>
                <td className="py-3 px-3">3.06 Net Z • 6 Top-25 Wins (#18 SOS)</td>
                <td className="py-3 px-3">60.0% ATS • +2.6 Cover Margin</td>
              </tr>

              <tr className="hover:bg-zinc-800/40 text-zinc-300 transition">
                <td className="py-3 px-3 font-bold text-zinc-200">Michigan 2023 (15-0)</td>
                <td className="py-3 px-3 font-mono text-zinc-400">Defensive Lockdown</td>
                <td className="py-3 px-3"><span className="text-white font-semibold">10.4 PAPG (#1)</span> / +25.5 Margin</td>
                <td className="py-3 px-3">3.24 Net Z • 4 Top-25 Wins (#33 SOS)</td>
                <td className="py-3 px-3">60.0% ATS • +3.8 Cover Margin</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Launchpad to Analytical Tools */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Analytical Deep-Dive Suite
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Complementary modules for advanced simulation, tabular inspection, and mathematical definitions
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          <button
            onClick={() => onNavigateTab('dashboard')}
            className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 p-4 rounded-2xl text-left transition flex flex-col justify-between space-y-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-red-400 transition">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-zinc-200 block group-hover:text-white">Executive Briefing</span>
              <span className="text-[10px] text-zinc-500">Macro overview</span>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('chat')}
            className="bg-zinc-900 hover:bg-zinc-800 border border-emerald-900/50 hover:border-emerald-500/60 p-4 rounded-2xl text-left transition flex flex-col justify-between space-y-3 cursor-pointer group shadow-sm ring-1 ring-emerald-500/20"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-950/60 flex items-center justify-center text-emerald-400 group-hover:text-white transition">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-300 block group-hover:text-white">AI Data Chat</span>
              <span className="text-[10px] text-zinc-500">Ask Gemini anything</span>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('h2h')}
            className="bg-zinc-900 hover:bg-zinc-800 border border-red-900/40 hover:border-red-500/60 p-4 rounded-2xl text-left transition flex flex-col justify-between space-y-3 cursor-pointer group shadow-sm ring-1 ring-red-500/20"
          >
            <div className="w-8 h-8 rounded-xl bg-red-950/60 flex items-center justify-center text-red-400 group-hover:text-white transition">
              <Swords className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-red-300 block group-hover:text-white">Head-to-Head</span>
              <span className="text-[10px] text-zinc-500">Deep matchup points</span>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('all5')}
            className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 p-4 rounded-2xl text-left transition flex flex-col justify-between space-y-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-purple-400 transition">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-zinc-200 block group-hover:text-white">All 5 Matrix</span>
              <span className="text-[10px] text-zinc-500">Side-by-side leaders</span>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('efficiency')}
            className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 p-4 rounded-2xl text-left transition flex flex-col justify-between space-y-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-emerald-400 transition">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-zinc-200 block group-hover:text-white">EPA Matrix</span>
              <span className="text-[10px] text-zinc-500">Expected points added</span>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('simulator')}
            className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 p-4 rounded-2xl text-left transition flex flex-col justify-between space-y-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-red-400 transition">
              <Dices className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-zinc-200 block group-hover:text-white">H2H Simulator</span>
              <span className="text-[10px] text-zinc-500">Monte Carlo matchup</span>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('master')}
            className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 p-4 rounded-2xl text-left transition flex flex-col justify-between space-y-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-blue-400 transition">
              <TableProperties className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-zinc-200 block group-hover:text-white">Master Ledger</span>
              <span className="text-[10px] text-zinc-500">70+ raw attributes</span>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('glossary')}
            className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 p-4 rounded-2xl text-left transition flex flex-col justify-between space-y-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-amber-400 transition">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-zinc-200 block group-hover:text-white">Glossary</span>
              <span className="text-[10px] text-zinc-500">20 metric definitions</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
