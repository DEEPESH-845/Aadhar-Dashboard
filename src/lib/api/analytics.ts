

// 1. Define strict types for your API response
export interface AnalyticsDataPoint {
  date: string;
  revenue: number;
  visitors: number;
}

export interface AnalyticsResponse {
  data: AnalyticsDataPoint[];
  summary: {
    totalRevenue: number;
    growth: number; // percentage
  };
}

// 2. Simulator for "Real" Data Fetching
// In a real app, this would be your `fetch('https://api.yourservice.com/...')`
export async function fetchAnalyticsData(range: '7d' | '30d' | '90d'): Promise<AnalyticsResponse> {
  // Simulate network delay for realistic "loading" state
  await new Promise((resolve) => setTimeout(resolve, 800));

  const days = range === '7d' ? 7 : range === '30d' ? 30 : 90;
  const data: AnalyticsDataPoint[] = [];
  const today = new Date();

  // Generate realistic trend data
  let baseRevenue = 1000;
  for (let i = days; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    
    // Add some "randomness" to simulate real trends
    const randomFluctuation = Math.random() * 500 - 200; 
    baseRevenue = Math.max(200, baseRevenue + randomFluctuation);

    data.push({
      date: d.toISOString().split('T')[0], // YYYY-MM-DD
      revenue: Math.floor(baseRevenue),
      visitors: Math.floor(baseRevenue / 2.5),
    });
  }

  return {
    data,
    summary: {
      totalRevenue: data.reduce((acc, curr) => acc + curr.revenue, 0),
      growth: Math.floor(Math.random() * 20) - 5, // Random growth -5% to +15%
    },
  };
}