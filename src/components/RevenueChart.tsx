"use client";

import React, { useMemo } from "react";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	TooltipProps,
	XAxis,
	YAxis,
} from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnalyticsDataPoint } from "@/lib/api/analytics";

interface RevenueChartProps {
	data: AnalyticsDataPoint[];
	isLoading: boolean;
	growth: number;
	selectedRange: string;
}

// Custom Tooltip for that "Premium" look
const CustomTooltip: React.FC<TooltipProps<number,string>> = ({ active, payload, label } ) => {
	if (active && payload && payload.length) {
        const revenueData = payload[0];
				const visitorsData = payload[1];

		return (
			<div className="rounded-lg border bg-background/95 p-3 shadow-xl backdrop-blur-md">
				<p className="mb-2 text-xs font-medium text-muted-foreground">
					{new Date(label).toLocaleDateString("en-US", {
						month: "short",
						day: "numeric",
					})}
				</p>
				<div className="flex flex-col gap-1">
					<div className="flex items-center gap-2">
						<div className="h-2 w-2 rounded-full bg-primary" />
						<span className="text-sm font-bold text-foreground">
							${revenueData.value?.toLocaleString() ?? 0}
						</span>
						<span className="text-xs text-muted-foreground">Revenue</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="h-2 w-2 rounded-full bg-blue-400" />
						<span className="text-sm font-bold text-foreground">
							{visitorsData.value?.toLocaleString() ?? 0}
						</span>
						<span className="text-xs text-muted-foreground">Visitors</span>
					</div>
				</div>
			</div>
		);
	}
	return null;
};

export function RevenueChart({
	data,
	isLoading,
	growth,
	selectedRange,
}: RevenueChartProps) {
	// Format dates for X-Axis optimization (prevent overcrowding)
	const formattedData = useMemo(() => {
		return data.map((item) => ({
			...item,
			displayDate: new Date(item.date).toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
			}),
		}));
	}, [data]);

	if (isLoading) {
		return (
			<Card className="h-[400px] flex items-center justify-center">
				<div className="flex flex-col items-center gap-2">
					<div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
					<p className="text-sm text-muted-foreground">Loading Analytics...</p>
				</div>
			</Card>
		);
	}

	return (
		<Card className="col-span-4 shadow-sm">
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>
						<CardTitle>Revenue Overview</CardTitle>
						<CardDescription>
							Performance over the last{" "}
							{selectedRange === "7d"
								? "Week"
								: selectedRange === "30d"
									? "Month"
									: "Quarter"}
						</CardDescription>
					</div>
					<Badge
						variant={growth > 0 ? "default" : "destructive"}
						className="text-xs"
					>
						{growth > 0 ? "+" : ""}
						{growth}% vs prev period
					</Badge>
				</div>
			</CardHeader>
			<CardContent className="pl-0">
				<div className="h-[300px] w-full">
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart
							data={formattedData}
							margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
						>
							<defs>
								{/* Gradient for Revenue */}
								<linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
									<stop
										offset="5%"
										stopColor="hsl(var(--primary))"
										stopOpacity={0.3}
									/>
									<stop
										offset="95%"
										stopColor="hsl(var(--primary))"
										stopOpacity={0}
									/>
								</linearGradient>
								{/* Gradient for Visitors */}
								<linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3} />
									<stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
								</linearGradient>
							</defs>

							<CartesianGrid
								strokeDasharray="3 3"
								vertical={false}
								stroke="hsl(var(--border))"
							/>

							<XAxis
								dataKey="displayDate"
								stroke="#888888"
								fontSize={12}
								tickLine={false}
								axisLine={false}
								minTickGap={30}
							/>
							<YAxis
								stroke="#888888"
								fontSize={12}
								tickLine={false}
								axisLine={false}
								tickFormatter={(value) => `$${value}`}
							/>

							<Tooltip
								content={<CustomTooltip />}
								cursor={{ stroke: "hsl(var(--border))", strokeWidth: 2 }}
							/>

							<Area
								type="monotone"
								dataKey="visitors"
								stroke="#60a5fa"
								strokeWidth={2}
								fillOpacity={1}
								fill="url(#colorVisitors)"
							/>
							<Area
								type="monotone"
								dataKey="revenue"
								stroke="hsl(var(--primary))"
								strokeWidth={2}
								fillOpacity={1}
								fill="url(#colorRevenue)"
								activeDot={{ r: 6, strokeWidth: 0 }}
							/>
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	);
}
