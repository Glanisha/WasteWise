import React, { useEffect, useState } from "react";
import axios from "axios";

const EventList = () => {
  const [events, setEvents] = useState([]);

  // Fetch events from the backend
  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/events/");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Your Registered Events</h2>
      {events.length > 0 ? (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ marginTop: "20px", width: "100%" }}>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Reason</th>
              <th>Timestamp</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.name}</td>
                <td>{event.reason}</td>
                <td>{new Date(event.timestamp).toLocaleString()}</td>
                <td>{event.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No events registered yet.</p>
      )}
    </div>
  );
};

export default EventList;
