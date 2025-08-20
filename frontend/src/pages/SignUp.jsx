import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase'
import { useDispatch } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../app/store";
import { useState } from "react";

export default function SignUp() {

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleGoogleClick = async () => {

        try {

            dispatch(signInStart());
            setLoading(true)

            const provider = new GoogleAuthProvider();
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider);

            const res = await fetch('/api/auth/google', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                }),
            });
            const data = await res.json();
            setLoading(false)
            dispatch(signInSuccess(data));

            navigate('/');

        } catch (error) {
            setLoading(false)
            dispatch(signInFailure(error.message));
            console.log("Cloud not sign up with google", error);
        }
    }

    return (
        <div className="flex flex-col md:flex-row min-h-full pb-5 md:pb-0 items-center">
            {/* Left Panel */}
            <div className="flex-1 hidden md:flex h-40 md:h-100 justify-center items-center flex-col m-5 md:m-10 py-5 
                  bg-gray-800/90 shadow-lg shadow-gray-400/50 backdrop-blur-md 
                  hover:scale-105 transition-all duration-500">
                <img
                    src="https://res.cloudinary.com/db7hvuhnt/image/upload/v1755681813/Picsart_25-08-19_22-12-32-714_1_ozvau0.png"
                    alt="Logo"
                    className="h-32 w-auto mb-5"
                />
                <div className="pb-10 px-5 md:px-10">
                    <h1 className="text-lg md:text-xl text-center leading-relaxed">
                        "<i><b>STRYK</b></i> is more than gear — it's your identity.
                        Log in, step up, and show the world what drives you."
                    </h1>
                </div>
            </div>

            {/* Right Panel */}
            <div className="flex-1 flex md:h-100 justify-center items-center flex-col gap-10 m-5 md:m-10 
                  p-5 md:p-10 bg-gray-800/90 shadow-lg shadow-gray-400/50 backdrop-blur-md overflow-hidden
                  hover:scale-105 transition-all duration-500">
                <h1 className="text-3xl md:text-5xl font-extrabold text-blue-400">Sign in</h1>
                <h1 className="text-xl md:text-3xl font-bold">Sign in with Google</h1>
                <button type="button" onClick={handleGoogleClick}>
                    <div className="bg-amber-50 p-3 hover:scale-105 rounded-full">
                        <FcGoogle className="text-4xl md:text-5xl" />
                    </div>
                </button>
                <img
                    src="https://res.cloudinary.com/db7hvuhnt/image/upload/v1755681813/Picsart_25-08-19_22-12-32-714_1_ozvau0.png"
                    alt="Logo"
                    className="h-25 w-auto md:hidden"
                />
                <div className="px-5 md:px-10 md:hidden">
                    <h1 className="text-lg md:text-xl text-center leading-relaxed ">
                        "<i><b>STRYK</b></i> is more than gear — it's your identity.
                        Log in, step up, and show the world what drives you."
                    </h1>
                </div>
            </div>
            {
                loading && (
                    <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
                        <Spinner color="success" aria-label="Loading" size="xl" />
                    </div>
                )
            }
        </div>


    )
}
