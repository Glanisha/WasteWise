
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'
import Navbar from "./components/Navbar"

import Dashboard from './components/Dashboard'
import Events from './components/Events';


function App() {
  
  return (
    <>
      <div className="flex flex-col min-h-screen">
      <Navbar />
      <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/events" element={<Events />} />
          
          </Routes>
    </div>
    </>
  )
}

export default App
