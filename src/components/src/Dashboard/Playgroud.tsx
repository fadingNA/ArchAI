import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getAuth } from "firebase/auth";
import axios from "axios";

export const Playground = () => {
    const [prompt, setPrompt] = useState("");
    const [results, setResults] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setError("");
        setLoading(true);

        // Check Firebase authentication
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            setError("You must be signed in to generate architectural insights.");
            setLoading(false);
            return;
        }

        try {
            // Call the Groq API via the Express middleware
            const response = await axios.post("/api/grok/completion", {
                prompt: `Provide an architectural visualization for: ${prompt}`,
                model: "mixtral-8x7b-32768",
                max_tokens: 200,
                temperature: 0.7,
            });

            const grokResponse = response.data.data;
            setResults([...results, grokResponse]);
            setPrompt("");
        } catch (err: any) {
            setError(err.response?.data?.error || "Failed to generate architectural insights");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gray-50 px-6 py-10">
            <div className="w-full max-w-7xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-center">Architecture Playground</h1>
                    <SidebarTrigger />
                </div>
                <p className="text-center text-muted-foreground">
                    Describe your project. We'll help you visualize it with architectural insights.
                </p>

                {/* Error Display */}
                {error && (
                    <div className="text-red-500 text-sm text-center">{error}</div>
                )}

                {/* Prompt Input */}
                <form onSubmit={handleSubmit} className="flex gap-4">
                    <Input
                        placeholder="e.g. 3-bedroom house on a sloped terrain with ocean view"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        disabled={loading}
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? "Generating..." : "Generate"}
                    </Button>
                </form>

                {/* Results */}
                <div className="space-y-6">
                    {results.map((result, i) => (
                        <Card key={i} className="shadow-md border border-muted bg-white rounded-xl">
                            <CardHeader>
                                <CardTitle>Result {i + 1}</CardTitle>
                                <CardDescription>AI Architectural Visualization</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700">{result}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};