import { useDispatch, useSelector } from "react-redux"
import logoutUser from "../thunks/logoutUser";

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const Logout = async () => {
    try {
      await dispatch(logoutUser())
      .unwrap();
    } catch (error) {
      console.error('Logout failed:', error.title);
    }
  }

  return (
    <div>
      <h1>hello I am {user?.username}</h1>
      <button
        className="p-2 text-lg font-semibold rounded-xl bg-orange-500 hover:bg-orange-700 transition-all duration-300"
        onClick={Logout}
      >
        Log out
      </button>
    </div>
  )
}
