import { useState } from "react";
import { useDispatch } from "react-redux";
import deleteNote from "../../thunks/deleteNote";
import Spinner from "../spinner";

export default function ConfirmDelete({note, cancelDeletion}) {
  const title = note?.title;
  const dispatch = useDispatch();
  const [deletingNote, setDeletingNote] =
    useState(false);
  const [deletionErrors, setDeletionErrors] =
    useState(null);

  const handleDelete = async () => {
    setDeletingNote(true);
    try {
      await dispatch(deleteNote(note.id))
      .unwrap();
      setDeletionErrors(null)
    } catch (error) {
      console.error('Deletion Failed:', error.title);
      setDeletionErrors(error.errors)
    } finally {
      setDeletingNote(false);
    }
  }

  return (
    <div className="flex flex-col gap-2 items-center p-1 max-w-72 mx-auto rounded-lg">
      <TrashIconXl />
      <h2 className="text-2xl text-center font-semibold dark:text-white">Are you sure you want to delete this note?</h2>
      <p className="text-gray-800 dark:text-gray-200 mb-4">{title?.length > 20 ? title.slice(0, 20) + "..." : title}</p>
      <div className="flex gap-2 w-full">
        <button
          onClick={cancelDeletion}
          className="p-2 w-full font-semibold text-gray-700 border border-gray-200 dark:border-gray-500 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 dark:text-white transition-all duration-300"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="p-2 w-full font-semibold border  border-gray-200 dark:border-gray-500 bg-red-600 rounded-lg hover:bg-red-700 text-white transition-all duration-300"
        >
          {deletingNote ? <Spinner size="6" /> : "Delete"}
        </button>
      </div>
      <div>
        {deletionErrors &&
          <ul className="flex flex-col gap-1 p-1 bg-red-100 rounded-md border border-red-500">
            {deletionErrors.map((err, idx) =>
              <li key={idx} className="text-sm text-red-800">{err}</li>
            )}
          </ul>
        }
      </div>
    </div>
  )
}

function TrashIconXl() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-14 text-red-500">
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
  )
}
