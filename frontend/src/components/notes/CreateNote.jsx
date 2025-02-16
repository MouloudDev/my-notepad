import { useState } from "react"
import Modal from "./Modal"
import CreateNoteForm from "./CreateNoteFrom"

export default function CreateNote() {
  const [showModal, setShowModal] = useState(false)

  const closeModal = () => setShowModal(false);
  const styles = {
    overlay: "fixed inset-0 z-[999] backdrop-blur-sm flex justify-center items-center",
    modal: "relative border border-gray-400 shadow-lg rounded-lg w-full max-w-xl bg-white dark:bg-[#252627] border",
  }

  return (
    <div className="h-12">
      <button onClick={() => setShowModal(true)}
        className="flex justify-center items-center gap-2 text-white rounded-md bg-[#8B3DFF] w-full h-full max-h-12 hover:bg-[#7731d8] transition-colors duration-300"
      >
        <PlusIcon />
        <span className="text-lg font-semibold">Create a note</span>
      </button>
      <Modal isOpen={showModal} onClose={closeModal} styles={styles}>
        <CreateNoteForm closeModal={closeModal} />
      </Modal>
    </div>
  )
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  )
}
