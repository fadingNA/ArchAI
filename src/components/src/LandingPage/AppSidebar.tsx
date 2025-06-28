import { Calendar, Home, Inbox, LayoutDashboard, Search, Settings } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    SidebarTrigger
} from "@/components/ui/sidebar"

import { Button } from "@/components/ui/button"
// Menu items.
const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard
    }
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroupLabel className="flex justify-between">
                    ArchMind Application
                    <SidebarTrigger/>
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <a href={item.url}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarContent>
            <SidebarFooter>
                <div className="flex justify-between gap-4">
                    <Button variant="outline" size="sm" className="bg-sky-950 text-white">Sign In</Button>
                    <Button variant="outline" size="sm" className="bg-sky-950 text-white">Sign Up</Button>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
