import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import createNote from "../../thunks/createNote";
import Spinner from "../spinner";

export default function CreateNoteForm({closeModal}) {
  const dispatch = useDispatch();
  const titleRef = useRef(null);
  const contenetRef = useRef(null);
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (errors) setErrors(null)
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const content = contenetRef.current.value;

    setIsLoading(true);
    try {
      await dispatch(createNote({title, content}))
      .unwrap();
      closeModal()
    } catch (error) {
      console.error('Creation Failed:', error.title);
      setErrors(error.errors)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto px-4 py-2 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-4">
        Create a Note
      </h2>

      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium"
        >
          Title
        </label>
        <input
          type="text"
          ref={titleRef}
          className="text-gray-800 mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8B3DFF] focus:border-[#8B3DFF]"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="content"
          className="block text-sm font-medium"
        >
          Content
        </label>
        <textarea
          ref={contenetRef}
          rows="5"
          className="text-gray-800 mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8B3DFF] focus:border-[#8B3DFF]"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full h-10 px-4 py-2 text-white font-semibold bg-[#8B3DFF] hover:bg-[#7731d8] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {isLoading ? <Spinner /> : "Create Note"}
      </button>
      <div>
      <div className="mt-2 h-14">
        {errors &&
          <ul className="flex flex-col gap-1 p-1 bg-red-100 rounded-md border border-red-500">
            {errors.map((err, idx) =>
              <li key={idx} className="text-sm text-red-800">{err}</li>
            )}
          </ul>
        }
      </div>
      </div>
    </form>
  );
}
