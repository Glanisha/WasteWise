
import { BrowserRouter as  Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from "./components/Navbar"
import Events from './components/Events';
import Dashboard from './components/Dashboard'


function App() {
  

  return (
  
    <div className="flex flex-col min-h-screen">
      
      <Navbar />

    
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          
        </Routes>
      </main>
    </div>
  
  )
}

export default App
