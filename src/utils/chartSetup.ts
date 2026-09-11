import {
  Chart as ChartJS,
  registerables,
  ChartConfiguration
} from 'chart.js';

// Register all controllers, elements, scales, and plugins from Chart.js
ChartJS.register(...registerables);

// Configure global dark mode defaults
ChartJS.defaults.color = '#a1a1aa';
ChartJS.defaults.font.family = 'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif';

let isRegistered = true;

export function ensureChartRegistered() {
  if (!isRegistered) {
    ChartJS.register(...registerables);
    isRegistered = true;
  }
}

/**
 * Safely creates a chart on a canvas element, destroying any existing chart
 * associated with that canvas first to prevent "Canvas is already in use" errors.
 */
export function safeCreateChart(
  canvas: HTMLCanvasElement | null,
  config: ChartConfiguration
): ChartJS | null {
  if (!canvas) return null;
  const existingChart = ChartJS.getChart(canvas);
  if (existingChart) {
    existingChart.destroy();
  }
  return new ChartJS(canvas, config);
}

export { ChartJS };
