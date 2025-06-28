import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Menu } from "lucide-react"
import { useState, useEffect } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../../../../services/database/index"

interface NavbarProps {
    openDialogLogin: boolean;
    setOpenDialogLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ openDialogLogin, setOpenDialogLogin }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            if (currentUser) {
                setOpenDialogLogin(false)
            }
        })
        return () => unsubscribe()
    }, [setOpenDialogLogin])

    const handleLogout = async () => {
        try {
            await signOut(auth)
            setIsMobileMenuOpen(false)
        } catch (err) {
            console.error("Logout failed:", err)
        }
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-primary">Logo</span>
                </Link>

                {/* Desktop Navigation and Auth Buttons */}
                <div className="hidden md:flex flex-1 items-center justify-between ml-8">
                    <NavigationMenu>
                        <NavigationMenuList className="flex space-x-4">
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link
                                        to="/dashboard"
                                        className={cn(
                                            "text-sm font-medium transition-colors hover:text-primary",
                                            "text-muted-foreground"
                                        )}
                                    >
                                        Dashboard
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link
                                        to="/document"
                                        className={cn(
                                            "text-sm font-medium transition-colors hover:text-primary",
                                            "text-muted-foreground"
                                        )}
                                    >
                                        Document
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* Auth Buttons */}
                    <div className="flex items-center space-x-2">
                        {user ? (
                            <>
                                <Button variant="ghost" asChild>
                                    <Link to="/account">
                                        {user.displayName || user.email || "Account"}
                                    </Link>
                                </Button>
                                <Button variant="ghost" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant="ghost" onClick={() => setOpenDialogLogin(!openDialogLogin)}>
                                    Sign In
                                </Button>
                                <Button asChild>
                                    <Link to="/signup">Sign Up</Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <Button
                    variant="ghost"
                    className="md:hidden"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <Menu className="h-6 w-6" />
                </Button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t bg-background">
                    <div className="container flex flex-col space-y-4 py-4">
                        <Link
                            to="/dashboard"
                            className="text-sm font-medium text-muted-foreground hover:text-primary"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/document"
                            className="text-sm font-medium text-muted-foreground hover:text-primary"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Document
                        </Link>
                        {user ? (
                            <>
                                <Button
                                    variant="ghost"
                                    className="text-sm font-medium text-muted-foreground hover:text-primary"
                                    onClick={() => {
                                        setIsMobileMenuOpen(false)
                                        handleLogout()
                                    }}
                                >
                                    Logout
                                </Button>
                                <Link
                                    to="/account"
                                    className="text-sm font-medium text-muted-foreground hover:text-primary"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {user.displayName || user.email || "Account"}
                                </Link>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant="ghost"
                                    className="text-sm font-medium text-muted-foreground hover:text-primary"
                                    onClick={() => {
                                        setIsMobileMenuOpen(false)
                                        setOpenDialogLogin(!openDialogLogin)
                                    }}
                                >
                                    Sign In
                                </Button>
                                <Link
                                    to="/signup"
                                    className="text-sm font-medium text-muted-foreground hover:text-primary"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}

export default Navbar