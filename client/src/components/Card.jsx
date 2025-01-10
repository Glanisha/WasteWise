import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomCard = ({ 
  title = "Default Title", 
  description = "Default description text", 
  backgroundColor = "#ffffff", 
  route = "/" 
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <div 
      className="w-full max-w-md rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300"
      style={{ backgroundColor }}
      onClick={handleClick}
    >
      <div className="mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default CustomCard;