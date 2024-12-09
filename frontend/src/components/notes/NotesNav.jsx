import { forwardRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrNote } from "../../store/notesSlice";
import Modal from "./Modal";
import Spinner from "../spinner";
import ConfirmDelete from "./ConfirmDelete";

export default function NotesNav() {
  const dispatch = useDispatch();
  const {
    notesToDisplay,
    currNote,
    fetchingNotes
  } = useSelector(state => state.notes);

  if (fetchingNotes) {
    return (
      <div className="w-64 mt-2">
         <Spinner />
      </div>
    )
  }

  if (!notesToDisplay.length) {
    return (
      <div className="w-64 text-center py-4">
        <p className="text-xl dark:text-gray-200">
          No notes to display! You can create a new note or try searching with a different term.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 min-w-64">
      <ul>
        {notesToDisplay.map(note =>
          <li
            onClick={() => dispatch(setCurrNote(note.id))}
            className={`${currNote?.id === note.id ? "bg-gray-200 dark:bg-gray-700" : ""} group grid grid-cols-10 items-center content-center my-1 p-3 rounded-lg cursor-pointer min-w-60 h-12 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 transition-colors duration-300`}
            key={note.id}
          >
            <PencilIcon />
            <span className="w-full ml-1 col-span-7 truncate">{note.title}</span>
            <Options note={note} />
          </li>
        )}
      </ul>
    </div>
  )
}

function Options({ note }) {
  const dispatch = useDispatch();
  const ellipsisRef = useRef(null);
  const optionsRef = useRef(null);
  const [showOpts, setShowOpts] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    if (!showOpts || !ellipsisRef.current || !optionsRef.current) return;

    const ellipsisRect = ellipsisRef.current.getBoundingClientRect();
    const optionsRect = optionsRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Default position (right of ellipsis)
    let left = ellipsisRect.right -6;
    let top = ellipsisRect.top;

    // Check if options would overflow right edge
    if (left + optionsRect.width > viewportWidth) {
      // Position to the left of ellipsis
      left = ellipsisRect.left - optionsRect.width;
    }

    // If still no space on left, center it under the ellipsis
    if (left < 0) {
      left = ellipsisRect.left + (ellipsisRect.width - optionsRect.width) / 2;
      top = ellipsisRect.bottom;
    }

    // Check vertical overflow
    if (top + optionsRect.height > viewportHeight) {
      top = viewportHeight - optionsRect.height;
    }

    setPosition({ top, left });
  }, [showOpts]);

  const styles = {
    overlay: "fixed inset-0 z-[999] backdrop-blur-sm flex justify-center items-center",
    modal: "relative p-1 shadow-lg rounded-lg w-fit border border-gray-200 bg-white dark:border-gray-500 dark:bg-[#252627]",
    closeBtnWrapper: "hidden",
  }

  return (
    <div
      className="hidden last:group-hover:block ml-auto col-span-2 [content]:text-green-300"
      title="Options"
      onClick={(e) => {e.stopPropagation(); setShowOpts(true)}}
      onMouseLeave={() => setShowOpts(false)}
    >
      <EllipsisHorizontal ref={ellipsisRef} />
      {showOpts && (
        <div
          ref={optionsRef}
          style={{
            position: 'fixed',
            top: `${position.top}px`,
            left: `${position.left}px`,
            zIndex: "289"
          }}
          className="z-[999] p-2 rounded-lg cursor-pointer bg-white border border-gray-200 shadow-lg dark:bg-gray-600 dark:border-none transition-colors duration-300"
        >
          <button
            onClick={() => dispatch(setCurrNote(note.id))}
            className="flex gap-1 p-2 w-full rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500"
          >
            <PencilSquareIcon />
            <span>Edit</span>
          </button>
          <button
            className="flex p-2 w-full text-red-500 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500"
            onClick={() => setShowDeleteModal(true)}
          >
            <TrashIcon />
            <span >Delete</span>
          </button>
          <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} styles={styles}>
            <ConfirmDelete
              note={note}
              cancelDeletion={() => setShowDeleteModal(false)}
            />
          </Modal>
        </div>
      )}
    </div>
  );
}

const EllipsisHorizontal = forwardRef((_, ref) => (
  <svg ref={ref} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
  </svg>
))

function PencilIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-[18px]">
      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
  )
}

function PencilSquareIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
  )
}
