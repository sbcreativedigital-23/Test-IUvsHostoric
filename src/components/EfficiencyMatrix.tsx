import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import { ensureChartRegistered, safeCreateChart } from '../utils/chartSetup';
import { Zap, HelpCircle, Check, ArrowRight } from 'lucide-react';
import { KeyTakeaways } from './KeyTakeaways';

export const EfficiencyMatrix: React.FC = () => {
  const epaCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const zCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const epaChartInstanceRef = useRef<Chart | null>(null);
  const zChartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    ensureChartRegistered();
  }, []);

  useEffect(() => {
    if (!epaCanvasRef.current || !zCanvasRef.current) return;

    if (epaChartInstanceRef.current) {
      epaChartInstanceRef.current.destroy();
      epaChartInstanceRef.current = null;
    }
    if (zChartInstanceRef.current) {
      zChartInstanceRef.current.destroy();
      zChartInstanceRef.current = null;
    }

    // Chart 1: Offensive vs Defensive EPA
    epaChartInstanceRef.current = safeCreateChart(epaCanvasRef.current, {
      type: 'bar',
      data: {
        labels: ['Indiana 2025', 'Alabama 2020', 'LSU 2019', 'Georgia 2022', 'Michigan 2023'],
        datasets: [
          {
            label: 'Offensive EPA / Play (+)',
            data: [0.34, 0.41, 0.38, 0.31, 0.24],
            backgroundColor: '#dc2626',
            borderRadius: 4,
            borderColor: '#ef4444',
            borderWidth: 1
          },
          {
            label: 'Defensive EPA Allowed Inverted (Higher = Stingier)',
            data: [0.18, 0.12, 0.09, 0.13, 0.14],
            backgroundColor: '#3f3f46',
            borderRadius: 4,
            borderColor: '#52525b',
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
            ticks: { color: '#a1a1aa' },
            title: { display: true, text: 'EPA Per Snap Value', color: '#71717a' }
          }
        },
        plugins: {
          legend: {
            labels: { color: '#ffffff', font: { weight: 'bold' } }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.dataset.label}: ${ctx.raw} EPA/play`
            }
          }
        }
      }
    });

    // Chart 2: Net Z-Score Ranking
    zChartInstanceRef.current = safeCreateChart(zCanvasRef.current, {
      type: 'bar',
      data: {
        labels: ['Indiana 2025', 'Alabama 2020', 'LSU 2019', 'Michigan 2023', 'Georgia 2022'],
        datasets: [
          {
            label: 'Net Efficiency Z-Score',
            data: [4.63, 4.10, 3.85, 3.36, 3.06],
            backgroundColor: ['#dc2626', '#52525b', '#52525b', '#52525b', '#52525b'],
            borderRadius: 6,
            borderColor: ['#ef4444', '#71717a', '#71717a', '#71717a', '#71717a'],
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
            max: 5.0,
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            ticks: { color: '#a1a1aa' },
            title: { display: true, text: 'Standard Deviations Above Average', color: '#71717a' }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `Net Z-Score: ${ctx.raw} standard deviations`
            }
          }
        }
      }
    });

    return () => {
      if (epaChartInstanceRef.current) {
        epaChartInstanceRef.current.destroy();
        epaChartInstanceRef.current = null;
      }
      if (zChartInstanceRef.current) {
        zChartInstanceRef.current.destroy();
        zChartInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="border-b border-zinc-800 pb-5">
        <span className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-950/80 px-3 py-1 rounded-md border border-red-900/50 inline-flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-red-400" />
          Advanced Metrics
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-2">
          EPA & Advanced Efficiency Breakdown
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-3xl">
          Expected Points Added (EPA) and Success Rates remove game-script noise, garbage-time distortions, and raw tempo pace to measure the true down-by-down execution quality of each championship unit.
        </p>
      </div>

      {/* Key Takeaways Section */}
      <KeyTakeaways
        title="EPA & Efficiency Matrix: Key Insights"
        subtitle="Down-by-down play value and normalized standard deviation impact"
        accentColor="emerald"
        items={[
          {
            title: 'Underlying Execution',
            description: 'Expected Points Added (EPA) eliminates garbage-time noise to prove play-by-play quality.',
            badge: 'Noise-Filtered'
          },
          {
            title: 'Defensive EPA Separation',
            description: "Indiana's -0.18 Defensive EPA per play allowed and 31.4% defensive success rate allowed stand comfortably as the #1 defensive efficiency numbers in the entire dataset.",
            badge: '-0.18 Def EPA / 31.4% Succ (#1)'
          },
          {
            title: 'Efficiency Tie',
            description: 'Indiana (+0.52) essentially ties Alabama 2020 (+0.53) in total Net EPA per play, despite allowing 7.7 fewer points per game.',
            badge: '+0.52 vs +0.53 Net EPA'
          }
        ]}
      />

      {/* Two side-by-side charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 flex flex-col" style={{ minHeight: '360px' }}>
          <div className="mb-3">
            <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
              Offensive vs. Defensive EPA Per Play
            </h3>
            <p className="text-[11px] text-zinc-400">
              Offensive EPA generated vs. opponent defensive EPA suppressed.
            </p>
          </div>
          <div className="flex-1 relative" style={{ minHeight: '260px' }}>
            <canvas ref={epaCanvasRef}></canvas>
          </div>
        </div>

        <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 flex flex-col" style={{ minHeight: '360px' }}>
          <div className="mb-3">
            <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
              Net Efficiency Z-Score Ranking
            </h3>
            <p className="text-[11px] text-zinc-400">
              Normalized two-phase standard deviations above national FBS average.
            </p>
          </div>
          <div className="flex-1 relative" style={{ minHeight: '260px' }}>
            <canvas ref={zCanvasRef}></canvas>
          </div>
        </div>
      </div>

      {/* Advanced Success Rate & EPA Comparison Table */}
      <div className="pt-2">
        <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider mb-3">
          Down-by-Down Situational Efficiency Table
        </h3>
        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 uppercase font-semibold">
                <th className="p-3">Team</th>
                <th className="p-3 text-center">Offensive EPA / Play</th>
                <th className="p-3 text-center">Defensive EPA Allowed</th>
                <th className="p-3 text-center">Net EPA / Play</th>
                <th className="p-3 text-center">Offensive Success Rate</th>
                <th className="p-3 text-center">Defensive Success Rate Allowed</th>
                <th className="p-3 text-center">Net Efficiency Z-Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
              <tr className="bg-red-950/20 hover:bg-red-950/30 transition">
                <td className="p-3 font-bold text-red-400">Indiana (2025)</td>
                <td className="p-3 text-center font-mono">+0.34</td>
                <td className="p-3 text-center font-mono text-emerald-400 font-bold">-0.18 (#1)</td>
                <td className="p-3 text-center font-mono font-bold text-red-400">+0.52</td>
                <td className="p-3 text-center">52.1%</td>
                <td className="p-3 text-center text-emerald-400 font-bold">31.4% (#1)</td>
                <td className="p-3 text-center font-black text-red-400 text-sm">4.63 (#1)</td>
              </tr>
              <tr className="hover:bg-zinc-800/40 transition">
                <td className="p-3 font-semibold text-zinc-300">Alabama (2020)</td>
                <td className="p-3 text-center font-mono text-emerald-400 font-bold">+0.41 (#1)</td>
                <td className="p-3 text-center font-mono">-0.12</td>
                <td className="p-3 text-center font-mono font-bold text-zinc-200">+0.53 (#1)</td>
                <td className="p-3 text-center font-bold text-emerald-400">54.2% (#1)</td>
                <td className="p-3 text-center">34.1%</td>
                <td className="p-3 text-center font-bold text-zinc-300">4.10</td>
              </tr>
              <tr className="hover:bg-zinc-800/40 transition">
                <td className="p-3 font-semibold text-zinc-300">LSU (2019)</td>
                <td className="p-3 text-center font-mono">+0.38</td>
                <td className="p-3 text-center font-mono">-0.09</td>
                <td className="p-3 text-center font-mono font-bold text-zinc-200">+0.47</td>
                <td className="p-3 text-center">53.4%</td>
                <td className="p-3 text-center">33.2%</td>
                <td className="p-3 text-center font-bold text-zinc-300">3.85</td>
              </tr>
              <tr className="hover:bg-zinc-800/40 transition">
                <td className="p-3 font-semibold text-zinc-300">Michigan (2023)</td>
                <td className="p-3 text-center font-mono">+0.24</td>
                <td className="p-3 text-center font-mono">-0.14</td>
                <td className="p-3 text-center font-mono font-bold text-zinc-200">+0.41</td>
                <td className="p-3 text-center">50.8%</td>
                <td className="p-3 text-center">32.4%</td>
                <td className="p-3 text-center font-bold text-zinc-300">3.36</td>
              </tr>
              <tr className="hover:bg-zinc-800/40 transition">
                <td className="p-3 font-semibold text-zinc-300">Georgia (2022)</td>
                <td className="p-3 text-center font-mono">+0.31</td>
                <td className="p-3 text-center font-mono">-0.13</td>
                <td className="p-3 text-center font-mono font-bold text-zinc-200">+0.46</td>
                <td className="p-3 text-center">51.5%</td>
                <td className="p-3 text-center">35.5%</td>
                <td className="p-3 text-center font-bold text-zinc-300">3.06</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytical Methodology Callout */}
      <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 flex items-start gap-3 text-xs text-zinc-400">
        <HelpCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-zinc-200 block">Methodological Note on EPA & Z-Scores:</strong>
          <p className="leading-relaxed">
            EPA (Expected Points Added) calculates the net expected scoring shift generated on every individual down and distance relative to historical down-and-distance outcome curves. Net Efficiency Z-Score aggregates the team’s offensive output standard deviation and defensive suppression standard deviation above the FBS mean for each corresponding season, eliminating cross-era inflation.
          </p>
        </div>
      </div>
    </div>
  );
};
