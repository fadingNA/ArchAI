import { ReactNode } from "react"

export const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen overflow-x-hidden bg-gray-100 text-gray-900">
            <header className="bg-white shadow px-6 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <h1 className="text-2xl font-bold">ArchiMind</h1>
                    <nav className="space-x-4">
                        <a href="#" className="text-sm font-medium hover:underline">Dashboard</a>
                        <a href="#" className="text-sm font-medium hover:underline">Projects</a>
                        <a href="#" className="text-sm font-medium hover:underline">Settings</a>
                    </nav>
                </div>
            </header>
            <main className="max-w-6xl mx-auto px-6 py-8">
                {children}
            </main>
        </div>
    )
}