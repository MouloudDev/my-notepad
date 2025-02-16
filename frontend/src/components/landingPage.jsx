import { Link } from "react-router-dom";
import Logo from "./Logo";
import TextAnimation from "./TextAnimation";

export default function LandingPage() {
  return (
    <div className="w-full min-h-[100vh] bg-animated-gradient bg-[linear-gradient(to_left,#171717,#000000)] text-[#959cb1]">
      <Link to={'/'} className="block w-full px-6 py-4 max-w-4xl mx-auto">
        <Logo />
      </Link>
      <div className="p-6 mb-12  max-w-4xl mx-auto">
        <h1 className="text-[#f9faff] font-semibold text-center sm:text-left text-[38px] sm:text-[44px] mt-8 mb-4 max-w-xl">
          MY-NOTEPAD <br/>
          CAPTURE YOUR THOUGHTS EFFORTLESSLY. <br/>
          SIMPLE, SECURE, FAST.
        </h1>
        <TextAnimation />
        <Link to={'/login'} className='block w-fit mt-6 mx-auto sm:mx-0 px-6 p-3 text-white rounded-xl bg-[#8B3DFF] hover:bg-[#7731d8] border border-[#7731d8] transition-colors duration-300'>
          GET STARTED
        </Link>
      </div>
      <div className="px-6 text-center sm:text-left text-[#f9faff] grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
        <div>
          <h3 className="text-xl font-semibold mb-2">📝 Simple & Intuitive</h3>
          <p className="text-[#dcdcdc] ">Focus on your ideas, not on a cluttered interface.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">📂 Organized</h3>
          <p className="text-[#dcdcdc] ">Easily categorize and search your notes.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">🔒 Secure</h3>
          <p className="text-[#dcdcdc] ">Your ideas are safe with us.</p>
        </div>
      </div>

      <footer className="text-center pb-6 pt-12 text-[#f9faff] border-t border-gray-700 mt-12">
         Developed with ❤️ by -Mouloud-
      </footer>
    </div>
  )
}
