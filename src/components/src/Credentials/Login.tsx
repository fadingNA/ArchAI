import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../../services/database/index"

interface LoginProps {
    openDialogLogin: boolean;
    setOpenDialogLogin: React.Dispatch<React.SetStateAction<boolean>>
}

export const Login = ({ openDialogLogin, setOpenDialogLogin }: LoginProps) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        try {
            await signInWithEmailAndPassword(auth, email, password)
            setOpenDialogLogin(false) // Close dialog on successful login
        } catch (err: any) {
            setError(err.message || "Failed to sign in. Please check your credentials.")
        }
    }

    return (
        <Dialog open={openDialogLogin} onOpenChange={setOpenDialogLogin}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">Sign In to ArchiMind</DialogTitle>
                </DialogHeader>
                <div className="p-6 space-y-6">
                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
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
                                required
                            />
                        </div>
                        {error && (
                            <p className="text-sm text-red-500 text-center">{error}</p>
                        )}
                        <Button type="submit" className="w-full">Sign In</Button>
                    </form>
                    <p className="text-sm text-center text-muted-foreground">
                        Don’t have an account?{" "}
                        <Link to="/signup" className="text-primary underline">Sign Up</Link>
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    )
}