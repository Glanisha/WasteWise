import  { useState } from 'react';
import { Calendar, MapPin, Award, ArrowLeft, Clock, Users } from 'lucide-react';
import event from '/waste6.png'

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 1,
      name: 'International Conference on Recycling and Waste Management',
      date: '11 Jan',
      location: 'Aurangabad, India',
      details: 'A conference discussing the future of recycling and sustainable waste management practices.',
      points: 50,
      image: {event}
    },
    {
      id: 2,
      name: 'International Conference on Environment and Life Science',
      date: '12 Jan',
      location: 'Shimla, India',
      details: 'An event focused on integrating life sciences with environmental protection.',
      points: 40,
      image: {event}
    },
    {
      id: 3,
      name: 'International Conference on Hazardous Waste Disposal',
      date: '12 Jan',
      location: 'Dharamshala, India',
      details: 'Learn about innovative solutions for hazardous waste disposal.',
      points: 60,
      image: {event}
    },
  ];

  const handleRegister = () => {
    alert('Registered successfully!');
  };

  if (selectedEvent) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative h-64 w-full">
            <img
              src={selectedEvent.image}
              alt={selectedEvent.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/api/placeholder/800/400";
              }}
            />
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 left-4 bg-white p-2 rounded-full"
            >
              <ArrowLeft className="h-5 w-5 text-navy-600" />
            </button>
          </div>
          
          <div className="p-6">
            <h2 className="text-2xl font-bold text-navy-600 mb-6">{selectedEvent.name}</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-navy-600" />
                  <span>{selectedEvent.date}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-navy-600" />
                  <span>{selectedEvent.location}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-navy-600" />
                  <span>{selectedEvent.points} Points</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-navy-600" />
                  <span>Limited Seats Available</span>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">{selectedEvent.details}</h3>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-gray-50">
            <button
              onClick={handleRegister}
              className="w-full bg-navy-600 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-navy-600">
        Upcoming Environmental Events
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/api/placeholder/400/300";
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
            
            <div className="px-6 pb-6">
              <button
                onClick={() => setSelectedEvent(event)}
                className="w-full bg-navy-600 text-white px-4 py-2 rounded-lg font-semibold"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;