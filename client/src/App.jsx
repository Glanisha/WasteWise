import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Events from "./components/Events";
import PersonalInfo from "./components/PersonalInfo";

function App() {
  const [registeredEvents, setRegisteredEvents] = useState(() => {
    const storedEvents = localStorage.getItem("registeredEvents");
    return storedEvents ? JSON.parse(storedEvents) : [];
  });

  const handleRegisterEvent = (event) => {
    // Check if the event is already registered
    if (registeredEvents.find((e) => e.name === event)) {
      alert("You are already registered for this event!");
      return;
    }

    const updatedEvents = [...registeredEvents, event];
    setRegisteredEvents(updatedEvents);
    localStorage.setItem("registeredEvents", JSON.stringify(updatedEvents)); // Store in local storage
    console.log("Event registered:", event);
  };

  useEffect(() => {
    console.log("Registered events:", registeredEvents);
  }, [registeredEvents]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Dashboard registeredEvents={registeredEvents} />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard registeredEvents={registeredEvents} />}
          />
          <Route
            path="/events"
            element={<Events onRegister={handleRegisterEvent} />}
          />
          <Route
            path="/personal-info"
            element={<PersonalInfo registeredEvents={registeredEvents} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
