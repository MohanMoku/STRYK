import { useState } from "react"
import { useEffect } from "react"
import ProductCard from "../components/ProductCard"
import { NavLink } from "react-router-dom"
import { Spinner } from "flowbite-react"

export default function Cart() {

    const [cartProduct, setCartProduct] = useState()
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
        const fetchCartProducts = async () => {
            setLoading(true)
            try {
                const res = await fetch('/api/users/cart')
                const data = await res.json()
                setCartProduct(data.cartProducts)
                showToastMessage("Fetched Successfully")
            } catch (error) {
                console.log(error);
                showToastMessage("Something went wrong")
            } finally {
                setLoading(false)
            }
        }
        fetchCartProducts()

    }, [])

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-center text-teal-600 text-3xl font-bold">CART ITEMS</h1>

            {
                cartProduct?.length > 0 ?
                    <NavLink to={`/orderCart`} className="btn btn-success w-40 md:hidden">PLACE ORDER</NavLink> :
                    <h1 className="md:hidden">No cart Items</h1>
            }

            <div className="flex items-center justify-around flex-col md:flex-row md:flex-wrap px-5 py-5">
                {
                    cartProduct?.map((product, index) => (
                        <div className="m-4" key={index}>
                            <ProductCard product={product} />
                        </div>
                    ))
                }
            </div>
            {
                cartProduct?.length > 0 ?
                    <NavLink to={`/orderCart`} className="btn btn-success w-40">PLACE ORDER</NavLink> :
                    <h1>No cart Items</h1>
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
