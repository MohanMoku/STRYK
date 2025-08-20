import { useState } from "react"
import { FaSearch } from "react-icons/fa";
import ProductCard from "../components/ProductCard";

export default function Search() {

    const [query, setQuery] = useState('')
    const [productsList, setProductsList] = useState([])

    const [searched, setSearched] = useState(false)

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

    const handleSearch = async () => {

        try {
            setLoading(true)
            const res = await fetch(`/api/product/search?query=${query}`)
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            const data = await res.json()
            setProductsList(data.searchedProducts)
            setSearched(true)
            setLoading(false)
            showToastMessage("Fetched Successfully")
        } catch (error) {
            console.log(error);
            showToastMessage("Something went wrong")
            setLoading(false)
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

            <div className="flex flex-col md:flex-row md:justify-around md:flex-wrap">
                {
                    searched && productsList.length > 0 &&

                    productsList?.map((product, index) => (
                        <>
                            <div className="m-4" key={index}>
                                <ProductCard product={product} />
                            </div>
                        </>
                    ))
                }
            </div>

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
