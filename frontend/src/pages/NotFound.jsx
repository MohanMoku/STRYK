import { NavLink } from "react-router-dom"
import ErrorImage from "../assets/error-404.png"

export default function NotFound() {
    return (
        <div className='flex items-center justify-center h-full flex-col'>
            <div className="w-80">
                <img src={ErrorImage} alt="404" />
            </div>
            <h1 className="text-3xl font-bold text-gray-100">
                Page Not Found
            </h1>
            <NavLink to="/" className="text-3xl mt-10 bg-blue-400 px-5 py-2 text-amber-50 font-extrabold rounded-2xl hover:scale-105 transition-all duration-300">
                Home
            </NavLink>
        </div>
    )
}
