import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFont, zoomIn, zoomOut } from "../../store/settingsSlice";
import logoutUser from "../../thunks/logoutUser";

export default function Settings() {
  const dispatch = useDispatch();
  const fontFamily = useSelector(state => state.settings.fontFamily);
  const user = useSelector(state => state.session.user);
  const [showOptions, setShowOptions] = useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser())
      .unwrap();
    } catch (error) {
      console.error('Logout failed:', error.title);
    }
  }

  const toggleTheme = () => {
    const root = document.getElementById("root");
    const circle = document.getElementById("theme-circle");

    root.classList.toggle("dark");
    circle.classList.toggle("dark");
  }

  return (
    <div className="p-2 ml-auto w-full max-w-60 max-h-fit border-x border-x-gray-500">
      <button
        className="group flex gap-1 items-center justify-between p-2 w-full shadow-lg rounded-lg border border-gray-300 hover:bg-gray-300 dark:border-gray-500 dark:hover:bg-gray-600 transition-colors duration-400"
        onClick={() => setShowOptions(prev => !prev)}
      >
        <span className="text-xl font-semibold truncate dark:text-white">{user.email}</span>
        <Cog6 />
      </button>
      <div className={`${showOptions ? "h-[350px] transition-all duration-1000" : "h-0"} truncate mt-1`}>
        <button
          onClick={() => dispatch(zoomIn())}
          className="group flex justify-between my-1 p-2 rounded-lg gap-2 w-full border border-gray-300 hover:bg-gray-300 dark:border-gray-500 dark:hover:bg-gray-500 transition-all duration-300"
        >
          <span className="font-medium dark:text-white">Zoom In</span>
          <MagnifierPlus />
        </button>
        <button
          onClick={() => dispatch(zoomOut())}
          className="group flex justify-between my-1 p-2 rounded-lg gap-2 w-full border border-gray-300 hover:bg-gray-300 dark:border-gray-500 dark:hover:bg-gray-500 transition-all duration-300"
        >
          <span className="font-medium dark:text-white">Zoom Out</span>
          <MagnifierMinus />
        </button>
        <div className="my-1">
          <h2 className="text-lg font-bold dark:text-white">Text style</h2>
          <button
            onClick={() => dispatch(setFont(""))}
            className="flex justify-between my-1 p-2 gap-2 w-full rounded-lg border border-gray-300 hover:bg-gray-300 dark:border-gray-500 dark:hover:bg-gray-500 transition-all duration-300"
          >
            <span className="font-normal dark:text-white">Standard</span>
            {fontFamily === "" && <Check />}
          </button>
          <button
            onClick={() => dispatch(setFont("Caveat, cursive"))}
            className="flex justify-between my-1 p-2 gap-2 w-full rounded-lg border border-gray-300 hover:bg-gray-300 dark:border-gray-500 dark:hover:bg-gray-500 transition-all duration-300"
          >
            <span className="font-normal dark:text-white">Handwriting</span>
            {fontFamily === "Caveat, cursive" && <Check />}
          </button>
          <button
            onClick={() => dispatch(setFont('"Geist Mono", monospace'))}
            className="flex justify-between my-1 p-2 gap-2 w-full rounded-lg border border-gray-300 hover:bg-gray-300 dark:border-gray-500 dark:hover:bg-gray-500 transition-all duration-300"
          >
            <span className="font-normal dark:text-white">Geist Mono</span>
            {fontFamily === '"Geist Mono", monospace' && <Check />}
          </button>
          <h2 className="text-lg font-bold dark:text-white">Theme</h2>
          <button
            onClick={toggleTheme}
            className="flex justify-center items-center my-1 p-1 gap-2 w-full rounded-lg bg-[#FFD54F] dark:bg-[#3498DB] transition-all duration-300"
          >
            <span className="w-fit text-2xl text-[#2C3E50] font-bold dark:font-normal dark:text-white">Light</span>
            <div className="w-20 bg-[#B0BEC5] rounded-3xl p-1 dark:bg-[#34495E]">
              <div
                id="theme-circle"
                className="w-8 h-8 rounded-full bg-white dark:bg-[#ECF0F1]"
              >
              </div>
            </div>
            <span className="w-fit text-2xl text-[#2C3E50] dark:font-bold dark:text-white">Dark</span>
          </button>
        </div>
      </div>
      <div className="my-1">
        <button onClick={handleLogout} className="flex justify-center items-center my-1 p-2 gap-2 w-full rounded-lg border border-yellow-600 bg-yellow-600 hover:bg-yellow-700 transition-all duration-300">
          <ArrowRightStartOnRect />
          <span className="text-lg font-medium text-white">Log Out</span>
        </button>
      </div>
      <DateTime />
    </div>
  )
}

function DateTime() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const month = months[time.getMonth()];
  const day = time.getDate();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const amPm = hours >= 12 ? "PM" : "AM";

  const formattedHours = hours % 12 || 12;

  return (
    <div className="flex items-center my-1 p-2 gap-2 w-full rounded-lg border border-gray-500 transition-all duration-300">
      <Clock />
      <span className="text-lg text-gray-500 dark:text-gray-300">{month} {day} | {formattedHours}:{minutes.toString().padStart(2, "0")} {amPm}</span>
    </div>
  );
}

function Clock() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 dark:text-white">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  )
}

function ArrowRightStartOnRect() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
    </svg>
  )
}

function Check() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 dark:text-white">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  )
}

function Cog6() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 transition-transform duration-0 group-hover:rotate-[360deg] group-hover:duration-1000 dark:text-white">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  )
}

function MagnifierPlus() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-400 group-hover:text-gray-700 dark:text-gray-300 dark:group-hover:text-white">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
    </svg>
  )
}

function MagnifierMinus() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-400 group-hover:text-gray-700 dark:text-gray-300 dark:group-hover:text-white">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM13.5 10.5h-6" />
    </svg>
  )
}
