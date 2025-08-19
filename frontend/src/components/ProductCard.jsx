import { Carousel, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function ProductCard({ product }) {

    const currentUser = useSelector((state) => state.user.currentUser);
    const [isUserLiked, setIsUserLiked] = useState(false)
    const [likeValue, setLikeValue] = useState(product.likesCount)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [showMessage, setShowMessage] = useState(false)
    const showToastMessage = (msg) => {
        setMessage(msg);
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 1000);
    }

    const handleReload = () => {
        setTimeout(() => {
            window.location.reload()
        }, 100);
    }

    useEffect(() => {
        if (product && currentUser) {
            setIsUserLiked(product.likedBy.includes(currentUser._id));
        }
    }, [product, currentUser]);

    const addLikeByUser = async () => {
        try {

            if(!currentUser) {
                showToastMessage("Please Login First")
                return
            }

            setLoading(true)

            const res = await fetch(`/api/product/${product._id}/like`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: currentUser._id })
            })
            const data = await res.json();

            if (data.liked) {
                setIsUserLiked(true)
                setLikeValue(likeValue + 1)

            } else {
                setIsUserLiked(false)
                setLikeValue(likeValue - 1)
            }
            setLoading(false)
            showToastMessage("Liked Successfully")
        } catch (error) {
            console.log(error);
            showToastMessage("Something went wrong")
            setLoading(false)
        }
    }

    return (
        <div className="w-50 rounded-2xl h-auto overflow-hidden flex flex-col justify-center hover:translate-x-1 transition-all duration-300">

            <div className="relative h-50">
                <Carousel>
                    {product.images?.map((img, index) => (
                        <div
                            key={index}
                            className="flex hover:scale-105 duration-300 h-full w-full items-center justify-center bg-transparent"
                        >
                            <img
                                src={img}
                                alt={`img-${index}`}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                    ))}
                </Carousel>

                <div className="absolute top-4 right-2 flex items-center gap-2 border p-1 rounded-2xl cursor-pointer bg-amber-100 text-black font-bold" onClick={addLikeByUser}>
                    {
                        isUserLiked ?
                            <><FcLike /> {likeValue}</> :
                            <><FaRegHeart /> {likeValue}</>
                    }
                </div>
            </div>


            <div className="bg-gray-600 p-2 flex flex-col items-center gap-2 rounded-b-2xl">
                <div className="w-full">
                    <h3 className="font-bold text-1xl text-green-400">{product.name}</h3>
                    <h3 className="font-bold text-1xl text-green-400">{product.year}</h3>
                    <div className="font-bold text-blue-300">{String.fromCharCode(8377)} {(100 - product.offer) * product.price / 100}
                        <span className="font-semibold text-[13px] line-through decoration-red-500 decoration-2">{String.fromCharCode(8377)} {product.price} </span></div>
                </div>

                <NavLink
                    to={`/product/${product._id}`}
                    onClick={handleReload}
                    className="border-2 mb-2 border-green-400 rounded-2xl px-3 text-green-400 font-bold hover:bg-green-400 hover:border-green-900 hover:text-green-800"
                >
                    PREVIEW & BUY
                </NavLink>
            </div>

            {
                loading && (
                    <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
                        <Spinner color="success" aria-label="Loading" size="xl" />
                    </div>
                )
            }
            {
                showMessage && (
                    <div className="fixed bottom-4 right-4 bg-gray-400 text-black px-4 py-2 rounded shadow-lg">
                        {message}
                    </div>
                )
            }

        </div >
    )
}
