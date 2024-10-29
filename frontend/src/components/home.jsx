import { useSelector } from "react-redux"

export default function Home() {
  const user = useSelector(state => state.session.user);

  return (
    <div>
      <h1>hello I am {user?.username}</h1>
    </div>
  )
}
