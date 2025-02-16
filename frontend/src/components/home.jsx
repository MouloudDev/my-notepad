import NotesNav from "./notes/NotesNav";
import NoteView from "./notes/NoteView";
import Settings from "./notes/Settings";
import CreateNote from "./notes/CreateNote";
import SearchNotesFrom from "./notes/SearchNotesFrom";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import fetchNotes from "../thunks/fetchNotes";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchNotes()).unwrap();
      } catch(error) {
        console.log("error fetching Notes", error)
      }
    }
    fetchData();
  }, [dispatch])

  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="lg:hidden">
        <MobileOverlayPanel />
        <NoteView />
      </div>
      <div className="hidden lg:flex mt-3">
        <div className="w-fit h-fit p-2 border-x border-x-gray-500 ">
          <CreateNote />
          <h2 className="mt-2 text-lg text-left font-semibold dark:text-gray-200">Your notes</h2>
          <SearchNotesFrom/>
          <NotesNav />
        </div>
        <NoteView />
        <Settings />
      </div>
    </div>
  )
}

function MobileOverlayPanel() {
  const [showNav, setShowNav] = useState(false);
  const [showSetting, setShowSettings] = useState(false);
  const leftOverlayRef = useRef(null);
  const rightOverlayRef = useRef(null);

  useEffect(() => {
    if (!leftOverlayRef.current) return;
    leftOverlayRef.current.style.left = showNav ? '0' : '-100%'
  }, [showNav])

  useEffect(() => {
    if (!rightOverlayRef.current) return;
    rightOverlayRef.current.style.right = showSetting ? '20px' : '-100%'
  }, [showSetting])

  return (
    <div className="flex justify-between px-2 overflow-hidden ">
      <button
        onClick={() => setShowNav(true)}
        className="cursor-pointer m-3 hover:scale-125 duration-300"
      >
        <HamburgerIcon />
      </button>
      <button
        onClick={() => setShowSettings(true)}
        className="cursor-pointer m-3 hover:scale-125 duration-300"
      >
        <SettingsIcon />
      </button>

      {/* left overlay */}
      <div
        onClick={() => setShowNav(false)}
        ref={leftOverlayRef}
        className="absolute top-0 w-full h-[100vh] min-h-[100vh] bg-transparent backdrop-blur-[1px] transition-all duration-700"
       >
        <div
          className="max-w-fit p-4 py-6 bg-white shadow-lg dark:bg-gray-600"
          onClick={(e) => e.stopPropagation()}
        >
          <CreateNote />
          <h2 className="mt-2 text-lg text-left font-semibold dark:text-gray-200">Your notes</h2>
          <SearchNotesFrom />
          <NotesNav />
        </div>
      </div>

      {/* right overlay */}
      <div
        onClick={() => setShowSettings(false)}
        ref={rightOverlayRef}
        className="absolute top-0 w-full h-[100vh] min-h-[100vh] bg-transparent backdrop-blur-[1px] transition-all duration-700"
       >
        <div
          className="max-w-fit px-4 py-6 ml-auto bg-white shadow-lg dark:bg-gray-600"
          onClick={(e) => e.stopPropagation()}
        >
          <Settings />
        </div>
      </div>
    </div>
  )
}

function HamburgerIcon() {
  return (
    <svg className="dark:text-white" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M3 8C3 7.44772 3.44772 7 4 7H20C20.5523 7 21 7.44772 21 8C21 8.55228 20.5523 9 20 9H4C3.44772 9 3 8.55228 3 8ZM3 16C3 15.4477 3.44772 15 4 15H14C14.5523 15 15 15.4477 15 16C15 16.5523 14.5523 17 14 17H4C3.44772 17 3 16.5523 3 16Z" fill="currentColor" data-darkreader-inline-fill=""></path>
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 transition-transform duration-0 group-hover:rotate-[360deg] group-hover:duration-1000 dark:text-white">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  )
}
