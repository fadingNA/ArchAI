import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"


export const Playground = () => {
    const [prompt, setPrompt] = useState("")
    const [results, setResults] = useState<string[]>([])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!prompt.trim()) return

        // Placeholder: Simulate AI Response
        setResults([
            ...results,
            `Visualizing: "${prompt}" — AI suggests a modern U-shaped foundation with central courtyard and south-facing glass wall.`
        ])

        setPrompt("")
    }

    return (

        <div className="min-h-screen w-full bg-gray-50 px-6 py-10">
            <div className="w-full max-w-7xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold text-center">Architecture Playground</h1>
                <p className="text-center text-muted-foreground">
                    Describe your project. We'll help you visualize it with architectural insights.
                </p>

                {/* Prompt Input */}
                <form onSubmit={handleSubmit} className="flex gap-4">
                    <Input
                        placeholder="e.g. 3-bedroom house on a sloped terrain with ocean view"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <Button type="submit">Generate</Button>
                </form>

                {/* Results */}
                <div className="space-y-6">
                    {results.map((result, i) => (
                        <Card key={i} className="shadow-md border border-muted bg-white rounded-xl">
                            <CardHeader>
                                <CardTitle>Result {i + 1}</CardTitle>
                                <CardDescription>AI Interpretation</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700">{result}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>

    )
}