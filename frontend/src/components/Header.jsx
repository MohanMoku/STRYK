import { useEffect } from "react";
import { FaPowerOff } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateUserFailure, updateUserStart, updateUserSuccess } from "../app/store";

export default function Header() {

    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.user.currentUser);

    useEffect(() => {

        const fetchUser = async () => {

            try {

                dispatch(updateUserStart())

                const res = await fetch(`/api/users/user?id=${currentUser._id}`)

                const data = await res.json()

                const user = data.user

                dispatch(updateUserSuccess(user))

            } catch (error) {
                dispatch(updateUserFailure(currentUser))
                console.log(error);
            }

        }

        if (currentUser) {
            fetchUser()
        }


    }, [])

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