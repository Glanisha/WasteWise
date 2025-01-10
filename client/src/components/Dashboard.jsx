import Carousel from "./Carousel";
import PersonalInfo from "./PersonalInfo";
import EventList from "./EventList";
const Dashboard = ({ registeredEvents }) => {
  console.log("Registered events received in Dashboard:", registeredEvents);

  return (
    <div>
      <Carousel />
      <PersonalInfo registeredEvents={registeredEvents} />
      <EventList />
    </div>
  );
};

export default Dashboard;
