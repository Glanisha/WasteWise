import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, AlertCircle, Clock, Award, Info, TrendingUp } from "lucide-react";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:8000/api/events/");
      setEvents(response.data);
    } catch (error) {
      setError("Failed to fetch events");
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const totalPoints = events.reduce((sum, event) => sum + event.points, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <span className="text-gray-500">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-32 gap-2">
        <AlertCircle />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="w-full py-9">
      <div className=" flex items-center mb-9 gap-2">
        <Calendar className="text-green-600 w-7 h-7" />
        <h2 className="text-3xl font-semibold ">Points you have earned</h2>
        <button className="ml-auto bg-green-600 text-white p-3 rounded-lg">Reedem Points</button>
      </div>

      {events.length > 0 ? (
        <>
          <div className="space-y-2 mb-6">
            {events.map((event) => (
              <div 
                key={event.id} 
                className="py-3 px-4 hover:bg-gray-50 transition-colors duration-300 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <span className="font-medium min-w-48">{event.name}</span>
                    
                    <div className="flex items-center gap-2 text-gray-500">
                      <Info className="w-4 h-4" />
                      <span className="text-sm">{event.reason}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">
                        {new Date(event.timestamp).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-green-600">
                      <Award className="w-4 h-4" />
                      <span className="text-sm">{event.points} points</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4 mt-4">
            <div className="flex items-center justify-end gap-2 text-green-600">
              <TrendingUp className="w-5 h-5" />
              <span className="text-lg font-medium">Total Points: {totalPoints}</span>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-32 text-gray-400 gap-2">
          <Calendar className="w-5 h-5" />
          <p>No events yet</p>
        </div>
      )}
    </div>
  );
};

export default EventList;
