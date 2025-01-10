import { useState } from "react";
import { Calendar, MapPin, Award, ArrowLeft, Clock, Users, ExternalLink } from "lucide-react";
import axios from "axios";
import event1 from "/event1.jpg";
import event2 from "/event2.jpg";
import event3 from "/event3.jpg";
import event4 from "/event4.jpg";
import event5 from "/event5.jpg";
import event6 from "/event6.webp";

// EventDetail component displays detailed information about a selected event
const EventDetail = ({ event, onBack, onRegister }) => {
  const handleRegister = async () => {
    try {
      console.log("Register button clicked for event:", event.name);

      // POST request to the Django server
      await axios.post("http://127.0.0.1:8000/api/events/", {
        name: "Event Registered",
        reason: event.name, // Event name as the reason
        points: 50,
        timestamp: new Date().toISOString(),
      });
      console.log("Event registration logged successfully.");

      // GET request to the Node.js server
      await axios.get("http://localhost:4000/add-points");
      console.log("Points updated successfully via Node.js server.");

      alert("Successfully Registered");
      onRegister(event.name); // Notify parent component about registration
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };


  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 flex items-center">
        <button
          onClick={onBack}
          className="flex items-center text-navy-600 hover:text-navy-700 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span className="font-medium">Back to Events</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/800x400";
            }}
          />
        </div>

        <div className="p-8">
          <h1 className="text-3xl font-bold text-navy-600 mb-6">{event.name}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center space-x-3">
              <Calendar className="h-6 w-6 text-navy-600" />
              <span className="text-lg">{event.date}</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-6 w-6 text-navy-600" />
              <span className="text-lg">{event.location}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Award className="h-6 w-6 text-navy-600" />
              <span className="text-lg">{event.points} Points</span>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="h-6 w-6 text-navy-600" />
              <span className="text-lg">Limited Seats Available</span>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-navy-600 mb-4">Event Details</h2>
            <p className="text-gray-700 text-lg leading-relaxed">{event.details}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleRegister}
              className="flex-1 bg-white border-2 border-navy-600 text-navy-600 px-8 py-4 rounded-lg font-semibold hover:bg-navy-50 transition-colors text-lg flex items-center justify-center"
            >
              Register Now
            </button>
            <a
              href={event.learnMoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-white border-2 border-navy-600 text-navy-600 px-8 py-4 rounded-lg font-semibold hover:bg-navy-50 transition-colors text-lg flex items-center justify-center"
            >
              Learn More
              <ExternalLink className="h-5 w-5 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// EventCard component displays an event summary as a card
const EventCard = ({ event, onClick }) => (
  <div
    className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
    onClick={onClick}
  >
    <div className="relative h-48">
      <img
        src={event.image}
        alt={event.name}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/400x300";
        }}
      />
      <div className="absolute top-4 right-4 bg-navy-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
        {event.points} Points
      </div>
    </div>

    <div className="p-6">
      <h2 className="text-xl font-bold text-navy-600 line-clamp-2 mb-4">{event.name}</h2>

      <div className="space-y-3">
        <div className="flex items-center text-gray-600 space-x-2">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">{event.date}</span>
        </div>
        <div className="flex items-center text-gray-600 space-x-2">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{event.location}</span>
        </div>
        <div className="flex items-center text-gray-600 space-x-2">
          <Clock className="h-4 w-4" />
          <span className="text-sm">Registration Closing Soon</span>
        </div>
      </div>
    </div>
  </div>
);

// Main Events component to list all events
const Events = ({ onRegister }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const eventsData = [
    {
      id: 1,
      name: "International Conference on Recycling and Waste Management (ICRWM)",
      date: "11 Jan",
      location: "Bhilai, India",
      details:
        "A conference discussing the future of recycling and sustainable waste management practices.",
      points: 50,
      image: event1,
      learnMoreUrl: "https://www.sfe.net.in/conf/index.php?id=3115411",
    },
    {
      id: 2,
      name: "International Conference on Recycling and Waste Management (ICRWM) | NIER",
      date: "12 Jan",
      location: "Bangalore, India",
      details:
        "Join researchers and industry experts to explore innovative solutions for waste management challenges.",
      points: 40,
      image: event2,
      learnMoreUrl: "https://nier.in/conf/index.php?id=3110466",
    },
    {
      id: 3,
      name: "International Conference on Recycling and Waste Management (ICRWM) | SFE",
      date: "12 Jan",
      location: "Dharamshala, India",
      details:
        "Keynote speakers, panel discussions, and workshops on waste management challenges and solutions.",
      points: 60,
      image: event3,
      learnMoreUrl: "https://www.sfe.net.in/conf/index.php?id=3115411",
    },
    {
      id: 4,
      name: "International Conference on Environment and Life Science (ICELS)",
      date: "12 Jan",
      location: "Shimla, India",
      details:
        "An event focused on integrating life sciences with environmental protection.",
      points: 40,
      image: event4,
      learnMoreUrl: "https://www.sfe.net.in/conf/index.php?id=3115153",
    },
    {
      id: 5,
      name: "International Conference on Recycling and Waste Management (ICRWM) | SFE",
      date: "12 Jan",
      location: "Aurangabad, India",
      details:
        "Explore sustainable waste management practices through research and innovative solutions.",
      points: 50,
      image: event5,
      learnMoreUrl: "https://www.sfe.net.in/conf/index.php?id=3115411",
    },
    {
      id: 6,
      name: "International Conference on Recycling and Waste Management (ICRWM)",
      date: "12 Jan",
      location: "Srinagar, India",
      details:
        "Engage with industry experts to discuss sustainable waste management practices and policies.",
      points: 60,
      image: event6,
      learnMoreUrl: "https://www.sfe.net.in/conf/index.php?id=3115411",
    },
  ];
  console.log("Selected event in Events:", selectedEvent);

  if (selectedEvent) {
    return <EventDetail event={selectedEvent}  onRegister={onRegister} onBack={() => setSelectedEvent(null)} />;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto my-12">
      <h1 className="text-3xl font-bold mb-8 text-stone-800">
        Upcoming Environmental Events
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventsData.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onClick={() => setSelectedEvent(event)}
          />
        ))}
      </div>
    </div>
  );
};

export default Events;
