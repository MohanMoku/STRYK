import React, { useState } from 'react'
import { FaStar } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
export default function WriteReview({ id }) {
    const [review, setReview] = useState("")
    const [rating, setRating] = useState(0)
    const currentUser = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate();

    const addReview = async () => {

        if (!currentUser) {
            navigate("/sign-up")
            return;
        }

        if (!review || rating === 0) return;

        try {

            const res = await fetch(`/api/product/addReview`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ productId: id, rating, comment: review })
            })

            if (!res.ok) throw new Error(res.statusText)

            const data = await res.json();
            console.log(data);
            setReview("")
            setRating(0)
            window.location.reload()

        } catch (error) {
            console.log(error);
        }

    }

    const handleRating = (e) => {
        if (e.target.value < 0 || e.target.value > 5) return;
        setRating(e.target.value)
    }


    return (
        <div className='p-5 flex flex-col gap-3 items-center justify-center border-b'>
            <h1 className='text-2xl font-bold text-center text-white'>Add Review</h1>
            <div className="flex gap-2">
                <img
                    src={currentUser ? currentUser.dpUri : "https://th.bing.com/th/id/R.5539f4340c5a97c0520795b765349d50?rik=y0ZNNL031Nmo0g&pid=ImgRaw&r=0"}
                    alt="Image" className='w-20 h-20 rounded-full object-cover' />
                <textarea value={review} className='w-80 rounded input h-20 bg-amber-50 text-black' onChange={(e) => setReview(e.target.value)} />
                <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                        <FaStar className='text-yellow-400 text-2xl' />
                        <input value={rating} type="number" min="1" max="5" className='text-white w-15 text-center input' onChange={handleRating} />
                    </div>
                    <button className='btn btn-success text-black font-bold w-22 h-8' onClick={addReview}>POST</button>
                </div>
            </div>

        </div>
    )
}
