import ReactDOM from 'react-dom';

export default function Modal({ isOpen, onClose, styles, children }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div onClick={onClose} className={styles.overlay} onMouseLeave={(e) => e.stopPropagation()}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.closeBtnWrapper + ' h-10'}>
          <button
            onClick={onClose}
            className={styles.closeButton + " absolute top-1 right-1 flex justify-center items-center h-8 w-8 rounded-full hover:bg-gray-600 transition-all duration-300"}
          >
            <XMark />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}

function XMark() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  )
}
