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
		const workforceData = payload.find(p => p.dataKey === "revenue");
		const studentData = payload.find(p => p.dataKey === "visitors");
		const total = (workforceData?.value as number || 0) + (studentData?.value as number || 0);

		return (
			<div className="rounded-lg border bg-background/95 p-3 shadow-xl backdrop-blur-md min-w-[200px]">
				<p className="mb-2 text-xs font-medium text-muted-foreground">
					{new Date(label).toLocaleDateString("en-US", {
						weekday: "short",
						month: "short",
						day: "numeric",
					})}
				</p>
				<div className="flex flex-col gap-2">
					{/* Workforce Verifications (Age 17+) */}
					<div className="flex items-center justify-between gap-4">
						<div className="flex items-center gap-2">
							<div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
							<span className="text-xs text-muted-foreground">Workforce Verifications</span>
						</div>
						<span className="text-sm font-bold text-foreground tabular-nums">
							{workforceData?.value?.toLocaleString() ?? 0}
						</span>
					</div>
					{/* Student Enrollments (Age 5-17) */}
					<div className="flex items-center justify-between gap-4">
						<div className="flex items-center gap-2">
							<div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
							<span className="text-xs text-muted-foreground">Student Enrollments</span>
						</div>
						<span className="text-sm font-bold text-foreground tabular-nums">
							{studentData?.value?.toLocaleString() ?? 0}
						</span>
					</div>
					{/* Total */}
					<div className="border-t pt-2 mt-1 flex items-center justify-between gap-4">
						<span className="text-xs font-medium text-muted-foreground">Total Biometrics</span>
						<span className="text-sm font-bold text-foreground tabular-nums">
							{total.toLocaleString()}
						</span>
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
						<CardTitle>Biometric Update Analytics</CardTitle>
						<CardDescription>
							Workforce vs Student biometric registrations over the last{" "}
							{selectedRange === "7d"
								? "7 days"
								: selectedRange === "30d"
									? "30 days"
									: "90 days"}
						</CardDescription>
					</div>
					<Badge
						variant={growth > 0 ? "default" : "destructive"}
						className="text-xs"
					>
						{growth > 0 ? "↑" : "↓"} {Math.abs(growth)}% vs prev period
					</Badge>
				</div>
			</CardHeader>
			<CardContent className="pl-0 pr-4">
				<div className="h-[420px] w-full">
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart
							data={formattedData}
							margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
						>
							<defs>
								{/* Gradient for Workforce (Age 17+) - Emerald Green */}
								<linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
									<stop
										offset="5%"
										stopColor="#10b981"
										stopOpacity={0.4}
									/>
									<stop
										offset="95%"
										stopColor="#10b981"
										stopOpacity={0.05}
									/>
								</linearGradient>
								{/* Gradient for Students (Age 5-17) - Blue */}
								<linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
									<stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
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
								tickFormatter={(value) => `${value}`}
							/>

							<Tooltip
								content={<CustomTooltip />}
								cursor={{ stroke: "hsl(var(--border))", strokeWidth: 2 }}
							/>

							<Area
								type="monotone"
								dataKey="visitors"
								stroke="#3b82f6"
								strokeWidth={2.5}
								fillOpacity={1}
								fill="url(#colorVisitors)"
							/>
							<Area
								type="monotone"
								dataKey="revenue"
								stroke="#10b981"
								strokeWidth={2.5}
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
