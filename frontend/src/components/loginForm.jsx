import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import loginUser from "../thunks/loginUser";
import Spinner from "./spinner";
import { useNavigate } from "react-router";

export default function Login() {
  const dispatch = useDispatch();
  const loginErrors = useSelector(
    state => state.session.loginErrors
  )
  const navigate = useNavigate();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(loginUser({credential, password}));
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border max-w-xl mx-auto mt-60 p-4 sm:p-12 rounded-xl shadow-lg">
      <div className="mb-7">
        <h2 className="text-3xl font-bold text-center">Welcome back</h2>
        <h3 className="text-center text-gray-800">Please enter your details to log in.</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-start mb-3">
          <label htmlFor="credential" className="text-lg font-bold">Email or username</label>
          <input
            type="text" name="credential" placeholder="Email or username..." className="w-full px-2 py-3 outline-none border border-gray-200 rounded-xl"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start mb-3">
          <label htmlFor="password" className="text-lg font-bold">Password</label>
          <input
            type="password" name="password" placeholder="Password" className="w-full px-2 py-3 outline-none border border-gray-200 rounded-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex">
          <label htmlFor="remember-me" className="text-gray-800">
            <input id="remember-me" type="checkbox" name="remember-me" className="scale-125 mr-1" />
            Remember me
          </label>
          <a href="#" className="text-gray-800 block w-fit ml-auto hover:underline">Forgot password?</a>
        </div>
        <button
          type="submit"
          className="bg-gray-900 text-white text-xl font-semibold mt-3 py-2 rounded-xl w-full hover:bg-gray-800 transition-colors duration-300"
        >
          {isLoading ? <Spinner /> : "Login"}
        </button>
        {loginErrors &&
          <ul className="mt-2 pl-4">
            {loginErrors.map((msg, idx) =>
              <li key={idx} className="text-red-600 list-disc">{msg}</li>
            )}
          </ul>
        }
      </form>
    </div>
  )
}
