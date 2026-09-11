/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabId, TeamKey } from './types';
import { Header } from './components/Header';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { RadarProfiles } from './components/RadarProfiles';
import { ResumeVsMachine } from './components/ResumeVsMachine';
import { MarketOutlier } from './components/MarketOutlier';
import { All5Matrix } from './components/All5Matrix';
import { EfficiencyMatrix } from './components/EfficiencyMatrix';
import { MasterRepository } from './components/MasterRepository';
import { MatchupSimulator } from './components/MatchupSimulator';
import { GlossaryView } from './components/GlossaryView';
import { NarrativeArc } from './components/NarrativeArc';
import { HeadToHeadView } from './components/HeadToHeadView';
import { ChatView } from './components/ChatView';
import { BrandTopBar } from './components/BrandTopBar';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('narrative');
  const [selectedRadarTeam, setSelectedRadarTeam] = useState<TeamKey>('indiana');
  const [selectedH2HOpponent, setSelectedH2HOpponent] = useState<Exclude<TeamKey, 'indiana'>>('alabama');

  const handleSelectTeamForRadar = (team: TeamKey) => {
    setSelectedRadarTeam(team);
    setActiveTab('dominance');
  };

  const handleSelectH2HMatchup = (opp: Exclude<TeamKey, 'indiana'>) => {
    setSelectedH2HOpponent(opp);
    setActiveTab('h2h');
  };

  return (
    <div className="min-h-screen bg-[#191919] text-[#EEEDEB] flex flex-col font-sans selection:bg-[#990000] selection:text-white">
      {/* Brand logo at the very top before the app begins */}
      <BrandTopBar />

      {/* Primary Header with Thematic Navigation */}
      <Header activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {(activeTab === 'narrative' || activeTab === 'overview') && (
          <NarrativeArc
            onNavigateTab={setActiveTab}
            onSelectTeamForRadar={handleSelectTeamForRadar}
          />
        )}

        {activeTab === 'dashboard' && (
          <ExecutiveDashboard
            onNavigateTab={setActiveTab}
            onSelectTeamForRadar={handleSelectTeamForRadar}
          />
        )}

        {(activeTab === 'dominance' || activeTab === 'radar') && (
          <RadarProfiles initialSelectedTeam={selectedRadarTeam} />
        )}

        {activeTab === 'resume' && <ResumeVsMachine />}

        {activeTab === 'market' && <MarketOutlier />}

        {activeTab === 'h2h' && (
          <HeadToHeadView
            onNavigateTab={setActiveTab}
            onSelectTeamForRadar={handleSelectTeamForRadar}
            initialOpponent={selectedH2HOpponent}
          />
        )}

        {activeTab === 'all5' && <All5Matrix />}

        {activeTab === 'efficiency' && <EfficiencyMatrix />}

        {activeTab === 'master' && <MasterRepository />}

        {activeTab === 'simulator' && <MatchupSimulator />}

        {activeTab === 'chat' && <ChatView onNavigateTab={setActiveTab} />}

        {activeTab === 'glossary' && <GlossaryView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#DCDDD9]/15 bg-[#191919] py-8 mt-12 text-xs text-[#EEEDEB]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#990000]"></span>
              <span className="font-semibold text-white font-serif">Indiana 2025 vs. Historical Titans Intelligence Suite</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] text-[#EEEDEB]/70">
              <button
                onClick={() => setActiveTab('narrative')}
                className="text-white hover:text-[#DCDDD9] transition underline underline-offset-2 cursor-pointer font-semibold"
              >
                Narrative Arc
              </button>
              <span>•</span>
              <button
                onClick={() => setActiveTab('dominance')}
                className="text-[#EEEDEB]/80 hover:text-white transition cursor-pointer"
              >
                1. Dominance Evolution
              </button>
              <span>•</span>
              <button
                onClick={() => setActiveTab('resume')}
                className="text-[#EEEDEB]/80 hover:text-white transition cursor-pointer"
              >
                2. Résumé vs Machine
              </button>
              <span>•</span>
              <button
                onClick={() => setActiveTab('market')}
                className="text-[#EEEDEB]/80 hover:text-white transition cursor-pointer"
              >
                3. Market Outlier
              </button>
              <span>•</span>
              <button
                onClick={() => setActiveTab('h2h')}
                className="text-white hover:text-[#DCDDD9] transition cursor-pointer font-semibold"
              >
                Head-to-Head
              </button>
              <span>•</span>
              <button
                onClick={() => setActiveTab('chat')}
                className="text-emerald-400 hover:text-emerald-300 transition cursor-pointer font-bold flex items-center gap-1"
              >
                AI Data Chat
              </button>
              <span>•</span>
              <button
                onClick={() => setActiveTab('glossary')}
                className="text-[#EEEDEB] hover:text-white transition underline underline-offset-2 cursor-pointer font-medium"
              >
                Glossary (20)
              </button>
            </div>
          </div>

          <div className="border-t border-[#DCDDD9]/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#EEEDEB]/60">
            <div>
              This site is property of{' '}
              <a
                href="https://creativetech.studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#EEEDEB] font-bold underline underline-offset-2 transition"
              >
                CreativeTech.Studio
              </a>
            </div>
            <a
              href="https://creativetech.studio/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#EEEDEB]/60 hover:text-white font-mono text-[10px] transition"
            >
              https://creativetech.studio/
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
