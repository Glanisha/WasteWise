import Carousel from "./Carousel";
import PersonalInfo from "./PersonalInfo";

const Dashboard = ({ registeredEvents }) => {
  console.log("Registered events received in Dashboard:", registeredEvents);

  return (
    <div>
      <Carousel />
      <PersonalInfo registeredEvents={registeredEvents} />
    </div>
  );
};

export default Dashboard;
