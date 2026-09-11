import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '5mb' }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Ground Truth Knowledge Base for the AI
const CHAMPIONSHIP_DATA_DOSSIER = `
### OFFICIAL CHAMPIONSHIP TITANS DATA DOSSIER (2019-2025)

You are the AI Intelligence Engine for the "Indiana 2025 vs. Historical Titans Intelligence Suite".
Your knowledge is grounded strictly in this dataset comparing the 5 modern undefeated national champions:
1. Indiana Hoosiers (2025): 16-0 (Big Ten Champ, CFP National Champ)
   - Offense: 41.6 PPG, 6.8 YPP, +0.34 Off EPA/play, 52.1% Offensive Success Rate
   - Defense: 11.7 PAPG, 4.7 Def YPP, -0.18 Def EPA/play (Most suffocating in modern era), 31.4% Def Success Rate Allowed
   - Net Metrics: +29.9 Scoring Margin/game (#1 all-time modern), +2.1 Net Yards/play, +0.52 Net EPA/play (#2)
   - Advanced Metrics: 4.63 Adjusted Net Efficiency Z-Score (#1 all-time), +11.8 4th Quarter Point Differential (#1), 38.2% Red Zone TD Concession Rate (#1)
   - Betting Market: 75.0% ATS Win Rate (12-4 record, #1), +9.2 pts Average Cover Margin (#1), +147.2 Net Cover Points (#1), 87.5% Value-Game Win Rate (7-1 in single-digit lines)
   - Schedule/Resume: 4 Top-25 wins, 3 Top-10 wins, +15.5 Margin vs Top-25, #28 SOS Rank
   - Turnover Margin: +0.69 per game (11 giveaways, 22 takeaways)
   - Tactical Identity: Curt Cignetti modern hybrid machine; suffocating split-safety defense, hyper-efficient situational execution, zero mental mistakes.

2. Alabama Crimson Tide (2020): 13-0 (SEC Champ, CFP National Champ)
   - Offense: 48.5 PPG (#1), 7.8 YPP (#1), +0.41 Off EPA/play, 54.8% Success Rate. RPO juggernaut with Mac Jones, DeVonta Smith (Heisman), Najee Harris.
   - Defense: 19.4 PAPG, 5.0 Def YPP, -0.12 Def EPA/play, 35.1% Def Success Rate Allowed.
   - Net Metrics: +29.1 Scoring Margin/game, +2.8 Net Yards/play (#1), +0.53 Net EPA/play (#1).
   - Advanced: 4.12 Net Z-score, 84.1% Red Zone TD Rate.
   - Market: 69.2% ATS (9-4), +7.1 cover margin.
   - Schedule: #3 SOS, 6 Top-25 wins.

3. LSU Tigers (2019): 15-0 (SEC Champ, CFP National Champ)
   - Offense: 48.4 PPG, 7.9 YPP, +0.45 Off EPA/play (#1 historical ceiling), 57.8% Success Rate. Joe Burrow, Ja'Marr Chase, Justin Jefferson, Clyde Edwards-Helaire.
   - Defense: 21.9 PAPG (lowest among champions), 5.1 Def YPP, -0.08 Def EPA/play, 38.9% Def Success Rate Allowed.
   - Net Metrics: +23.6 Scoring Margin, +2.8 Net Yards/play, +0.37 Net EPA/play.
   - Advanced: 3.85 Net Z-score.
   - Market: 66.7% ATS (10-5), +4.8 cover margin.
   - Schedule: #1 SOS (All-Time Gauntlet), 7 Top-25 wins.

4. Georgia Bulldogs (2022): 15-0 (SEC Champ, CFP National Champ)
   - Offense: 41.1 PPG, 7.0 YPP, +0.33 Off EPA/play, 51.5% Success Rate. Stetson Bennett, Brock Bowers, Ladd McConkey.
   - Defense: 14.3 PAPG, 4.8 Def YPP, -0.13 Def EPA/play, 32.2% Def Success Rate Allowed. Jalen Carter interior trench bully.
   - Net Metrics: +26.8 Scoring Margin, +2.2 Net Yards/play, +0.46 Net EPA/play.
   - Advanced: 3.91 Net Z-score.
   - Market: 53.3% ATS (8-7), +2.1 cover margin.
   - Schedule: #8 SOS, 5 Top-25 wins.

5. Michigan Wolverines (2023): 15-0 (Big Ten Champ, CFP National Champ)
   - Offense: 35.9 PPG, 6.2 YPP, +0.24 Off EPA/play, 48.2% Success Rate. J.J. McCarthy, Blake Corum. Ball-control grind.
   - Defense: 10.4 PAPG (#1 scoring defense), 4.3 Def YPP (#1), -0.14 Def EPA/play, 30.8% Def Success Rate Allowed. Trench lockdown.
   - Net Metrics: +25.5 Scoring Margin, +1.9 Net Yards/play, +0.38 Net EPA/play.
   - Advanced: 3.74 Net Z-score, +1.00 Turnover Margin/game (#1).
   - Market: 60.0% ATS (9-6), +3.4 cover margin.
   - Schedule: #14 SOS, 4 Top-25 wins.

### HEAD-TO-HEAD VERDICTS ON NEUTRAL FIELD:
- Indiana 2025 vs Alabama 2020: Indiana 34, Alabama 31 (Indiana 52.8% win prob, Indiana -1.5). Indiana's 7.7 PAPG defensive advantage and red-zone TD clamp (38.2% vs 84.1%) edges Alabama's airborne explosiveness.
- Indiana 2025 vs LSU 2019: Indiana 38, LSU 35 (Indiana 54.2% win prob, Indiana -2.5). Indiana's defense is 10.2 points sturdier; Indiana's +11.8 4th quarter margin wears down LSU's thinner defense.
- Indiana 2025 vs Georgia 2022: Indiana 28, Georgia 24 (Indiana 55.4% win prob, Indiana -3.0). Indiana's low 2.1% sack rate neutralizes Georgia's pass rush; Indiana's +0.52 Net EPA edges Georgia's +0.46.
- Indiana 2025 vs Michigan 2023: Indiana 24, Michigan 20 (Indiana 58.1% win prob, Indiana -3.5). Indiana matches Michigan's defensive brutality (-0.18 vs -0.14 EPA allowed) but possesses 5.7 PPG more offensive juice.

### KEY GLOSSARY TERMS:
- EPA (Expected Points Added): Points added over situational expectation per play.
- Net EPA: Offensive EPA/play minus opponent EPA/play allowed. Indiana is +0.52.
- Net Efficiency Z-Score: Statistical standard deviations above FBS average combining offense, defense, and special teams. Indiana leads at 4.63.
- Cover Margin: Average points beat point spread by. Indiana is +9.2.
- ATS (Against The Spread): Percentage covered. Indiana is 75.0% (12-4).
`;

// System Instruction Generator for Specific Roles
function getRoleSystemInstruction(role: 'analyst' | 'tactician' | 'vegas'): string {
  const baseInstruction = `
You are the interactive AI Intelligence Analyst for the "Indiana 2025 vs. Historical Titans Intelligence Suite" (property of CreativeTech.Studio).
You answer user questions by directly citing and analyzing the official championship dataset provided in your dossier.
Always maintain high intellectual rigor, objective analysis, and provide specific empirical numbers (e.g., margins, EPA values, ATS covers, Z-scores).
Format responses with clean Markdown: use bolding for metrics, bullet points for key arguments, and small comparative tables when contrasting teams.
`;

  switch (role) {
    case 'analyst':
      return `${baseInstruction}
YOUR ROLE: Lead CFB Analytics Director.
Focus on: Per-play efficiency, Expected Points Added (EPA), Success Rates, Standard Deviation Z-Scores, and mathematical sustainability. Compare Indiana's balanced net efficiency (+0.52 EPA, 4.63 Z-score) against single-phase outliers.`;

    case 'tactician':
      return `${baseInstruction}
YOUR ROLE: Game-Day Tactical Coordinator.
Focus on: Schematic matchups, 11 vs 12 personnel groupings, pass protection vs exotic blitzes, two-high split safety vs boundary RPO, red-zone play design, 4th quarter conditioning, and situational football.`;

    case 'vegas':
      return `${baseInstruction}
YOUR ROLE: Vegas Syndicate & Betting Market Sharp.
Focus on: Closing line value (CLV), Point Spreads, ATS records, Cover Margins, market inefficiencies, why bookmakers chronically underpriced Indiana 2025 (+9.2 avg cover), and value games.`;

    default:
      return baseInstruction;
  }
}

// API Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, role = 'analyst', model = 'gemini-3.5-flash' } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Valid messages array is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
      // Graceful fallback response when API key is not yet set
      return res.status(200).json({
        reply: `**AI Studio Intelligence Engine**: Please ensure \`GEMINI_API_KEY\` is configured in your Settings panel for live AI responses.\n\n*Verified Ledger Facts for Your Query*:\n\n- **Indiana 2025**: 16-0, +29.9 Scoring Margin (#1 all-time), 11.7 PAPG, -0.18 Def EPA (modern lockdown benchmark), 75.0% ATS (+9.2 cover margin), 4.63 Net Z-Score.\n- **Alabama 2020**: 13-0, +29.1 Margin, 48.5 PPG (#1 offense), +0.53 Net EPA.\n- **LSU 2019**: 15-0, +23.6 Margin, 48.4 PPG, #1 SOS (7 Top-25 wins).\n- **Georgia 2022**: 15-0, +26.8 Margin, 14.3 PAPG, +0.46 Net EPA.\n- **Michigan 2023**: 15-0, +25.5 Margin, 10.4 PAPG (#1 scoring defense), +1.00 Turnover Margin.\n\n*Head-to-head simulations and all 70+ ledger attributes are always live across the suite tabs.*`,
        modelUsed: 'data-ledger-engine'
      });
    }

    // Lazy initialization of GoogleGenAI SDK
    const ai = new GoogleGenAI({ apiKey });

    // Validate and select allowed model
    const allowedModels = ['gemini-3.5-flash', 'gemini-3.1-flash-lite', 'gemini-3.1-pro-preview'];
    const chosenModel = allowedModels.includes(model) ? model : 'gemini-3.5-flash';

    const systemInstruction = `${getRoleSystemInstruction(role)}\n\n${CHAMPIONSHIP_DATA_DOSSIER}`;

    // Convert client conversation history to SDK contents format
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: chosenModel,
      contents,
      config: {
        systemInstruction,
        temperature: 0.3,
        maxOutputTokens: 1500
      }
    });

    const replyText = response.text || 'No response generated from the intelligence model.';

    return res.status(200).json({
      reply: replyText,
      modelUsed: chosenModel,
      roleUsed: role
    });
  } catch (error: any) {
    console.error('Error generating AI response in /api/chat:', error);
    return res.status(200).json({
      reply: `⚠️ **AI Intelligence Alert**: ${error?.message || 'Unable to connect to Gemini API.'}\n\n*Verified Dataset Highlights*:\n- **Indiana 2025**: 16-0, +29.9 scoring margin (#1 modern era), 11.7 PAPG, -0.18 Def EPA, 75.0% ATS (+9.2 avg cover), 4.63 Net Z-Score.\n- **Alabama 2020**: 13-0, 48.5 PPG (#1 offense), +0.53 Net EPA (#1).\n- **LSU 2019**: 15-0, 48.4 PPG, #1 SOS (7 Top-25 wins).\n- **Georgia 2022**: 15-0, 14.3 PAPG, +0.46 Net EPA.\n- **Michigan 2023**: 15-0, 10.4 PAPG (#1 defense), +1.00 Turnover Margin.`,
      modelUsed: 'offline-ledger'
    });
  }
});

// Start Express Server with Vite integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Championship Intelligence Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
