import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import { TEAMS } from '../data/championshipData';
import { TeamKey, TabId } from '../types';
import { ensureChartRegistered, safeCreateChart } from '../utils/chartSetup';
import { TrendingUp, ShieldCheck, Target, ArrowUpRight, Award, ChevronRight } from 'lucide-react';
import { KeyTakeaways } from './KeyTakeaways';
import { HeadToHeadTakeaways } from './HeadToHeadTakeaways';

interface ExecutiveDashboardProps {
  onNavigateTab: (tab: TabId) => void;
  onSelectTeamForRadar: (team: TeamKey) => void;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  onNavigateTab,
  onSelectTeamForRadar
}) => {
  const [selectedComp, setSelectedComp] = useState<'all5' | TeamKey>('all5');

  const barCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const marketCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const barChartInstanceRef = useRef<Chart | null>(null);
  const marketChartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    ensureChartRegistered();
  }, []);

  const iu = TEAMS.indiana;
  const compTeam = selectedComp === 'all5' ? null : TEAMS[selectedComp];

  // Dynamic stats calculation
  const compStats = compTeam
    ? {
        margin: `+${compTeam.margin}`,
        epa: `+${compTeam.netEpa}`,
        papg: `${compTeam.papg}`,
        ats: `${compTeam.ats}%`,
        label: compTeam.name
      }
    : {
        margin: 'Avg +27.6',
        epa: 'Avg +0.46',
        papg: '17.3',
        ats: '58.8%',
        label: 'Historical Avg'
      };

  // Re-draw charts when comparison selection changes
  useEffect(() => {
    if (!barCanvasRef.current || !marketCanvasRef.current) return;

    if (barChartInstanceRef.current) {
      barChartInstanceRef.current.destroy();
      barChartInstanceRef.current = null;
    }
    if (marketChartInstanceRef.current) {
      marketChartInstanceRef.current.destroy();
      marketChartInstanceRef.current = null;
    }

    if (selectedComp === 'all5') {
      // All 5 teams scoring margin
      barChartInstanceRef.current = safeCreateChart(barCanvasRef.current, {
        type: 'bar',
        data: {
          labels: ['Indiana (2025)', 'Alabama (2020)', 'LSU (2019)', 'Georgia (2022)', 'Michigan (2023)'],
          datasets: [
            {
              label: 'Scoring Margin',
              data: [29.9, 29.1, 26.5, 26.8, 25.5],
              backgroundColor: ['#dc2626', '#52525b', '#52525b', '#52525b', '#52525b'],
              borderRadius: 6,
              borderWidth: 1,
              borderColor: ['#ef4444', '#71717a', '#71717a', '#71717a', '#71717a']
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#d4d4d8', font: { size: 11, weight: 'bold' } }
            },
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(255, 255, 255, 0.06)' },
              ticks: { color: '#a1a1aa' },
              title: { display: true, text: 'Net Scoring Differential (PPG - PAPG)', color: '#71717a' }
            }
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => `Scoring Margin: +${ctx.raw} pts/game`
              }
            }
          }
        }
      });

      // All 5 teams ATS Win Rate
      marketChartInstanceRef.current = safeCreateChart(marketCanvasRef.current, {
        type: 'bar',
        data: {
          labels: ['Indiana (2025)', 'Alabama (2020)', 'Georgia (2022)', 'LSU (2019)', 'Michigan (2023)'],
          datasets: [
            {
              label: 'ATS Win Rate (%)',
              data: [75.0, 61.5, 60.0, 53.3, 53.3],
              backgroundColor: ['#dc2626', '#3f3f46', '#3f3f46', '#3f3f46', '#3f3f46'],
              borderRadius: 6,
              borderWidth: 1,
              borderColor: ['#ef4444', '#52525b', '#52525b', '#52525b', '#52525b']
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#d4d4d8', font: { size: 11, weight: 'bold' } }
            },
            y: {
              beginAtZero: true,
              max: 100,
              grid: { color: 'rgba(255, 255, 255, 0.06)' },
              ticks: {
                color: '#a1a1aa',
                callback: (val) => `${val}%`
              },
              title: { display: true, text: 'Against The Spread (ATS) %', color: '#71717a' }
            }
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => `ATS Cover Rate: ${ctx.raw}%`
              }
            }
          }
        }
      });
    } else {
      // Head to Head 1 vs 1 breakdown
      const target = TEAMS[selectedComp];

      barChartInstanceRef.current = safeCreateChart(barCanvasRef.current, {
        type: 'bar',
        data: {
          labels: ['Points Per Game (PPG)', 'Points Allowed (PAPG)', 'Scoring Margin'],
          datasets: [
            {
              label: 'Indiana (2025)',
              data: [iu.ppg, iu.papg, iu.margin],
              backgroundColor: '#dc2626',
              borderRadius: 6,
              borderColor: '#ef4444',
              borderWidth: 1
            },
            {
              label: target.name,
              data: [target.ppg, target.papg, target.margin],
              backgroundColor: '#52525b',
              borderRadius: 6,
              borderColor: '#71717a',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#d4d4d8', font: { weight: 'bold' } }
            },
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(255, 255, 255, 0.06)' },
              ticks: { color: '#a1a1aa' }
            }
          },
          plugins: {
            legend: {
              labels: { color: '#ffffff', font: { weight: 'bold' } }
            }
          }
        }
      });

      marketChartInstanceRef.current = safeCreateChart(marketCanvasRef.current, {
        type: 'bar',
        data: {
          labels: ['ATS Win Rate (%)', 'Cover Margin (pts)'],
          datasets: [
            {
              label: 'Indiana (2025)',
              data: [iu.ats, parseFloat(iu.cover)],
              backgroundColor: '#dc2626',
              borderRadius: 6,
              borderColor: '#ef4444',
              borderWidth: 1
            },
            {
              label: target.name,
              data: [target.ats, parseFloat(target.cover)],
              backgroundColor: '#52525b',
              borderRadius: 6,
              borderColor: '#71717a',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#d4d4d8', font: { weight: 'bold' } }
            },
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(255, 255, 255, 0.06)' },
              ticks: { color: '#a1a1aa' }
            }
          },
          plugins: {
            legend: {
              labels: { color: '#ffffff', font: { weight: 'bold' } }
            }
          }
        }
      });
    }

    return () => {
      if (barChartInstanceRef.current) {
        barChartInstanceRef.current.destroy();
        barChartInstanceRef.current = null;
      }
      if (marketChartInstanceRef.current) {
        marketChartInstanceRef.current.destroy();
        marketChartInstanceRef.current = null;
      }
    };
  }, [selectedComp]);

  return (
    <div className="space-y-6">
      {/* Top Banner with Analytical Verdict */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-red-950/40 border border-red-950/80 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-red-900/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-950/80 px-3 py-1 rounded-md border border-red-900/50 inline-flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-red-400" />
              Comparative Intelligence Findings
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Indiana 2025: The Modern Efficiency Outlier
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Indiana 2025 combines a lockdown defense allowing only{' '}
              <span className="text-red-400 font-bold">11.7 PAPG</span> with high-efficiency offense, generating an
              extraordinary <span className="text-white font-bold">+29.9 scoring margin</span> and a{' '}
              <span className="text-red-400 font-bold">75.0% ATS win rate</span> that outperforms legendary champions
              like Alabama 2020 and LSU 2019 in net efficiency Z-scores.
            </p>
          </div>

          {/* Comparison Selector buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedComp('all5')}
              id="dash-btn-all5"
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition cursor-pointer shadow ${
                selectedComp === 'all5'
                  ? 'bg-red-700 border-red-600 text-white'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700'
              }`}
            >
              ⚔️ All 5 Teams
            </button>
            <button
              onClick={() => setSelectedComp('alabama')}
              id="dash-btn-alabama"
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition cursor-pointer shadow ${
                selectedComp === 'alabama'
                  ? 'bg-red-700 border-red-600 text-white'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700'
              }`}
            >
              vs. Alabama (2020)
            </button>
            <button
              onClick={() => setSelectedComp('lsu')}
              id="dash-btn-lsu"
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition cursor-pointer shadow ${
                selectedComp === 'lsu'
                  ? 'bg-red-700 border-red-600 text-white'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700'
              }`}
            >
              vs. LSU (2019)
            </button>
            <button
              onClick={() => setSelectedComp('georgia')}
              id="dash-btn-georgia"
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition cursor-pointer shadow ${
                selectedComp === 'georgia'
                  ? 'bg-red-700 border-red-600 text-white'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700'
              }`}
            >
              vs. Georgia (2022)
            </button>
            <button
              onClick={() => setSelectedComp('michigan')}
              id="dash-btn-michigan"
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition cursor-pointer shadow ${
                selectedComp === 'michigan'
                  ? 'bg-red-700 border-red-600 text-white'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700'
              }`}
            >
              vs. Michigan (2023)
            </button>
          </div>
        </div>

        {/* 4 Metric KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-zinc-800/80">
          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800/80 hover:border-red-900/60 transition">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-zinc-400 uppercase font-semibold block">Scoring Margin</span>
              <TrendingUp className="w-4 h-4 text-red-500" />
            </div>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="text-xl sm:text-2xl font-black text-red-500">+29.9</span>
              <span className="text-xs text-zinc-500">vs</span>
              <span className="text-sm sm:text-base font-bold text-zinc-300">{compStats.margin}</span>
            </div>
            <span className="text-[10px] text-zinc-500 mt-1 block">#1 among all champions</span>
          </div>

          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800/80 hover:border-red-900/60 transition">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-zinc-400 uppercase font-semibold block">Net EPA / Play</span>
              <Target className="w-4 h-4 text-red-500" />
            </div>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="text-xl sm:text-2xl font-black text-red-500">+0.52</span>
              <span className="text-xs text-zinc-500">vs</span>
              <span className="text-sm sm:text-base font-bold text-zinc-300">{compStats.epa}</span>
            </div>
            <span className="text-[10px] text-zinc-500 mt-1 block">Elite two-phase execution</span>
          </div>

          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800/80 hover:border-red-900/60 transition">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-zinc-400 uppercase font-semibold block">Points Allowed / Game</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="text-xl sm:text-2xl font-black text-red-500">11.7</span>
              <span className="text-xs text-zinc-500">vs</span>
              <span className="text-sm sm:text-base font-bold text-zinc-300">{compStats.papg}</span>
            </div>
            <span className="text-[10px] text-zinc-500 mt-1 block">Suppresses points by -32% vs avg</span>
          </div>

          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800/80 hover:border-red-900/60 transition">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-zinc-400 uppercase font-semibold block">ATS Win Rate</span>
              <ArrowUpRight className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="text-xl sm:text-2xl font-black text-red-500">75.0%</span>
              <span className="text-xs text-zinc-500">vs</span>
              <span className="text-sm sm:text-base font-bold text-zinc-300">{compStats.ats}</span>
            </div>
            <span className="text-[10px] text-zinc-500 mt-1 block">+9.2 avg cover margin</span>
          </div>
        </div>
      </div>

      {/* Key Takeaways Section */}
      <KeyTakeaways
        title="Executive Dashboard: Key Insights"
        subtitle="Core empirical findings on Indiana 2025 vs. recent undisputed national champions"
        accentColor="red"
        items={[
          {
            title: 'The Hybrid Dominance Outlier',
            description: 'Indiana 2025 breaks traditional championship archetypes by pairing an elite defense allowing only 11.7 PAPG (2nd best) with high-efficiency scoring.',
            badge: '11.7 PAPG (2nd Best)'
          },
          {
            title: 'Superior Scoring Margin',
            description: 'Indiana posts a +29.9 scoring margin, outperforming historical powerhouses like Alabama 2020 (+29.1) and LSU 2019 (+26.5).',
            badge: '+29.9 Margin (#1)'
          },
          {
            title: 'Unmatched Betting Dominance',
            description: 'Indiana covered spreads at an unprecedented 75.0% ATS win rate with an average cover margin of +9.2 points, far surpassing standard historical market performance.',
            badge: '75.0% ATS / +9.2 Cover'
          }
        ]}
      />

      {/* Direct Head-to-Head Takeaways when an individual opponent is selected */}
      {selectedComp !== 'all5' && selectedComp !== 'indiana' ? (
        <HeadToHeadTakeaways opponent={selectedComp} />
      ) : (
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-red-400 font-bold">
              Direct Head-to-Head Comparative Intelligence
            </span>
            <p className="text-xs text-zinc-300">
              Select an individual champion to unlock bespoke head-to-head takeaways and metric divergences against Indiana 2025:
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedComp('alabama')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition cursor-pointer"
            >
              vs. Alabama '20
            </button>
            <button
              onClick={() => setSelectedComp('lsu')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition cursor-pointer"
            >
              vs. LSU '19
            </button>
            <button
              onClick={() => setSelectedComp('georgia')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition cursor-pointer"
            >
              vs. Georgia '22
            </button>
            <button
              onClick={() => setSelectedComp('michigan')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition cursor-pointer"
            >
              vs. Michigan '23
            </button>
          </div>
        </div>
      )}

      {/* Two interactive Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-col" style={{ minHeight: '380px' }}>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
                Scoring Profile & Margin Breakdown
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                {selectedComp === 'all5'
                  ? 'Comparative net scoring differential across all 5 champions'
                  : `Direct offensive output, points allowed, and scoring margin vs. ${compTeam?.name}`}
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('all5')}
              className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              Full matrix <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex-1 relative mt-3" style={{ minHeight: '280px' }}>
            <canvas ref={barCanvasRef}></canvas>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-col" style={{ minHeight: '380px' }}>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
                Market Dominance & Betting Performance
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Against-the-spread (ATS) win rate and spread covering margins
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('master')}
              className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              Master data <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex-1 relative mt-3" style={{ minHeight: '280px' }}>
            <canvas ref={marketCanvasRef}></canvas>
          </div>
        </div>
      </div>

      {/* Three Distinct Narrative Arcs Section */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-400">Three Analytical Narrative Arcs</span>
            <h3 className="text-lg font-black text-white">Framing Modern Championship Greatness</h3>
          </div>
          <span className="text-xs text-zinc-500 font-mono hidden sm:inline-block">Thematic Storytelling Framework</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Arc 1 */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 shadow-lg space-y-3 hover:border-red-900/60 transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-red-400 bg-red-950/80 px-2.5 py-0.5 rounded border border-red-900/50">
                  Theme 1
                </span>
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
              </div>
              <h4 className="text-base font-bold text-white">The Evolution of Dominance</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Examines what an elite national champion looks like. LSU 2019 and Alabama 2020 represent raw offensive explosiveness; Michigan 2023 represents defensive lockdown; Georgia 2022 represents line-of-scrimmage balance; and Indiana 2025 represents a modern hybrid (11.7 PAPG, +29.9 margin).
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('dominance')}
              className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1 pt-2 cursor-pointer"
            >
              Explore Evolution & Radar DNA <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Arc 2 */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 shadow-lg space-y-3 hover:border-blue-900/60 transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-blue-400 bg-blue-950/80 px-2.5 py-0.5 rounded border border-blue-900/50">
                  Theme 2
                </span>
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              </div>
              <h4 className="text-base font-bold text-white">The Résumé vs. The Machine</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Addresses the tension between raw statistical efficiency and strength of path. Indiana 2025 leads in net efficiency Z-score (4.63), but LSU 2019 and Alabama 2020 navigated tougher Top-25/Top-10 slates.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('resume')}
              className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 pt-2 cursor-pointer"
            >
              Inspect 2-Axis Gauntlet Plot <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Arc 3 */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 shadow-lg space-y-3 hover:border-amber-900/60 transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-900/50">
                  Theme 3
                </span>
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              </div>
              <h4 className="text-base font-bold text-white">The Market Outlier</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Explores betting market expectations vs reality. Indiana 2025 was not only dominant on the field but systematically beat spreads, boasting a 75.0% ATS win rate, +9.2 average cover margin, and 87.5% value-game win rate.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('market')}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 pt-2 cursor-pointer"
            >
              Inspect Market Quadrant <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
