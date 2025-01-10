
import { Calendar, Dot } from 'lucide-react';

const PersonalInfo = ({ registeredEvents }) => {
  console.log("Registered events received in PersonalInfo:", registeredEvents);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-5 w-5" />
        <h1 className="text-xl font-semibold">Your Events Registered</h1>
      </div>

      {registeredEvents && registeredEvents.length > 0 ? (
        <div className="space-y-2">
          {registeredEvents.map((event, index) => (
            <div key={index} className="flex items-center gap-2">
              <Dot className="h-4 w-4" />
              <span>{event}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">
          You have not registered for any events yet.
        </p>
      )}
    </div>
  );
};

export default PersonalInfo;