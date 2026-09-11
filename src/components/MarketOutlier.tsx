import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import { TEAMS, MARKET_PROFILES } from '../data/championshipData';
import { TeamKey } from '../types';
import { ensureChartRegistered, safeCreateChart } from '../utils/chartSetup';
import {
  TrendingUp,
  DollarSign,
  AlertCircle,
  Award,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ShieldAlert,
  Layers,
  BarChart3
} from 'lucide-react';
import { KeyTakeaways } from './KeyTakeaways';

export const MarketOutlier: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<TeamKey>('indiana');
  const [viewMode, setViewMode] = useState<'quadrant' | 'bars' | 'curve' | 'ledger'>('quadrant');
  const [activeMetric, setActiveMetric] = useState<'ats' | 'cover' | 'value'>('ats');

  const chartCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    ensureChartRegistered();
  }, []);

  const teamKeys: TeamKey[] = ['indiana', 'alabama', 'georgia', 'michigan', 'lsu'];
  const currentProfile = MARKET_PROFILES[selectedTeam];
  const selectedTeamData = TEAMS[selectedTeam];

  // Render Charts based on viewMode
  useEffect(() => {
    if (!chartCanvasRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }

    if (viewMode === 'quadrant') {
      // 2-axis Market Performance Quadrant: ATS Win Rate vs Avg Cover Margin
      const scatterPoints = teamKeys.map((k) => ({
        x: MARKET_PROFILES[k].atsWinRate,
        y: MARKET_PROFILES[k].avgCoverMargin,
        key: k,
        label: TEAMS[k].name,
        color: k === 'indiana' ? '#dc2626' : TEAMS[k].primaryColor
      }));

      chartInstanceRef.current = safeCreateChart(chartCanvasRef.current, {
        type: 'scatter',
        data: {
          datasets: [
            {
              label: 'Championship Teams',
              data: scatterPoints.map((p) => ({ x: p.x, y: p.y })),
              backgroundColor: scatterPoints.map((p) =>
                p.key === selectedTeam ? '#ef4444' : p.color
              ),
              borderColor: scatterPoints.map((p) =>
                p.key === selectedTeam ? '#ffffff' : 'transparent'
              ),
              borderWidth: 2,
              pointRadius: scatterPoints.map((p) => (p.key === selectedTeam ? 14 : 9)),
              pointHoverRadius: 16
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Against The Spread (ATS) Win Rate (%)',
                color: '#d4d4d8',
                font: { weight: 'bold', size: 12 }
              },
              grid: { color: 'rgba(255, 255, 255, 0.07)' },
              ticks: {
                color: '#a1a1aa',
                callback: (val) => `${val}%`
              },
              min: 48,
              max: 80
            },
            y: {
              title: {
                display: true,
                text: 'Average Cover Margin (Points Over Spread)',
                color: '#d4d4d8',
                font: { weight: 'bold', size: 12 }
              },
              grid: { color: 'rgba(255, 255, 255, 0.07)' },
              ticks: {
                color: '#a1a1aa',
                callback: (val) => `+${val} pts`
              },
              min: 0,
              max: 11
            }
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => {
                  const p = scatterPoints[ctx.dataIndex];
                  return `${p.label}: ATS ${p.x}%, Avg Cover: +${p.y} pts`;
                }
              }
            }
          }
        }
      });
    } else if (viewMode === 'bars') {
      // Comparative Bar Chart for ATS / Cover / Value Game
      let labels: string[] = [];
      let dataVals: number[] = [];
      let valSuffix = '';

      if (activeMetric === 'ats') {
        labels = ['Indiana (2025)', 'Alabama (2020)', 'Georgia (2022)', 'Michigan (2023)', 'LSU (2019)'];
        dataVals = [75.0, 61.5, 60.0, 53.3, 53.3];
        valSuffix = '%';
      } else if (activeMetric === 'cover') {
        labels = ['Indiana (2025)', 'Michigan (2023)', 'Georgia (2022)', 'Alabama (2020)', 'LSU (2019)'];
        dataVals = [9.2, 4.8, 4.4, 4.1, 1.8];
        valSuffix = ' pts';
      } else {
        labels = ['Indiana (2025)', 'Georgia (2022)', 'Alabama (2020)', 'LSU (2019)', 'Michigan (2023)'];
        dataVals = [87.5, 66.7, 62.5, 57.1, 50.0];
        valSuffix = '%';
      }

      chartInstanceRef.current = safeCreateChart(chartCanvasRef.current, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              data: dataVals,
              backgroundColor: labels.map((l) => (l.includes('Indiana') ? '#dc2626' : '#52525b')),
              borderColor: labels.map((l) => (l.includes('Indiana') ? '#ef4444' : '#71717a')),
              borderWidth: 1,
              borderRadius: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#d4d4d8', font: { weight: 'bold', size: 11 } }
            },
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(255, 255, 255, 0.07)' },
              ticks: {
                color: '#a1a1aa',
                callback: (v) => `${v}${valSuffix}`
              }
            }
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => `${ctx.label}: ${ctx.raw}${valSuffix}`
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [viewMode, selectedTeam, activeMetric]);

  return (
    <div className="space-y-8">
      {/* Narrative Header */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-amber-950/40 border border-amber-900/60 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-60 h-60 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-3 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-300 bg-amber-950/80 px-3 py-1 rounded-md border border-amber-800/60 inline-flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-amber-400" />
              Narrative Theme 3
            </span>
            <span className="text-xs text-zinc-400 font-semibold">
              The Market Outlier
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Did Expectations Underestimate Them?
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Explores how well the betting market anticipated each team's dominance. While historical powerhouses like Alabama and Georgia were priced as prohibitive favorites from day one,{' '}
            <span className="text-white font-bold">Indiana 2025</span> was not only dominant on the field but systematically broke sportsbooks—boasting a{' '}
            <span className="text-red-400 font-black">75.0% ATS win rate</span>, a{' '}
            <span className="text-amber-400 font-black">+9.2 average cover margin</span>, and an{' '}
            <span className="text-white font-bold">87.5% value-game win rate</span>.
          </p>
        </div>

        {/* 4 Core Market KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-zinc-800/80">
          <div className="bg-zinc-950/80 p-4 rounded-xl border border-zinc-800/90 shadow-inner">
            <span className="text-[11px] text-zinc-400 uppercase font-semibold block">ATS Win Rate</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-black text-red-500">75.0%</span>
              <span className="text-xs font-mono text-zinc-400">12-4 ATS</span>
            </div>
            <span className="text-[10px] text-zinc-500 mt-1 block">#1 among modern champions (+13.5% vs #2)</span>
          </div>

          <div className="bg-zinc-950/80 p-4 rounded-xl border border-zinc-800/90 shadow-inner">
            <span className="text-[11px] text-zinc-400 uppercase font-semibold block">Avg Cover Margin</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-black text-amber-400">+9.2</span>
              <span className="text-xs text-zinc-400">pts / game</span>
            </div>
            <span className="text-[10px] text-zinc-500 mt-1 block">Surpassed closing spread by almost 10 pts</span>
          </div>

          <div className="bg-zinc-950/80 p-4 rounded-xl border border-zinc-800/90 shadow-inner">
            <span className="text-[11px] text-zinc-400 uppercase font-semibold block">Value Game Win Rate</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400">87.5%</span>
              <span className="text-xs font-mono text-zinc-400">7-1 record</span>
            </div>
            <span className="text-[10px] text-zinc-500 mt-1 block">In spreads ≤14 pts or as an underdog</span>
          </div>

          <div className="bg-zinc-950/80 p-4 rounded-xl border border-zinc-800/90 shadow-inner">
            <span className="text-[11px] text-zinc-400 uppercase font-semibold block">Market Inefficiency Gap</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-black text-white">+147.2</span>
              <span className="text-xs text-zinc-400">net cover pts</span>
            </div>
            <span className="text-[10px] text-zinc-500 mt-1 block">Cumulative points covered over 16 contests</span>
          </div>
        </div>
      </div>

      {/* Key Takeaways Section */}
      <KeyTakeaways
        title="The Market Outlier: Key Takeaways"
        subtitle="Exploring betting market expectations vs reality and persistent line inefficiency"
        accentColor="amber"
        items={[
          {
            title: 'Systematic Market Inefficiency',
            description: "Vegas lines persistently lagged Indiana's on-field dominance, resulting in a 75.0% ATS win rate and +9.2 average cover margin.",
            badge: '75.0% ATS'
          },
          {
            title: 'Value Game Execution',
            description: 'Indiana posted an 87.5% ATS win rate (7-1) in high-leverage games with tight spreads (≤14 pts) or when priced as underdogs.',
            badge: '87.5% in Value Games'
          },
          {
            title: 'Postseason Resilience',
            description: 'Covered spreads throughout the College Football Playoff gauntlet despite aggressive public-market inflation and double-digit lines.',
            badge: '+147.2 Net Cover Pts'
          }
        ]}
      />

      {/* Main Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive Chart Area (7 Cols) */}
        <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-4">
            <div>
              <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-amber-400" />
                Market Evaluation Engine
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Inspect market efficiency, spread coverage, and Vegas adjustments
              </p>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
              <button
                onClick={() => setViewMode('quadrant')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  viewMode === 'quadrant'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Quadrant Scatter
              </button>
              <button
                onClick={() => setViewMode('bars')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  viewMode === 'bars'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Metric Bars
              </button>
              <button
                onClick={() => setViewMode('curve')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  viewMode === 'curve'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Correction Curve
              </button>
            </div>
          </div>

          {/* Sub-toggles when bars are selected */}
          {viewMode === 'bars' && (
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-zinc-400 font-semibold">Compare:</span>
              <button
                onClick={() => setActiveMetric('ats')}
                className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                  activeMetric === 'ats'
                    ? 'bg-red-950 text-red-300 border border-red-800'
                    : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                ATS Win Rate %
              </button>
              <button
                onClick={() => setActiveMetric('cover')}
                className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                  activeMetric === 'cover'
                    ? 'bg-red-950 text-red-300 border border-red-800'
                    : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Avg Cover Margin (pts)
              </button>
              <button
                onClick={() => setActiveMetric('value')}
                className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                  activeMetric === 'value'
                    ? 'bg-red-950 text-red-300 border border-red-800'
                    : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Value Game Rate %
              </button>
            </div>
          )}

          {/* Visualization Canvas or Timeline */}
          {viewMode !== 'curve' ? (
            <div className="relative" style={{ height: '360px' }}>
              <canvas ref={chartCanvasRef}></canvas>
            </div>
          ) : (
            <div className="space-y-4 py-2">
              <div className="p-4 bg-zinc-950 rounded-xl border border-amber-900/40">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wide block">
                  The Vegas Learning Curve & Line Adjustment Progression
                </span>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  How betting syndicates adjusted spreads for Indiana 2025 across the 16-game campaign:
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-950 border border-red-700 flex items-center justify-center font-mono font-bold text-xs text-red-400 flex-shrink-0">
                    W1-5
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">Phase 1: The Brand Bias Anchor</h4>
                      <span className="text-[10px] bg-red-950 text-red-400 px-2 py-0.5 rounded font-mono">
                        Avg Cover: +21.4 pts
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">
                      Oddsmakers priced Indiana like previous seasons (modest 3-to-10 point favorites). Indiana blew out early foes by an average of 42.6 points, crushing spreads by over 3 touchdowns.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-950 border border-amber-700 flex items-center justify-center font-mono font-bold text-xs text-amber-400 flex-shrink-0">
                    W6-12
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">Phase 2: Reluctant Market Inflation</h4>
                      <span className="text-[10px] bg-amber-950 text-amber-400 px-2 py-0.5 rounded font-mono">
                        Avg Cover: +8.5 pts
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">
                      Lines expanded rapidly into high double-digits (-17.5 to -24.5). Even with extreme line premiums, Indiana's 4th-quarter scoring differential and stingy defense held covers steady.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 flex items-center justify-center font-mono font-bold text-xs text-emerald-400 flex-shrink-0">
                    CFP
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">Phase 3: Postseason Crucible Dominance</h4>
                      <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded font-mono">
                        Avg Cover: +17.6 pts
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">
                      In the playoff, public action backed blue bloods (Miami, Ohio State, Georgia). Indiana entered as an underdog vs Ohio State (+3.5) and short favorite vs Georgia (-4.0), winning both comfortably by 17+ points.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quadrant Legend / Explainer */}
          {viewMode === 'quadrant' && (
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-zinc-300">Quadrant Interpretation:</span>
                <span className="text-zinc-500 font-mono">Vegas Baseline: 50.0% ATS / 0.0 Cover</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-zinc-400">
                <div className="p-2 rounded bg-zinc-900 border border-red-900/40">
                  <span className="font-bold text-red-400 block">Top Right (Systematic Alpha):</span>
                  Indiana (75.0% ATS, +9.2 cover) exists alone. The market failed to account for their +29.9 margin.
                </div>
                <div className="p-2 rounded bg-zinc-900 border border-zinc-800">
                  <span className="font-bold text-zinc-300 block">Center / Lower (Market Efficient):</span>
                  LSU (53.3%, +1.8) and Michigan (53.3%, +4.8) were accurately priced by oddsmakers with balanced 50/50 action.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Dossier & Game Ledger (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Select Team Market Dossier:
              </span>
              <span className="text-xs font-mono text-amber-400">
                Rank #{currentProfile.marketInefficiencyRank} Outlier
              </span>
            </div>

            {/* Team Selector Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {teamKeys.map((key) => {
                const isSel = selectedTeam === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedTeam(key)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition cursor-pointer text-center ${
                      isSel
                        ? key === 'indiana'
                          ? 'bg-red-950 border-red-600 text-white shadow-md shadow-red-950/50'
                          : 'bg-zinc-800 border-amber-500 text-white shadow-md shadow-amber-950/40'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {TEAMS[key].name.split(' ')[0]}
                  </button>
                );
              })}
            </div>

            {/* Selected Team Market Card */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-black text-white">{selectedTeamData.name}</h4>
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-amber-300">
                  {currentProfile.atsRecord} ATS ({currentProfile.atsWinRate}%)
                </span>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {currentProfile.summary}
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2 text-xs border-t border-zinc-800">
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase">Cover Margin</span>
                  <span className="font-bold text-zinc-200">+{currentProfile.avgCoverMargin} pts/game</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase">Value Games</span>
                  <span className="font-bold text-zinc-200">{currentProfile.valueGameRecord} ({currentProfile.valueGameWinRate}%)</span>
                </div>
                <div className="col-span-2 pt-1">
                  <span className="text-[10px] text-zinc-500 block uppercase">Market Correction Slope</span>
                  <span className="font-mono text-amber-400 text-xs font-semibold">{currentProfile.marketCorrectionSlope}</span>
                </div>
              </div>
            </div>

            {/* Key Games Market Ledger */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                Marquee Spread Outcomes:
              </span>
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {currentProfile.keyGames.map((g, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between text-xs hover:border-zinc-700 transition"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-zinc-200">{g.opponent}</span>
                        <span className="text-[10px] text-zinc-500 font-mono">({g.stage})</span>
                      </div>
                      <div className="text-[11px] text-zinc-400 mt-0.5 flex items-center gap-2 font-mono">
                        <span>Line: {g.spread}</span>
                        <span>•</span>
                        <span>{g.result}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span
                        className={`font-bold font-mono px-2 py-0.5 rounded text-[11px] inline-flex items-center gap-1 ${
                          g.covered
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
                            : 'bg-red-950 text-red-300 border border-red-800/60'
                        }`}
                      >
                        {g.covered ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {g.coverMargin}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Structural Market Blind Spots Narrative */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
          <h3 className="text-lg font-black text-white tracking-tight uppercase">
            The Three Structural Market Blind Spots: Why Vegas Underestimated Indiana
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800/90 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
              1. Historical Brand Anchoring Bias
            </span>
            <h4 className="text-sm font-bold text-white">The "Indiana Football" Tax</h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Public wagering models and sportsbooks heavily anchor on institutional prestige. While programs like Alabama, Georgia, and Ohio State carried continuous public market premiums (+4 to +7 points of artificial inflation), Indiana's preseason unranked status created a massive discount that lingered through November.
            </p>
          </div>

          <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800/90 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
              2. Zero Garbage-Time Degradation
            </span>
            <h4 className="text-sm font-bold text-white">4th Quarter Relentlessness</h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Most 20+ point favorites allow back-door covers in the final 8 minutes by resting starters and running vanilla cover-3 schemes. Curt Cignetti’s defense conceded just 2.4 fourth-quarter points per game, closing the back door on standard betting variance.
            </p>
          </div>

          <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800/90 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
              3. Situational Leverage Dominance
            </span>
            <h4 className="text-sm font-bold text-white">31.4% Opponent Success Rate</h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Indiana suffocated opponents on standard downs, allowing a microscopic 31.4% success rate. By keeping opponents behind the chains, variance was suppressed—preventing explosive swing plays that usually undermine heavy favorites.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
