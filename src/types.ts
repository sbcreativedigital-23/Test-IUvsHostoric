export type TeamKey = 'indiana' | 'alabama' | 'lsu' | 'georgia' | 'michigan';

export interface TeamData {
  key: TeamKey;
  name: string;
  year: number;
  record: string;
  games: number;
  wins: number;
  losses: number;
  natTitle: string;
  confTitle: string;
  ppg: number;
  papg: number;
  margin: number;
  offYds: number;
  defYds: number;
  netYds: number;
  offEpa: number;
  defEpa: number;
  netEpa: number;
  offSucc: string;
  defSucc: string;
  toMargin: string;
  ats: number;
  cover: string;
  netZ: number;
  offZ: number;
  defZ: number;
  top10Wins: number;
  top25Wins: number;
  marginTop25: string;
  sosRank: number;
  desc: string;
  tacticalStyle: string;
  keyStrength: string;
  vulnerability: string;
  primaryColor: string;
  radar: [number, number, number, number, number]; // [Offense, Defense, Margin, EPA, Market]
}

export type TabId =
  | 'narrative'
  | 'overview'
  | 'dashboard'
  | 'dominance'
  | 'radar'
  | 'resume'
  | 'market'
  | 'h2h'
  | 'all5'
  | 'efficiency'
  | 'master'
  | 'simulator'
  | 'glossary'
  | 'chat';

export type ChampionshipArchetype =
  | 'modern-hybrid'
  | 'explosive-offense'
  | 'defensive-lockdown'
  | 'scrimmage-balance';

export interface MarketProfile {
  atsWinRate: number;
  atsRecord: string;
  avgCoverMargin: number;
  valueGameWinRate: number;
  valueGameRecord: string;
  marketCorrectionSlope: string;
  marketInefficiencyRank: number;
  summary: string;
  keyGames: {
    opponent: string;
    stage: string;
    spread: string;
    result: string;
    coverMargin: string;
    covered: boolean;
  }[];
}

export type MetricCategory = 'all' | 'scoring' | 'efficiency' | 'market';

export interface MasterRow {
  category: 'scoring' | 'efficiency' | 'market';
  label: string;
  description?: string;
  higherIsBetter: boolean;
  iu: string;
  ala: string;
  lsu: string;
  uga: string;
  um: string;
}

export type All5MetricKey = 'ppg' | 'papg' | 'margin' | 'ats' | 'netEpa' | 'netYds';

export interface HeadToHeadInsight {
  opponentKey: TeamKey;
  opponentName: string;
  opponentYear: number;
  primaryTakeaway: string;
  insights: {
    title: string;
    text: string;
    metric?: string;
  }[];
}

export type GlossaryCategory =
  | 'all'
  | 'efficiency'
  | 'scoring'
  | 'market'
  | 'resume'
  | 'tactics';

export interface GlossaryTerm {
  id: string;
  term: string;
  acronym?: string;
  category: 'efficiency' | 'scoring' | 'market' | 'resume' | 'tactics';
  definition: string;
  whyItMatters: string;
  indianaContext: string;
  benchmarkContext?: string;
  formula?: string;
}

