import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import { Spinner } from "flowbite-react";

export default function Products() {
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

    const [productsList, setProductsList] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                const res = await fetch('/api/product/getAllProducts')
                if (!res.ok) {
                    throw new Error("Try Again Later")
                }
                const data = await res.json()
                setProductsList(data.products)
                setLoading(false)
                showToastMessage("Products Fetched")
            } catch (error) {
                console.log(error);
                setLoading(false)
                showToastMessage("Try Again Later")
            }
        }
        fetchProducts()
    }, [])

    return (

        <div className="flex items-center justify-between flex-wrap px-5 py-5">

            {
                productsList?.map((product, index) => (
                    <div className="m-4" key={index}>
                        <ProductCard product={product} />
                    </div>
                ))
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
        </div>
    )
}
