import { TeamData, MasterRow, TeamKey, MarketProfile, HeadToHeadInsight } from '../types';

export const TEAMS: Record<TeamKey, TeamData> = {
  indiana: {
    key: 'indiana',
    name: 'Indiana (2025)',
    year: 2025,
    record: '16-0',
    games: 16,
    wins: 16,
    losses: 0,
    natTitle: 'Yes (National Champion)',
    confTitle: 'Yes (Big Ten Champion)',
    ppg: 41.6,
    papg: 11.7,
    margin: 29.9,
    offYds: 6.8,
    defYds: 4.7,
    netYds: 2.1,
    offEpa: 0.34,
    defEpa: -0.18,
    netEpa: 0.52,
    offSucc: '52.1%',
    defSucc: '31.4%',
    toMargin: '+0.69',
    ats: 75.0,
    cover: '+9.2',
    netZ: 4.63,
    offZ: 2.48,
    defZ: 2.15,
    top10Wins: 3,
    top25Wins: 4,
    marginTop25: '+15.5',
    sosRank: 28,
    desc: 'Indiana 2025 stands as the modern efficiency outlier—combining a suffocating lockdown defense allowing just 11.7 PAPG (-0.18 EPA allowed) with ruthless offensive execution, producing a +29.9 scoring margin and 75.0% ATS market dominance.',
    tacticalStyle: 'Disciplined ball-control, suffocating red-zone defense, hyper-efficient situational football',
    keyStrength: 'Two-way net efficiency (+0.52 Net EPA/play) and 4th quarter point differential (+11.8)',
    vulnerability: 'Lower cumulative top-25 volume compared to SEC gauntlets, relying on precision over sheer 5-star depth',
    primaryColor: '#dc2626',
    radar: [95, 94, 98, 92, 96]
  },
  alabama: {
    key: 'alabama',
    name: 'Alabama (2020)',
    year: 2020,
    record: '13-0',
    games: 13,
    wins: 13,
    losses: 0,
    natTitle: 'Yes (National Champion)',
    confTitle: 'Yes (SEC Champion)',
    ppg: 48.5,
    papg: 19.4,
    margin: 29.1,
    offYds: 7.8,
    defYds: 5.0,
    netYds: 2.8,
    offEpa: 0.41,
    defEpa: -0.12,
    netEpa: 0.53,
    offSucc: '54.2%',
    defSucc: '34.1%',
    toMargin: '+0.31',
    ats: 61.5,
    cover: '+4.1',
    netZ: 4.10,
    offZ: 2.85,
    defZ: 1.25,
    top10Wins: 3,
    top25Wins: 5,
    marginTop25: '+25.6',
    sosRank: 10,
    desc: 'Alabama 2020 established the modern apex of explosive collegiate offensive firepower, posting 48.5 PPG against an all-SEC schedule led by Mac Jones, DeVonta Smith, and Najee Harris.',
    tacticalStyle: 'Unstoppable spread-RPO, vertical boundary isolation, elite offensive line protection',
    keyStrength: 'Best offensive EPA in modern history (+0.41) and highest 3rd down conversion rate (58.9%)',
    vulnerability: 'Occasional susceptibility to tempo spread passing attacks in shootouts (gave up 46 vs Florida, 48 vs Ole Miss)',
    primaryColor: '#991b1b',
    radar: [99, 85, 93, 98, 88]
  },
  lsu: {
    key: 'lsu',
    name: 'LSU (2019)',
    year: 2019,
    record: '15-0',
    games: 15,
    wins: 15,
    losses: 0,
    natTitle: 'Yes (National Champion)',
    confTitle: 'Yes (SEC Champion)',
    ppg: 48.4,
    papg: 21.9,
    margin: 26.5,
    offYds: 7.89,
    defYds: 5.11,
    netYds: 2.78,
    offEpa: 0.38,
    defEpa: -0.09,
    netEpa: 0.47,
    offSucc: '53.4%',
    defSucc: '33.2%',
    toMargin: '+0.80',
    ats: 53.3,
    cover: '+1.8',
    netZ: 3.85,
    offZ: 2.75,
    defZ: 1.10,
    top10Wins: 4,
    top25Wins: 7,
    marginTop25: '+24.1',
    sosRank: 14,
    desc: 'LSU 2019 fielded arguably the most transcendent passing attack in college football history behind Heisman winner Joe Burrow, Ja’Marr Chase, and Justin Jefferson, steamrolling 7 Top-25 opponents.',
    tacticalStyle: 'Five-wide empty sets, choice routes, surgical deep passing down the seams',
    keyStrength: 'Historic strength of résumé (7 top-25 wins by average +24.1 margin) and red zone touchdown rate (86.4%)',
    vulnerability: 'Early-season defensive inconsistency and bend-don’t-break vulnerability in secondary',
    primaryColor: '#7c3aed',
    radar: [100, 82, 91, 99, 84]
  },
  georgia: {
    key: 'georgia',
    name: 'Georgia (2022)',
    year: 2022,
    record: '15-0',
    games: 15,
    wins: 15,
    losses: 0,
    natTitle: 'Yes (National Champion)',
    confTitle: 'Yes (SEC Champion)',
    ppg: 41.1,
    papg: 14.3,
    margin: 26.8,
    offYds: 7.3,
    defYds: 5.3,
    netYds: 2.0,
    offEpa: 0.31,
    defEpa: -0.13,
    netEpa: 0.46,
    offSucc: '51.5%',
    defSucc: '35.5%',
    toMargin: '+0.40',
    ats: 60.0,
    cover: '+4.4',
    netZ: 3.06,
    offZ: 2.01,
    defZ: 1.05,
    top10Wins: 3,
    top25Wins: 5,
    marginTop25: '+24.8',
    sosRank: 23,
    desc: 'Georgia 2022 was the model of relentless physical dominance and balanced excellence, culminating in a 65-7 national championship shellacking behind Stetson Bennett and Brock Bowers.',
    tacticalStyle: 'Multiple 12-personnel heavy, play-action dominance, physical interior defensive front',
    keyStrength: 'Elite tight end utilization, tackle-to-tackle run defense, historic CFP final victory (+58 margin)',
    vulnerability: 'Struggled against high-tempo air raid spread offenses with athletic outside receivers (e.g. Ohio State semi-final)',
    primaryColor: '#b91c1c',
    radar: [91, 93, 94, 90, 91]
  },
  michigan: {
    key: 'michigan',
    name: 'Michigan (2023)',
    year: 2023,
    record: '15-0',
    games: 15,
    wins: 15,
    losses: 0,
    natTitle: 'Yes (National Champion)',
    confTitle: 'Yes (Big Ten Champion)',
    ppg: 35.9,
    papg: 10.4,
    margin: 25.5,
    offYds: 6.2,
    defYds: 4.3,
    netYds: 1.9,
    offEpa: 0.24,
    defEpa: -0.14,
    netEpa: 0.41,
    offSucc: '50.8%',
    defSucc: '32.4%',
    toMargin: '+1.00',
    ats: 53.3,
    cover: '+4.8',
    netZ: 3.36,
    offZ: 1.98,
    defZ: 1.38,
    top10Wins: 3,
    top25Wins: 6,
    marginTop25: '+24.2',
    sosRank: 11,
    desc: 'Michigan 2023 played the most smothering defensive brand of football of the playoff era, suffocating opponents to a minuscule 10.4 PAPG while generating a pristine +1.00 turnover margin per contest.',
    tacticalStyle: 'Smashmouth power run game, clock-grinding drives, NFL disguise split-safety defense',
    keyStrength: '#1 scoring defense in the nation (10.4 PAPG) and best turnover ratio (+15 net turnovers)',
    vulnerability: 'Lower ceiling in vertical dropback passing volume if trailing by two scores',
    primaryColor: '#0284c7',
    radar: [88, 99, 95, 87, 85]
  }
};

export const MASTER_ROWS: MasterRow[] = [
  { category: 'scoring', label: 'Record & Undefeated Status', higherIsBetter: true, iu: '16-0', ala: '13-0', lsu: '15-0', uga: '15-0', um: '15-0', description: 'Regular season, conference championship, and CFP tournament record' },
  { category: 'scoring', label: 'Points Per Game (PPG)', higherIsBetter: true, iu: '41.6', ala: '48.5', lsu: '48.4', uga: '41.1', um: '35.9', description: 'Average points scored per contest across all games played' },
  { category: 'scoring', label: 'Points Allowed / Game (PAPG)', higherIsBetter: false, iu: '11.7', ala: '19.4', lsu: '21.9', uga: '14.3', um: '10.4', description: 'Average points conceded per game (lower represents stingier defense)' },
  { category: 'scoring', label: 'Scoring Margin / Game', higherIsBetter: true, iu: '+29.9', ala: '+29.1', lsu: '+26.5', uga: '+26.8', um: '+25.5', description: 'Net average point differential per game (PPG minus PAPG)' },
  { category: 'efficiency', label: 'Offensive Yards / Play', higherIsBetter: true, iu: '6.80', ala: '7.80', lsu: '7.89', uga: '7.30', um: '6.20', description: 'Total offensive yards gained divided by total plays run' },
  { category: 'efficiency', label: 'Defensive Yards Allowed / Play', higherIsBetter: false, iu: '4.70', ala: '5.00', lsu: '5.11', uga: '5.30', um: '4.30', description: 'Total yards conceded divided by opponent plays' },
  { category: 'efficiency', label: 'Net Yards / Play Differential', higherIsBetter: true, iu: '+2.10', ala: '+2.80', lsu: '+2.78', uga: '+2.00', um: '+1.90', description: 'Offensive yards per play minus defensive yards per play allowed' },
  { category: 'efficiency', label: 'Offensive EPA / Play', higherIsBetter: true, iu: '+0.34', ala: '+0.41', lsu: '+0.38', uga: '+0.31', um: '+0.24', description: 'Expected Points Added generated on offense per snap' },
  { category: 'efficiency', label: 'Defensive EPA / Play Allowed', higherIsBetter: false, iu: '-0.18', ala: '-0.12', lsu: '-0.09', uga: '-0.13', um: '-0.14', description: 'Expected Points Added allowed to opponents (more negative is superior)' },
  { category: 'efficiency', label: 'Net EPA / Play', higherIsBetter: true, iu: '+0.52', ala: '+0.53', lsu: '+0.47', uga: '+0.46', um: '+0.41', description: 'Offensive EPA minus defensive EPA allowed per play' },
  { category: 'efficiency', label: 'Offensive Success Rate', higherIsBetter: true, iu: '52.1%', ala: '54.2%', lsu: '53.4%', uga: '51.5%', um: '50.8%', description: 'Percentage of plays generating positive Expected Points gain' },
  { category: 'efficiency', label: 'Defensive Success Rate Allowed', higherIsBetter: false, iu: '31.4%', ala: '34.1%', lsu: '33.2%', uga: '35.5%', um: '32.4%', description: 'Opponent percentage of successful plays allowed (lower is elite)' },
  { category: 'efficiency', label: 'Adjusted Offense Z-Score', higherIsBetter: true, iu: '2.48', ala: '2.85', lsu: '2.75', uga: '2.01', um: '1.98', description: 'Normalized standard deviations above national FBS average' },
  { category: 'efficiency', label: 'Adjusted Defense Z-Score', higherIsBetter: true, iu: '2.15', ala: '1.25', lsu: '1.10', uga: '1.05', um: '1.38', description: 'Normalized defensive excellence standard deviations' },
  { category: 'efficiency', label: 'Net Efficiency Z-Score', higherIsBetter: true, iu: '4.63', ala: '4.10', lsu: '3.85', uga: '3.06', um: '3.36', description: 'Composite standard deviation dominance score across both phases' },
  { category: 'market', label: 'Turnover Margin / Game', higherIsBetter: true, iu: '+0.69', ala: '+0.31', lsu: '+0.80', uga: '+0.40', um: '+1.00', description: 'Net takeaways minus giveaways per contest' },
  { category: 'market', label: 'Wins vs. Final AP Top 10', higherIsBetter: true, iu: '3', ala: '3', lsu: '4', uga: '3', um: '3', description: 'Count of victories over teams finishing in the final AP Top 10' },
  { category: 'market', label: 'Wins vs. Final AP Top 25', higherIsBetter: true, iu: '4', ala: '5', lsu: '7', uga: '5', um: '6', description: 'Count of victories over teams finishing in the final AP Top 25' },
  { category: 'market', label: 'Avg Margin vs Final Top 25', higherIsBetter: true, iu: '+15.5', ala: '+25.6', lsu: '+24.1', uga: '+24.8', um: '+24.2', description: 'Average victory margin strictly against Top 25 ranked opponents' },
  { category: 'market', label: 'Strength of Schedule (SOS Rank)', higherIsBetter: false, iu: '28', ala: '10', lsu: '14', uga: '23', um: '11', description: 'End-of-season opponent difficulty index ranking (lower number = tougher schedule)' },
  { category: 'market', label: 'Against the Spread (ATS) Win Rate', higherIsBetter: true, iu: '75.0%', ala: '61.5%', lsu: '53.3%', uga: '60.0%', um: '53.3%', description: 'Percentage of games covering Vegas closing point spreads' },
  { category: 'market', label: 'Average Cover Margin vs Spread', higherIsBetter: true, iu: '+9.2', ala: '+4.1', lsu: '+1.8', uga: '+4.4', um: '+4.8', description: 'Average points by which the team surpassed the closing betting spread' }
];

// Calculation utility for neutral-field head-to-head simulations
export function simulateMatchup(teamAKey: TeamKey, teamBKey: TeamKey) {
  const teamA = TEAMS[teamAKey];
  const teamB = TEAMS[teamBKey];

  // Expected points model combining team offensive potency with opponent defensive suppression
  const avgFBSPoints = 28.0;
  const teamAExpScore = (teamA.ppg / avgFBSPoints) * (teamB.papg / avgFBSPoints) * avgFBSPoints;
  const teamBExpScore = (teamB.ppg / avgFBSPoints) * (teamA.papg / avgFBSPoints) * avgFBSPoints;

  // Fine-tuning adjustments based on EPA and net Z-score
  const epaDiff = (teamA.netEpa - teamB.netEpa) * 6.5;
  const zDiff = (teamA.netZ - teamB.netZ) * 1.8;

  const scoreA = Math.round(teamAExpScore + (epaDiff + zDiff) / 2);
  const scoreB = Math.round(teamBExpScore - (epaDiff + zDiff) / 2);

  const diff = scoreA - scoreB;
  // Calculate win probability using logistic distribution
  const winProbA = Math.min(96, Math.max(4, Math.round(100 / (1 + Math.pow(10, -diff / 10.5)))));
  const winProbB = 100 - winProbA;

  return {
    scoreA: Math.max(10, scoreA),
    scoreB: Math.max(10, scoreB),
    winProbA,
    winProbB,
    spread: (diff > 0 ? `-${Math.abs(diff)}` : `+${Math.abs(diff)}`),
    favored: diff >= 0 ? teamA.name : teamB.name,
    projectedTotal: Math.max(24, scoreA + scoreB),
    netEpaAdvantage: teamA.netEpa >= teamB.netEpa ? teamA.name : teamB.name,
    defensiveEdge: teamA.papg <= teamB.papg ? teamA.name : teamB.name,
    marketEdge: teamA.ats >= teamB.ats ? teamA.name : teamB.name
  };
}

export const ARCHETYPES = {
  'modern-hybrid': {
    id: 'modern-hybrid' as const,
    title: 'The Modern Hybrid',
    subtitle: 'Suffocating Defense + Hyper-Efficient Offense',
    teams: ['indiana'] as TeamKey[],
    headline: 'Indiana 2025: Two-Way Efficiency Outlier',
    description: 'Combines a suffocating top-tier scoring defense (11.7 PAPG, -0.18 defensive EPA allowed) with a ruthless, ball-control offense (41.6 PPG, +0.34 offensive EPA), producing a CFP-era best +29.9 scoring margin and 4.63 Net Z-Score.',
    accentColor: '#dc2626',
    hallmarks: [
      '11.7 Points Allowed Per Game (Suppresses opponents by -32% vs FBS avg)',
      '+29.9 Net Average Scoring Margin (#1 among all CFP champions)',
      '4.63 Adjusted Net Efficiency Z-Score (#1 all-time machine rating)',
      '75.0% ATS market outperformance (+9.2 avg cover margin)'
    ]
  },
  'explosive-offense': {
    id: 'explosive-offense' as const,
    title: 'Raw Offensive Explosiveness',
    subtitle: 'Airborne Firepower & Unstoppable RPO Passing',
    teams: ['alabama', 'lsu'] as TeamKey[],
    headline: 'LSU 2019 & Alabama 2020: The High-Scoring Juggernauts',
    description: 'Represent the zenith of modern collegiate passing attacks. LSU posted 48.4 PPG behind Joe Burrow’s surgical 5-wide offense, while Alabama averaged 48.5 PPG against an all-SEC regular season behind Mac Jones and DeVonta Smith.',
    accentColor: '#7c3aed',
    hallmarks: [
      '48.5 PPG (Alabama) & 48.4 PPG (LSU) — all-time collegiate ceiling',
      'Offensive EPA/play of +0.41 (Bama) and +0.38 (LSU)',
      '7 Top-25 wins for LSU (average +24.1 margin vs ranked opponents)',
      'Slightly higher points allowed: 19.4 PAPG (Bama) & 21.9 PAPG (LSU)'
    ]
  },
  'defensive-lockdown': {
    id: 'defensive-lockdown' as const,
    title: 'Defensive Lockdown',
    subtitle: 'Smothering Havoc & Turnover Dominance',
    teams: ['michigan'] as TeamKey[],
    headline: 'Michigan 2023: The Modern Trench Fortress',
    description: 'Suffocated opponents to an extraordinary 10.4 PAPG, generating a pristine +1.00 turnover margin per game (+15 net turnovers) with a split-safety scheme that completely eliminated explosive plays.',
    accentColor: '#0284c7',
    hallmarks: [
      '10.4 Points Allowed Per Game (#1 scoring defense of the CFP era)',
      '+1.00 Turnover Margin / Game (+15 total net takeaways)',
      '4.3 Defensive Yards Allowed per Play (lowest allowed in sample)',
      'Deliberate, clock-grinding tempo with 35.9 PPG offensive floor'
    ]
  },
  'scrimmage-balance': {
    id: 'scrimmage-balance' as const,
    title: 'Line-of-Scrimmage Balance',
    subtitle: 'Physical 12-Personnel & Relentless Execution',
    teams: ['georgia'] as TeamKey[],
    headline: 'Georgia 2022: Relentless Pro-Style Bully Ball',
    description: 'The standard of two-tight-end physical dominance and defensive depth. Blended 41.1 PPG with 14.3 PAPG, punctuated by the greatest championship blowout in history (65-7 vs TCU).',
    accentColor: '#b91c1c',
    hallmarks: [
      '65-7 CFP National Championship victory (+58 margin)',
      '14.3 Points Allowed Per Game with elite tackle-to-tackle run stopping',
      '41.1 PPG powered by generational tight end utilization (Brock Bowers)',
      'Balanced +26.8 scoring margin and +0.46 Net EPA/play'
    ]
  }
};

export const MARKET_PROFILES: Record<TeamKey, MarketProfile> = {
  indiana: {
    atsWinRate: 75.0,
    atsRecord: '12-4',
    avgCoverMargin: 9.2,
    valueGameWinRate: 87.5,
    valueGameRecord: '7-1',
    marketCorrectionSlope: 'Steep (+14.5 pt upward adjustment)',
    marketInefficiencyRank: 1,
    summary: 'Indiana 2025 created the most dramatic betting market inefficiency of the CFP era. Starting as an unheralded squad burdened by historical brand bias, Vegas lines consistently lagged behind Curt Cignetti’s dominant scoring margin (+29.9), resulting in a historic 75.0% cover rate.',
    keyGames: [
      { opponent: 'at Ohio State (Championship Semifinal)', stage: 'CFP Semifinal', spread: 'IU +3.5', result: 'Won 38-21', coverMargin: '+20.5', covered: true },
      { opponent: 'vs. Oregon (Big Ten Championship)', stage: 'Conference Title', spread: 'IU -2.5', result: 'Won 34-17', coverMargin: '+14.5', covered: true },
      { opponent: 'vs. Miami (CFP Quarterfinal)', stage: 'CFP Quarterfinal', spread: 'IU -6.5', result: 'Won 42-14', coverMargin: '+21.5', covered: true },
      { opponent: 'vs. Georgia (National Championship)', stage: 'CFP Championship', spread: 'IU -4.0', result: 'Won 31-13', coverMargin: '+14.0', covered: true },
      { opponent: 'vs. Michigan', stage: 'Regular Season', spread: 'IU -14.5', result: 'Won 20-15', coverMargin: '-9.5', covered: false },
      { opponent: 'at Nebraska', stage: 'Regular Season', spread: 'IU -6.5', result: 'Won 56-7', coverMargin: '+42.5', covered: true }
    ]
  },
  alabama: {
    atsWinRate: 61.5,
    atsRecord: '8-5',
    avgCoverMargin: 4.1,
    valueGameWinRate: 62.5,
    valueGameRecord: '5-3',
    marketCorrectionSlope: 'Moderate (+6.0 pt line inflation)',
    marketInefficiencyRank: 2,
    summary: 'Alabama 2020 was consistently priced as an overwhelming favorite in an all-SEC schedule. While priced high, their historic offensive firepower covered 8 of 13 lines, punctuated by high-margin postseason blowouts.',
    keyGames: [
      { opponent: 'vs. Ohio State (National Title)', stage: 'CFP Championship', spread: 'ALA -9.5', result: 'Won 52-24', coverMargin: '+18.5', covered: true },
      { opponent: 'vs. Notre Dame (Rose Bowl)', stage: 'CFP Semifinal', spread: 'ALA -19.5', result: 'Won 31-14', coverMargin: '-2.5', covered: false },
      { opponent: 'vs. Florida (SEC Title)', stage: 'Conference Title', spread: 'ALA -16.5', result: 'Won 52-46', coverMargin: '-10.5', covered: false },
      { opponent: 'vs. Georgia', stage: 'Regular Season', spread: 'ALA -4.5', result: 'Won 41-24', coverMargin: '+12.5', covered: true }
    ]
  },
  lsu: {
    atsWinRate: 53.3,
    atsRecord: '8-7',
    avgCoverMargin: 1.8,
    valueGameWinRate: 57.1,
    valueGameRecord: '4-3',
    marketCorrectionSlope: 'Flat (+2.5 pt adjustment)',
    marketInefficiencyRank: 5,
    summary: 'Because LSU 2019 was involved in several wild high-scoring shootouts against Top-10 SEC opponents (46-41 at Alabama, 45-38 at Texas), early season defensive lapses occasionally surrendered back-door covers before tightening up in the CFP.',
    keyGames: [
      { opponent: 'vs. Clemson (National Championship)', stage: 'CFP Championship', spread: 'LSU -5.5', result: 'Won 42-25', coverMargin: '+11.5', covered: true },
      { opponent: 'vs. Oklahoma (Peach Bowl)', stage: 'CFP Semifinal', spread: 'LSU -13.5', result: 'Won 63-28', coverMargin: '+21.5', covered: true },
      { opponent: 'at Alabama', stage: 'Regular Season', spread: 'LSU +5.5', result: 'Won 46-41', coverMargin: '+10.5', covered: true },
      { opponent: 'vs. Auburn', stage: 'Regular Season', spread: 'LSU -11.0', result: 'Won 23-20', coverMargin: '-8.0', covered: false }
    ]
  },
  georgia: {
    atsWinRate: 60.0,
    atsRecord: '9-6',
    avgCoverMargin: 4.4,
    valueGameWinRate: 66.7,
    valueGameRecord: '4-2',
    marketCorrectionSlope: 'Moderate (+5.0 pt adjustment)',
    marketInefficiencyRank: 3,
    summary: 'Georgia 2022 was favored by 20+ points in most regular-season contests. While they had occasional flat spots (vs Kent State, Missouri), they systematically crushed marquee spreads, capped by covering a -13.5 spread by +44.5 in the national championship.',
    keyGames: [
      { opponent: 'vs. TCU (National Championship)', stage: 'CFP Championship', spread: 'UGA -13.5', result: 'Won 65-7', coverMargin: '+44.5', covered: true },
      { opponent: 'vs. Ohio State (Peach Bowl)', stage: 'CFP Semifinal', spread: 'UGA -6.0', result: 'Won 42-41', coverMargin: '-5.0', covered: false },
      { opponent: 'vs. Tennessee', stage: 'Regular Season', spread: 'UGA -9.5', result: 'Won 27-13', coverMargin: '+4.5', covered: true },
      { opponent: 'vs. Oregon (Chick-fil-A Kickoff)', stage: 'Week 1', spread: 'UGA -16.5', result: 'Won 49-3', coverMargin: '+29.5', covered: true }
    ]
  },
  michigan: {
    atsWinRate: 53.3,
    atsRecord: '8-7',
    avgCoverMargin: 4.8,
    valueGameWinRate: 50.0,
    valueGameRecord: '3-3',
    marketCorrectionSlope: 'Gradual (+4.0 pt adjustment)',
    marketInefficiencyRank: 4,
    summary: 'Michigan 2023’s ball-control, run-heavy tempo created fewer possessions per game (around 9-10 drives vs 12-14 for spread teams). Consequently, large 28+ point spreads in non-conference games were rarely covered, but they held firm in tight postseason lines.',
    keyGames: [
      { opponent: 'vs. Washington (National Championship)', stage: 'CFP Championship', spread: 'UM -4.5', result: 'Won 34-13', coverMargin: '+16.5', covered: true },
      { opponent: 'vs. Alabama (Rose Bowl)', stage: 'CFP Semifinal', spread: 'UM -2.0', result: 'Won 27-20 (OT)', coverMargin: '+5.0', covered: true },
      { opponent: 'vs. Ohio State', stage: 'Regular Season', spread: 'UM -3.0', result: 'Won 30-24', coverMargin: '+3.0', covered: true },
      { opponent: 'vs. Iowa (Big Ten Title)', stage: 'Conference Title', spread: 'UM -21.5', result: 'Won 26-0', coverMargin: '+4.5', covered: true }
    ]
  }
};

export const HEAD_TO_HEAD_INSIGHTS: Record<Exclude<TeamKey, 'indiana'>, HeadToHeadInsight> = {
  alabama: {
    opponentKey: 'alabama',
    opponentName: 'Alabama',
    opponentYear: 2020,
    primaryTakeaway: 'Machine Efficiency Alignment with Superior Scoring Defense',
    insights: [
      {
        title: 'Efficiency Parity',
        text: 'Indiana (+0.52 Net EPA/play) virtually mirrors Alabama (+0.53 Net EPA/play) in overall play-by-play execution efficiency.',
        metric: '+0.52 vs. +0.53 Net EPA'
      },
      {
        title: 'Defensive Separation',
        text: 'While Alabama scored more points per game (48.5 PPG vs. IU\'s 41.6 PPG), Indiana allowed 7.7 fewer points per game (11.7 PAPG vs. Alabama\'s 19.4 PAPG).',
        metric: '11.7 vs. 19.4 PAPG (-7.7)'
      },
      {
        title: 'Scoring Differential',
        text: 'Indiana produces a slightly higher overall scoring margin per game (+29.9 vs. Alabama\'s +29.1).',
        metric: '+29.9 vs. +29.1 Margin'
      }
    ]
  },
  lsu: {
    opponentKey: 'lsu',
    opponentName: 'LSU',
    opponentYear: 2019,
    primaryTakeaway: 'Systematic Efficiency vs. Historic Elite-Opponent Résumé',
    insights: [
      {
        title: 'The Résumé Edge',
        text: 'LSU 2019 holds a clear advantage in top-tier opponent resistance with 7 Top-25 wins (including 4 Top-10 wins) compared to Indiana\'s 4 Top-25 wins.',
        metric: '7 vs. 4 Top-25 Wins'
      },
      {
        title: 'On-Field Dominance',
        text: 'Indiana posts a higher Net Efficiency Z-score (4.63 vs. LSU\'s 3.85) and a higher net EPA per play (+0.52 vs. LSU\'s +0.47).',
        metric: '4.63 vs. 3.85 Net Z'
      },
      {
        title: 'Defensive Suppression',
        text: 'Indiana surrendered 10.17 fewer points per game than LSU\'s 2019 defense (11.7 PAPG vs. 21.87 PAPG).',
        metric: '11.7 vs. 21.9 PAPG (-10.2)'
      }
    ]
  },
  georgia: {
    opponentKey: 'georgia',
    opponentName: 'Georgia',
    opponentYear: 2022,
    primaryTakeaway: 'High-Octane Modern Outlier vs. Line-of-Scrimmage Champion',
    insights: [
      {
        title: 'Offensive Output Edge',
        text: 'Indiana matches Georgia\'s scoring defense pedigree while outscoring Georgia\'s offense (41.6 PPG vs. Georgia\'s 41.1 PPG).',
        metric: '41.6 vs. 41.1 PPG'
      },
      {
        title: 'Efficiency Margin',
        text: 'Indiana achieves a noticeable advantage in Net EPA per play (+0.52 vs. Georgia\'s +0.41) and Net Efficiency Z-score (4.63 vs. Georgia\'s 3.06).',
        metric: '+0.52 vs. +0.41 Net EPA'
      },
      {
        title: 'Market Superiority',
        text: 'Indiana significantly outperformed Georgia against betting spreads, posting a 75.0% ATS win rate compared to Georgia\'s 60.0%.',
        metric: '75.0% vs. 60.0% ATS'
      }
    ]
  },
  michigan: {
    opponentKey: 'michigan',
    opponentName: 'Michigan',
    opponentYear: 2023,
    primaryTakeaway: 'Hybrid Offensive Machine vs. Pure Defensive Lockdown',
    insights: [
      {
        title: 'Defensive Lockdown Duel',
        text: 'Michigan 2023 held the edge in raw points allowed per game (10.4 PAPG vs. Indiana\'s 11.7 PAPG), but Indiana generated a higher defensive EPA allowed (-0.18 vs. Michigan\'s -0.14).',
        metric: '10.4 vs. 11.7 PAPG / -0.18 Def EPA'
      },
      {
        title: 'Offensive Gap',
        text: 'Indiana’s offense generated 5.7 more points per game (41.6 PPG vs. Michigan\'s 35.87 PPG) and higher offensive yards per play (6.8 YPP vs. Michigan\'s 6.2 YPP).',
        metric: '41.6 vs. 35.9 PPG (+5.7)'
      },
      {
        title: 'Scoring Differential',
        text: 'Indiana generated a larger average scoring margin (+29.9 vs. Michigan\'s +25.47).',
        metric: '+29.9 vs. +25.5 Margin'
      }
    ]
  }
};
