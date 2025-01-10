import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User, Award } from "lucide-react";

const PointsDisplay = ({ points }) => (
  <div className="flex items-center gap-2">
    <Award className="text-green-600 w-5 h-5" />
    <div className="flex items-center gap-2">
      <span className="text-gray-600 font-medium">Total Points Redeemed:</span>
      <span className="text-green-600 font-bold text-lg">{points}</span>
    </div>
  </div>
);

const UserComponent = () => {
  const navigate = useNavigate();
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    const fetchTotalPoints = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/events/");
        const total = response.data.reduce((sum, event) => sum + event.points, 0);
        setTotalPoints(total);
      } catch (error) {
        console.error("Failed to fetch total points:", error);
      }
    };

    fetchTotalPoints();
  }, []);

  const handleRegisterClick = () => {
    navigate("/events");
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Left Section - User Info */}
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-green-50 rounded-full">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Liza Castelino</h2>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <h2 className="text-xs font-semibold text-gray-800/50">
                  Registration Date: 2025-01-01
                </h2>
              </div>
            </div>
          </div>

          {/* Right Section - Points and Button */}
          <div className="flex items-center space-x-6">
            <PointsDisplay points={totalPoints} />
            <button
              onClick={handleRegisterClick}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
            >
              Register for More Events
              <span className="text-lg leading-none">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComponent;
