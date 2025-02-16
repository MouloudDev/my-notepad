import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import loginUser from "../thunks/loginUser";
import Spinner from "./spinner";
import { Navigate, useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import restoreUser from "../thunks/restoreUser";
import Logo from "./Logo";

export default function Login() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(state => state.session.user);
  const loginErrors = useSelector(
    state => state.session.loginErrors
  )

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [restoringUser, setRestroringUser] = useState(true);

  useEffect(() => {
    const restore = async () => {
      try {
        await dispatch(restoreUser());
      } finally {
        setRestroringUser(false);
      }
    };
    restore();
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(loginUser({credential, password}))
      .unwrap();
      navigate('/home', { replace: true });
    } catch (error) {
      console.error('Login failed:', error.title);
    } finally {
      setIsLoading(false);
    }
  };

  if (restoringUser) return <Spinner />;

  if (user)
    return <Navigate to="/home" state={{ from: location }} replace />;

  return (
    <div className="w-full h-full bg-[linear-gradient(to_left,#10475f,#203a43)]">
      <Link to={'/'} className="block w-full p-4 max-w-xl mx-auto">
        <Logo />
      </Link>
      <div className="text-[#f9faff] max-w-xl mx-auto p-4 sm:p-12 rounded-xl">
        <div className="mb-7">
          <h2 className="text-3xl font-bold text-center">Welcome back</h2>
          <h3 className="text-center">Please enter your details to log in.</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-start mb-3">
            <label htmlFor="credential" className="text-lg font-bold">Email or username</label>
            <input
              type="text" name="credential" placeholder="Email or username..."
              className="text-gray-800 w-full px-2 py-3 outline-none rounded-xl"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start mb-3">
            <label htmlFor="password" className="text-lg font-bold ">Password</label>
            <input
              type="password" name="password" placeholder="Password"
              className="text-gray-800 w-full px-2 py-3 outline-none rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex">
            <label htmlFor="remember-me">
              <input id="remember-me" type="checkbox" name="remember-me" className="scale-125 mr-1" />
              Remember me
            </label>
            <a href="#" className=" block w-fit ml-auto hover:underline">Forgot password?</a>
          </div>
          <button
            type="submit"
            className="text-white text-xl font-semibold mt-3 py-2 rounded-xl w-full bg-[#8B3DFF] hover:bg-[#7731d8] border border-[#7731d8] transition-all duration-300"
          >
            {isLoading ? <Spinner /> : "Log In"}
          </button>
          {loginErrors &&
            <ul className="mt-2 pl-4">
              {loginErrors.map((msg, idx) =>
                <li key={idx} className="text-red-600 list-disc">{msg}</li>
              )}
            </ul>
          }
        </form>
        <div className="mt-6">
          <p>Don't have an account?
            <Link to={'/signup'} className="font-semibold hover:underline"> Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
