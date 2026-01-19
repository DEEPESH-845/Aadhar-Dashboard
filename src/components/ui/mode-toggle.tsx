"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
	const { setTheme, theme, systemTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<Button variant="outline" size="icon">
				<Sun className="h-[1.2rem] w-[1.2rem]" />
				<span className="sr-only">Toggle theme</span>
			</Button>
		);
	}

	const currentTheme = theme === "system" ? systemTheme : theme;

	const handleThemeChange = (newTheme: string) => {
		setTheme(newTheme);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="theme-toggle-button relative overflow-hidden hover:scale-105 transition-all duration-300 ease-out"
				>
					<Sun
						className={`h-[1.2rem] w-[1.2rem] transition-all duration-700 ease-out transform-gpu ${
							currentTheme === "dark"
								? "rotate-90 scale-0 opacity-0"
								: "rotate-0 scale-100 opacity-100"
						}`}
					/>
					<Moon
						className={`absolute inset-0 h-[1.2rem] w-[1.2rem] m-auto transition-all duration-700 ease-out transform-gpu ${
							currentTheme === "dark"
								? "rotate-0 scale-100 opacity-100"
								: "rotate-90 scale-0 opacity-0"
						}`}
					/>
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="theme-dropdown-glass min-w-[140px] p-2"
				sideOffset={8}
			>
				<DropdownMenuItem
					onClick={() => handleThemeChange("light")}
					className={`${theme === "light" ? "active" : ""} text-sm font-medium`}
				>
					<span className="mr-2 text-base">☀️</span>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => handleThemeChange("dark")}
					className={`${theme === "dark" ? "active" : ""} text-sm font-medium`}
				>
					<span className="mr-2 text-base">🌙</span>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => handleThemeChange("system")}
					className={`${theme === "system" ? "active" : ""} text-sm font-medium`}
				>
					<span className="mr-2 text-base">💻</span>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
