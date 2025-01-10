import Carousel from "./Carousel";
import PersonalInfo from "./PersonalInfo";

import UserComponent from "./UserComponent";
const Dashboard = ({ registeredEvents }) => {
  console.log("Registered events received in Dashboard:", registeredEvents);

  return (
    <div>
      <UserComponent />
      <PersonalInfo registeredEvents={registeredEvents} />
      <Carousel />
     
      
    </div>
  );
};

export default Dashboard;
