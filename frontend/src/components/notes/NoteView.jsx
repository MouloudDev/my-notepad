import { useEffect, useState } from "react";
import { useSelector } from "react-redux"

export default function NoteView() {
  const currNote = useSelector(state => state.notes.currNote);
  const {createdAt, updatedAt} = currNote;
  const {fontSize, fontFamily} = useSelector(state => state.settings);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const noteHasntChanged =
    currNote.title === title.trim() &&
    currNote.content === content.trim();

  useEffect(() => {
    setTitle(currNote.title);
    setContent(currNote.content)
  }, [currNote])

  return (
    <div className="flex flex-col p-2 mx-2 w-full">
      <span className="text-md font-semibold block">
        Created at: <span className="text-sm text-gray-300">{createdAt}</span>
      </span>
      <span className="text-md font-semibold">
        Updated at: <span className="text-sm text-gray-300">{updatedAt}</span>
      </span>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-3xl text-white border border-gray-400 text-left font-bold my-2 p-3 rounded-lg outline-none bg-slate-900"
      />
      <div className="flex-grow">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="text-white w-full h-full rounded-lg border border-gray-400 outline-none bg-slate-900 px-4 py-3 shadow-lg"
          style={{fontSize, fontFamily}}
        >
        </textarea>
        <div className="my-2 w-full border h-fit">
          <button
            className={`${noteHasntChanged ? "cursor-not-allowed" : ""} font-semibold p-2 block ml-auto rounded-lg bg-orange-600 hover:bg-orange-700 transition-colors duration-300`}
            disabled={noteHasntChanged}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  )
}
