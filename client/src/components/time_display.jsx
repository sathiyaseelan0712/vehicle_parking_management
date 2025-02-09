import { useState, useEffect } from "react";

export default function DateAndTime() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
      const timer = setInterval(() => {
        setTime(new Date());
      }, 1000);

      return () => clearInterval(timer);
    }, []);

  const today =
    String(time.getDate()).padStart(2, '0') + "/" +
    String(time.getMonth() + 1).padStart(2, '0') + "/" +
    time.getFullYear();
  const showTime =
    String(time.getHours()).padStart(2, '0') + ":" +
    String(time.getMinutes()).padStart(2, '0') + ":" +
    String(time.getSeconds()).padStart(2, '0');

  return (
    <>
      <div className="flex flex-col py-4 px-2 h-40 w-150 items-center rounded-2xl bg-white ">
      <h2 className="text-6xl ">{today}</h2>
      <h1 className='text-7xl text-black'>{showTime}</h1>
      </div>
    </>
  );
}
