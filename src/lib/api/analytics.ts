"use server";

import fs from "fs/promises";
import path from "path";

// 1. Define strict types for your API response
export interface AnalyticsDataPoint {
  date: string;
  revenue: number; // Mapping Age 17+ to 'revenue' for chart compatibility
  visitors: number; // Mapping Age 5-17 to 'visitors' for chart compatibility
  original_district?: string;
}

export interface AnalyticsResponse {
  data: AnalyticsDataPoint[];
  summary: {
    totalRevenue: number;
    growth: number; // percentage
  };
}

// 2. Real Data Fetching from CSV
export async function fetchAnalyticsData(range: '7d' | '30d' | '90d'): Promise<AnalyticsResponse> {
  try {
    const filePath = "/Users/deepesh/documents/Dashboard/excelFILES/api_data_aadhar_demographic_1500000_2000000.csv";
    const fileContent = await fs.readFile(filePath, "utf-8");
    
    // Parse CSV
    const rows = fileContent.split("\n").slice(1); // Skip header
    const dataMap = new Map<string, { age17plus: number; age5to17: number }>();
    
    // Filter by date range
    const today = new Date("2025-11-18"); // Based on CSV data found (18-11-2025)
    const cutoffDate = new Date(today);
    const rangeDays = range === '7d' ? 7 : range === '30d' ? 30 : 90;
    cutoffDate.setDate(cutoffDate.getDate() - rangeDays);

    rows.forEach(row => {
      const columns = row.split(",");
      if (columns.length < 5) return;

      const dateStr = columns[0].trim(); // DD-MM-YYYY
      let district = columns[2]?.trim() || "";
      const age5to17 = parseInt(columns[4]?.trim() || "0", 10);
      const age17plus = parseInt(columns[5]?.trim() || "0", 10);

      // Clean district name (remove *)
      district = district.replace(/\s*\*/g, "");

      // Parse date DD-MM-YYYY
      const [day, month, year] = dateStr.split("-").map(Number);
      const rowDate = new Date(year, month - 1, day);

      if (rowDate >= cutoffDate && rowDate <= today) {
        // Convert back to YYYY-MM-DD for consistency
        const dateKey = rowDate.toISOString().split("T")[0];
        
        if (!dataMap.has(dateKey)) {
          dataMap.set(dateKey, { age17plus: 0, age5to17: 0 });
        }
        
        const entry = dataMap.get(dateKey)!;
        entry.age17plus += age17plus;
        entry.age5to17 += age5to17;
      }
    });

    const data: AnalyticsDataPoint[] = Array.from(dataMap.entries())
      .map(([date, counts]) => ({
        date,
        revenue: counts.age17plus,
        visitors: counts.age5to17
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const totalAge17Plus = data.reduce((acc, curr) => acc + curr.revenue, 0);

    return {
      data,
      summary: {
        totalRevenue: totalAge17Plus,
        growth: Math.floor(Math.random() * 20) - 5, // Keep simulated for now
      },
    };
  } catch (error) {
    console.error("Error reading CSV:", error);
    // Fallback to empty data or simulated if file fails
    return {
      data: [],
      summary: { totalRevenue: 0, growth: 0 }
    };
  }
}