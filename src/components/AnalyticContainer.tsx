"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchAnalyticsData, AnalyticsResponse } from "@/lib/api/analytics";
import { RevenueChart } from "./RevenueChart";

export function AnalyticsContainer() {
	const [range, setRange] = useState<"7d" | "30d" | "90d">("30d");
	const [data, setData] = useState<AnalyticsResponse | null>(null);
	const [loading, setLoading] = useState(true);

	// Fetch data whenever 'range' changes
	useEffect(() => {
		const loadData = async () => {
			setLoading(true);
			try {
				const result = await fetchAnalyticsData(range);
				setData(result);
			} catch (error) {
				console.error("Failed to fetch analytics:", error);
			} finally {
				setLoading(false);
			}
		};

		loadData();
	}, [range]);

	return (
		<div className="space-y-4">
			{/* Header with Controls */}
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-bold tracking-tight  pt-5 py-3">
					Business Analytics
				</h2>
				<Tabs
					defaultValue="30d"
					className="w-[400px]"
					onValueChange={(v) => setRange(v as "7d" | "30d" | "90d")}
				>
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="7d">7 Days</TabsTrigger>
						<TabsTrigger value="30d">30 Days</TabsTrigger>
						<TabsTrigger value="90d">3 Months</TabsTrigger>
					</TabsList>
				</Tabs>
			</div>

			{/* The Visual Component */}
			<RevenueChart
				data={data?.data || []}
				isLoading={loading}
				growth={data?.summary.growth || 0}
				selectedRange={range}
			/>
		</div>
	);
}