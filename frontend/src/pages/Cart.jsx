import { useState } from "react"
import { useEffect } from "react"
import ProductCard from "../components/ProductCard"

export default function Cart() {
    const [cartProduct, setCartProduct] = useState()
    useEffect(() => {
        const fetchCartProducts = async () => {
            try {
                const res = await fetch('/api/users/cart')
                const data = await res.json()
                setCartProduct(data.cartProducts)
            } catch (error) {
                console.log(error);
            }
        }
        fetchCartProducts()

    }, [])

    return (
        <div className="flex flex-col">
            <h1 className="text-center text-teal-600 text-3xl font-bold">CART ITEMS</h1>
            <div className="flex items-center flex-wrap px-5 py-5">

                {
                    cartProduct?.map((product, index) => (
                        <div className="m-4" key={index}>
                            <ProductCard product={product} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
