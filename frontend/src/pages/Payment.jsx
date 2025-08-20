import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TiPlus, TiMinus } from "react-icons/ti";
import { Spinner } from "flowbite-react";

export default function Payment() {

    const [searchParams] = useSearchParams();
    const [productToDisplay, setProductToDisplay] = useState({})
    const currentUser = useSelector((state) => state.user.currentUser);
    const productId = searchParams.get("id");
    const size = searchParams.get("size");
    const [stock, setStock] = useState(searchParams.get("stock"))
    const [custStock, setCustStock] = useState(stock > 0 ? 1 : 0)
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const basePrice = custStock > 0 ? ((100 - productToDisplay.offer) * productToDisplay.price / 100) * custStock : 0;
    const deliveryCharge = basePrice > 999 ? 0 : 40;
    const total = basePrice + deliveryCharge;
    const navigate = useNavigate()

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
        const fetchProduct = async () => {
            try {
                setLoading(true)
                const res = await fetch(`/api/product/getProduct/?id=${productId}`)
                if (!res.ok) throw new Error("Something went wrong");
                const data = await res.json()
                setProductToDisplay(data.product)
                setStock(data.product.stock[size])
                setLoading(false)
                showToastMessage("Fetched Successfully")
            } catch (error) {
                console.log(error);
                showToastMessage("Something went wrong")
                setLoading(false)
            }
        }
        fetchProduct()
    }, [])

    const increaseStock = () => {
        if (custStock < stock) {
            setCustStock(custStock + 1)
        }
    }
    const decreaseStock = () => {
        if (custStock > 0) {
            setCustStock(custStock - 1)
        }
    }

    const placeOrder = async () => {

        try {
            setLoading(true)
            const res = await fetch("/api/order/placeOrder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: {
                        id: currentUser._id,
                        name: currentUser.name,
                        email: currentUser.email,
                        phone: currentUser.phone1
                    },
                    paymentMethod,
                    shippingAddress: currentUser.address,
                    items: [{
                        product: productId,
                        productName: productToDisplay.name,
                        quantity: custStock,
                        size,
                        price: (100 - productToDisplay.offer) * productToDisplay.price / 100,
                    }]
                })
            })

            const data = await res.json()
            console.log(data);
            if (!res.ok) throw new Error(data.message);
            setLoading(false)
            showToastMessage("Order Placed Successfully")
            navigate('/')
        } catch (error) {
            console.log(error);
            showToastMessage("Something went wrong")
            setLoading(false)
        }
    }

    if (productToDisplay.name === undefined)
        return (
            <div>Loading</div>
        )

    return (
        <div className="min-h-[80%] bg-gradient-to-bl from-slate-900 via-slate-800 to-gray-900 flex items-center flex-col justify-center p-6">

            <div className="flex flex-col gap-2 mad:gap-0 md:flex-row pb-4 justify-around md:w-300 items-center border-b">
                <div className="flex flex-col md:flex-row items-center gap-4 border-b md:border-b-0">
                    <img src={productToDisplay.images[0]} alt={productToDisplay.name} className="w-60 h-60 object-cover rounded-xl" />
                    <div>
                        <h2 className="text-xl md:text-3xl font-bold">{productToDisplay.name}</h2>
                        <p className="font-semibold md:text-2xl">₹{(100 - productToDisplay.offer) * productToDisplay.price / 100}</p>
                        <p className="font-semibold md:text-xl">Size: {size}</p>
                        <p className="font-semibold md:text-xl">Stock left: {stock}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-80 overflow-clip">
                    <h3 className="text-xl md:text-3xl font-bold mb-2">Shipping Address</h3>
                    <p className="text-gray-200 md:text-2xl font-semibold">Name: {currentUser.name}</p>
                    <p className="text-gray-200 font-semibold md:text-1xl md:w-70 text-wrap"><u>Address</u>: {currentUser.address}</p>
                    <p className="text-gray-200 font-semibold md:text-1xl"><u>Phone1</u>: {currentUser.phone1}</p>
                    <p className="text-gray-200 font-semibold md:text-1xl"><u>Phone2</u>: {currentUser.phone2}</p>
                    <p className="text-gray-200 font-semibold md:text-1xl"><u>Email</u>: {currentUser.email}</p>
                </div>
            </div>

            <div className="flex pb-4 flex-col gap-2 md:gap-0 md:flex-row justify-around md:w-300 items-center mt-4">

                <div className="border-b pb-4">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">Billing</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="font-semibold text-1xl md:text-xl flex gap-8">{productToDisplay.name} x

                                <span className="flex gap-2 items-center mr-4"><span className="cursor-pointer border rounded-full bg-red-500 text-black" onClick={decreaseStock}>
                                    <TiMinus size={25} /></span><span>{custStock}</span><span className="cursor-pointer border rounded-full bg-green-500 text-black" onClick={increaseStock}>
                                        <TiPlus size={25} /></span></span>

                            </span>
                            <span className="text-1xl">₹{(100 - productToDisplay.offer) * productToDisplay.price / 100 * custStock}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Delivery</span>
                            <span>₹{deliveryCharge}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-2xl font-bold mb-2">Payment Method</h3>
                    <div className="space-y-2">
                        {/* <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="upi"
                                checked={paymentMethod === "upi"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span>UPI</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="card"
                                checked={paymentMethod === "card"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span>Credit / Debit Card</span>
                        </label> */}
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="cod"
                                checked={paymentMethod === "cod"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span>Cash on Delivery</span>
                        </label>
                    </div>
                </div>
            </div>

            <button className="w-full md:w-100 mt-4 text-lg py-4 rounded-2xl bg-green-600 disabled:cursor-not-allowed text-white hover:bg-green-700" disabled={custStock === 0} onClick={placeOrder}>
                Pay Now
            </button>

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
    );
}
