import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js';
import { TEAMS } from '../data/championshipData';
import { TeamKey } from '../types';
import { ensureChartRegistered, safeCreateChart } from '../utils/chartSetup';
import { Scale, CheckCircle2, AlertTriangle, Trophy, Sliders, Shield, Award } from 'lucide-react';
import { KeyTakeaways } from './KeyTakeaways';

export const ResumeVsMachine: React.FC = () => {
  const [activeHighlight, setActiveHighlight] = useState<TeamKey>('indiana');
  const [xAxisMode, setXAxisMode] = useState<'top25' | 'sos' | 'margin'>('top25');
  const [philosophyWeight, setPhilosophyWeight] = useState<number>(50); // 0 = 100% Resume, 100 = 100% Machine

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    ensureChartRegistered();
  }, []);

  const rawScatterData: {
    key: TeamKey;
    label: string;
    color: string;
    netZ: number;
    top25: number;
    sos: number;
    marginTop25: number;
  }[] = [
    { key: 'indiana', label: 'Indiana (2025)', color: '#dc2626', netZ: 4.63, top25: 4, sos: 28, marginTop25: 15.5 },
    { key: 'alabama', label: 'Alabama (2020)', color: '#991b1b', netZ: 4.10, top25: 5, sos: 10, marginTop25: 25.6 },
    { key: 'lsu', label: 'LSU (2019)', color: '#7c3aed', netZ: 3.85, top25: 7, sos: 14, marginTop25: 24.1 },
    { key: 'georgia', label: 'Georgia (2022)', color: '#b91c1c', netZ: 3.06, top25: 5, sos: 23, marginTop25: 24.8 },
    { key: 'michigan', label: 'Michigan (2023)', color: '#0284c7', netZ: 3.36, top25: 6, sos: 11, marginTop25: 24.2 }
  ];

  // Dynamic X coordinate based on xAxisMode
  const getXCoord = (d: typeof rawScatterData[0]) => {
    if (xAxisMode === 'top25') return d.top25;
    if (xAxisMode === 'sos') return 32 - d.sos; // Inverted so tougher schedule (lower rank number) plots farther to the right
    return d.marginTop25;
  };

  const getXTitle = () => {
    if (xAxisMode === 'top25') return 'Wins vs. Final AP Top 25 (Gauntlet Volume)';
    if (xAxisMode === 'sos') return 'Strength of Schedule Toughness (Higher = Harder Path)';
    return 'Avg Victory Margin vs. Top 25 Teams (Points)';
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }

    const points = rawScatterData.map((d) => ({
      x: getXCoord(d),
      y: d.netZ,
      item: d
    }));

    chartInstanceRef.current = safeCreateChart(canvasRef.current, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Championship Teams',
            data: points.map((p) => ({ x: p.x, y: p.y })),
            backgroundColor: points.map((p) =>
              p.item.key === activeHighlight ? '#ef4444' : p.item.color
            ),
            borderColor: points.map((p) =>
              p.item.key === activeHighlight ? '#ffffff' : 'transparent'
            ),
            borderWidth: 2,
            pointRadius: points.map((p) => (p.item.key === activeHighlight ? 14 : 10)),
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
              text: getXTitle(),
              color: '#d4d4d8',
              font: { weight: 'bold', size: 12 }
            },
            grid: { color: 'rgba(255, 255, 255, 0.07)' },
            ticks: {
              color: '#d4d4d8',
              callback: (val) => {
                if (xAxisMode === 'sos') {
                  const actualSos = 32 - Number(val);
                  return `#${actualSos}`;
                }
                return val;
              }
            }
          },
          y: {
            title: {
              display: true,
              text: 'Adjusted Net Efficiency Z-Score (The Machine)',
              color: '#d4d4d8',
              font: { weight: 'bold', size: 12 }
            },
            grid: { color: 'rgba(255, 255, 255, 0.07)' },
            ticks: { color: '#d4d4d8' },
            min: 2.7,
            max: 5.0
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => {
                const idx = context.dataIndex;
                const d = rawScatterData[idx];
                return `${d.label}: Top-25 Wins: ${d.top25}, Net Z: ${d.netZ}, SOS: #${d.sos}, Margin vs Top 25: +${d.marginTop25}`;
              }
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
  }, [activeHighlight, xAxisMode]);

  // Compute dynamic ranking based on philosophy slider (0 = pure resume, 100 = pure machine)
  const rankedTeams = [...rawScatterData]
    .map((team) => {
      // Machine score: normalized Net Z (3.06 to 4.63) -> 0 to 100
      const machineScore = ((team.netZ - 3.0) / 1.7) * 100;
      // Resume score: composite of Top25 wins (4 to 7) & SOS rank (28 to 10)
      const top25Norm = ((team.top25 - 3) / 4) * 50;
      const sosNorm = ((30 - team.sos) / 20) * 50;
      const resumeScore = top25Norm + sosNorm;

      const weightMachine = philosophyWeight / 100;
      const weightResume = (100 - philosophyWeight) / 100;
      const compositeIndex = machineScore * weightMachine + resumeScore * weightResume;

      return {
        ...team,
        compositeIndex: Math.round(compositeIndex * 10) / 10
      };
    })
    .sort((a, b) => b.compositeIndex - a.compositeIndex);

  const activeTeamData = TEAMS[activeHighlight];

  return (
    <div className="space-y-8">
      {/* Narrative Theme 2 Header */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-blue-950/40 border border-blue-950/80 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-60 h-60 bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-3 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-blue-400 bg-blue-950/80 px-3 py-1 rounded-md border border-blue-900/60 inline-flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-blue-400" />
              Narrative Theme 2
            </span>
            <span className="text-xs text-zinc-400 font-semibold">
              The Résumé vs. The Machine
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Who Proved It Against The Best?
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Addresses the central tension in championship analytics: raw statistical efficiency versus strength of path.{' '}
            <span className="text-red-400 font-bold">Indiana 2025</span> leads the modern era in net efficiency Z-score ({' '}
            <span className="text-white font-extrabold">4.63</span>) and two-way per-snap domination, but{' '}
            <span className="text-purple-300 font-bold">LSU 2019</span> (7 Top-25 wins) and{' '}
            <span className="text-red-300 font-bold">Alabama 2020</span> (all-SEC schedule, SOS #10) navigated significantly tougher top-ranked gauntlets.
          </p>
        </div>

        {/* Quick tension indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 pt-6 border-t border-zinc-800/80">
          <div className="bg-zinc-950/80 p-4 rounded-xl border border-zinc-800">
            <span className="text-[10px] text-zinc-400 uppercase font-bold block">The Machine Leader</span>
            <span className="text-lg font-black text-red-500">Indiana 2025 (4.63 Net Z)</span>
            <span className="text-xs text-zinc-400 block mt-0.5">Highest per-play dominance index of CFP era</span>
          </div>

          <div className="bg-zinc-950/80 p-4 rounded-xl border border-zinc-800">
            <span className="text-[10px] text-zinc-400 uppercase font-bold block">The Top-25 Volume Leader</span>
            <span className="text-lg font-black text-purple-400">LSU 2019 (7 Top-25 Wins)</span>
            <span className="text-xs text-zinc-400 block mt-0.5">Defeated 7 ranked foes by +24.1 margin</span>
          </div>

          <div className="bg-zinc-950/80 p-4 rounded-xl border border-zinc-800 sm:col-span-2 lg:col-span-1">
            <span className="text-[10px] text-zinc-400 uppercase font-bold block">The Schedule Density Leader</span>
            <span className="text-lg font-black text-red-400">Alabama 2020 (SOS #10)</span>
            <span className="text-xs text-zinc-400 block mt-0.5">Played 11 consecutive SEC opponents before CFP</span>
          </div>
        </div>
      </div>

      {/* Key Takeaways Section */}
      <KeyTakeaways
        title="The Résumé vs. The Machine: Key Insights"
        subtitle="Addressing the tension between raw statistical efficiency and strength of schedule"
        accentColor="blue"
        items={[
          {
            title: 'Machine Precision',
            description: 'Indiana leads all five championship squads in Net Efficiency Z-Score (4.63) and Net EPA per play (+0.52), representing top-tier execution on a per-play basis.',
            badge: '4.63 Net Z / +0.52 Net EPA'
          },
          {
            title: 'Battle-Tested Résumé',
            description: "LSU 2019 holds the crown for elite-opponent path strength, boasting 7 Top-25 wins and 4 Top-10 wins compared to Indiana's 4 Top-25 wins.",
            badge: '7 Top-25 / 4 Top-10 Wins'
          },
          {
            title: 'The Central Tension',
            description: 'Solves the core question of whether a user values raw statistical machine dominance (Indiana) or proven strength of schedule resistance (LSU/Alabama).',
            badge: 'Core Philosophical Debate'
          }
        ]}
      />

      {/* Main 2-Axis Scatter & Inspection Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Scatter Chart Area (7 Cols) */}
        <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-zinc-800 pb-4">
            <div>
              <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                2-Axis Efficiency vs. Gauntlet Plot
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Top-right represents the mythical apex: maximal machine efficiency and maximal path difficulty
              </p>
            </div>

            {/* X-Axis Dimension Selector */}
            <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
              <button
                onClick={() => setXAxisMode('top25')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  xAxisMode === 'top25'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Top-25 Wins
              </button>
              <button
                onClick={() => setXAxisMode('sos')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  xAxisMode === 'sos'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                SOS Rank
              </button>
              <button
                onClick={() => setXAxisMode('margin')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  xAxisMode === 'margin'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Margin vs Top 25
              </button>
            </div>
          </div>

          <div className="relative" style={{ height: '360px' }}>
            <canvas ref={canvasRef}></canvas>
          </div>

          {/* Quadrant Legend */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-2.5 rounded bg-zinc-900 border border-red-900/40">
              <span className="font-bold text-red-400 block">Top Left / Center (The Efficiency Juggernaut):</span>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Indiana 2025 posted unmatched net Z-scores (4.63) while navigating 4 Top-25 wins and a #28 SOS.
              </p>
            </div>
            <div className="p-2.5 rounded bg-zinc-900 border border-blue-900/40">
              <span className="font-bold text-blue-400 block">Far Right (The Battle-Tested Gladiators):</span>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                LSU (7 Top-25 wins) and Alabama (SOS #10) traded slight efficiency points for grueling opponent schedules.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Philosophy Slider & Dossier (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Interactive Philosophical Weighing Engine */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                Analytical Philosophy Simulator
              </span>
              <span className="text-xs font-mono text-zinc-400">
                Custom Champion Ranking
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              What matters more to you? Adjust the balance between <strong>The Machine</strong> (per-play net Z-score efficiency) and <strong>The Résumé</strong> (Top-25 gauntlet & SOS) to recalculate the composite rankings:
            </p>

            <div className="space-y-2 pt-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-blue-400">Résumé Heavy ({100 - philosophyWeight}%)</span>
                <span className="text-red-400">Machine Heavy ({philosophyWeight}%)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={philosophyWeight}
                onChange={(e) => setPhilosophyWeight(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
            </div>

            {/* Dynamic Ranking Result */}
            <div className="pt-2 space-y-1.5">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                Ranked by Your Philosophy:
              </span>
              {rankedTeams.map((t, idx) => (
                <div
                  key={t.key}
                  onClick={() => setActiveHighlight(t.key)}
                  className={`p-2.5 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition ${
                    activeHighlight === t.key
                      ? 'bg-zinc-800 border-zinc-600 text-white'
                      : 'bg-zinc-950 border-zinc-800/80 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold font-mono text-[10px] ${
                      idx === 0 ? 'bg-amber-500 text-black' : 'bg-zinc-800 text-zinc-300'
                    }`}>
                      #{idx + 1}
                    </span>
                    <span className="font-bold text-zinc-200">{t.label}</span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-bold text-white">{t.compositeIndex}</span>
                    <span className="text-[10px] text-zinc-500 block">Net Z: {t.netZ}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Team Highlight Dossier */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
              <span className="font-bold text-sm text-white">{activeTeamData.name}</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-950 text-blue-400 border border-blue-900/50">
                SOS Rank #{activeTeamData.sosRank}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">Adjusted Net Z-Score:</span>
                <span className="font-bold text-red-400 font-mono">{activeTeamData.netZ} (CFP Rank #1: Indiana 4.63)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">Wins vs. Final AP Top 25:</span>
                <span className="font-bold text-white font-mono">{activeTeamData.top25Wins} wins</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">Margin vs. Ranked Opponents:</span>
                <span className="font-bold text-white font-mono">{activeTeamData.marginTop25} pts</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-zinc-400">Wins vs. Final AP Top 10:</span>
                <span className="font-bold text-emerald-400 font-mono">{activeTeamData.top10Wins} wins</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gauntlet Comparison Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-blue-400" />
          Comprehensive Résumé & Schedule Gauntlet Ledger
        </h3>

        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 uppercase font-semibold">
                <th className="p-3">Team</th>
                <th className="p-3 text-center">Record</th>
                <th className="p-3 text-center">SOS Rank</th>
                <th className="p-3 text-center">Top 10 Wins</th>
                <th className="p-3 text-center">Top 25 Wins</th>
                <th className="p-3 text-center">Margin vs. Top 25</th>
                <th className="p-3 text-center">Net Efficiency Z</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
              <tr className="bg-red-950/20 hover:bg-red-950/30 transition">
                <td className="p-3 font-bold text-red-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-500" /> Indiana (2025)
                </td>
                <td className="p-3 text-center font-bold">16-0</td>
                <td className="p-3 text-center font-mono text-zinc-300">#28</td>
                <td className="p-3 text-center font-bold text-white">3</td>
                <td className="p-3 text-center font-bold text-white">4</td>
                <td className="p-3 text-center text-red-400 font-bold">+15.5</td>
                <td className="p-3 text-center font-black text-red-400">4.63 (#1)</td>
              </tr>
              <tr className="hover:bg-zinc-800/40 transition">
                <td className="p-3 font-semibold text-zinc-300">Alabama (2020)</td>
                <td className="p-3 text-center font-bold">13-0</td>
                <td className="p-3 text-center font-mono text-emerald-400 font-bold">#10 (#1 in group)</td>
                <td className="p-3 text-center font-bold">3</td>
                <td className="p-3 text-center font-bold">5</td>
                <td className="p-3 text-center font-bold text-zinc-200">+25.6 (#1)</td>
                <td className="p-3 text-center font-bold text-zinc-300">4.10 (#2)</td>
              </tr>
              <tr className="hover:bg-zinc-800/40 transition">
                <td className="p-3 font-semibold text-zinc-300">LSU (2019)</td>
                <td className="p-3 text-center font-bold">15-0</td>
                <td className="p-3 text-center font-mono text-zinc-300">#14</td>
                <td className="p-3 text-center font-bold text-emerald-400">4 (#1 in group)</td>
                <td className="p-3 text-center font-bold text-emerald-400">7 (#1 in group)</td>
                <td className="p-3 text-center font-bold text-zinc-200">+24.1</td>
                <td className="p-3 text-center font-bold text-zinc-300">3.85 (#3)</td>
              </tr>
              <tr className="hover:bg-zinc-800/40 transition">
                <td className="p-3 font-semibold text-zinc-300">Michigan (2023)</td>
                <td className="p-3 text-center font-bold">15-0</td>
                <td className="p-3 text-center font-mono text-zinc-300">#11</td>
                <td className="p-3 text-center font-bold">3</td>
                <td className="p-3 text-center font-bold">6</td>
                <td className="p-3 text-center font-bold text-zinc-200">+24.2</td>
                <td className="p-3 text-center font-bold text-zinc-300">3.36 (#4)</td>
              </tr>
              <tr className="hover:bg-zinc-800/40 transition">
                <td className="p-3 font-semibold text-zinc-300">Georgia (2022)</td>
                <td className="p-3 text-center font-bold">15-0</td>
                <td className="p-3 text-center font-mono text-zinc-300">#23</td>
                <td className="p-3 text-center font-bold">3</td>
                <td className="p-3 text-center font-bold">5</td>
                <td className="p-3 text-center font-bold text-zinc-200">+24.8</td>
                <td className="p-3 text-center font-bold text-zinc-300">3.06 (#5)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
