import React, { useState } from 'react';
import { TEAMS, simulateMatchup } from '../data/championshipData';
import { TeamKey } from '../types';
import { Dices, Trophy, Shield, Zap, Flame, RotateCcw } from 'lucide-react';
import { HeadToHeadTakeaways } from './HeadToHeadTakeaways';

export const MatchupSimulator: React.FC = () => {
  const [opponentKey, setOpponentKey] = useState<TeamKey>('alabama');
  const [neutralField, setNeutralField] = useState<boolean>(true);
  const [simulationRunCount, setSimulationRunCount] = useState<number>(1);

  const iu = TEAMS.indiana;
  const opp = TEAMS[opponentKey];

  const sim = simulateMatchup('indiana', opponentKey);

  const opponents: TeamKey[] = ['alabama', 'lsu', 'georgia', 'michigan'];

  const tacticalNotes: Record<Exclude<TeamKey, 'indiana'>, { title: string; iuEdge: string; oppEdge: string; xFactor: string }> = {
    alabama: {
      title: 'Indiana (2025) vs. Alabama (2020)',
      iuEdge: 'Suffocating defensive front and ball control suppresses Mac Jones from sustaining rhythm drives.',
      oppEdge: 'DeVonta Smith and Jaylen Waddle create explosive vertical boundary mismatches that challenge single coverage.',
      xFactor: 'Red zone touchdown conversion: Alabama scored TDs on 89% of red-zone trips; Indiana held opponents to 41% red-zone TDs.'
    },
    lsu: {
      title: 'Indiana (2025) vs. LSU (2019)',
      iuEdge: 'Indiana’s -0.18 EPA defensive suppression limits Burrow’s intermediate checkdowns and forces contested 3rd downs.',
      oppEdge: 'Joe Burrow with Ja’Marr Chase & Justin Jefferson is virtually impossible to shut down across 4 quarters.',
      xFactor: 'Turnover variance: LSU had 0 turnovers in 3 CFP games; Indiana created 1.8 takeaways per game in 2025.'
    },
    georgia: {
      title: 'Indiana (2025) vs. Georgia (2022)',
      iuEdge: 'Indiana’s modern spread spacing and quarterback mobility tests Georgia’s heavier inside linebacker sets.',
      oppEdge: 'Jalen Carter and Georgia’s defensive interior destroy interior run lanes, forcing long 3rd-and-manageable situations.',
      xFactor: 'Tight End Brock Bowers: Indiana must disguise safety brackets to limit explosive seam receptions.'
    },
    michigan: {
      title: 'Indiana (2025) vs. Michigan (2023)',
      iuEdge: 'Indiana generates more explosive scoring plays (+0.34 offensive EPA vs. Michigan’s +0.24 EPA).',
      oppEdge: 'Michigan’s offensive line and Blake Corum grind out 10-play drives that minimize Indiana’s offensive possessions.',
      xFactor: 'Third-down conversion rate: Whoever controls 3rd-and-medium dictates tempo in a classic Big Ten heavyweight brawl.'
    }
  };

  const currentTactics = tacticalNotes[opponentKey];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="border-b border-zinc-800 pb-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-950/80 px-3 py-1 rounded-md border border-red-900/50 inline-flex items-center gap-1.5">
            <Dices className="w-3.5 h-3.5 text-red-400" />
            Neutral-Field Simulation Engine
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-2">
            Head-to-Head Championship Simulator
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Predict outcomes, point spreads, win probabilities, and tactical keys for Indiana 2025 against any historical champion.
          </p>
        </div>

        {/* Resimulate button */}
        <button
          onClick={() => setSimulationRunCount(c => c + 1)}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-red-700 hover:bg-red-600 text-white transition flex items-center gap-2 cursor-pointer shadow"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Re-Simulate Game (Run #{simulationRunCount})</span>
        </button>
      </div>

      {/* Opponent Selection */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
          Select Opponent to Face Indiana 2025:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {opponents.map((k) => {
            const team = TEAMS[k];
            const isSelected = opponentKey === k;
            return (
              <button
                key={k}
                onClick={() => setOpponentKey(k)}
                className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-800 border-red-500 text-white shadow-lg'
                    : 'bg-zinc-950/70 border-zinc-800 text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-200'
                }`}
              >
                <span className="font-bold text-sm block">{team.name}</span>
                <span className="text-[11px] text-zinc-400 mt-0.5 block">{team.record} • {team.ppg} PPG</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scoreboard Display */}
      <div className="bg-gradient-to-r from-red-950/40 via-zinc-950 to-zinc-950 border border-red-950/80 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-2 right-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
          Neutral Field • CFP National Championship
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Indiana 2025 Side */}
          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="w-3 h-3 rounded-full bg-red-600"></span>
              <span className="text-xs uppercase font-extrabold text-red-400 tracking-wider">Indiana (2025)</span>
            </div>
            <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              {sim.scoreA}
            </div>
            <span className="text-xs text-zinc-400 block">
              Projected Win Probability: <strong className="text-red-400">{sim.winProbA}%</strong>
            </span>
          </div>

          {/* Center VS / Game summary */}
          <div className="text-center space-y-2 py-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
              Spread: Indiana {sim.spread} • Total: {sim.projectedTotal}
            </span>
            <h4 className="text-sm font-bold text-white mt-2">
              {sim.favored} Favored
            </h4>
            <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden flex shadow-inner">
              <div
                className="bg-red-600 h-full transition-all duration-500"
                style={{ width: `${sim.winProbA}%` }}
              ></div>
              <div
                className="bg-zinc-500 h-full transition-all duration-500"
                style={{ width: `${sim.winProbB}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono px-1">
              <span>IU {sim.winProbA}%</span>
              <span>{opp.name.split(' ')[0]} {sim.winProbB}%</span>
            </div>
          </div>

          {/* Opponent Side */}
          <div className="text-center md:text-right space-y-2">
            <div className="flex items-center justify-center md:justify-end gap-2">
              <span className="text-xs uppercase font-extrabold text-zinc-300 tracking-wider">{opp.name}</span>
              <span className="w-3 h-3 rounded-full bg-zinc-400"></span>
            </div>
            <div className="text-4xl sm:text-5xl font-black text-zinc-200 tracking-tight">
              {sim.scoreB}
            </div>
            <span className="text-xs text-zinc-400 block">
              Projected Win Probability: <strong className="text-zinc-200">{sim.winProbB}%</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Tactical Keys Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            Indiana's Strategic Advantage
          </span>
          <p className="text-xs text-zinc-300 leading-relaxed">
            {currentTactics.iuEdge}
          </p>
        </div>

        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5" />
            {opp.name}'s Strategic Counter
          </span>
          <p className="text-xs text-zinc-300 leading-relaxed">
            {currentTactics.oppEdge}
          </p>
        </div>

        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            The Deciding X-Factor
          </span>
          <p className="text-xs text-zinc-300 leading-relaxed">
            {currentTactics.xFactor}
          </p>
        </div>
      </div>

      {/* Head-to-Head Takeaways and Analytical Insights */}
      <HeadToHeadTakeaways opponent={opponentKey as Exclude<TeamKey, 'indiana'>} />
    </div>
  );
};
