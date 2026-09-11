import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import { TEAMS, ARCHETYPES } from '../data/championshipData';
import { TeamKey, ChampionshipArchetype } from '../types';
import { ensureChartRegistered, safeCreateChart } from '../utils/chartSetup';
import { Shield, Flame, Activity, Layers, CheckCircle, Zap, Swords, Target } from 'lucide-react';
import { KeyTakeaways } from './KeyTakeaways';

interface RadarProfilesProps {
  initialSelectedTeam?: TeamKey;
}

export const RadarProfiles: React.FC<RadarProfilesProps> = ({ initialSelectedTeam = 'indiana' }) => {
  const [selectedTeam, setSelectedTeam] = useState<TeamKey>(initialSelectedTeam);
  const [activeArchetype, setActiveArchetype] = useState<ChampionshipArchetype | 'all'>('all');
  const [overlayBenchmark, setOverlayBenchmark] = useState<boolean>(true);
  const [showAllTeams, setShowAllTeams] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    ensureChartRegistered();
  }, []);

  const team = TEAMS[selectedTeam];
  const iu = TEAMS.indiana;

  // Sync selected team when archetype filter changes
  const handleSelectArchetype = (archKey: ChampionshipArchetype | 'all') => {
    setActiveArchetype(archKey);
    if (archKey !== 'all') {
      const arch = ARCHETYPES[archKey];
      setSelectedTeam(arch.teams[0]);
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }

    const datasets = [];

    if (showAllTeams) {
      // Show all 5 teams simultaneously
      (Object.keys(TEAMS) as TeamKey[]).forEach((key) => {
        const t = TEAMS[key];
        const isIU = key === 'indiana';
        datasets.push({
          label: t.name,
          data: t.radar,
          backgroundColor: isIU ? 'rgba(220, 38, 38, 0.25)' : 'rgba(100, 116, 139, 0.1)',
          borderColor: isIU ? '#ef4444' : t.primaryColor,
          pointBackgroundColor: isIU ? '#ef4444' : t.primaryColor,
          pointBorderColor: '#ffffff',
          pointRadius: isIU ? 5 : 3,
          borderWidth: isIU ? 3 : 1.8
        });
      });
    } else {
      // Selected Team
      datasets.push({
        label: team.name,
        data: team.radar,
        backgroundColor: selectedTeam === 'indiana' ? 'rgba(220, 38, 38, 0.35)' : 'rgba(59, 130, 246, 0.35)',
        borderColor: selectedTeam === 'indiana' ? '#ef4444' : '#60a5fa',
        pointBackgroundColor: selectedTeam === 'indiana' ? '#ef4444' : '#60a5fa',
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: selectedTeam === 'indiana' ? '#ef4444' : '#60a5fa',
        pointRadius: 5,
        pointHoverRadius: 8,
        borderWidth: 2.5
      });

      // If overlayBenchmark is enabled and selected team is not indiana, overlay Indiana as red benchmark
      if (overlayBenchmark && selectedTeam !== 'indiana') {
        datasets.push({
          label: 'Indiana (2025) [Benchmark]',
          data: iu.radar,
          backgroundColor: 'rgba(220, 38, 38, 0.15)',
          borderColor: '#dc2626',
          pointBackgroundColor: '#dc2626',
          pointBorderColor: '#ffffff',
          pointRadius: 4,
          borderWidth: 2,
          borderDash: [5, 5]
        });
      }
    }

    chartInstanceRef.current = safeCreateChart(canvasRef.current, {
      type: 'radar',
      data: {
        labels: ['Offensive Output', 'Defensive Lockdown', 'Scoring Margin', 'Net EPA / Play', 'Market Value'],
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: { color: 'rgba(255, 255, 255, 0.08)' },
            grid: { color: 'rgba(255, 255, 255, 0.08)' },
            pointLabels: {
              color: '#d4d4d8',
              font: { size: 11, weight: 'bold' }
            },
            ticks: {
              display: false,
              stepSize: 20
            },
            suggestedMin: 50,
            suggestedMax: 105
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#e4e4e7',
              font: { size: 11, weight: 'bold' },
              boxWidth: 12
            }
          },
          tooltip: {
            backgroundColor: '#18181b',
            titleColor: '#ffffff',
            bodyColor: '#a1a1aa',
            borderColor: '#3f3f46',
            borderWidth: 1,
            callbacks: {
              label: (context) => `${context.dataset.label}: ${context.raw} index points`
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
  }, [selectedTeam, overlayBenchmark, showAllTeams]);

  return (
    <div className="space-y-8">
      {/* Narrative Theme 1 Header */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-red-950/40 border border-red-950/80 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-60 h-60 bg-red-900/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-3 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-red-400 bg-red-950/80 px-3 py-1 rounded-md border border-red-900/60 inline-flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-red-400" />
              Narrative Theme 1
            </span>
            <span className="text-xs text-zinc-400 font-semibold">
              The Evolution of Dominance
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            How Good Were They?
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Examines what an elite national champion looks like across modern collegiate football history.{' '}
            <span className="text-purple-300 font-bold">LSU 2019</span> and{' '}
            <span className="text-red-300 font-bold">Alabama 2020</span> represent raw offensive explosiveness;{' '}
            <span className="text-sky-300 font-bold">Michigan 2023</span> represents defensive lockdown;{' '}
            <span className="text-amber-300 font-bold">Georgia 2022</span> represents line-of-scrimmage balance; and{' '}
            <span className="text-white font-extrabold underline decoration-red-600">Indiana 2025</span> represents a modern hybrid combining top-tier scoring defense ({' '}
            <span className="text-red-400 font-bold">11.7 PAPG</span>) with hyper-efficient offense and a staggering scoring margin ({' '}
            <span className="text-red-400 font-bold">+29.9</span>).
          </p>
        </div>

        {/* Statistical Fingerprint Archetype Selectors */}
        <div className="mt-6 pt-6 border-t border-zinc-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
              Statistical Fingerprint Archetype Filter:
            </span>
            <span className="text-xs text-zinc-500 font-mono">
              Click an archetype to load its champion DNA
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <button
              onClick={() => handleSelectArchetype('modern-hybrid')}
              className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                activeArchetype === 'modern-hybrid'
                  ? 'bg-red-950/80 border-red-600 text-white shadow-lg shadow-red-950/50'
                  : 'bg-zinc-950/70 border-zinc-800 text-zinc-300 hover:bg-zinc-800/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-red-400">The Modern Hybrid</span>
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
              </div>
              <span className="text-sm font-bold text-white block mt-1">Indiana 2025</span>
              <span className="text-[11px] text-zinc-400 block mt-0.5">11.7 PAPG • +29.9 Margin • 4.63 Net Z</span>
            </button>

            <button
              onClick={() => handleSelectArchetype('explosive-offense')}
              className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                activeArchetype === 'explosive-offense'
                  ? 'bg-purple-950/80 border-purple-600 text-white shadow-lg shadow-purple-950/50'
                  : 'bg-zinc-950/70 border-zinc-800 text-zinc-300 hover:bg-zinc-800/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-purple-400">Offensive Explosiveness</span>
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              </div>
              <span className="text-sm font-bold text-white block mt-1">LSU 2019 & Alabama 2020</span>
              <span className="text-[11px] text-zinc-400 block mt-0.5">48.5 PPG • Unstoppable RPO Passing</span>
            </button>

            <button
              onClick={() => handleSelectArchetype('defensive-lockdown')}
              className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                activeArchetype === 'defensive-lockdown'
                  ? 'bg-sky-950/80 border-sky-600 text-white shadow-lg shadow-sky-950/50'
                  : 'bg-zinc-950/70 border-zinc-800 text-zinc-300 hover:bg-zinc-800/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-sky-400">Defensive Lockdown</span>
                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              </div>
              <span className="text-sm font-bold text-white block mt-1">Michigan 2023</span>
              <span className="text-[11px] text-zinc-400 block mt-0.5">10.4 PAPG • +1.00 Turnover Margin</span>
            </button>

            <button
              onClick={() => handleSelectArchetype('scrimmage-balance')}
              className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                activeArchetype === 'scrimmage-balance'
                  ? 'bg-amber-950/80 border-amber-600 text-white shadow-lg shadow-amber-950/50'
                  : 'bg-zinc-950/70 border-zinc-800 text-zinc-300 hover:bg-zinc-800/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400">Scrimmage Balance</span>
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              </div>
              <span className="text-sm font-bold text-white block mt-1">Georgia 2022</span>
              <span className="text-[11px] text-zinc-400 block mt-0.5">41.1 PPG • 14.3 PAPG • 12-Personnel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Takeaways Section */}
      <KeyTakeaways
        title="Radar DNA Profiles: Key Insights"
        subtitle="Evaluating championship fingerprints and multi-dimensional balance"
        accentColor="red"
        items={[
          {
            title: 'Distinct Fingerprints',
            description: 'Visualizing statistical fingerprints highlights clear team specializations—LSU 2019 and Alabama 2020 dominate offensive output, while Michigan 2023 controls defensive lockdown.',
            badge: 'Clear Specializations'
          },
          {
            title: 'Balanced Shape',
            description: 'Indiana 2025 exhibits the most well-rounded polygon across all five radar metrics (Offensive Output, Defensive Lockdown, Scoring Margin, Net EPA/Play, and Market Value).',
            badge: 'Well-Rounded Polygon'
          }
        ]}
      />

      {/* Main Interactive Radar Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Team selection & narrative breakdown (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Select Team Fingerprint:
              </span>
              <button
                onClick={() => handleSelectArchetype('all')}
                className="text-xs font-semibold text-zinc-400 hover:text-white cursor-pointer"
              >
                Reset Filter
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {(Object.keys(TEAMS) as TeamKey[]).map((key) => {
                const t = TEAMS[key];
                const isSelected = selectedTeam === key && !showAllTeams;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedTeam(key);
                      setShowAllTeams(false);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition flex justify-between items-center cursor-pointer shadow-sm ${
                      isSelected
                        ? key === 'indiana'
                          ? 'bg-red-950/80 border-red-600 text-white shadow-red-950/40'
                          : 'bg-zinc-800/90 border-blue-500 text-white shadow-blue-950/40'
                        : 'bg-zinc-950/70 border-zinc-800 text-zinc-300 hover:bg-zinc-800/60 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-3 h-3 rounded-full ${
                          key === 'indiana' ? 'bg-red-500' : 'bg-blue-400'
                        }`}
                      ></span>
                      <div>
                        <span className="font-bold text-sm block">{t.name}</span>
                        <span className="text-[11px] text-zinc-400">{t.record} • {t.natTitle.replace(' (National Champion)', '')}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold block text-red-400">
                        +{t.margin} PPG
                      </span>
                      <span className="text-[10px] text-zinc-400">Net Z: {t.netZ}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Narrative Profile Card */}
            <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs uppercase text-red-400 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  Tactical Archetype: {team.name}
                </span>
                <span className="text-[11px] font-mono bg-zinc-900 border border-zinc-700 px-2 py-0.5 rounded text-zinc-300">
                  {team.record}
                </span>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {team.desc}
              </p>

              <div className="space-y-2 pt-2 border-t border-zinc-800/80 text-xs">
                <div>
                  <span className="text-zinc-500 font-semibold uppercase text-[10px] block">Tactical Style</span>
                  <span className="text-zinc-200">{team.tacticalStyle}</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-semibold uppercase text-[10px] block">Dominant Hallmark</span>
                  <span className="text-emerald-400 font-semibold">{team.keyStrength}</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-semibold uppercase text-[10px] block">Relative Trade-off / Vulnerability</span>
                  <span className="text-amber-400/90">{team.vulnerability}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Radar Chart & View Controls (7 Cols) */}
        <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-950/80 px-2.5 py-0.5 rounded border border-red-900/50">
                Interactive Radar Matrix
              </span>
              <h3 className="text-lg font-black text-white mt-1">
                Five-Phase Fingerprint Profile
              </h3>
            </div>

            {/* Chart view toggles */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAllTeams(!showAllTeams)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition cursor-pointer ${
                  showAllTeams
                    ? 'bg-blue-950 border-blue-700 text-blue-300'
                    : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white'
                }`}
              >
                <Swords className="w-3.5 h-3.5" />
                <span>All 5 Overlay</span>
              </button>

              {!showAllTeams && selectedTeam !== 'indiana' && (
                <button
                  onClick={() => setOverlayBenchmark(!overlayBenchmark)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition cursor-pointer ${
                    overlayBenchmark
                      ? 'bg-red-950 border-red-700 text-red-300'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Overlay IU Benchmark</span>
                </button>
              )}
            </div>
          </div>

          <div className="relative" style={{ height: '420px' }}>
            <canvas ref={canvasRef}></canvas>
          </div>

          {/* Radar Axis Explanations */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-zinc-800 text-[11px]">
            <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
              <span className="font-bold text-zinc-300 block">Offensive Output</span>
              <span className="text-zinc-500 text-[10px]">PPG & yards per play potency</span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
              <span className="font-bold text-zinc-300 block">Defensive Lockdown</span>
              <span className="text-zinc-500 text-[10px]">Scoring defense & success suppression</span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
              <span className="font-bold text-zinc-300 block">Scoring Margin</span>
              <span className="text-zinc-500 text-[10px]">Net point differential per game</span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
              <span className="font-bold text-zinc-300 block">Net EPA / Play</span>
              <span className="text-zinc-500 text-[10px]">Expected points added efficiency</span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 col-span-2 sm:col-span-1">
              <span className="font-bold text-zinc-300 block">Market Value</span>
              <span className="text-zinc-500 text-[10px]">ATS win rate & spread cover margin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
