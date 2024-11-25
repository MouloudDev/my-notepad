import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchNotes } from "../../store/notesSlice";

export default function SearchNotesFrom() {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchNotes(term))
  }

  return (
    <form onSubmit={handleSubmit} className="relative rounded-lg mx-1">
      <input
       className="w-full h-full rounded-lg p-3 outline-slate-200 text-gray-800"
       placeholder="Search notes"
       value={term}
       onChange={(e) => setTerm(e.target.value)}
      />
      {term.trim().length > 0 &&
        <button
          onClick={() => {setTerm(''); dispatch(searchNotes(""))}}
          className="absolute top-3 right-8 z-50 text-gray-600 hover:text-gray-900"
        >
          <XMark />
        </button>
      }
      <button type="submit" className="absolute top-3 right-1 z-50 text-gray-600 hover:text-gray-900">
        <Magnifier />
      </button>
    </form>
  )
}

function XMark() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  )
}

function Magnifier() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  )
}
