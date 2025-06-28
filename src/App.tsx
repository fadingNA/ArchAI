import { Routes, Route } from "react-router-dom"
import { LandingPage } from "@/components/src/LandingPage/LandingPage"
import { Login } from "@/components/src/Credentials/Login"
import { Signup } from "@/components/src/Credentials/Signup"

import { Playground } from "@/components/src/Dashboard/Playgroud"
import { PlaygroundLayout } from "./components/src/Dashboard/PlaygroundLayout"


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<PlaygroundLayout><Playground /></PlaygroundLayout>} />
    </Routes>
  )
}