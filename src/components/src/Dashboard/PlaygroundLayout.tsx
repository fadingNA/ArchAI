import { PlaygroundSidebar } from "@/components/src/LandingPage/AppSidebarPlaygroud"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export const PlaygroundLayout = ({ children }: { children: React.ReactNode }) => {
    return (

        <div className="flex min-h-screen">
            <SidebarProvider>
                <PlaygroundSidebar />
                <SidebarTrigger />
                <main className="flex-1 bg-gray-50 p-6">{children}</main>
            </SidebarProvider>
        </div>

    )
}