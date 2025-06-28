import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"

export const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const onSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const auth = getAuth()
            await createUserWithEmailAndPassword(auth, email, password)
            // Reset form after successful signup
            setName("")
            setEmail("")
            setPassword("")
        } catch (err: any) {
            setError(err.message || "Failed to create an account")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow p-8 space-y-6">
                <h2 className="text-2xl font-bold text-center">Create Your ArchiMind Account</h2>
                {error && (
                    <div className="text-red-500 text-sm text-center">{error}</div>
                )}
                <form onSubmit={onSignup} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input 
                            id="name" 
                            type="text" 
                            placeholder="Jane Doe" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                            id="email" 
                            type="email" 
                            placeholder="you@example.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input 
                            id="password" 
                            type="password" 
                            placeholder="••••••••" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={loading}
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </Button>
                </form>
                <p className="text-sm text-center text-muted-foreground">
                    Already have an account?{" "}
                    <Link to="/" className="text-primary underline">Sign In</Link>
                </p>
            </div>
        </div>
    )
}