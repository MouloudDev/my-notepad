import { useState } from "react";

export default function CreateNoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({ title: "", content: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasErrors = false;

    const newErrors = { title: "", content: "" };
    if (!title.trim()) {
      newErrors.title = "Title is required.";
      hasErrors = true;
    }
    if (!content.trim()) {
      newErrors.content = "Content is required.";
      hasErrors = true;
    }

    setErrors(newErrors);

    if (!hasErrors) {
      console.log("Note Created:", { title, content });
      setTitle("");
      setContent("");
      setErrors({ title: "", content: "" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 rounded-lg shadow-md"
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
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-gray-800 mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8B3DFF] focus:border-[#8B3DFF]"
        />
        {errors.title && (
          <p className="text-sm text-red-500 mt-1">{errors.title}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="content"
          className="block text-sm font-medium"
        >
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="5"
          className="text-gray-800 mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8B3DFF] focus:border-[#8B3DFF]"
        ></textarea>
        {errors.content && (
          <p className="text-sm text-red-500 mt-1">{errors.content}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 text-white font-semibold bg-[#8B3DFF] hover:bg-[#7731d8] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Create Note
      </button>
    </form>
  );
}
