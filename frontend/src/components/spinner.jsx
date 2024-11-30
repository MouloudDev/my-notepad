export default function Spinner({size}) {
  return (
    <svg
      className={`${size ? `size-${size}` : "size-7"} animate-spin rounded-full mx-auto border-4 border-gray-400 border-t-4 border-t-white`}
      viewBox="0 0 24 24"
      color="white"
    >
    </svg>
  )
}
