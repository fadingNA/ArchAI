import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { SidebarProvider, } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import Navbar from "../Navbar/Navigationbar"
import { useState } from "react"
import { Login } from "../Credentials/Login"

export const LandingPage = () => {
    const [openDialogLogin, setOpenDialogLogin] = useState<boolean>(false)
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="flex flex-col min-h-screen w-full bg-white text-gray-900">
                {/* Main content */}
                <Navbar openDialogLogin={openDialogLogin} setOpenDialogLogin={setOpenDialogLogin} />
                {openDialogLogin &&
                    <Login openDialogLogin={openDialogLogin} setOpenDialogLogin={setOpenDialogLogin} />
                }
                <main className="flex-1">

                    {/* Hero Section */}
                    <section className="py-24 px-6 text-center bg-gradient-to-b from-neutral-50 to-neutral-200/80">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                            Build Smarter from the Ground Up
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                            ArchiMind helps you design architectural foundations right—before mistakes become expensive. Get instant AI insights, sanity checks, and smart planning.
                        </p>
                        <Button variant={"secondary"} className="cursor-pointer">Start Free Analysis</Button>
                    </section>

                    {/* Features Section */}
                    <section className="py-20 px-6 bg-gradient-to-b from-neutral-50 to-neutral-200/50">
                        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "Foundation Checker",
                                    desc: "Analyze your base structure and spot missing supports or misalignments.",
                                },
                                {
                                    title: "AI Planning Assistant",
                                    desc: "Describe your site and get early-stage design suggestions instantly.",
                                },
                                {
                                    title: "Zoning & Compliance (soon)",
                                    desc: "Ensure you're aligned with local building codes before you even draft.",
                                },
                            ].map((feature, i) => (
                                <div
                                    key={i}
                                    className="bg-neutral-100 border border-muted p-6 rounded-2xl shadow-sm hover:shadow-md transition"
                                >
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-muted-foreground">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Call to Action */}
                    <section className="py-24 px-6 text-center bg-gradient-to-b from-neutral-50 to-neutral-200/30">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Let’s lay the right foundation — together.
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Sign up today and explore how AI can assist your design process.
                        </p>
                        <Button size="lg" variant="outline">Try the Demo</Button>
                    </section>
                </main>

                <section>
                    <div className="max-w-6xl py-24 px-6 mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            See ArchiMind in Action
                        </h2>
                        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                            Here’s how our AI helps you validate and improve your architectural design foundations — in just a few steps.
                        </p>

                        {/* 3-Step Process */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                            {[
                                {
                                    title: "1. Upload Your Plan or Site Info",
                                    desc: "Provide your initial architectural sketch or just describe your site layout and building goals.",
                                },
                                {
                                    title: "2. Get AI Structural Feedback",
                                    desc: "ArchiMind checks for foundation logic, structural flow, and potential missing supports.",
                                },
                                {
                                    title: "3. Iterate & Plan Smarter",
                                    desc: "Use AI recommendations to refine your design early — before costly errors show up in development.",
                                },
                            ].map((step, i) => (
                                <div
                                    key={i}
                                    className="bg-muted/50 border border-muted p-6 rounded-2xl shadow-sm hover:shadow-md transition"
                                >
                                    <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                                    <p className="text-muted-foreground">{step.desc}</p>
                                </div>
                            ))}
                        </div>

                        <Separator />
                        <div className="mt-16">
                            <div className="relative w-full h-72 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500 text-sm shadow-inner">
                                {/* Replace with image, GIF or embed later */}
                                Demo Preview Coming Soon
                            </div>
                        </div>

                        {/* Another CTA */}
                        <div className="my-12">
                            <Button size="lg">Try It Yourself</Button>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-6 bg-gray-900 text-white text-center text-sm">
                    © {new Date().getFullYear()} ArchiMind. Built with ❤️ and structural integrity.
                </footer>
            </div>
        </SidebarProvider>
    )
}