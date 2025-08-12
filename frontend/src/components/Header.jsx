import { FaPowerOff } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {

    const currentUser = useSelector((state) => state.user.currentUser);

    return (
        <header className="h-16 flex justify-between items-center px-6 m-2 rounded-2xl bg-gray-800">
            <Link to="/">
                <img src="/vite.svg" alt="Logo" className="h-8" />
            </Link>
            <h1 className="text-5xl font-bold bg-gradient-to-bl from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent animate-shine drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]">
                STRYK
            </h1>

            <Link to="/profile/user">

                {
                    currentUser ?

                        <img src={currentUser.dpUri} alt="Profile Picture" className="overflow-hidden border-2 border-white rounded-full p-1 cursor-pointer w-10 h-10" />
                        :
                        <FaPowerOff className="w-10 h-10 text-white text-3xl border-2 border-white rounded-full p-1 cursor-pointer hover:border-red-500 hover:text-red-500 transition-all duration-300" />
                }
            </Link>
        </header>
    );
}