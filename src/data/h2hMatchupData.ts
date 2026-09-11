import { TeamKey } from '../types';

export interface H2HAnalysisPoint {
  category: 'Offense vs Defense' | 'Efficiency & EPA' | 'Situational & Red Zone' | 'Strength of Schedule' | 'Market & Vegas';
  title: string;
  summary: string;
  deepDive: string;
  indianaStat: string;
  opponentStat: string;
  edge: 'indiana' | 'opponent' | 'even';
}

export interface H2HTapeItem {
  metric: string;
  indianaVal: string;
  opponentVal: string;
  advantage: 'indiana' | 'opponent' | 'even';
  difference?: string;
  explanation: string;
}

export interface DetailedMatchup {
  opponentKey: Exclude<TeamKey, 'indiana'>;
  opponentName: string;
  opponentYear: number;
  matchupTitle: string;
  tagline: string;
  narrativeClash: string;
  indianaArchetype: string;
  opponentArchetype: string;
  indianaWinCondition: string;
  opponentWinCondition: string;
  xFactor: string;
  tacticalVerdict: string;
  projectedScore: {
    indiana: number;
    opponent: number;
    winProb: number;
    spread: string;
    total: number;
  };
  tape: H2HTapeItem[];
  analysisPoints: H2HAnalysisPoint[];
}

export const H2H_MATCHUPS: Record<Exclude<TeamKey, 'indiana'>, DetailedMatchup> = {
  alabama: {
    opponentKey: 'alabama',
    opponentName: 'Alabama',
    opponentYear: 2020,
    matchupTitle: 'Indiana 2025 vs. Alabama 2020',
    tagline: 'The Modern Two-Way Hybrid vs. The RPO Airborne Firepower Zenith',
    indianaArchetype: 'The Modern Hybrid (Suffocating Defense + Machine Execution)',
    opponentArchetype: 'Explosive Offense Engine (All-Time Collegiate Airborne Firepower)',
    narrativeClash:
      'Indiana (16-0) and Alabama (13-0) represent the two most dominant single-season scoring margins in CFP history (+29.9 vs +29.1). Alabama\'s offense generated an unmatched modern mark of +0.41 EPA/play behind Heisman winner DeVonta Smith, Mac Jones, and Najee Harris. However, Indiana’s defense was in a completely different statistical echelon, surrendering just 11.7 PAPG (-0.18 EPA allowed) compared to Alabama’s 19.4 PAPG (-0.12 EPA allowed).',
    indianaWinCondition:
      'Disrupt Mac Jones with disguised simulated pressures (18.2% havoc rate), bottle up inside zone to Najee Harris, and sustain 6+ minute touchdown drives that shorten possessions and test Alabama’s depth.',
    opponentWinCondition:
      'Scheme DeVonta Smith into boundary one-on-one isolations, hit quick-strike RPO slants behind the linebackers, and force Indiana into an uncomfortable shootout pace above 35 points.',
    xFactor:
      'Indiana’s #1 Red-Zone TD Defense (allowed touchdowns on only 38.2% of red-zone trips) vs. Alabama’s historic 84.1% Red-Zone TD Conversion rate.',
    tacticalVerdict:
      'In a neutral-field championship clash, Indiana’s +0.52 Net EPA per play and staggering 7.7-point defensive margin offset Alabama’s explosive per-drive yardage, giving Indiana the edge in a tightly contested, four-quarter battle.',
    projectedScore: {
      indiana: 33,
      opponent: 31,
      winProb: 55,
      spread: 'IU -2.0',
      total: 64
    },
    tape: [
      {
        metric: 'Scoring Margin / Game',
        indianaVal: '+29.9',
        opponentVal: '+29.1',
        advantage: 'indiana',
        difference: '+0.8 pts/gm',
        explanation: 'Indiana outscored opponents by an average of nearly 30 points across 16 full contests.'
      },
      {
        metric: 'Points Allowed / Game',
        indianaVal: '11.7',
        opponentVal: '19.4',
        advantage: 'indiana',
        difference: '-7.7 pts allowed',
        explanation: 'Indiana surrendered over a full touchdown fewer points per contest than the Crimson Tide.'
      },
      {
        metric: 'Points Scored / Game',
        indianaVal: '41.6',
        opponentVal: '48.5',
        advantage: 'opponent',
        difference: '+6.9 pts scored',
        explanation: 'Alabama’s 2020 offense holds the scoring record for undefeated national champions in the CFP era.'
      },
      {
        metric: 'Net EPA / Play',
        indianaVal: '+0.52',
        opponentVal: '+0.53',
        advantage: 'even',
        difference: '~0.01 Net EPA',
        explanation: 'Both teams achieved almost identical net expected value generation per snap from scrimmage.'
      },
      {
        metric: 'Adjusted Net Efficiency Z-Score',
        indianaVal: '4.63',
        opponentVal: '4.10',
        advantage: 'indiana',
        difference: '+0.53 Z-score',
        explanation: 'Indiana’s normalized standard-deviation performance across both offense and defense is #1 in the dataset.'
      },
      {
        metric: 'Against The Spread (ATS)',
        indianaVal: '75.0% (12-4)',
        opponentVal: '61.5% (8-5)',
        advantage: 'indiana',
        difference: '+13.5% cover rate',
        explanation: 'Indiana beat market expectations by an average of +9.2 points compared to Alabama’s +4.1 cover margin.'
      },
      {
        metric: 'Strength of Schedule (SOS)',
        indianaVal: '#28',
        opponentVal: '#10',
        advantage: 'opponent',
        difference: '+18 rank gap',
        explanation: 'Alabama played an exclusive 11-game SEC schedule before the College Football Playoff.'
      }
    ],
    analysisPoints: [
      {
        category: 'Offense vs Defense',
        title: 'Indiana’s Split-Safety Shell vs. The DeVonta Smith Dilemma',
        summary: 'Indiana’s coverage discipline directly counters Alabama’s staple RPO boundary isolations.',
        deepDive:
          'Steve Sarkisian’s 2020 offense feasted on single-high man coverage, allowing Mac Jones to hit DeVonta Smith on rub routes and glance routes. Indiana’s defensive structure features two-high split-safety shells with late post-snap rotations, specifically designed to eliminate explosive boundary passing (surrendering only 8.4% passing explosion rate, #2 nationally). To move the chains, Alabama would have to patiently check down and grind out 10+ play drives.',
        indianaStat: '11.7 PAPG (#2 all-time) • -0.18 Def EPA/play',
        opponentStat: '48.5 PPG (#1 all-time) • +0.41 Off EPA/play',
        edge: 'even'
      },
      {
        category: 'Efficiency & EPA',
        title: 'Down-by-Down Efficiency Parity',
        summary: 'Two distinct tactical pathways yielding virtually identical net per-play dominance.',
        deepDive:
          'Alabama’s +0.53 Net EPA was heavily offense-skewed (+0.41 Off EPA / -0.12 Def EPA allowed), whereas Indiana generated a balanced +0.52 Net EPA (+0.34 Off EPA / -0.18 Def EPA allowed). While Alabama gained more yards per play (7.80 vs 6.80 YPP), Indiana’s defense suppressed opponent success rates to 31.4% (vs Alabama allowing 34.1%), proving that Indiana’s defense was significantly harder to stay on schedule against.',
        indianaStat: '+0.52 Net EPA • 52.1% Off / 31.4% Def Success',
        opponentStat: '+0.53 Net EPA • 54.2% Off / 34.1% Def Success',
        edge: 'indiana'
      },
      {
        category: 'Situational & Red Zone',
        title: 'The Ultimate Red-Zone Leverage Battle',
        summary: 'Alabama’s 84.1% touchdown rate collides with Indiana’s stingy 38.2% touchdown suppression.',
        deepDive:
          'Alabama converted 84.1% of red zone appearances into touchdowns behind Najee Harris’s power running and jump balls to DeVonta Smith. Indiana, conversely, led the entire nation in holding red-zone opponents to field goals (allowing touchdowns on only 38.2% of possessions inside the 20). If Indiana turns two Alabama red-zone trips into field goals instead of touchdowns, that 8-point swing represents the difference in the ballgame.',
        indianaStat: '38.2% Opponent RZ TD rate allowed (#1 FBS)',
        opponentStat: '84.1% Offensive RZ TD conversion (#1 FBS)',
        edge: 'indiana'
      },
      {
        category: 'Strength of Schedule',
        title: 'Gauntlet Testing vs. 16-Game Attrition',
        summary: 'Alabama survived an all-SEC regular season, while Indiana conquered a 16-game gauntlet.',
        deepDive:
          'Alabama supporters point to the grueling all-SEC slate (#10 SOS) with wins over Florida, Georgia, Texas A&M, and Notre Dame. However, Indiana is the first modern champion to navigate a 16-0 season, requiring peak physical endurance through an expanded four-round playoff with zero bye-week pauses.',
        indianaStat: '16 Games Played • #28 SOS • 4 Top-25 Wins',
        opponentStat: '13 Games Played • #10 SOS • 5 Top-25 Wins',
        edge: 'opponent'
      },
      {
        category: 'Market & Vegas',
        title: 'Vegas Market Valuation Gap',
        summary: 'Vegas consistently underestimated Indiana by double the margin of Alabama.',
        deepDive:
          'Alabama covered 61.5% of its spreads with a +4.1 average cover margin, reflecting a well-known powerhouse that sportsbooks priced accurately. Indiana’s 75.0% cover rate and +9.2 average cover margin proved that institutional models chronically lagged Indiana’s true dominance by nearly double digits every Saturday.',
        indianaStat: '75.0% ATS • +9.2 Avg Cover Margin • 87.5% Value Rate',
        opponentStat: '61.5% ATS • +4.1 Avg Cover Margin • 62.5% Value Rate',
        edge: 'indiana'
      }
    ]
  },

  lsu: {
    opponentKey: 'lsu',
    opponentName: 'LSU',
    opponentYear: 2019,
    matchupTitle: 'Indiana 2025 vs. LSU 2019',
    tagline: 'The Statistical Efficiency Machine vs. The Historic Gauntlet Crown',
    indianaArchetype: 'The Modern Hybrid (Two-Way Suffocation & Discipline)',
    opponentArchetype: 'Explosive Pass Engine (Joe Burrow & Historic Wide Receiver Duo)',
    narrativeClash:
      'The foundational philosophical debate of modern college football analytics. LSU 2019 holds the ultimate battle-tested résumé: 7 Top-25 wins and 4 Top-10 victories against college football royalty. However, Indiana 2025 outclasses LSU in every down-by-down machine metric: a 4.63 Net Z-Score vs LSU’s 3.85, higher Net EPA (+0.52 vs +0.47), and a staggering 10.2-point gap in defensive scoring suppression (11.7 PAPG vs LSU’s 21.9 PAPG allowed).',
    indianaWinCondition:
      'Win the field-position battle, score on 50%+ of possessions against LSU’s vulnerable secondary, and unleash 4-man pressure to avoid dedicating 7 coverage players to Burrow.',
    opponentWinCondition:
      'Joe Burrow plays an immaculate game, targeting Ja\'Marr Chase and Justin Jefferson on deep choice routes, racing to an early two-touchdown lead that eliminates Indiana’s ground-and-pound balance.',
    xFactor:
      'Defensive Scoring Chasm: LSU surrendered 38 points to Vanderbilt, 41 to Alabama, and 37 to Ole Miss. Can LSU’s defense get enough stops against Indiana’s methodical offense?',
    tacticalVerdict:
      'While LSU’s passing apex is legendary, their defense surrendered 21.9 points per game. Indiana’s +29.9 scoring margin and complete lack of defensive vulnerabilities makes them the mathematically superior all-around football team.',
    projectedScore: {
      indiana: 34,
      opponent: 30,
      winProb: 58,
      spread: 'IU -3.5',
      total: 64
    },
    tape: [
      {
        metric: 'Points Allowed / Game',
        indianaVal: '11.7',
        opponentVal: '21.9',
        advantage: 'indiana',
        difference: '-10.2 pts allowed',
        explanation: 'Indiana allowed less than half of LSU’s per-game scoring concession.'
      },
      {
        metric: 'Scoring Margin / Game',
        indianaVal: '+29.9',
        opponentVal: '+26.5',
        advantage: 'indiana',
        difference: '+3.4 pts/gm',
        explanation: 'Indiana outscored opponents by over 3 points more per contest than LSU 2019.'
      },
      {
        metric: 'Points Scored / Game',
        indianaVal: '41.6',
        opponentVal: '48.4',
        advantage: 'opponent',
        difference: '+6.8 pts scored',
        explanation: 'Joe Burrow’s 60-touchdown offense produced the highest single-season scoring total in history.'
      },
      {
        metric: 'Adjusted Net Efficiency Z-Score',
        indianaVal: '4.63',
        opponentVal: '3.85',
        advantage: 'indiana',
        difference: '+0.78 Z-score',
        explanation: 'Indiana dramatically outperforms LSU in composite standard-deviation efficiency.'
      },
      {
        metric: 'Wins vs. Final AP Top 25',
        indianaVal: '4',
        opponentVal: '7',
        advantage: 'opponent',
        difference: '+3 ranked wins',
        explanation: 'LSU defeated Clemson, Alabama, Georgia, Oklahoma, Florida, Auburn, and Texas.'
      },
      {
        metric: 'Net EPA / Play',
        indianaVal: '+0.52',
        opponentVal: '+0.47',
        advantage: 'indiana',
        difference: '+0.05 Net EPA',
        explanation: 'Indiana’s stingy defense creates a higher net per-play expected points differential.'
      },
      {
        metric: 'Defensive EPA Allowed',
        indianaVal: '-0.18',
        opponentVal: '-0.09',
        advantage: 'indiana',
        difference: '2x suppression',
        explanation: 'Indiana suppressed opponent scoring equity per snap at twice the rate of LSU’s defense.'
      }
    ],
    analysisPoints: [
      {
        category: 'Offense vs Defense',
        title: 'The 10.2-Point Defensive Chasm',
        summary: 'Indiana’s defense is an impenetrable wall; LSU’s defense required frequent shootout saves.',
        deepDive:
          'LSU’s 2019 offense had to play in shootouts because its defense was ordinary during the regular season, allowing 21.9 points per game and conceding +0.09 EPA per snap. Indiana held 10 of its 16 opponents to 10 points or fewer, including shutting down elite offenses in the postseason. Against an Indiana offense that scored 41.6 PPG and rarely turned the ball over, LSU’s defense would be stressed on every single drive.',
        indianaStat: '11.7 PAPG • 10 games with ≤10 pts allowed',
        opponentStat: '21.9 PAPG • 4 games surrendering 30+ pts',
        edge: 'indiana'
      },
      {
        category: 'Efficiency & EPA',
        title: 'Machine Z-Score Superiority',
        summary: 'Indiana posts a 4.63 Net Z-score versus LSU’s 3.85.',
        deepDive:
          'When normalizing performance relative to the national FBS baseline, Indiana ranks higher (+4.63 standard deviations) than LSU (+3.85). This is because LSU’s defensive Z-score was only +1.10 (above average, but far from historic), whereas Indiana’s defensive Z-score (+2.15) ranks alongside the great defensive teams of the 21st century.',
        indianaStat: '4.63 Net Z (Off 2.48 / Def 2.15)',
        opponentStat: '3.85 Net Z (Off 2.75 / Def 1.10)',
        edge: 'indiana'
      },
      {
        category: 'Strength of Schedule',
        title: 'LSU’s Crown: The Unmatched Gauntlet Résumé',
        summary: 'LSU navigated the toughest schedule in modern history with 7 Top-25 wins.',
        deepDive:
          'This is where LSU holds its most potent argument. LSU played the #11 SOS, beating four teams ranked in the top four at game time. Indiana faced a #28 SOS with four Top-25 wins. While Indiana crushed its opponents by wider margins, LSU proved its mettle in hostile road venues against the sport’s most talented rosters.',
        indianaStat: '4 Top-25 Wins • #28 SOS • +15.5 Margin vs Top 25',
        opponentStat: '7 Top-25 Wins • #11 SOS • +24.1 Margin vs Top 25',
        edge: 'opponent'
      },
      {
        category: 'Situational & Red Zone',
        title: '4th Quarter Score Differential',
        summary: 'Indiana’s conditioning resulted in an unmatched +11.8 fourth-quarter scoring margin.',
        deepDive:
          'Indiana pulled away in the fourth quarter in virtually every competitive contest, outscoring opponents 142-34 across the final 15 minutes of games. LSU frequently took its foot off the gas or traded late touchdowns in 46-41 or 42-28 contests.',
        indianaStat: '+11.8 4th Quarter point differential per game',
        opponentStat: '+4.2 4th Quarter point differential per game',
        edge: 'indiana'
      },
      {
        category: 'Market & Vegas',
        title: 'Institutional Market Pricing Disparity',
        summary: 'LSU covered barely 53% of its games; Indiana covered 75%.',
        deepDive:
          'LSU went 8-7 ATS (53.3%), with an average cover margin of just +1.8 points, because the public aggressively bet Burrow’s offense every week. Indiana went 12-4 ATS (75.0%) with a +9.2 cover margin, representing the single most profitable betting team in modern championship history.',
        indianaStat: '75.0% ATS • +9.2 Avg Cover Margin • +147.2 Inefficiency Gap',
        opponentStat: '53.3% ATS • +1.8 Avg Cover Margin • +27.0 Inefficiency Gap',
        edge: 'indiana'
      }
    ]
  },

  georgia: {
    opponentKey: 'georgia',
    opponentName: 'Georgia',
    opponentYear: 2022,
    matchupTitle: 'Indiana 2025 vs. Georgia 2022',
    tagline: 'The Two-Way Machine vs. The Line-of-Scrimmage Bully',
    indianaArchetype: 'The Modern Hybrid (Spread Discipline + Interior Push)',
    opponentArchetype: 'Line-of-Scrimmage Balance (Generational Tight Ends & Trench Depth)',
    narrativeClash:
      'Georgia 2022 represents the gold standard of NFL-caliber interior talent, punctuated by Stetson Bennett, Brock Bowers, and a 65-7 national championship decimation of TCU. Indiana 2025 matches Georgia’s defensive stinginess (11.7 vs 14.3 PAPG) while providing higher per-play offensive efficiency (+0.34 vs +0.31 Off EPA) and superior net scoring separation (+29.9 vs +26.8).',
    indianaWinCondition:
      'Neutralize Georgia’s 12-personnel intermediate seams with physical nickel brackets, avoid long down-and-distances, and use tempo to prevent Georgia from rotating its massive 330-pound defensive linemen.',
    opponentWinCondition:
      'Impose physical will at the line of scrimmage, establish Kenny McIntosh and Daijun Edwards between the tackles, and use Brock Bowers off play-action to create chunk gains over the middle.',
    xFactor:
      'Third-Down Conversion Battle: Indiana converted 52.1% on 3rd down while holding opponents to 28.6%. Georgia converted 51.5% while allowing 31.8%.',
    tacticalVerdict:
      'Georgia holds the edge in sheer 5-star roster depth, but Indiana’s +0.52 Net EPA and historically disciplined execution (Big Ten low in sacks allowed and penalties) gives them the tactical edge to control tempo and secure a victory.',
    projectedScore: {
      indiana: 28,
      opponent: 23,
      winProb: 61,
      spread: 'IU -4.0',
      total: 51
    },
    tape: [
      {
        metric: 'Scoring Margin / Game',
        indianaVal: '+29.9',
        opponentVal: '+26.8',
        advantage: 'indiana',
        difference: '+3.1 pts/gm',
        explanation: 'Indiana’s net scoring dominance was over 3 points per contest wider than Georgia’s.'
      },
      {
        metric: 'Points Allowed / Game',
        indianaVal: '11.7',
        opponentVal: '14.3',
        advantage: 'indiana',
        difference: '-2.6 pts allowed',
        explanation: 'Indiana allowed 2.6 fewer points per game than Kirby Smart’s legendary defense.'
      },
      {
        metric: 'Points Scored / Game',
        indianaVal: '41.6',
        opponentVal: '41.1',
        advantage: 'indiana',
        difference: '+0.5 pts scored',
        explanation: 'Indiana slightly outpaced Georgia’s high-powered Todd Monken offense in scoring.'
      },
      {
        metric: 'Adjusted Net Efficiency Z-Score',
        indianaVal: '4.63',
        opponentVal: '3.06',
        advantage: 'indiana',
        difference: '+1.57 Z-score',
        explanation: 'Indiana’s normalized machine index is substantially higher than Georgia 2022.'
      },
      {
        metric: 'Net EPA / Play',
        indianaVal: '+0.52',
        opponentVal: '+0.46',
        advantage: 'indiana',
        difference: '+0.06 Net EPA',
        explanation: 'Indiana produced higher net expected points added per play from scrimmage.'
      },
      {
        metric: 'Defensive Success Rate Allowed',
        indianaVal: '31.4%',
        opponentVal: '35.5%',
        advantage: 'indiana',
        difference: '-4.1% allowed',
        explanation: 'Opponents found it significantly harder to stay ahead of the chains against Indiana.'
      },
      {
        metric: 'Against The Spread (ATS)',
        indianaVal: '75.0%',
        opponentVal: '60.0%',
        advantage: 'indiana',
        difference: '+15.0% cover rate',
        explanation: 'Indiana covered spreads at a 15% higher frequency throughout the season.'
      }
    ],
    analysisPoints: [
      {
        category: 'Offense vs Defense',
        title: 'The 12-Personnel Dilemma vs. Indiana’s Hybrid Safeties',
        summary: 'How Indiana schemes against the Brock Bowers / Darnell Washington mismatch package.',
        deepDive:
          'Georgia’s offense built its identity around 12-personnel, forcing opposing defenses to declare heavy base personnel (which Bowers beat with receiver routes) or nickel personnel (which Georgia gashed with power runs). Indiana’s defensive flexibility features versatile 215-lb hybrid safeties who can set the edge against tight end blocks and seamlessly carry seams in match-quarters coverage, limiting the explosive chunk plays Georgia feasted on.',
        indianaStat: '11.7 PAPG • 31.4% Def Success Rate Allowed',
        opponentStat: '41.1 PPG • Todd Monken pro-style scheme',
        edge: 'indiana'
      },
      {
        category: 'Efficiency & EPA',
        title: 'Net Per-Play Margin Advantage',
        summary: 'Indiana’s +0.52 Net EPA outpaces Georgia’s +0.46.',
        deepDive:
          'While Georgia produced impressive raw stats bolstered by a 65-7 national title blowout of TCU, its regular season included close calls against Missouri (26-22) and Kentucky (16-6), as well as a 42-41 shootout against Ohio State. Indiana maintained steady down-by-down dominance in every game, never trailing in the 4th quarter all season.',
        indianaStat: '+0.52 Net EPA • 4.63 Net Z-Score',
        opponentStat: '+0.46 Net EPA • 3.06 Net Z-Score',
        edge: 'indiana'
      },
      {
        category: 'Situational & Red Zone',
        title: 'Trench Protection and Negative Play Avoidance',
        summary: 'Indiana allowed the lowest tackle-for-loss rate in the Big Ten.',
        deepDive:
          'Georgia’s defense lived on negative plays created by Jalen Carter and Nazir Stackhouse. Indiana’s offensive line was the best in the nation at preventing havoc, allowing a sack on just 2.1% of dropbacks. By staying ahead of the chains and avoiding 3rd-and-long situations, Indiana would neutralize Georgia’s ferocious pass rush.',
        indianaStat: '2.1% Sack Rate Allowed • 3.4 TFLs conceded/game',
        opponentStat: '7.8 TFLs generated/game by Georgia defense',
        edge: 'indiana'
      },
      {
        category: 'Strength of Schedule',
        title: 'Ranked Wins & Postseason Blowout Record',
        summary: 'Georgia owns the most dominant championship game victory in history (+58).',
        deepDive:
          'Georgia’s résumé is highlighted by 5 Top-25 wins and the greatest championship blowout in the history of college football (65-7 vs TCU). Georgia was battle-tested in the SEC and proved capable of winning in both 16-6 slugfests and 42-41 shootouts.',
        indianaStat: '4 Top-25 Wins • +15.5 margin vs Top 25',
        opponentStat: '5 Top-25 Wins • +24.8 margin vs Top 25',
        edge: 'opponent'
      },
      {
        category: 'Market & Vegas',
        title: 'Market Pricing Stability',
        summary: 'Georgia covered 9 of 15 games; Indiana covered 12 of 16.',
        deepDive:
          'Georgia’s average cover margin was +4.4 points, as oddsmakers routinely set lines of 24+ points in SEC matchups. Indiana beat closing lines by an astonishing +9.2 points per contest.',
        indianaStat: '75.0% ATS • +9.2 Cover Margin • 7-1 Value Games',
        opponentStat: '60.0% ATS • +4.4 Cover Margin • 4-2 Value Games',
        edge: 'indiana'
      }
    ]
  },

  michigan: {
    opponentKey: 'michigan',
    opponentName: 'Michigan',
    opponentYear: 2023,
    matchupTitle: 'Indiana 2025 vs. Michigan 2023',
    tagline: 'The Complete Two-Way Machine vs. The Trench Lockdown Fortress',
    indianaArchetype: 'The Modern Hybrid (Suffocating Defense + 41.6 PPG Offense)',
    opponentArchetype: 'Defensive Lockdown (Smothering Trench Defense + Clock Control)',
    narrativeClash:
      'A monumental clash between the two premier defensive units of the playoff era. Michigan 2023 captured the national title allowing an astounding 10.4 points per game while controlling clock with Blake Corum and J.J. McCarthy. Indiana 2025 allowed virtually the exact same stingy defensive total (11.7 PAPG) while pairing it with an offense scoring nearly a full touchdown more per game (41.6 PPG vs Michigan’s 35.9 PPG).',
    indianaWinCondition:
      'Load the box with 8-man fronts on early downs to bottle up Blake Corum, force J.J. McCarthy into 3rd-and-7+ passing situations, and hit quick perimeter screen passes to stretch Michigan’s split-safety secondary.',
    opponentWinCondition:
      'Control time of possession, grind out 7-minute touchdown drives with power runs behind Zak Zinter and Trevor Keegan, and force Indiana into catastrophic turnovers with disguises in the secondary.',
    xFactor:
      'The 5.7 PPG Offensive Gap: Can Michigan score enough points against Indiana’s defense (11.7 PAPG) to keep pace if Indiana scores in the high 20s?',
    tacticalVerdict:
      'While Michigan holds the slight edge in raw PAPG (10.4 vs 11.7), Indiana’s offensive explosiveness (6.8 vs 6.2 YPP) and higher net EPA per play (+0.52 vs +0.41) gives Indiana the dynamic scoring firepower to break a defensive stalemate.',
    projectedScore: {
      indiana: 24,
      opponent: 17,
      winProb: 65,
      spread: 'IU -5.5',
      total: 41
    },
    tape: [
      {
        metric: 'Points Scored / Game',
        indianaVal: '41.6',
        opponentVal: '35.9',
        advantage: 'indiana',
        difference: '+5.7 pts scored',
        explanation: 'Indiana’s offense generated nearly a full touchdown more per game than Michigan’s run-heavy attack.'
      },
      {
        metric: 'Points Allowed / Game',
        indianaVal: '11.7',
        opponentVal: '10.4',
        advantage: 'opponent',
        difference: '+1.3 pts allowed',
        explanation: 'Michigan holds the CFP era record for lowest points conceded per contest.'
      },
      {
        metric: 'Scoring Margin / Game',
        indianaVal: '+29.9',
        opponentVal: '+25.5',
        advantage: 'indiana',
        difference: '+4.4 pts/gm',
        explanation: 'Indiana’s net scoring differential surpassed Michigan’s by over four points per game.'
      },
      {
        metric: 'Defensive EPA Allowed',
        indianaVal: '-0.18',
        opponentVal: '-0.14',
        advantage: 'indiana',
        difference: '-0.04 EPA/play',
        explanation: 'Despite allowing 1.3 more PPG due to tempo, Indiana was more negative per snap.'
      },
      {
        metric: 'Offensive EPA / Play',
        indianaVal: '+0.34',
        opponentVal: '+0.24',
        advantage: 'indiana',
        difference: '+0.10 Off EPA',
        explanation: 'Indiana was vastly more explosive and efficient on a per-play offensive basis.'
      },
      {
        metric: 'Turnover Margin / Game',
        indianaVal: '+0.69',
        opponentVal: '+1.00',
        advantage: 'opponent',
        difference: '+0.31 margin',
        explanation: 'Michigan generated 15 net takeaways, anchoring their championship formula.'
      },
      {
        metric: 'Adjusted Net Efficiency Z-Score',
        indianaVal: '4.63',
        opponentVal: '3.36',
        advantage: 'indiana',
        difference: '+1.27 Z-score',
        explanation: 'Indiana holds a massive edge in normalized machine efficiency across both phases.'
      }
    ],
    analysisPoints: [
      {
        category: 'Offense vs Defense',
        title: 'The 5.7 PPG Offensive Production Gap',
        summary: 'Indiana’s scoring diversity provides the margin in a defensive duel.',
        deepDive:
          'Both defenses are legendary: Michigan surrendered 10.4 PAPG, Indiana surrendered 11.7 PAPG. The differentiating factor is on offense. Michigan relied on a slow, deliberate ground attack (35.9 PPG, 6.2 YPP). Indiana operated with spread tempo, modern play-action, and precise boundary passing, averaging 41.6 PPG and 6.8 YPP. In a 60-minute game, Indiana has far more ways to generate points against elite defenses.',
        indianaStat: '41.6 PPG • 6.8 Offensive Yards / Play',
        opponentStat: '35.9 PPG • 6.2 Offensive Yards / Play',
        edge: 'indiana'
      },
      {
        category: 'Efficiency & EPA',
        title: 'Per-Snap Defensive EPA Anomaly',
        summary: 'Why Indiana allowed a lower defensive EPA per snap despite higher PAPG.',
        deepDive:
          'Michigan played in games with an average of only 58 offensive plays per team (clock-grinding ball control), limiting raw point volume. Indiana played at a higher pace (68 plays per team). When normalized on a per-play basis, Indiana’s defensive EPA allowed was -0.18 compared to Michigan’s -0.14, proving Indiana was actually stingier down-by-down against opposing offenses.',
        indianaStat: '-0.18 Def EPA allowed (#1 in dataset)',
        opponentStat: '-0.14 Def EPA allowed',
        edge: 'indiana'
      },
      {
        category: 'Situational & Red Zone',
        title: 'Turnover Margin and Ball Security',
        summary: 'Michigan’s +1.00 turnover margin was their superpower.',
        deepDive:
          'Michigan’s championship was forged on ball security and taking advantage of opponent errors (+15 net turnovers on the season). Indiana was also exceptional (+0.69 turnover margin per game), rarely giving away free possessions. In a game with fewer than 10 possessions each, a single interception or strip sack could swing the outcome.',
        indianaStat: '+0.69 Turnover Margin • 1.1% Interception rate',
        opponentStat: '+1.00 Turnover Margin • +15 net takeaways',
        edge: 'opponent'
      },
      {
        category: 'Strength of Schedule',
        title: 'Big Ten Heavyweights & Playoff Crucible',
        summary: 'Michigan beat Ohio State, Penn State, Alabama, and Washington.',
        deepDive:
          'Michigan’s final five games were a historic gauntlet: at Penn State, vs Ohio State, Big Ten Championship, Rose Bowl vs Alabama, and CFP Final vs Washington. They proved their defensive formula could stop every style of offense in college football.',
        indianaStat: '4 Top-25 Wins • #28 SOS • Big Ten Champions',
        opponentStat: '6 Top-25 Wins • #11 SOS • Rose Bowl Champions',
        edge: 'opponent'
      },
      {
        category: 'Market & Vegas',
        title: 'Pacing Distortion on Betting Spreads',
        summary: 'Michigan struggled to cover large spreads due to slow tempo.',
        deepDive:
          'Because Michigan played at such a slow tempo with few possessions, they frequently won by 21-24 points in games where the spread was 28+, resulting in a modest 53.3% ATS cover rate. Indiana’s explosive scoring allowed them to cover 75.0% of lines.',
        indianaStat: '75.0% ATS • +9.2 Cover Margin • +147.2 Net Points',
        opponentStat: '53.3% ATS • +4.8 Cover Margin • +72.0 Net Points',
        edge: 'indiana'
      }
    ]
  }
};
