import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import formatDateTime from "../../utils/formatDateTime";
import Spinner from "../spinner";
import updateNote from "../../thunks/updateNote";
import AutoResizeTextarea from "./AutoResizeTextarea";

export default function NoteView() {
  const dispatch = useDispatch();
  const {currNote, fetchingNotes} =
    useSelector(state => state.notes);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [updatingNote, setUpdatingNote]
    = useState(false);
  const [updateErrors, setUpdateErrors]
    = useState(null);

  useEffect(() => {
    setUpdateErrors(null);
    if (!currNote) return;
    setTitle(currNote.title);
    setContent(currNote.content)
  }, [currNote])

  if (fetchingNotes) return <Loading />;
  if (!currNote) return <NoNote />;

  const {createdAt, updatedAt} = currNote;
  const noteHasntChanged =
    currNote.title === title.trim() &&
    currNote.content === content.trim();

  const handleNoteUpdate = async () => {
    const note = {id: currNote.id, title, content}
    setUpdatingNote(true);
    try {
      await dispatch(updateNote(note))
      .unwrap();
      setUpdateErrors(null)
    } catch (error) {
      console.error('Update Failed:', error.title);
      setUpdateErrors(error.errors)
    } finally {
      setUpdatingNote(false);
    }
  }

  return (
    <div className="flex flex-col p-2 mx-2 w-full min-h-screen">
      <span className="text-md font-semibold block">
        Created at: <span className="text-sm text-gray-300">{formatDateTime(createdAt)}</span>
      </span>
      <span className="text-md font-semibold">
        Updated at: <span className="text-sm text-gray-300">{formatDateTime(updatedAt)}</span>
      </span>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-3xl text-white border border-gray-400 text-left font-bold my-2 p-3 rounded-lg outline-none bg-slate-900"
      />
      <div className="flex flex-col flex-grow h-full">
        <AutoResizeTextarea
          content={content}
          setContent={setContent}
        />
        <div className="my-2 w-full h-fit">
          <button
            onClick={handleNoteUpdate}
            className={`${noteHasntChanged ? "cursor-not-allowed" : ""} w-32 h-10 font-semibold p-2 block ml-auto rounded-lg bg-orange-600 hover:bg-orange-700 transition-colors duration-300`}
            disabled={noteHasntChanged}
          >
            {updatingNote ? <Spinner /> : "Save changes"}
          </button>
        </div>
      </div>
      <div>
        {updateErrors &&
          <ul className="flex flex-col gap-1 p-1 bg-red-100 rounded-md border border-red-500">
            {updateErrors.map((err, idx) =>
              <li key={idx} className="text-sm text-red-800">{err}</li>
            )}
          </ul>
        }
      </div>
    </div>
  )
}

function Loading() {
  return (
    <div className="flex items-center w-full">
      <Spinner />
    </div>
  )
}

function NoNote() {
  return (
    <div className="w-full mx-2 p-2">
    <p className="text-lg text-center text-gray-200 max-w-xl mx-auto">
      <img src="./Empty-amico.png" alt="empty illustration" />
      No note selected. Click on a note from the list or create a new one if none are available, then click to view it.
    </p>
  </div>
  )
}
