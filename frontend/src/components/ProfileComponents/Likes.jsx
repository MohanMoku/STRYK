import { useEffect, useState } from "react"
import ProductCartVertical from "../ProductCartVertical";

export default function Likes() {

    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchLikedProducts = async () => {
            try {
                const res = await fetch('/api/users/getLikedProducts')
                if (!res.status) {
                    throw new Error("No user Found")
                }
                const data = await res.json()
                setProducts(data.likedProducts)
                console.log(data.likedProducts);

            } catch (error) {
                console.log(error);
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

                        <ProductCartVertical product={product} key={index}/>

                    ))
                    }
                </tbody>
            </table>

        </div>
    )
}
