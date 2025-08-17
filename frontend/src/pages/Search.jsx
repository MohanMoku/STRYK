import { useState } from "react"
import { FaSearch } from "react-icons/fa";
import ProductCard from "../components/ProductCard";

export default function Search() {

    const [query, setQuery] = useState('')
    const [productsList, setProductsList] = useState([])

    const [searched, setSearched] = useState(false)

    const handleSearch = async () => {

        try {

            const res = await fetch(`/api/product/search?query=${query}`)
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            const data = await res.json()
            console.log(data)
            setProductsList(data.searchedProducts)
            setSearched(true)

        } catch (error) {
            console.log(error);

        }

    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex h-10 rounded-2xl border overflow-hidden items-center justify-center">
                <form action={handleSearch}>
                    <input type="search" placeholder="Search..." value={query} className="text-black font-bold" onChange={(e) => setQuery(e.target.value)} />
                    <button type="submit" className="btn btn-info h-10"><FaSearch className="font-extrabold" /></button>
                </form>

            </div>

            {
                searched && productsList.length === 0 &&
                <div className="m-10">No products found</div>
            }

            <div className="flex flex-wrap">
                {
                    searched && productsList.length > 0 &&


                    productsList?.map((product, index) => (
                        <div className="m-4" key={index}>
                            <ProductCard product={product} />
                        </div>
                    ))
                }
            </div>

        </div>
    )
}
