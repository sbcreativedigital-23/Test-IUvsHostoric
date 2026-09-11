import React, { useState } from 'react';
import { TeamKey, TabId } from '../types';
import { H2H_MATCHUPS, DetailedMatchup, H2HAnalysisPoint } from '../data/h2hMatchupData';
import { TEAMS } from '../data/championshipData';
import {
  Swords,
  Shield,
  Zap,
  Award,
  TrendingUp,
  Target,
  ArrowRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  Clock,
  Dices,
  Scale
} from 'lucide-react';

interface HeadToHeadViewProps {
  onNavigateTab?: (tab: TabId) => void;
  onSelectTeamForRadar?: (team: TeamKey) => void;
  initialOpponent?: Exclude<TeamKey, 'indiana'>;
}

export const HeadToHeadView: React.FC<HeadToHeadViewProps> = ({
  onNavigateTab,
  onSelectTeamForRadar,
  initialOpponent = 'alabama'
}) => {
  const [selectedOpponent, setSelectedOpponent] = useState<Exclude<TeamKey, 'indiana'>>(initialOpponent);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [expandedPoints, setExpandedPoints] = useState<Record<number, boolean>>({});
  const [activeSubTab, setActiveSubTab] = useState<'points' | 'tape' | 'gameplan'>('points');

  const matchup: DetailedMatchup = H2H_MATCHUPS[selectedOpponent];
  const indiana = TEAMS.indiana;
  const opponent = TEAMS[selectedOpponent];

  const opponentList: Exclude<TeamKey, 'indiana'>[] = ['alabama', 'lsu', 'georgia', 'michigan'];

  const toggleExpand = (idx: number) => {
    setExpandedPoints(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const categories = [
    'All',
    'Offense vs Defense',
    'Efficiency & EPA',
    'Situational & Red Zone',
    'Strength of Schedule',
    'Market & Vegas'
  ];

  const filteredPoints = activeFilter === 'All'
    ? matchup.analysisPoints
    : matchup.analysisPoints.filter(p => p.category === activeFilter);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner & Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-red-950/40 border border-zinc-800 p-6 md:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-950/80 text-red-400 border border-red-800/60">
              <Swords className="w-3.5 h-3.5 text-red-400" />
              Direct Head-to-Head Intelligence
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Indiana 2025 vs. Individual Historical Champions
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Examine the deep-dive tactical breakdowns, per-play efficiency match-ups, and statistical tale of the tape comparing Indiana directly against each undisputed champion.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('simulator')}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 hover:text-white transition flex items-center gap-2 border border-zinc-700 shadow-md cursor-pointer"
              >
                <Dices className="w-4 h-4 text-red-400" />
                Launch Live Simulator
              </button>
            )}
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('all5')}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 hover:text-white transition flex items-center gap-2 border border-zinc-700 shadow-md cursor-pointer"
              >
                <Scale className="w-4 h-4 text-blue-400" />
                All 5 Matrix
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Matchup Selector Tabs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Select Opponent Matchup:
          </span>
          <span className="text-xs text-zinc-500">
            Viewing: <strong className="text-white">Indiana 2025 vs. {opponent.name}</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {opponentList.map(oppKey => {
            const oppData = TEAMS[oppKey];
            const isSelected = selectedOpponent === oppKey;
            const oppMatchup = H2H_MATCHUPS[oppKey];

            return (
              <button
                key={oppKey}
                onClick={() => {
                  setSelectedOpponent(oppKey);
                  setActiveFilter('All');
                }}
                className={`p-4 rounded-xl text-left transition-all relative overflow-hidden border cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-900 border-red-500 shadow-lg shadow-red-950/40 ring-1 ring-red-500'
                    : 'bg-zinc-900/60 hover:bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-zinc-400'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 w-16 h-16 bg-red-600/10 rounded-bl-full pointer-events-none" />
                )}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-xs font-extrabold px-2 py-0.5 rounded uppercase tracking-wider"
                    style={{
                      backgroundColor: `${oppData.primaryColor}20`,
                      color: oppData.primaryColor === '#0284c7' ? '#38bdf8' : '#f87171'
                    }}
                  >
                    {oppData.year}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">{oppData.record}</span>
                </div>
                <h3 className={`text-base font-black truncate ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                  vs. {oppData.name}
                </h3>
                <p className="text-[11px] text-zinc-400 line-clamp-1 mt-1">
                  {oppMatchup.tagline}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Selected Matchup Banner */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 lg:p-8 space-y-6 shadow-xl relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-950/20 rounded-full blur-3xl pointer-events-none" />

        {/* Matchup Header Details */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b border-zinc-800">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider bg-red-600 text-white">
                Matchup Spotlight
              </span>
              <span className="text-xs text-zinc-400 font-medium">
                16-0 Undefeated Champion vs. {opponent.record} Champion
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {matchup.matchupTitle}
            </h2>
            <p className="text-sm font-semibold text-red-400">
              {matchup.tagline}
            </p>
          </div>

          {/* Quick Projected Simulation Box */}
          <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 flex items-center gap-6 shadow-inner w-full lg:w-auto">
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block">
                Projected Score
              </span>
              <div className="text-lg sm:text-xl font-black text-white mt-0.5">
                <span className="text-red-400">IU {matchup.projectedScore.indiana}</span>
                <span className="text-zinc-600 mx-1.5">-</span>
                <span className="text-zinc-300">{opponent.name.split(' ')[0]} {matchup.projectedScore.opponent}</span>
              </div>
            </div>

            <div className="h-8 w-px bg-zinc-800" />

            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block">
                Win Probability
              </span>
              <span className="text-lg sm:text-xl font-black text-emerald-400 mt-0.5 block">
                {matchup.projectedScore.winProb}% IU
              </span>
            </div>

            <div className="h-8 w-px bg-zinc-800" />

            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block">
                Model Spread
              </span>
              <span className="text-sm sm:text-base font-extrabold text-zinc-200 mt-0.5 block">
                {matchup.projectedScore.spread}
              </span>
            </div>
          </div>
        </div>

        {/* Narrative Clash Synopsis */}
        <div className="bg-zinc-950/60 rounded-xl p-5 border border-zinc-800/80 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Core Strategic Clash & Thesis
          </div>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            {matchup.narrativeClash}
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span className="font-semibold text-zinc-300">Indiana:</span> {matchup.indianaArchetype}
            </div>
            <div className="flex items-center gap-1.5 text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span className="font-semibold text-zinc-300">{opponent.name}:</span> {matchup.opponentArchetype}
            </div>
          </div>
        </div>

        {/* Sub Navigation: Points, Tape, Gameplan */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSubTab('points')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeSubTab === 'points'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              Detailed Analysis Points ({matchup.analysisPoints.length})
            </button>
            <button
              onClick={() => setActiveSubTab('tape')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeSubTab === 'tape'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              Tale of the Tape ({matchup.tape.length})
            </button>
            <button
              onClick={() => setActiveSubTab('gameplan')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeSubTab === 'gameplan'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              Win Conditions & X-Factor
            </button>
          </div>

          {activeSubTab === 'points' && (
            <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold whitespace-nowrap transition cursor-pointer ${
                    activeFilter === cat
                      ? 'bg-red-950 text-red-300 border border-red-800'
                      : 'bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* VIEW 1: DETAILED ANALYSIS POINTS */}
        {activeSubTab === 'points' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
              <span>Showing {filteredPoints.length} analysis points</span>
              <button
                onClick={() => {
                  const allExpanded = Object.keys(expandedPoints).length === filteredPoints.length;
                  if (allExpanded) {
                    setExpandedPoints({});
                  } else {
                    const next: Record<number, boolean> = {};
                    filteredPoints.forEach((_, idx) => {
                      next[idx] = true;
                    });
                    setExpandedPoints(next);
                  }
                }}
                className="text-red-400 hover:text-red-300 transition underline cursor-pointer"
              >
                {Object.keys(expandedPoints).length === filteredPoints.length ? 'Collapse All' : 'Expand All'}
              </button>
            </div>

            <div className="space-y-3">
              {filteredPoints.map((point: H2HAnalysisPoint, idx: number) => {
                const isExpanded = expandedPoints[idx] ?? true; // default expanded for visibility

                return (
                  <div
                    key={idx}
                    className="bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700/80 rounded-xl p-5 transition space-y-3 shadow-md"
                  >
                    <div
                      onClick={() => toggleExpand(idx)}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                            {point.category}
                          </span>
                          <span
                            className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                              point.edge === 'indiana'
                                ? 'bg-red-950/80 text-red-400 border border-red-800/60'
                                : point.edge === 'opponent'
                                ? 'bg-blue-950/80 text-blue-400 border border-blue-800/60'
                                : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                            }`}
                          >
                            Edge: {point.edge === 'indiana' ? 'Indiana 2025' : point.edge === 'opponent' ? opponent.name : 'Even / Push'}
                          </span>
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                          {point.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-zinc-400">
                          {point.summary}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-center">
                        <button className="p-1 rounded-md text-zinc-400 hover:text-white transition">
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Stats Pill comparison */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="bg-red-950/30 border border-red-900/40 rounded-lg p-3 text-xs">
                        <span className="text-[10px] uppercase font-bold text-red-400 block tracking-wider mb-1">
                          Indiana 2025 Benchmark
                        </span>
                        <span className="font-semibold text-zinc-200">
                          {point.indianaStat}
                        </span>
                      </div>
                      <div className="bg-zinc-900/90 border border-zinc-800 rounded-lg p-3 text-xs">
                        <span className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider mb-1">
                          {opponent.name} Metric
                        </span>
                        <span className="font-semibold text-zinc-200">
                          {point.opponentStat}
                        </span>
                      </div>
                    </div>

                    {/* Deep-Dive Paragraph */}
                    {isExpanded && (
                      <div className="pt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-900/80">
                        <span className="font-bold text-white">In-Depth Tactical Breakdown: </span>
                        {point.deepDive}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 2: TALE OF THE TAPE */}
        {activeSubTab === 'tape' && (
          <div className="space-y-4">
            <div className="bg-zinc-950/60 rounded-xl p-4 border border-zinc-800 text-xs text-zinc-400">
              <span className="font-bold text-zinc-200">Comparative Tale of the Tape: </span>
              Metrics highlight Indiana in <span className="text-red-400 font-bold">Crimson</span> and {opponent.name} in <span className="text-blue-400 font-bold">Blue</span> based on which team holds the empirical advantage.
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-950/80 text-zinc-400 uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4 font-bold">Metric</th>
                    <th className="py-3 px-4 font-bold text-red-400">Indiana 2025</th>
                    <th className="py-3 px-4 font-bold text-zinc-300">{opponent.name}</th>
                    <th className="py-3 px-4 font-bold">Advantage & Delta</th>
                    <th className="py-3 px-4 font-bold hidden md:table-cell">Analytical Context</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {matchup.tape.map((item, idx) => (
                    <tr key={idx} className="hover:bg-zinc-900/40 transition">
                      <td className="py-3.5 px-4 font-semibold text-white">
                        {item.metric}
                      </td>
                      <td className={`py-3.5 px-4 font-mono font-bold ${item.advantage === 'indiana' ? 'text-red-400' : 'text-zinc-300'}`}>
                        {item.indianaVal}
                      </td>
                      <td className={`py-3.5 px-4 font-mono font-bold ${item.advantage === 'opponent' ? 'text-blue-400' : 'text-zinc-300'}`}>
                        {item.opponentVal}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase ${
                            item.advantage === 'indiana'
                              ? 'bg-red-950/80 text-red-400 border border-red-800/60'
                              : item.advantage === 'opponent'
                              ? 'bg-blue-950/80 text-blue-400 border border-blue-800/60'
                              : 'bg-zinc-800 text-zinc-300'
                          }`}
                        >
                          {item.advantage === 'indiana' && <CheckCircle2 className="w-3 h-3 text-red-400" />}
                          {item.advantage === 'opponent' && <CheckCircle2 className="w-3 h-3 text-blue-400" />}
                          {item.advantage === 'indiana' ? 'IU' : item.advantage === 'opponent' ? opponent.name.split(' ')[0] : 'Push'}
                          {item.difference && <span className="opacity-80 font-normal">({item.difference})</span>}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-zinc-400 hidden md:table-cell text-[11px] leading-snug">
                        {item.explanation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW 3: WIN CONDITIONS & GAME PLAN */}
        {activeSubTab === 'gameplan' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Indiana Win Condition Card */}
            <div className="bg-gradient-to-b from-red-950/30 to-zinc-950 border border-red-900/40 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-red-400">
                <Shield className="w-4 h-4 text-red-400" />
                How Indiana 2025 Wins This Matchup
              </div>
              <p className="text-sm text-zinc-200 leading-relaxed">
                {matchup.indianaWinCondition}
              </p>
              <div className="pt-2 border-t border-red-950/80 space-y-2 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                  <span><strong>Net EPA Edge:</strong> +0.52 vs {opponent.netEpa}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                  <span><strong>Defense Floor:</strong> 11.7 PAPG (-0.18 EPA Allowed)</span>
                </div>
              </div>
            </div>

            {/* Opponent Win Condition Card */}
            <div className="bg-gradient-to-b from-blue-950/20 to-zinc-950 border border-blue-900/30 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-400">
                <Target className="w-4 h-4 text-blue-400" />
                How {opponent.name} Wins This Matchup
              </div>
              <p className="text-sm text-zinc-200 leading-relaxed">
                {matchup.opponentWinCondition}
              </p>
              <div className="pt-2 border-t border-blue-950/80 space-y-2 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  <span><strong>Roster Superpower:</strong> {opponent.keyStrength}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  <span><strong>Opponent Vulnerability:</strong> {opponent.vulnerability}</span>
                </div>
              </div>
            </div>

            {/* Matchup X-Factor */}
            <div className="md:col-span-2 bg-zinc-950/80 border border-amber-900/40 rounded-xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                The Decisive Tactical X-Factor
              </div>
              <p className="text-sm sm:text-base text-zinc-300 font-medium leading-relaxed">
                {matchup.xFactor}
              </p>
            </div>

            {/* Tactical Verdict Summary */}
            <div className="md:col-span-2 bg-gradient-to-r from-red-950/40 via-zinc-950 to-zinc-950 border border-red-800/40 rounded-xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-red-400">
                <Award className="w-4 h-4 text-red-400" />
                Simulation & Analytical Verdict
              </div>
              <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
                {matchup.tacticalVerdict}
              </p>
            </div>
          </div>
        )}

        {/* Footer Actions inside Matchup */}
        <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="text-zinc-500">
            Want to test custom point spreads and pace sliders for this game?
          </div>
          <div className="flex items-center gap-3">
            {onSelectTeamForRadar && (
              <button
                onClick={() => onSelectTeamForRadar(selectedOpponent)}
                className="text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 transition cursor-pointer"
              >
                Inspect {opponent.name} Radar Profile <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('simulator')}
                className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold transition flex items-center gap-1.5 shadow cursor-pointer"
              >
                Simulate in H2H Sandbox <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
