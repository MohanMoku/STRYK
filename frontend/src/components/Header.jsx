import { useEffect, useState } from "react";
import { FaPowerOff } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateUserFailure, updateUserStart, updateUserSuccess } from "../app/store";
import { Spinner } from "flowbite-react";

export default function Header() {

    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.user.currentUser);
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [showMessage, setShowMessage] = useState(false)
    const showToastMessage = (msg) => {
        setMessage(msg);
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    }

    useEffect(() => {

        const fetchUser = async () => {

            try {
                setLoading(true)

                dispatch(updateUserStart())

                const res = await fetch(`/api/users/user?id=${currentUser._id}`)

                const data = await res.json()

                const user = data.user

                dispatch(updateUserSuccess(user))
                setLoading(false)
                showToastMessage("Fetched Successfully")

            } catch (error) {
                dispatch(updateUserFailure(currentUser))
                console.log(error);
                showToastMessage("Something went wrong")
                setLoading(false)
            }
        }

        if (currentUser) {
            fetchUser()
        }


    }, [])

    return (
        <header
            className="flex px-4 sm:px-6 lg:px-10 sm:h-auto lg:h-16 m-2 w-auto rounded-2xl bg-gray-900 items-center justify-between"
        >
            {/* Logo */}
            <Link to="/" className="flex items-center">
                <img
                    src="https://res.cloudinary.com/db7hvuhnt/image/upload/v1755681813/Picsart_25-08-19_22-12-32-714_1_ozvau0.png"
                    alt="Logo"
                    className="h-[60px] sm:h-14 md:h-16 lg:h-20 w-auto cursor-pointer"
                />
            </Link>

            {/* Title */}
            {/* <span
                className=" text-center
    text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold 
    bg-clip-text text-transparent 
    animate-shine 
    drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]
    inline-block
  "
            >
                STRYK
            </span> */}


            {/* Profile / Login Icon */}
            <Link to="/profile/user" className="flex items-center">
                {currentUser ? (
                    <img
                        src={currentUser.dpUri}
                        alt="Profile Picture"
                        className="w-[40px] h-[40px] sm:w-12 sm:h-12 border-2 border-white rounded-full p-1 cursor-pointer"
                    />
                ) : (
                    <FaPowerOff
                        className="w-[40px] h-[40px] sm:w-12 sm:h-12 text-white border-2 border-white rounded-full p-1 cursor-pointer 
                     hover:border-red-500 hover:text-red-500 transition-all duration-300"
                    />
                )}
            </Link>

            {/* Loading Spinner */}
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
                    <Spinner color="success" aria-label="Loading" size="xl" />
                </div>
            )}

            {/* Flash Message */}
            {showMessage && (
                <div className="fixed bottom-4 right-4 bg-gray-400 text-black px-4 py-2 rounded shadow-lg">
                    {message}
                </div>
            )}
        </header>
    );

}