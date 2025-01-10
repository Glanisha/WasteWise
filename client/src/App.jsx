import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./components/Navbar"
import Carousel from './components/Carousel'
import Dashboard from './components/Dashboard'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Dashboard />
        {/* Other content */}
      </main>
    </div>
    </>
  )
}

export default App
