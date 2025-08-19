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
        <div className="flex h-full">
            <div className="flex-1 flex justify-center items-center flex-col gap-20 m-30 mx-40 bg-gray-800/90 shadow-lg shadow-gray-400/50 backdrop-blur-md hover:scale-110 transition-all duration-500">
                <img src="/vite.svg" alt="Logo" className="h-8" />
                <div className="w-50">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas saepe hic fugiat veritatis provident com modi id sit recusandae necessitatibus consectetur.
                </div>
            </div>
            <div className="flex-1 flex justify-center items-center flex-col gap-20 m-30 mx-40 bg-gray-800/90 shadow-lg shadow-gray-400/50 backdrop-blur-md hover:scale-110 transition-all duration-500">
                <h1 className="text-5xl font-extrabold text-blue-400">Sign in</h1>
                <h1 className="text-3xl font-bold">Sign in with Google</h1>
                <button type="button" onClick={handleGoogleClick} >
                    <div className="bg-amber-50 p-2 hover:scale-105 rounded-full">
                        <FcGoogle className="text-5xl" />
                    </div>
                </button>
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
