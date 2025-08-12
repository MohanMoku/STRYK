import { Link, NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";

export default function Navigation() {
    return (
        <footer className="flex items-center justify-around h-16 rounded-2xl bg-gray-800 m-2">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `p-3 rounded-2xl transition-all duration-300 ${isActive
                        ? "bg-gray-600/90 shadow-lg shadow-gray-400/50 backdrop-blur-md scale-80"
                        : "text-blue-300 hover:bg-gray-100/30 hover:shadow-md hover:scale-105"
                    }`
                }
            >
                <FaHome className="text-3xl" />
            </NavLink>

            <NavLink
                to="/products"
                className={({ isActive }) =>
                    `p-3 rounded-2xl transition-all duration-300 ${isActive
                        ? "bg-gray-600/90 shadow-lg shadow-gray-400/50 backdrop-blur-md scale-80"
                        : "text-blue-300 hover:bg-gray-100/30 hover:shadow-md hover:scale-105"
                    }`
                }>
                <AiFillProduct className="text-3xl" />
            </NavLink>

            <NavLink
                to="/search"
                className={({ isActive }) =>
                    `p-3 rounded-2xl transition-all duration-300 ${isActive
                        ? "bg-gray-600/90 shadow-lg shadow-gray-400/50 backdrop-blur-md scale-80"
                        : "text-blue-300 hover:bg-gray-100/30 hover:shadow-md hover:scale-105"
                    }`
                }>
                <FaSearch className="text-3xl" />
            </NavLink>

            <NavLink
                to="/cart"
                className={({ isActive }) =>
                    `p-3 rounded-2xl transition-all duration-300 ${isActive
                        ? "bg-gray-600/90 shadow-lg shadow-gray-400/50 backdrop-blur-md scale-80"
                        : "text-blue-300 hover:bg-gray-100/30 hover:shadow-md hover:scale-105"
                    }`
                }>
                <IoMdCart className="text-3xl" />
            </NavLink>

            <NavLink
                to="/about-us"
                className={({ isActive }) =>
                    `p-3 rounded-2xl transition-all duration-300 ${isActive
                        ? "bg-gray-600/90 shadow-lg shadow-gray-400/50 backdrop-blur-md scale-80"
                        : "text-blue-300 hover:bg-gray-100/30 hover:shadow-md hover:scale-105"
                    }`
                }>
                <FaPeopleGroup className="text-3xl" />
            </NavLink>
        </footer>
    )
}