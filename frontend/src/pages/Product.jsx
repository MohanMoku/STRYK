import { Accordion, AccordionContent, AccordionPanel, AccordionTitle, Carousel, Spinner } from "flowbite-react";
import ShareButtons from "../components/ShareButtons";
import { NavLink, useParams } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { FaRegHeart } from "react-icons/fa";
import { updateUserStart, updateUserSuccess } from "../app/store";
import { FaStar } from "react-icons/fa6";
import ProductCard from "../components/ProductCard";
import DisplayReview from "../components/DisplayReview";
import WriteReview from "../components/WriteReview";

export default function Product() {

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

    const [selected, setSelected] = useState("M");
    const { id } = useParams()
    const [productToDisplay, setProductToDisplay] = useState({})
    const currentUser = useSelector((state) => state.user.currentUser);
    const [isUserLiked, setIsUserLiked] = useState(false)
    const [likeValue, setLikeValue] = useState(productToDisplay.likesCount)
    const [productInCart, setProductInCart] = useState(currentUser ? currentUser.cart.includes(productToDisplay._id) : false)
    const dispatch = useDispatch()
    const [similarProducts, setSimilarProducts] = useState([])

    useEffect(() => {

        const fetchProduct = async () => {

            try {
                setLoading(true)

                const res = await fetch(`/api/product/getProduct/?id=${id}`)
                const data = await res.json()
                setProductToDisplay(data.product)

                setIsUserLiked(currentUser ? data.product.likedBy.includes(currentUser._id) : false)
                setProductInCart(currentUser ? currentUser.cart.includes(data.product._id) : false)
                setLikeValue(data.product.likesCount)
                const res1 = await fetch(`/api/product/search?query=${data.product.name.split(" ")[0] + " " + data.product.year}`)
                if (!res1.ok) {
                    throw new Error(res1.statusText)
                }
                const data1 = await res1.json()
                const filteredSimilar = data1.searchedProducts.filter(p => p._id !== data.product._id)
                setSimilarProducts(filteredSimilar)
                setLoading(false)
                showToastMessage("Fetched Successfully")

            } catch (error) {
                console.log(error);
                showToastMessage("Something went wrong")
                setLoading(false)
            }

        }

        fetchProduct();

    }, [])

    const addOrRemoveCart = async () => {

        try {

            setLoading(true)

            const res = await fetch(`/api/users/${productToDisplay._id}/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!res.ok) {
                throw new Error('Failed to add product to cart')
            }

            const data = await res.json()

            dispatch(updateUserStart())
            const res1 = await fetch(`/api/users/user?id=${currentUser._id}`)
            const data1 = await res1.json()
            const user1 = data1.user
            dispatch(updateUserSuccess(user1))

            setProductInCart(data.inCart)

            setLoading(false)
            showToastMessage("Data Updated Successfully")

        } catch (error) {
            console.log(error);
            showToastMessage("Something went wrong")
            setLoading(false)
        }

    }

    const addLikeByUser = async () => {
        try {
            setLoading(true)
            const res = await fetch(`/api/product/${productToDisplay._id}/like`, {
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

            setLoading(false)
            showToastMessage("Updated Successfully")
        } catch (error) {
            console.log(error);
            showToastMessage("Something went wrong")
            setLoading(false)
        }

    }

    if (Object.keys(productToDisplay).length === 0) {
        return (
            <>

            </>
        )
    }

    return (
        <>
            <h1 className="text-xl md:text-4xl text-center font-bold text-white">{productToDisplay.name}</h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-30 p-5">
                <div className="object-cover flex flex-col items-center gap-2 md:gap-5">
                    <div className="relative w-70 h-70 md:h-130 md:w-130 overflow-hidden rounded-2xl">
                        <Carousel>

                            <div className="flex h-full items-center justify-center bg-transparent">
                                <img
                                    src={productToDisplay.images[0]}
                                    alt="Image 1"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex h-full items-center justify-center bg-transparent">
                                <img
                                    src={productToDisplay.images[1]}
                                    alt="Image 2"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex h-full items-center justify-center bg-transparent">
                                <img
                                    src={productToDisplay.images[2]}
                                    alt="Image 3"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex h-full items-center justify-center bg-transparent">
                                <img
                                    src={productToDisplay.images[3]}
                                    alt="Image 4"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </Carousel>
                    </div>
                    <div className="flex gap-3">

                        <div className="flex items-center gap-2 border p-1 rounded-2xl cursor-pointer bg-amber-100 text-black font-bold text-center w-12" onClick={addLikeByUser}>

                            {
                                isUserLiked ?
                                    <><FcLike /> {likeValue}</> :
                                    <><FaRegHeart /> {likeValue}</>
                            }

                        </div>
                        <div className="flex items-center gap-2 border p-1 rounded-2xl cursor-pointer bg-gray-100 text-black font-bold text-center w-auto">
                            <FaStar className="text-amber-400" /> {productToDisplay.averageRating.toFixed(1)}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-3 items-center">

                    <div className="font-bold text-3xl text-blue-300">{String.fromCharCode(8377)} {(100 - productToDisplay.offer) * productToDisplay.price / 100}
                        <span className="font-semibold text-[13px] text-xl line-through decoration-red-500 decoration-2">{String.fromCharCode(8377)} {productToDisplay.price} </span></div>

                    <label className="text-1xl font-bold">Select Size</label>
                    <div className="flex gap-4">
                        <select
                            value={selected}
                            onChange={(e) => setSelected(e.target.value)}
                            className="w-18 p-2 bg-gray-900 text-white border rounded"
                        >
                            {Object.keys(productToDisplay.stock).map((size) => (
                                <option
                                    key={size}
                                    value={size}
                                >
                                    {size}
                                </option>
                            ))}
                        </select>

                        <div className="p-3 bg-gray-900 text-white border rounded">{productToDisplay.stock[selected]}</div>
                    </div>


                    <div className="flex gap-2">
                        <NavLink to={`/payment/?id=${productToDisplay._id}&size=${selected}&stock=${productToDisplay.stock[selected]}`} className="btn btn-success font-bold text-black w-40 md:w-50" disabled={productToDisplay.stock[selected] === 0}>
                            {productToDisplay.stock[selected] === 0 ? "Out Of Stock" : "Order Now"}
                        </NavLink>
                        <button className="btn btn-info text-black font-bold" onClick={addOrRemoveCart}>
                            <FaCartPlus /> {productInCart ? "Remove from Cart" : "Add To Cart"}
                        </button>
                    </div>

                    <Accordion className="w-70 md:w-100">
                        <AccordionPanel>
                            <AccordionTitle>Description</AccordionTitle>
                            <AccordionContent>
                                <div className="prose" dangerouslySetInnerHTML={{ __html: productToDisplay.description }} />
                            </AccordionContent>
                        </AccordionPanel>
                    </Accordion>
                    <Accordion collapseAll className="w-70 md:w-100">
                        <AccordionPanel>
                            <AccordionTitle>Shipping Policy</AccordionTitle>
                            <AccordionContent>
                                <ul className="list-disc pl-5">
                                    <li>Order will dispatch in 24 hrs</li>
                                    <li>Delivery with in 7 days</li>
                                    <li>Free Delivery on orders above {String.fromCharCode(8377)} 999</li>
                                </ul>
                            </AccordionContent>
                        </AccordionPanel>
                        {/* <AccordionPanel>
                            <AccordionTitle>Return Policy</AccordionTitle>
                            <AccordionContent>
                                <ul className="list-disc pl-5">
                                    <li>Raise exchange in 2–3 days if size doesn't fit</li>
                                    <li>No return/exchange on sale or coupon orders</li>
                                    <li>Custom items not returnable (unless our error)</li>
                                    <li>For defects, email support@fulltimestore.in within 72 hrs</li>
                                </ul>
                            </AccordionContent>
                        </AccordionPanel> */}
                    </Accordion>

                    <h1 className="text-1xl font-bold">Share </h1>
                    <ShareButtons productUrl={`http://localhost:5173/product/${productToDisplay._id}`} productName={productToDisplay.name} />

                </div>

            </div>

            {similarProducts && similarProducts.length > 0 &&
                <div>
                    <h1 className="text-center text-2xl font-bold text-green-500">Similar Products</h1>

                    <div className="flex items-center justify-center flex-col flex-wrap px-5 py-5">

                        {
                            similarProducts?.slice(0, 5).map((product, index) => (
                                <div className="m-4" key={index}>
                                    <ProductCard product={product} />
                                </div>
                            ))
                        }

                    </div>

                </div>
            }

            <div className="flex flex-col items-center">
                <h1 className="text-center text-2xl font-bold text-green-500">Reviews</h1>
                <WriteReview id={id} />
                <DisplayReview id={id} />
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

        </>
    )
}


