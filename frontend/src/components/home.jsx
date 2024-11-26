import NotesNav from "./notes/NotesNav";
import NoteView from "./notes/NoteView";
import Settings from "./notes/Settings";
import CreateNote from "./notes/CreateNote";
import SearchNotesFrom from "./notes/SearchNotesFrom";
import { useEffect } from "react";
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
    <div className="h-screen flex max-w-screen-2xl mx-auto">
      <div className="flex flex-col w-fit h-full px-2 border-x border-x-gray-500 ">
        <CreateNote />
        <h2 className="mt-2 text-lg text-left font-semibold text-gray-200">Your notes</h2>
        <SearchNotesFrom/>
        <NotesNav />
      </div>
      <NoteView />
      <Settings />
    </div>
  )
}
