import { useEffect, useState } from "react"
import ProductCartVertical from "../ProductCartVertical";
import { Spinner } from "flowbite-react";

export default function Likes() {

    const [products, setProducts] = useState([])
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
        const fetchLikedProducts = async () => {
            try {
                setLoading(true)
                const res = await fetch('/api/users/getLikedProducts')
                if (!res.status) {
                    throw new Error("No user Found")
                }
                const data = await res.json()
                setProducts(data.likedProducts)
                console.log(data.likedProducts);
                setLoading(false)
                showToastMessage("Fetched Successfully")
            } catch (error) {
                console.log(error);
                showToastMessage("Something went wrong")
                setLoading(false)
            }
        }
        fetchLikedProducts()
    }, [])

    return (
        <div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Likes</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>

                    {products.map((product, index) => (

                        <ProductCartVertical product={product} key={index} />

                    ))
                    }
                </tbody>
            </table>

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

        </div>
    )
}
