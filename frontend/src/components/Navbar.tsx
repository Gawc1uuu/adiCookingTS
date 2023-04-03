import { Link } from "react-router-dom";
import logo from "../assets/logo4.svg";
import loop from "../assets/search.png";

const Navbar = () => {
  return (
    <nav className="bg-[#4c1626] text-white">
      <div className="container max-w-7xl mx-auto py-1">
        <div className="flex items-center justify-between mx-6 lg:mx-0">
          <div className="flex items-center ">
            <Link to="/">
              <div className="flex items-center">
                <img className="w-32" src={logo.toString()} alt="" />
              </div>
            </Link>
          </div>
          <div className="items-center hidden lg:flex">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1 rounded-lg focus:outline-none text-gray-700"
            />
            <img
              className="relative w-4 h-4 right-6 grayscale"
              src={loop.toString()}
              alt=""
            />
          </div>

          <div className="items-center space-x-12 hidden lg:flex">
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/signup">
              <button className="bg-[#ffb3b3] px-6 py-2 rounded-full hover:bg-opacity-90">
                Sign up
              </button>
            </Link>
            <Link to="/logout">
              <button className="bg-[#ffb3b3] px-6 py-2 rounded-full hover:bg-opacity-90">
                Logout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
