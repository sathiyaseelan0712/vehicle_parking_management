import "./App.css";
import CheckIn from "./components/checkIn";
import DateAndTime from "./components/time_display";

export default function App() {
  return (
    <>
      <div className="bg-">
        <div className="flex justify-between py-20 px-20 w-full">
          <DateAndTime />
          <CheckIn />
        </div>
      </div>
    </>
  );
}
