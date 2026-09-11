import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import { TEAMS } from '../data/championshipData';
import { TeamKey, All5MetricKey } from '../types';
import { ensureChartRegistered, safeCreateChart } from '../utils/chartSetup';
import {
  Swords,
  Trophy,
  Shield,
  Zap,
  TrendingUp,
  DollarSign,
  Flame,
  Check,
  RotateCcw,
  SlidersHorizontal,
  Plus,
  X,
  Crown,
  Info
} from 'lucide-react';
import { KeyTakeaways } from './KeyTakeaways';

interface TableRowDef {
  key: string;
  label: string;
  category: 'scoring' | 'efficiency' | 'market' | 'resume';
  higherIsBetter: boolean;
  unit?: string;
  getRawVal: (k: TeamKey) => number;
  getFormattedVal: (k: TeamKey) => string;
  description: string;
}

export const All5Matrix: React.FC = () => {
  const allTeamKeys: TeamKey[] = ['indiana', 'alabama', 'lsu', 'georgia', 'michigan'];
  const [selectedTeams, setSelectedTeams] = useState<TeamKey[]>(allTeamKeys);
  const [activeMetric, setActiveMetric] = useState<All5MetricKey>('margin');
  const [tableCategory, setTableCategory] = useState<'all' | 'scoring' | 'efficiency' | 'market' | 'resume'>('all');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    ensureChartRegistered();
  }, []);

  const toggleTeam = (key: TeamKey) => {
    setSelectedTeams((prev) => {
      if (prev.includes(key)) {
        if (prev.length === 1) {
          return prev; // Maintain at least one team
        }
        return prev.filter((k) => k !== key);
      } else {
        // Maintain canonical order
        return allTeamKeys.filter((k) => prev.includes(k) || k === key);
      }
    });
  };

  const selectAll = () => setSelectedTeams(allTeamKeys);
  const selectSecOnly = () => setSelectedTeams(['indiana', 'alabama', 'lsu', 'georgia']);
  const selectBigTenOnly = () => setSelectedTeams(['indiana', 'michigan']);
  const selectOffenseTitans = () => setSelectedTeams(['indiana', 'alabama', 'lsu']);
  const selectDefenseTitans = () => setSelectedTeams(['indiana', 'michigan', 'georgia']);

  const metricConfigs: Record<
    All5MetricKey,
    {
      label: string;
      unit: string;
      higherIsBetter: boolean;
      icon: React.ReactNode;
      getVal: (k: TeamKey) => number;
    }
  > = {
    margin: {
      label: 'Scoring Margin Per Game',
      unit: 'pts',
      higherIsBetter: true,
      icon: <TrendingUp className="w-3.5 h-3.5" />,
      getVal: (k) => TEAMS[k].margin
    },
    ppg: {
      label: 'Points Per Game (Offensive Output)',
      unit: 'PPG',
      higherIsBetter: true,
      icon: <Flame className="w-3.5 h-3.5" />,
      getVal: (k) => TEAMS[k].ppg
    },
    papg: {
      label: 'Points Allowed Per Game (Lower is Superior)',
      unit: 'PAPG',
      higherIsBetter: false,
      icon: <Shield className="w-3.5 h-3.5" />,
      getVal: (k) => TEAMS[k].papg
    },
    netEpa: {
      label: 'Net EPA / Play Differential',
      unit: 'EPA',
      higherIsBetter: true,
      icon: <Zap className="w-3.5 h-3.5" />,
      getVal: (k) => TEAMS[k].netEpa
    },
    ats: {
      label: 'Against-the-Spread (ATS) Win Rate (%)',
      unit: '%',
      higherIsBetter: true,
      icon: <DollarSign className="w-3.5 h-3.5" />,
      getVal: (k) => TEAMS[k].ats
    },
    netYds: {
      label: 'Net Yards / Play Differential',
      unit: 'YPP',
      higherIsBetter: true,
      icon: <Trophy className="w-3.5 h-3.5" />,
      getVal: (k) => TEAMS[k].netYds
    }
  };

  const currentCfg = metricConfigs[activeMetric];

  // Team Colors Palette for dynamic bar charts
  const getTeamColor = (key: TeamKey) => {
    switch (key) {
      case 'indiana':
        return { bg: '#dc2626', border: '#ef4444' };
      case 'alabama':
        return { bg: '#991b1b', border: '#b91c1c' };
      case 'lsu':
        return { bg: '#7c3aed', border: '#a855f7' };
      case 'georgia':
        return { bg: '#b91c1c', border: '#f87171' };
      case 'michigan':
        return { bg: '#0284c7', border: '#38bdf8' };
    }
  };

  // Synchronize Chart with selected teams & active metric
  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }

    const filteredLabels = selectedTeams.map((k) => TEAMS[k].name);
    const dataValues = selectedTeams.map((k) => currentCfg.getVal(k));
    const bgColors = selectedTeams.map((k) => getTeamColor(k).bg);
    const borderColors = selectedTeams.map((k) => getTeamColor(k).border);

    chartInstanceRef.current = safeCreateChart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: filteredLabels,
        datasets: [
          {
            label: currentCfg.label,
            data: dataValues,
            backgroundColor: bgColors,
            borderRadius: 8,
            borderWidth: 1.5,
            borderColor: borderColors
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: '#d4d4d8',
              font: { weight: 'bold', size: 11 }
            }
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            ticks: {
              color: '#a1a1aa',
              callback: (val) => `${val} ${currentCfg.unit === '%' ? '%' : ''}`
            }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.label}: ${ctx.raw} ${currentCfg.unit}`
            }
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [activeMetric, selectedTeams]);

  // Comprehensive Table Definitions
  const TABLE_ROWS: TableRowDef[] = [
    {
      key: 'record',
      label: 'Overall Record',
      category: 'scoring',
      higherIsBetter: true,
      getRawVal: (k) => TEAMS[k].wins,
      getFormattedVal: (k) => TEAMS[k].record,
      description: 'Total wins vs losses in regular season, conference championship, and CFP'
    },
    {
      key: 'margin',
      label: 'Scoring Margin / Game',
      category: 'scoring',
      higherIsBetter: true,
      unit: 'pts',
      getRawVal: (k) => TEAMS[k].margin,
      getFormattedVal: (k) => `+${TEAMS[k].margin}`,
      description: 'Average point differential per contest across all games played'
    },
    {
      key: 'ppg',
      label: 'Points Per Game (PPG)',
      category: 'scoring',
      higherIsBetter: true,
      unit: 'PPG',
      getRawVal: (k) => TEAMS[k].ppg,
      getFormattedVal: (k) => `${TEAMS[k].ppg}`,
      description: 'Offensive scoring average across the entire season'
    },
    {
      key: 'papg',
      label: 'Points Allowed / Game (PAPG)',
      category: 'scoring',
      higherIsBetter: false,
      unit: 'PAPG',
      getRawVal: (k) => TEAMS[k].papg,
      getFormattedVal: (k) => `${TEAMS[k].papg}`,
      description: 'Scoring defense concession per game (lower represents stingier defense)'
    },
    {
      key: 'netEpa',
      label: 'Net EPA / Play',
      category: 'efficiency',
      higherIsBetter: true,
      unit: 'EPA',
      getRawVal: (k) => TEAMS[k].netEpa,
      getFormattedVal: (k) => `+${TEAMS[k].netEpa}`,
      description: 'Offensive Expected Points Added minus opponent Expected Points Added allowed per snap'
    },
    {
      key: 'offEpa',
      label: 'Offensive EPA / Play',
      category: 'efficiency',
      higherIsBetter: true,
      unit: 'EPA',
      getRawVal: (k) => TEAMS[k].offEpa,
      getFormattedVal: (k) => `+${TEAMS[k].offEpa}`,
      description: 'Expected Points Added per offensive snap'
    },
    {
      key: 'defEpa',
      label: 'Defensive EPA / Play Allowed',
      category: 'efficiency',
      higherIsBetter: false,
      unit: 'EPA',
      getRawVal: (k) => TEAMS[k].defEpa,
      getFormattedVal: (k) => `${TEAMS[k].defEpa}`,
      description: 'Expected points conceded per opponent snap (more negative is superior)'
    },
    {
      key: 'netYds',
      label: 'Net Yards / Play Differential',
      category: 'efficiency',
      higherIsBetter: true,
      unit: 'YPP',
      getRawVal: (k) => TEAMS[k].netYds,
      getFormattedVal: (k) => `+${TEAMS[k].netYds}`,
      description: 'Yards gained per play minus yards conceded per opponent play'
    },
    {
      key: 'offSucc',
      label: 'Offensive Success Rate',
      category: 'efficiency',
      higherIsBetter: true,
      unit: '%',
      getRawVal: (k) => parseFloat(TEAMS[k].offSucc),
      getFormattedVal: (k) => TEAMS[k].offSucc,
      description: 'Percentage of offensive snaps generating positive expected points equity'
    },
    {
      key: 'defSucc',
      label: 'Defensive Success Rate Allowed',
      category: 'efficiency',
      higherIsBetter: false,
      unit: '%',
      getRawVal: (k) => parseFloat(TEAMS[k].defSucc),
      getFormattedVal: (k) => TEAMS[k].defSucc,
      description: 'Percentage of opponent snaps generating positive EPA (lower is elite)'
    },
    {
      key: 'netZ',
      label: 'Adjusted Net Efficiency Z-Score',
      category: 'efficiency',
      higherIsBetter: true,
      unit: 'Z',
      getRawVal: (k) => TEAMS[k].netZ,
      getFormattedVal: (k) => `${TEAMS[k].netZ}`,
      description: 'Standard deviations above the national FBS baseline across both phases'
    },
    {
      key: 'ats',
      label: 'Against-the-Spread (ATS) Win Rate',
      category: 'market',
      higherIsBetter: true,
      unit: '%',
      getRawVal: (k) => TEAMS[k].ats,
      getFormattedVal: (k) => `${TEAMS[k].ats}%`,
      description: 'Percentage of games covering Vegas sportsbooks closing point spreads'
    },
    {
      key: 'cover',
      label: 'Average Cover Margin',
      category: 'market',
      higherIsBetter: true,
      unit: 'pts',
      getRawVal: (k) => parseFloat(TEAMS[k].cover),
      getFormattedVal: (k) => `${TEAMS[k].cover}`,
      description: 'Average points by which the team surpassed the closing betting spread'
    },
    {
      key: 'toMargin',
      label: 'Turnover Margin / Game',
      category: 'market',
      higherIsBetter: true,
      unit: 'pts',
      getRawVal: (k) => parseFloat(TEAMS[k].toMargin),
      getFormattedVal: (k) => TEAMS[k].toMargin,
      description: 'Average net takeaways minus giveaways per contest'
    },
    {
      key: 'top25Wins',
      label: 'Wins vs. Final AP Top 25',
      category: 'resume',
      higherIsBetter: true,
      getRawVal: (k) => TEAMS[k].top25Wins,
      getFormattedVal: (k) => `${TEAMS[k].top25Wins}`,
      description: 'Total victories over teams finishing in the final AP Top 25 poll'
    },
    {
      key: 'sosRank',
      label: 'Strength of Schedule (SOS Rank)',
      category: 'resume',
      higherIsBetter: false,
      unit: 'rank',
      getRawVal: (k) => TEAMS[k].sosRank,
      getFormattedVal: (k) => `#${TEAMS[k].sosRank}`,
      description: 'Opponent difficulty index (lower ranking signifies a tougher schedule)'
    }
  ];

  const filteredRows = tableCategory === 'all'
    ? TABLE_ROWS
    : TABLE_ROWS.filter((r) => r.category === tableCategory);

  // Helper to determine which team is the best among the CURRENTLY SELECTED teams for each row
  const getLeaderKey = (row: TableRowDef): TeamKey | null => {
    if (selectedTeams.length === 0) return null;
    let bestKey = selectedTeams[0];
    let bestVal = row.getRawVal(bestKey);

    for (let i = 1; i < selectedTeams.length; i++) {
      const candidateKey = selectedTeams[i];
      const candidateVal = row.getRawVal(candidateKey);
      if (row.higherIsBetter ? candidateVal > bestVal : candidateVal < bestVal) {
        bestKey = candidateKey;
        bestVal = candidateVal;
      }
    }
    return bestKey;
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-800 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-950/80 px-3 py-1 rounded-md border border-red-900/50 inline-flex items-center gap-1.5">
            <Swords className="w-3.5 h-3.5 text-red-400" />
            Multi-Team Comparison Matrix
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight mt-2">
            Comparing All 5 Championship Titans Together
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Simultaneously evaluate Indiana 2025 alongside Alabama 2020, LSU 2019, Georgia 2022, and Michigan 2023 with custom team toggles.
          </p>
        </div>

        {/* Status Indicator */}
        <div className="bg-zinc-950 px-3.5 py-2 rounded-xl border border-zinc-800 text-xs flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-zinc-400 font-medium">Comparing:</span>
          <span className="font-extrabold text-white font-mono">
            {selectedTeams.length} of {allTeamKeys.length} Teams Active
          </span>
        </div>
      </div>

      {/* MULTI-SELECT TEAM FILTER CONTROL PANEL */}
      <div className="bg-zinc-950/90 border border-zinc-800/90 rounded-2xl p-5 space-y-4 shadow-inner">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-red-400" />
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-200">
              Multi-Select Team Filters:
            </h3>
            <span className="text-xs text-zinc-500 hidden sm:inline">
              (Toggle specific champions on/off to isolate matchups)
            </span>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mr-1">
              Presets:
            </span>
            <button
              onClick={selectAll}
              className={`px-2.5 py-1 rounded text-[11px] font-bold transition cursor-pointer ${
                selectedTeams.length === 5
                  ? 'bg-red-950 text-red-300 border border-red-800'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              All 5
            </button>
            <button
              onClick={selectSecOnly}
              className="px-2.5 py-1 rounded text-[11px] font-bold bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800 transition cursor-pointer"
            >
              IU vs SEC (3)
            </button>
            <button
              onClick={selectBigTenOnly}
              className="px-2.5 py-1 rounded text-[11px] font-bold bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800 transition cursor-pointer"
            >
              Big Ten (IU vs UM)
            </button>
            <button
              onClick={selectOffenseTitans}
              className="px-2.5 py-1 rounded text-[11px] font-bold bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800 transition cursor-pointer"
            >
              Offensive Heavy
            </button>
            <button
              onClick={selectDefenseTitans}
              className="px-2.5 py-1 rounded text-[11px] font-bold bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800 transition cursor-pointer"
            >
              Defensive Locks
            </button>
          </div>
        </div>

        {/* Team Multi-Select Toggle Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {allTeamKeys.map((teamKey) => {
            const team = TEAMS[teamKey];
            const isSelected = selectedTeams.includes(teamKey);
            const isIndiana = teamKey === 'indiana';

            return (
              <button
                key={teamKey}
                onClick={() => toggleTeam(teamKey)}
                id={`toggle-team-${teamKey}`}
                className={`p-3 rounded-xl text-left border transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? isIndiana
                      ? 'bg-red-950/60 border-red-500 shadow-md shadow-red-950/40 text-white ring-1 ring-red-500'
                      : 'bg-zinc-900 border-zinc-600 shadow-md text-white'
                    : 'bg-zinc-950/40 border-zinc-800/80 text-zinc-500 opacity-60 hover:opacity-100 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span
                    className="text-[10px] font-mono px-1.5 py-0.5 rounded font-bold uppercase"
                    style={{
                      backgroundColor: isSelected ? `${team.primaryColor}30` : '#27272a',
                      color: isSelected ? (teamKey === 'michigan' ? '#38bdf8' : teamKey === 'lsu' ? '#c084fc' : '#f87171') : '#71717a'
                    }}
                  >
                    {team.year}
                  </span>
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center transition ${
                      isSelected
                        ? isIndiana
                          ? 'bg-red-600 text-white'
                          : 'bg-zinc-700 text-white'
                        : 'border border-zinc-700 text-transparent'
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                </div>

                <div className="mt-1">
                  <div className="text-xs sm:text-sm font-black truncate">
                    {team.name}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-400 mt-0.5 flex items-center justify-between">
                    <span>{team.record}</span>
                    <span className="opacity-80">{isSelected ? 'Active' : 'Hidden'}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {selectedTeams.length < 5 && (
          <div className="flex items-center justify-between pt-1 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              Comparison filtered: showing {selectedTeams.length} teams.
            </span>
            <button
              onClick={selectAll}
              className="text-red-400 hover:text-red-300 font-bold underline transition flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Reset all 5 teams
            </button>
          </div>
        )}
      </div>

      {/* METRIC VISUALIZATION CHART SECTION */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">
              Interactive Metric Bar Chart:
            </h3>
            <span className="text-xs text-zinc-500 font-mono">
              ({currentCfg.label})
            </span>
          </div>

          {/* Metric Selector Buttons */}
          <div className="flex flex-wrap gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
            {(Object.keys(metricConfigs) as All5MetricKey[]).map((mKey) => {
              const isSelected = activeMetric === mKey;
              return (
                <button
                  key={mKey}
                  onClick={() => setActiveMetric(mKey)}
                  id={`btn-metric-${mKey}`}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-red-700 text-white shadow'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                  }`}
                >
                  {metricConfigs[mKey].icon}
                  <span>{metricConfigs[mKey].label.split('(')[0].trim()}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Bar Chart Canvas */}
          <div className="lg:col-span-8 bg-zinc-950 p-5 rounded-2xl border border-zinc-800 flex flex-col" style={{ minHeight: '380px' }}>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-zinc-400">
                Plotting {selectedTeams.length} Filtered Champions
              </span>
              <span className="text-[11px] text-red-400 font-mono bg-red-950/60 px-2 py-0.5 rounded border border-red-900/60">
                Indiana in Crimson
              </span>
            </div>

            <div className="flex-1 relative" style={{ minHeight: '300px' }}>
              <canvas ref={canvasRef}></canvas>
            </div>
          </div>

          {/* Key Insights Panel */}
          <div className="lg:col-span-4 bg-zinc-950 p-5 rounded-2xl border border-zinc-800 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs uppercase font-extrabold text-red-400 tracking-wider">
                Filtered Subset Analysis
              </span>
              <h4 className="text-base font-black text-white mt-1">
                Comparative Hierarchy
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed mt-2">
                Evaluating {selectedTeams.length} selected champions across <strong className="text-white">{currentCfg.label}</strong>. Indiana 2025 maintains the modern benchmark in scoring margin (+29.9), defensive EPA (-0.18), and betting market dominance (+9.2 cover).
              </p>
            </div>

            <div className="space-y-2 pt-3 border-t border-zinc-800/80 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-zinc-900">
                <span className="text-zinc-400">Active Metric:</span>
                <span className="font-bold text-zinc-200">{currentCfg.label.split('(')[0].trim()}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-zinc-900">
                <span className="text-zinc-400">Indiana 2025 Value:</span>
                <span className="font-bold text-red-400 font-mono">
                  {currentCfg.getVal('indiana')} {currentCfg.unit}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-zinc-900">
                <span className="text-zinc-400">Active Subset Leader:</span>
                <span className="font-bold text-emerald-400">
                  {(() => {
                    let bestKey = selectedTeams[0];
                    let bestVal = currentCfg.getVal(bestKey);
                    selectedTeams.forEach((k) => {
                      const v = currentCfg.getVal(k);
                      if (currentCfg.higherIsBetter ? v > bestVal : v < bestVal) {
                        bestKey = k;
                        bestVal = v;
                      }
                    });
                    return `${TEAMS[bestKey].name} (${bestVal} ${currentCfg.unit})`;
                  })()}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-zinc-400">Teams Compared:</span>
                <span className="font-bold text-zinc-300 font-mono">{selectedTeams.length} / 5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DEDICATED INTERACTIVE COMPARISON TABLE */}
      <div className="space-y-4 pt-4 border-t border-zinc-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                Side-by-Side Comparison Table
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-800 text-zinc-300">
                {selectedTeams.length} Columns Active
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Best-in-category metric for each row among active teams is marked with{' '}
              <Crown className="w-3 h-3 inline text-amber-400" />.
            </p>
          </div>

          {/* Table Category Filter */}
          <div className="flex flex-wrap items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
            {[
              { id: 'all', label: 'All Metrics' },
              { id: 'scoring', label: 'Scoring' },
              { id: 'efficiency', label: 'Efficiency (EPA)' },
              { id: 'market', label: 'Market & Spread' },
              { id: 'resume', label: 'Schedule Résumé' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setTableCategory(cat.id as any)}
                className={`px-2.5 py-1 rounded text-xs font-bold transition cursor-pointer ${
                  tableCategory === cat.id
                    ? 'bg-red-900/80 text-white border border-red-700'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* The Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-zinc-800 shadow-2xl bg-zinc-950/80">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950 text-zinc-400 uppercase tracking-wider text-[11px]">
                <th className="py-4 px-4 font-extrabold min-w-[220px]">
                  Metric & Description
                </th>
                {selectedTeams.map((teamKey) => {
                  const team = TEAMS[teamKey];
                  const isIndiana = teamKey === 'indiana';

                  return (
                    <th
                      key={teamKey}
                      className={`py-4 px-4 font-black min-w-[150px] transition ${
                        isIndiana ? 'bg-red-950/30 text-red-400 border-x border-red-900/30' : 'text-zinc-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs sm:text-sm font-black text-white truncate">
                            {team.name}
                          </div>
                          <div className="text-[10px] font-mono text-zinc-400 font-normal">
                            {team.record} ({team.year})
                          </div>
                        </div>
                        {selectedTeams.length > 1 && (
                          <button
                            onClick={() => toggleTeam(teamKey)}
                            className="text-zinc-500 hover:text-red-400 p-1 rounded transition cursor-pointer"
                            title={`Remove ${team.name} from comparison`}
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filteredRows.map((row) => {
                const leaderKey = getLeaderKey(row);

                return (
                  <tr key={row.key} className="hover:bg-zinc-900/50 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-xs sm:text-sm">
                        {row.label}
                      </div>
                      <div className="text-[10px] text-zinc-400 leading-tight mt-0.5">
                        {row.description}
                      </div>
                    </td>

                    {selectedTeams.map((teamKey) => {
                      const isLeader = leaderKey === teamKey;
                      const isIndiana = teamKey === 'indiana';
                      const formattedVal = row.getFormattedVal(teamKey);

                      return (
                        <td
                          key={teamKey}
                          className={`py-3.5 px-4 font-mono font-bold transition ${
                            isIndiana ? 'bg-red-950/20 border-x border-red-900/20' : ''
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs sm:text-sm ${
                                isLeader
                                  ? isIndiana
                                    ? 'text-red-400 font-black'
                                    : 'text-emerald-400 font-black'
                                  : 'text-zinc-300'
                              }`}
                            >
                              {formattedVal}
                            </span>
                            {isLeader && (
                              <span
                                className="inline-flex items-center px-1.5 py-0.2 rounded text-[9px] font-extrabold uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60"
                                title="Leader among active teams"
                              >
                                <Crown className="w-2.5 h-2.5 mr-0.5" /> Top
                              </span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Overview Cards for Active Teams + Re-add Chips */}
      <div className="space-y-3 pt-4 border-t border-zinc-800">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Active Championship Cards ({selectedTeams.length}):
          </span>
          {selectedTeams.length < 5 && (
            <span className="text-xs text-zinc-500">
              Click a hidden team below to re-add to comparison
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {selectedTeams.map((teamKey) => {
            const team = TEAMS[teamKey];
            const isIndiana = teamKey === 'indiana';

            return (
              <div
                key={teamKey}
                className={`p-4 rounded-xl border text-center relative overflow-hidden transition ${
                  isIndiana
                    ? 'bg-red-950/40 border-red-800/60 shadow-lg shadow-red-950/30'
                    : 'bg-zinc-950 border-zinc-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded text-zinc-400 bg-zinc-900 border border-zinc-800">
                    {team.year}
                  </span>
                  {selectedTeams.length > 1 && (
                    <button
                      onClick={() => toggleTeam(teamKey)}
                      className="text-zinc-500 hover:text-red-400 p-0.5 cursor-pointer"
                      title="Hide from matrix"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <span className={`text-xs font-bold block ${isIndiana ? 'text-red-400' : 'text-zinc-200'}`}>
                  {team.name}
                </span>
                <span className="text-xl font-black text-white mt-1 block">
                  {team.record}
                </span>
                <span className="text-[10px] text-zinc-400 block mt-1">
                  +{team.margin} Margin • {team.ats}% ATS
                </span>
              </div>
            );
          })}

          {/* Placeholders for hidden teams */}
          {allTeamKeys
            .filter((k) => !selectedTeams.includes(k))
            .map((hiddenKey) => {
              const team = TEAMS[hiddenKey];
              return (
                <button
                  key={hiddenKey}
                  onClick={() => toggleTeam(hiddenKey)}
                  className="p-4 rounded-xl border border-dashed border-zinc-800 hover:border-zinc-600 bg-zinc-950/30 hover:bg-zinc-900/50 text-center flex flex-col items-center justify-center space-y-1 transition cursor-pointer group"
                >
                  <Plus className="w-4 h-4 text-zinc-500 group-hover:text-white transition" />
                  <span className="text-xs font-bold text-zinc-400 group-hover:text-white">
                    + Add {team.name}
                  </span>
                  <span className="text-[10px] text-zinc-600 font-mono">
                    {team.record} ({team.year})
                  </span>
                </button>
              );
            })}
        </div>
      </div>

      {/* Category Leaders Takeaways */}
      <KeyTakeaways
        title="All 5 Teams Matrix: Category Leaders Identified"
        subtitle="Side-by-side comparison reveals distinct category leaders across the modern champions"
        accentColor="purple"
        items={[
          {
            title: 'Offensive Output Leader',
            description: 'Alabama 2020 leads all champions in raw scoring explosiveness at 48.5 PPG.',
            badge: 'Alabama 2020 (48.5 PPG)'
          },
          {
            title: 'Defensive Lockdown Leader',
            description: 'Michigan 2023 holds the premier scoring defense crown, conceding just 10.4 PAPG.',
            badge: 'Michigan 2023 (10.4 PAPG)'
          },
          {
            title: 'Scoring Differential Leader',
            description: 'Indiana 2025 generates an unmatched +29.9 scoring margin per contest across 16 games.',
            badge: 'Indiana 2025 (+29.9 Margin)'
          },
          {
            title: 'Market Cover Leader',
            description: 'Indiana 2025 dominates the betting market with a 75.0% ATS win rate and +9.2 cover margin.',
            badge: 'Indiana 2025 (75.0% ATS)'
          }
        ]}
      />
    </div>
  );
};
