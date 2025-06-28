import { Link, useLocation } from "react-router-dom"
import {
    Sidebar,
    SidebarContent,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
} from "@/components/ui/sidebar"

import {
    Pencil,
    LayoutDashboard,
    Archive,
    Settings,
    LogOut,
} from "lucide-react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function PlaygroundSidebar() {
    const location = useLocation()
    const [model, setModel] = useState("mistral")
    const [preset, setPreset] = useState("residential")

    const items = [
        {
            title: "Prompt Playground",
            to: "/playground",
            icon: Pencil,
        },
        {
            title: "Results",
            to: "/playground/results",
            icon: LayoutDashboard,
        },
        {
            title: "Saved Designs",
            to: "/playground/saved",
            icon: Archive,
        },
        {
            title: "Settings",
            to: "/playground/settings",
            icon: Settings,
        },
    ]

    return (
        <Sidebar className="min-h-screen">
            <SidebarContent>
                <SidebarGroupLabel>ArchiMind AI</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item) => {
                            const isActive = location.pathname === item.to

                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            to={item.to}
                                            className={`flex items-center gap-2 px-2 py-1.5 rounded-md ${isActive ? "bg-muted font-semibold" : "hover:bg-muted/50"
                                                }`}
                                        >
                                            <item.icon className="w-4 h-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroupContent>

                {/* Model Selection */}
                <div className="px-3 py-4 space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-muted-foreground">AI Model</label>
                        <Select value={model} onValueChange={setModel}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a model" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="mistral">Mistral</SelectItem>
                                <SelectItem value="llama">LLaMA 2</SelectItem>
                                <SelectItem value="gemma">Gemma</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Prompt Type */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-muted-foreground">Prompt Preset</label>
                        <Select value={preset} onValueChange={setPreset}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select preset" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="residential">Residential</SelectItem>
                                <SelectItem value="commercial">Commercial</SelectItem>
                                <SelectItem value="slope">Sloped Terrain</SelectItem>
                                <SelectItem value="minimal">Minimalist Design</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </SidebarContent>

            <SidebarFooter>
                <div className="flex items-center justify-between gap-4 px-2">
                    <Button variant="outline" size="sm" className="w-full text-sm">
                        <LogOut className="w-4 h-4 mr-1" />
                        Log Out
                    </Button>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}