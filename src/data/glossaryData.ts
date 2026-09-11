import { GlossaryTerm, GlossaryCategory } from '../types';

export const GLOSSARY_CATEGORIES: { id: GlossaryCategory; label: string; description: string }[] = [
  {
    id: 'all',
    label: 'All Terms',
    description: 'Complete alphabetical glossary of analytical, statistical, and market terminology'
  },
  {
    id: 'efficiency',
    label: 'Advanced Efficiency',
    description: 'Expected Points Added, Success Rates, and normalized Z-Scores'
  },
  {
    id: 'scoring',
    label: 'Scoring & Traditional',
    description: 'Points per game, points allowed, scoring differentials, and yards per play'
  },
  {
    id: 'market',
    label: 'Market & Betting',
    description: 'Against-the-spread win rates, cover margins, and market inefficiency gaps'
  },
  {
    id: 'resume',
    label: 'Résumé & Strength of Schedule',
    description: 'Opponent strength, ranked victories, and performance vs. winning teams'
  },
  {
    id: 'tactics',
    label: 'Tactics & Situational',
    description: 'Havoc rates, red zone conversion, personnel groupings, and archetypes'
  }
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'epa',
    term: 'Expected Points Added',
    acronym: 'EPA',
    category: 'efficiency',
    formula: 'EPA = EP_after - EP_before',
    definition:
      'A football analytics metric that measures the net value of an individual play based on how it changes the expected scoring value for the offense, taking into account down, distance, field position, and time remaining.',
    whyItMatters:
      'Raw yardage totals are misleading because a 3-yard gain on 3rd & 2 creates massive expected scoring value (+1.2 EPA), whereas a 7-yard gain on 3rd & 15 is largely useless (-0.8 EPA). EPA isolates true play-by-play execution.',
    indianaContext:
      'Indiana 2025 generated +0.34 offensive EPA per play, ranking alongside the elite offensive champions of the modern era.',
    benchmarkContext:
      'Alabama 2020 (+0.41) and LSU 2019 (+0.38) set the all-time modern offensive ceiling, but both surrendered significantly higher defensive EPA than Indiana.'
  },
  {
    id: 'def-epa',
    term: 'Defensive EPA Allowed',
    acronym: 'Def EPA',
    category: 'efficiency',
    formula: 'Opponent Total EPA / Opponent Offensive Snaps (Inverted)',
    definition:
      'The average expected points allowed to opposing offenses per snap. More negative values represent superior defensive execution and greater opponent scoring suppression.',
    whyItMatters:
      'Isolates a defense\'s down-by-down suppression rate independent of game tempo or the total number of possessions allowed to the opponent.',
    indianaContext:
      'Indiana held opponents to -0.18 EPA per play allowed, which is the #1 stingiest defensive mark among all five examined champions.',
    benchmarkContext:
      'Michigan 2023 allowed -0.14 EPA/play; Georgia 2022 allowed -0.13 EPA/play; Alabama 2020 allowed -0.12 EPA/play; LSU 2019 allowed -0.09 EPA/play.'
  },
  {
    id: 'net-epa',
    term: 'Net EPA Per Play',
    acronym: 'Net EPA',
    category: 'efficiency',
    formula: 'Offensive EPA/play - Defensive EPA/play allowed',
    definition:
      'The net per-play differential between how much expected value a team\'s offense creates and how much value its defense suppresses.',
    whyItMatters:
      'The premier down-by-down barometer of net team superiority. Eliminates tempo differences to compare fast-paced spread teams against ground-and-pound ball-control teams on an even playing field.',
    indianaContext:
      'Indiana generated a +0.52 net EPA per play differential (+0.34 off minus -0.18 def allowed).',
    benchmarkContext:
      'Virtually ties Alabama 2020 (+0.53 net EPA) and comfortably leads LSU 2019 (+0.47), Georgia 2022 (+0.41), and Michigan 2023 (+0.38).'
  },
  {
    id: 'net-z-score',
    term: 'Net Efficiency Z-Score',
    acronym: 'Net Z',
    category: 'efficiency',
    formula: 'Z = (Team Net Metric - FBS Average) / Standard Deviation',
    definition:
      'A statistical measure that expresses how many standard deviations above the national FBS mean a team performs across combined offensive, defensive, and special teams efficiency, normalized for opponent difficulty.',
    whyItMatters:
      'Because scoring environments and national averages fluctuate across different seasons, Z-scores standardize performance so teams from 2019, 2020, 2022, 2023, and 2025 can be objectively compared.',
    indianaContext:
      'Indiana posted a composite Net Efficiency Z-score of 4.63, the highest mark recorded in the 5-team historical dataset.',
    benchmarkContext:
      'LSU 2019 scored 3.85 Z; Alabama 2020 scored 4.41 Z; Georgia 2022 scored 3.06 Z; Michigan 2023 scored 3.24 Z.'
  },
  {
    id: 'success-rate',
    term: 'Success Rate',
    acronym: 'SR',
    category: 'efficiency',
    formula: '% of plays gaining 50% on 1st down, 70% on 2nd down, or 100% on 3rd/4th down',
    definition:
      'The percentage of offensive plays that satisfy contextual yardage benchmarks: picking up at least half of the needed yards on 1st down, 70% of remaining yards on 2nd down, and converting fully on 3rd or 4th down.',
    whyItMatters:
      'Measures consistency and rhythm versus reliance on erratic long-yardage big plays. Teams with high success rates consistently stay ahead of the chains and sustain long touchdown drives.',
    indianaContext:
      'Offensive Success Rate: 52.4%. Defensive Success Rate allowed: 31.4% (#1 in the entire dataset).',
    benchmarkContext:
      'Indiana\'s 31.4% defensive success rate allowed edged Michigan 2023 (32.8%) and Georgia 2022 (33.1%).'
  },
  {
    id: 'scoring-margin',
    term: 'Scoring Margin',
    acronym: 'Diff / Margin',
    category: 'scoring',
    formula: 'Points Scored Per Game - Points Allowed Per Game',
    definition:
      'The average point differential by which a team outscored its opponents across all completed regular season, conference championship, and postseason contests.',
    whyItMatters:
      'Historically, point differential is the strongest single correlation with championship dominance; blowing out opponents consistently indicates a championship team operating at an elite level.',
    indianaContext:
      'Indiana 2025 finished with a +29.9 scoring margin per game (41.6 PPG scored vs. 11.7 PAPG allowed).',
    benchmarkContext:
      'Leads all modern champions: Alabama 2020 (+29.1), LSU 2019 (+26.5), Georgia 2022 (+26.8), and Michigan 2023 (+25.5).'
  },
  {
    id: 'papg',
    term: 'Points Allowed Per Game',
    acronym: 'PAPG',
    category: 'scoring',
    formula: 'Total Points Conceded / Total Games Played',
    definition:
      'The average number of points scored by opposing teams against a defense over the full season schedule.',
    whyItMatters:
      'The gold standard traditional metric for assessing defensive lockdown capability. In the modern high-scoring era, holding opponents under 14 PAPG is exceptionally rare.',
    indianaContext:
      'Indiana allowed just 11.7 points per game across 16 games, surrendering 10 or fewer points in 10 separate contests.',
    benchmarkContext:
      'Michigan 2023 was stingiest at 10.4 PAPG, while LSU 2019 allowed 21.87 PAPG and Alabama 2020 allowed 19.4 PAPG.'
  },
  {
    id: 'ppg',
    term: 'Points Per Game',
    acronym: 'PPG',
    category: 'scoring',
    formula: 'Total Points Scored / Total Games Played',
    definition:
      'The average number of points generated by a team\'s offense and special teams units per contest.',
    whyItMatters:
      'Reflects raw scoring potency, offensive explosiveness, and red zone execution.',
    indianaContext:
      'Indiana scored 41.6 points per game across 16 games, surpassing the 40-point threshold in 11 different matchups.',
    benchmarkContext:
      'Alabama 2020 (48.5 PPG) and LSU 2019 (48.4 PPG) set the scoring standard; Georgia scored 41.1 PPG and Michigan scored 35.87 PPG.'
  },
  {
    id: 'ats-win-rate',
    term: 'Against-the-Spread Win Rate',
    acronym: 'ATS',
    category: 'market',
    formula: '(Games Covered / Total Games with a Line) * 100',
    definition:
      'The percentage of games in which a team beat the pre-game point spread established by institutional sportsbooks.',
    whyItMatters:
      'Sports betting markets represent the collective wisdom of thousands of analysts and millions in capital. Sustained high ATS rates indicate that public and sharp betting markets chronically undervalued a team\'s true dominance.',
    indianaContext:
      'Indiana posted a 75.0% ATS win rate (12-4 record), the highest rate recorded by an undefeated national champion in the modern era.',
    benchmarkContext:
      'Alabama 2020 covered 69.2% (9-4); Georgia 2022 covered 60.0% (9-6); LSU 2019 covered 66.7% (10-5); Michigan 2023 covered 60.0% (9-6).'
  },
  {
    id: 'avg-cover-margin',
    term: 'Average Cover Margin',
    acronym: 'Cover Margin',
    category: 'market',
    formula: 'Average of: (Actual Margin of Victory - Vegas Closing Spread)',
    definition:
      'The average number of points per game by which a team outperformed (or failed to cover) the closing point spread.',
    whyItMatters:
      'A positive cover margin reveals not just whether a team covered, but by how many points it shattered bookmaker expectations. An average cover margin of +9.2 over 16 games indicates severe market lag.',
    indianaContext:
      'Indiana beat closing point spreads by an average of +9.2 points per contest.',
    benchmarkContext:
      'Alabama 2020 averaged +4.9 cover points; LSU 2019 averaged +5.4; Michigan 2023 averaged +3.8; Georgia 2022 averaged +2.6.'
  },
  {
    id: 'value-game-win-rate',
    term: 'Value-Game Win Rate',
    acronym: 'Value Rate',
    category: 'market',
    formula: 'ATS Win % in games with spreads ≤ 14 points or as an underdog',
    definition:
      'A team\'s ATS cover rate specifically isolated to competitive or high-leverage games—defined as games where the spread was 14 points or smaller, or where the team was an underdog.',
    whyItMatters:
      'Excludes non-conference blowout games where point spreads of 35+ points can produce distorted or meaningless fourth-quarter backdoor covers by backup players.',
    indianaContext:
      'Indiana went 7-1 ATS (87.5% win rate) in value games, including covering all four College Football Playoff matchups.',
    benchmarkContext:
      'No other champion in the dataset eclipsed 75% in value games: Alabama 2020 was 71.4% (5-2); LSU 2019 was 66.7% (6-3).'
  },
  {
    id: 'market-inefficiency-gap',
    term: 'Market Inefficiency Gap',
    acronym: 'MIG',
    category: 'market',
    formula: 'Sum of all individual cover margins across the full season',
    definition:
      'The cumulative net points covered against closing spreads over the entire season (+9.2 avg cover * 16 games = +147.2 points).',
    whyItMatters:
      'Demonstrates the total point volume by which betting institutions missed the team\'s actual capability over the course of an entire campaign.',
    indianaContext:
      'Indiana amassed +147.2 cumulative net cover points, indicating that sportsbooks would have lost massive equity siding against Indiana throughout 2025.',
    benchmarkContext:
      'Nearly double the second-highest team in the modern championship cohort (LSU 2019 at +81.5 net cover points).'
  },
  {
    id: 'strength-of-schedule',
    term: 'Strength of Schedule',
    acronym: 'SOS',
    category: 'resume',
    formula: 'National ranking composite combining opponent win %, opponent SOS, and location',
    definition:
      'A ranking of the overall difficulty of the opponents a team faced over the season. A lower number indicates a tougher schedule (e.g., #1 is the hardest schedule in the country).',
    whyItMatters:
      'The primary counter-argument to machine efficiency: did a team compile historic statistics against a gauntlet of powerhouse opponents, or against an unchallenging slate?',
    indianaContext:
      'Indiana ranked #28 in national SOS—a solid schedule, but noticeably lower than the SEC gauntlets faced by Alabama and LSU.',
    benchmarkContext:
      'Alabama 2020 ranked #10 in SOS; LSU 2019 ranked #11; Georgia 2022 ranked #18; Michigan 2023 ranked #33.'
  },
  {
    id: 'top-25-wins',
    term: 'Ranked Opponent Victories',
    acronym: 'Top-25 Wins',
    category: 'resume',
    formula: 'Number of victories against teams ranked in the AP/CFP Top 25 at game time / end of season',
    definition:
      'The total number of games won against nationally ranked opponents over the course of the season, including regular season, conference title games, and CFP rounds.',
    whyItMatters:
      'The most respected traditional credential for evaluating whether a championship team was truly battle-tested on the biggest stages.',
    indianaContext:
      'Indiana defeated 4 Top-25 opponents (including 2 Top-10 foes) en route to its 16-0 national championship.',
    benchmarkContext:
      'LSU 2019 set the historical standard with 7 Top-25 victories, including 4 Top-10 wins against Alabama, Georgia, Oklahoma, and Clemson.'
  },
  {
    id: 'quality-opponent-margin',
    term: 'Performance vs. .500+ Opponents',
    acronym: 'Margin vs .500+',
    category: 'resume',
    formula: 'Average point margin in games against teams with winning or .500 records',
    definition:
      'The average margin of victory strictly in games against opponents that finished the season with a .500 or better winning percentage.',
    whyItMatters:
      'Proves that a team\'s dominant scoring margin was not an illusion created by running up the score against non-Power-Four bottom-dwellers.',
    indianaContext:
      'Indiana maintained a +24.1 point scoring differential specifically against .500+ competition, demonstrating relentless separation against competent teams.',
    benchmarkContext:
      'Alabama 2020 (+26.2) and LSU 2019 (+23.4) performed similarly against quality competition.'
  },
  {
    id: 'havoc-rate',
    term: 'Havoc Rate',
    acronym: 'Havoc',
    category: 'tactics',
    formula: '(TFLs + Sacks + Pass Breakups + Interceptions + Forced Fumbles) / Total Opponent Snaps',
    definition:
      'The percentage of defensive snaps that result in a disruptive negative play: a tackle for loss, sack, pass defensed, or forced turnover.',
    whyItMatters:
      'Havoc measures whether a defense passively relies on opponent mistakes or actively forces the issue by living in the opponent\'s backfield.',
    indianaContext:
      'Indiana recorded an 18.2% defensive havoc rate, ranking in the top tier nationally and consistently forcing opponents into long-yardage down-and-distances.',
    benchmarkContext:
      'Michigan 2023 (17.5%) and Georgia 2022 (16.9%) relied on suffocating positional discipline alongside disciplined havoc.'
  },
  {
    id: 'red-zone-td-rate',
    term: 'Red Zone Touchdown Percentage',
    acronym: 'RZ TD%',
    category: 'tactics',
    formula: '(Red Zone Touchdowns / Total Red Zone Drives) * 100',
    definition:
      'The percentage of offensive drives entering the opponent\'s 20-yard line that result in a touchdown rather than a field goal or turnover.',
    whyItMatters:
      'Separates true championship offenses from "between-the-twenties" offenses that stall out when the field shrinks near the goal line.',
    indianaContext:
      'Indiana converted 79.4% of its red zone opportunities into touchdowns.',
    benchmarkContext:
      'Alabama 2020 set the modern gold standard at 84.1% with DeVonta Smith and Najee Harris.'
  },
  {
    id: 'championship-archetype',
    term: 'Championship Archetype',
    acronym: 'DNA Archetype',
    category: 'tactics',
    definition:
      'A conceptual framework classifying how national champions construct their title-winning seasons based on their dominant statistical signature.',
    whyItMatters:
      'Helps football fans and analysts understand that there are multiple distinct ways to build an all-time great team, from pure offense to pure defense to modern balance.',
    indianaContext:
      'Indiana 2025 embodies "The Modern Hybrid"—simultaneously fielding an elite defense (11.7 PAPG) and a high-efficiency offense producing an unmatched +29.9 scoring margin.',
    benchmarkContext:
      'LSU 2019 / Alabama 2020 represent the "Explosive Offense Engine"; Michigan 2023 represents "Pure Defensive Lockdown"; Georgia 2022 represents "Scrimmage Balance."'
  },
  {
    id: 'twelve-personnel',
    term: '12-Personnel',
    acronym: '12P',
    category: 'tactics',
    formula: '1 Running Back, 2 Tight Ends, 2 Wide Receivers',
    definition:
      'An offensive personnel package utilizing one running back and two tight ends on the field simultaneously.',
    whyItMatters:
      'Creates heavy run-blocking formations while testing defensive coordinators: if the defense responds with heavy base linebackers, the tight ends split out wide; if they respond with lighter defensive backs, the offense runs power.',
    indianaContext:
      'Indiana utilized versatile 11-personnel (3 WRs) with spread spacing and motion to create schematic leverage.',
    benchmarkContext:
      'Georgia 2022 famously mastered 12-personnel behind future NFL stars Brock Bowers and Darnell Washington.'
  },
  {
    id: 'yards-per-play',
    term: 'Yards Per Play',
    acronym: 'YPP',
    category: 'scoring',
    formula: 'Total Offensive Yards / Total Offensive Snaps',
    definition:
      'The average number of yards gained on every offensive play from scrimmage.',
    whyItMatters:
      'Eliminates tempo and possession counts to measure pure per-snap chunk gain capability.',
    indianaContext:
      'Indiana averaged 6.8 yards per play offensively while holding opponents to 4.4 yards per play defensively (a +2.4 net differential).',
    benchmarkContext:
      'LSU 2019 (7.8 YPP) and Alabama 2020 (7.7 YPP) hold the highest offensive marks in college football history.'
  }
];
