import { useState } from 'react';
import { FaRegHeart } from 'react-icons/fa6';
import { FcLike } from 'react-icons/fc'
import { IoEye } from 'react-icons/io5'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

export default function ProductCartVertical({ product }) {
  const navigate = useNavigate()

  const currentUser = useSelector((state) => state.user.currentUser);
  const [isUserLiked, setIsUserLiked] = useState(product.likedBy.includes(currentUser._id))
  const [likeValue, setLikeValue] = useState(product.likesCount)

  const addLikeByUser = async () => {
    try {
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
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="bg-base-content/10 h-15 w-15 rounded-md">
              <img src={product.images[0]} alt="image" />
            </div>
          </div>
          <div>
            <div className="font-medium">{product.name}</div>
          </div>
        </div>
      </td>
      <td className="font-bold text-blue-300">{String.fromCharCode(8377)} {(100 - product.offer) * product.price / 100}
        <br /><span className="font-semibold text-[13px] line-through decoration-red-500 decoration-2">{String.fromCharCode(8377)} {product.price} </span></td>

      <td>{
        isUserLiked ?
          <div className='flex items-center gap-1 border p-2 w-12 rounded-2xl cursor-pointer bg-amber-200 text-black font-bold' onClick={addLikeByUser}><FcLike /> {likeValue}</div> :
          <div onClick={addLikeByUser} className='flex items-center gap-1 border p-2 w-12 rounded-2xl cursor-pointer bg-amber-200 text-black font-bold'><FaRegHeart /> {likeValue}</div>
      }</td>

      <td>
        <IoEye className="text-2xl cursor-pointer" onClick={() => navigate(`/product/${product._id}`)} />
      </td>

    </tr>
  )
}
