import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useState } from "react";

export default function Products() {

    const [productsList, setProductsList] = useState([])

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const res = await fetch('/api/product/getAllProducts')

                if (!res.ok) {
                    throw new Error("Try Again Later")
                }

                const data = await res.json()

                setProductsList(data.products)

            } catch (error) {
                console.log(error);
            }

        }
        fetchProducts()

    }, [])

    return (
        <div className="flex items-center justify-between flex-wrap px-5 py-5">

            {
                productsList?.map((product, index) => (
                    <div className="m-4" key={index}>
                        <ProductCard product={product}/>
                    </div>
                ))
            }
        </div>
    )
}
