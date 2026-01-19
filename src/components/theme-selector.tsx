
"use client"

import { useThemeConfig } from "./active-theme"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const DEFAULT_THEMES = [
  {
    name: "Default",
    value: "default",
  },
  {
    name: "Blue",
    value: "blue",
  },
  {
    name: "Green",
    value: "green",
  },
  {
    name: "Amber",
    value: "amber",
  },
]

const SCALED_THEMES = [
  {
    name: "Default",
    value: "default-scaled",
  },
  {
    name: "Blue",
    value: "blue-scaled",
  },
]

const MONO_THEMES = [
  {
    name: "Mono",
    value: "mono-scaled",
  },
]

export function ThemeSelector() {
  const { activeTheme, setActiveTheme } = useThemeConfig()

  return (
		<div className="flex items-center  gap-2">
			<Label htmlFor="theme-selector" className="sr-only ">
				Theme
			</Label>
			<Select value={activeTheme} onValueChange={setActiveTheme}>
				<SelectTrigger
					id="theme-selector"
					size="sm"
					className="justify-start *:data-[slot=select-value]:w-12"
				>
					<span className="hidden sm:block">Select a theme:</span>
					<span className="block sm:hidden">Theme</span>
					<SelectValue placeholder="Select a theme" />
				</SelectTrigger>
				<SelectContent
					align="end"
					className="!bg-zinc-800 !border-zinc-300 !text-zinc-00 !hover:bg-amber-400"
				>
					<SelectGroup>
						{DEFAULT_THEMES.map((theme) => (
							<SelectItem
								key={theme.name}
								value={theme.value}
								className="focus:bg-zinc-700 focus:text-white"
							>
								{theme.name}
							</SelectItem>
						))}
					</SelectGroup>
					<SelectSeparator className="bg-zinc-600" />
					<SelectGroup>
						<SelectLabel>Scaled</SelectLabel>
						{SCALED_THEMES.map((theme) => (
							<SelectItem
								key={theme.name}
								value={theme.value}
								className="focus:bg-zinc-700 focus:text-white"
							>
								{theme.name}
							</SelectItem>
						))}
					</SelectGroup>
					<SelectGroup>
						<SelectLabel>Monospaced</SelectLabel>
						{MONO_THEMES.map((theme) => (
							<SelectItem
								key={theme.name}
								value={theme.value}
								className="focus:bg-zinc-700 focus:text-white"
							>
								{theme.name}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}
