import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./spinner";
import { Navigate, useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import signupUser from "../thunks/singupUser";
import { setSignupErrors } from "../store/sessionSlice";
import restoreUser from "../thunks/restoreUser";

export default function Signup() {
  const user = useSelector(state => state.session.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const signupErrors = useSelector(
    state => state.session.signupErrors
  )
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

    if (password !== confirmPassword) {
      dispatch(setSignupErrors(["Passwords don't match"]));
      return;
    }
    setIsLoading(true);
    const userDetails = {username, email, password}
    try {
      await dispatch(signupUser(userDetails))
      .unwrap()  // unwrap() will throw if the action is rejected
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Sign up failed:', error.title);
    } finally {
      setIsLoading(false);
    }
  };

  if (restoringUser) return <Spinner />;

  if (user)
    return <Navigate to="/" state={{ from: location }} replace />;

  return (
    <div className="border max-w-xl mx-auto p-4 sm:p-12 rounded-xl shadow-lg">
      <div className="mb-7">
        <h2 className="text-3xl font-bold text-center dark:text-white">Create Account</h2>
        <h3 className="text-center dark:text-white">Please enter your details to sign up.</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-start mb-3">
          <label htmlFor="username" className="text-lg font-bold dark:text-white">Username</label>
          <input
            type="text" name="username" placeholder="Choose a username..."
            className="text-gray-800 w-full px-2 py-3 outline-none border border-gray-200 rounded-xl focus:border dark:border-gray-400 focus:border-gray-700 dark:focus:border-white dark:bg-[#252627] dark:text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start mb-3">
          <label htmlFor="email" className="text-lg font-bold dark:text-white">Email</label>
          <input
            type="text" name="email" placeholder="Type your email here..."
            className="text-gray-800 w-full px-2 py-3 outline-none border border-gray-200 rounded-xl focus:border dark:border-gray-400 focus:border-gray-700 dark:focus:border-white dark:bg-[#252627] dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start mb-3">
          <label htmlFor="password" className="text-lg font-bold dark:text-white">Password</label>
          <input
            type="password" name="password" placeholder="Password"
            className="text-gray-800 w-full px-2 py-3 outline-none border border-gray-200 rounded-xl focus:border dark:border-gray-400 focus:border-gray-700 dark:focus:border-white dark:bg-[#252627] dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start mb-3">
          <label htmlFor="confirmPassword" className="text-lg font-bold dark:text-white">Confirm password</label>
          <input
            type="password" name="confirmPassword" placeholder="Type your password again"
            className="text-gray-800 w-full px-2 py-3 outline-none border border-gray-200 rounded-xl focus:border dark:border-gray-400 focus:border-gray-700 dark:focus:border-white dark:bg-[#252627] dark:text-white"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="text-white text-xl font-semibold mt-3 py-2 rounded-xl w-full bg-[#8B3DFF] hover:bg-[#7731d8] border border-[#7731d8] transition-all duration-300"
        >
          {isLoading ? <Spinner /> : "Sign Up"}
        </button>
        {signupErrors &&
          <ul className="mt-2 pl-4">
            {signupErrors.map((msg, idx) =>
              <li key={idx} className="text-red-600 list-disc">{msg}</li>
            )}
          </ul>
        }
      </form>
      <div className="mt-6">
        <p className="text-gray-800 dark:text-gray-300">Already have an account?
          <Link to={'/login'} className="font-semibold hover:underline dark:text-white"> Login here</Link>
        </p>
      </div>
    </div>
  )
}
