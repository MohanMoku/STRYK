import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";

export default function DisplayReview({ id }) {

    const [reviews, setReviews] = useState([])

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

        const getReviews = async () => {

            try {
                setLoading(true)

                const res = await fetch(`/api/product/getReviews?id=${id}`)

                if (!res.ok) throw new Error(res.statusText)

                const data = await res.json();
                setReviews(data.reviewDetails)
                setLoading(false)
                showToastMessage("Fetched Successfully")

            } catch (error) {
                console.log(error);
                showToastMessage("Something went wrong")
                setLoading(false)
            }

        }

        getReviews()

    }, [])

    return (
        <>
            {reviews.length > 0 &&
                reviews.map((review, index) =>
                    <div className="flex items-center gap-2 p-4 border-b border-gray-500" key={index}>
                        <img src={review.dpUri} alt="img" className="w-18 h-18 rounded-full object-cover" />
                        <div className="flex flex-col gap-1 w-80">
                            <h1 className="text-white text-xl">{review.name}</h1>
                            <p>{review.comment}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <FaStar className="text-yellow-400 text-2xl" />
                            <p className="text-white text-xl">{review.rating}</p>
                        </div>
                    </div>
                )
            }
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
        </>
    )
}