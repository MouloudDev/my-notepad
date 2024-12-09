import { useRef } from "react";
import { useSelector } from "react-redux";

export default function AutoResizeTextarea({content, setContent}) {
  const {fontSize, fontFamily} =
    useSelector(state => state.settings);
  const textareaRef = useRef(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <textarea
      ref={textareaRef}
      onInput={handleInput}
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className="scrollbar-none flex-grow w-full h-full rounded-lg border border-gray-400 outline-none px-4 py-3 shadow-lg dark:text-white dark:bg-slate-900"
      style={{fontSize, fontFamily}}
    ></textarea>
  );
};
