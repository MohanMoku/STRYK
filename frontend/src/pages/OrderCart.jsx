import React, { useEffect, useState } from 'react'
import { TiMinus, TiPlus } from 'react-icons/ti';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Spinner } from "flowbite-react"

export default function OrderCart() {
    const [cartProducts, setCartProducts] = useState([])
    const [sizeArr, setSizeArr] = useState([])
    const [qtyArr, setQtyArr] = useState([])
    const currentUser = useSelector((state) => state.user.currentUser);
    const paymentMethod = "cod";
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
        const fetchCartProducts = async () => {
            try {
                setLoading(true)
                const res = await fetch('/api/users/cart')
                const data = await res.json()
                setCartProducts(data.cartProducts)
                setSizeArr(Array(data.cartProducts.length).fill("M"))
                setQtyArr(Array(data.cartProducts.length).fill(1))
                showToastMessage("Fetched Successfully")
                setLoading(false)
            } catch (error) {
                console.log(error);
                showToastMessage("Something went wrong")
                setLoading(false)
            }
        }
        fetchCartProducts()
    }, [])

    const onSizeChange = (e, i) => {
        const newSizeArr = [...sizeArr];
        newSizeArr[i] = e.target.value;

        const newQtyArr = [...qtyArr];
        const newStock = cartProducts[i].stock[e.target.value];

        if (newQtyArr[i] > newStock) {
            newQtyArr[i] = newStock > 0 ? newStock : 1;
        }

        setSizeArr(newSizeArr);
        setQtyArr(newQtyArr);
    };

    const getCartDetails = () => {
        return cartProducts.map((product, index) => {
            const size = sizeArr[index];
            const quantity = qtyArr[index];
            const stockChosen = product.stock[size];
            const priceAfterOffer = ((100 - product.offer) * product.price) / 100;
            return {
                product: product._id,
                productName: product.name,
                quantity: quantity,
                stockChosen: stockChosen,
                size: size,
                price: priceAfterOffer
            };
        });
    };

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
                    items: getCartDetails()
                })
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.message)
            setLoading(false)
            showToastMessage("Order Placed Successfully")
            navigate('/')
        } catch (error) {
            console.log(error);
            showToastMessage("Something went wrong")
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }


    const increaseQty = (index) => {
        const product = cartProducts[index];
        const selectedSize = sizeArr[index];
        const maxStock = product.stock[selectedSize];

        setQtyArr((prev) => {
            const newArr = [...prev];
            if (newArr[index] < maxStock) {
                newArr[index] += 1;
            }
            return newArr;
        });
    }

    const decreaseQty = (index) => {
        setQtyArr((prev) => {
            const newArr = [...prev];
            if (newArr[index] > 1) {
                newArr[index] -= 1;
            }
            return newArr;
        });
    }

    const subtotal = cartProducts.reduce((sum, product, index) => {
        const price = ((100 - product.offer) * product.price) / 100;
        return sum + price * qtyArr[index];
    }, 0);

    const deliveryCharge = subtotal > 999 ? 0 : 40;
    const grandTotal = subtotal + deliveryCharge;

    return (
        <div className='flex flex-col gap-4 items-center p-4'>
            <div className="flex flex-col gap-4 items-center border-b pb-4">
                {cartProducts.map((product, index) => (
                    <>
                        <div className="flex gap-4 md:w-120" key={index}>
                            <img src={product.images[0]} alt={product.name} className="w-30 h-30 object-cover rounded-xl" />
                            <div>
                                <h2 className="md:text-2xl font-bold">{product.name}</h2>
                                <p className="font-semibold md:text-xl">₹{(100 - product.offer) * product.price / 100}</p>
                                <p className="font-semibold md:text-1xl flex items-center gap-2">Size:
                                    <select
                                        value={sizeArr[index]}
                                        onChange={(e) => onSizeChange(e, index)}
                                        className="w-15 h-10 md:w-18 p-2 md:h-10 bg-gray-900 text-white border rounded"
                                    >
                                        {Object.keys(product.stock).map((size) => (
                                            <option key={size} value={size}>{size}</option>
                                        ))}
                                    </select>
                                    <span className="font-semibold text-1xl">Stock left: {product.stock[sizeArr[index]]}</span>
                                </p>
                            </div>
                        </div>
                    </>
                ))}
            </div>

            <table className="table-auto border-collapse border w-full md:w-auto border-gray-300 text-center overflow-x-auto">
                <thead>
                    <tr className="bg-gray-800">
                        <th className="text-gray-300 px-2 py-2 md:px-4 md:py-2">Product</th>
                        <th className="border border-gray-300 px-2 py-2 md:px-4 md:py-2">Size</th>
                        <th className="border border-gray-300 px-2 py-2 md:px-4 md:py-2">Quantity</th>
                        <th className="border border-gray-300 px-2 py-2 md:px-4 md:py-2">Price</th>
                    </tr>
                </thead>

                <tbody>
                    {cartProducts.map((product, index) => {
                        const price = ((100 - product.offer) * product.price) / 100;
                        return (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 font-semibold text-base md:text-xl">
                                    {product.name}
                                </td>

                                <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 font-semibold text-sm md:text-lg">
                                    {sizeArr[index]}
                                </td>

                                <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">
                                    <div className="flex gap-1 md:gap-2 items-center justify-center">
                                        <span
                                            className="cursor-pointer border rounded-full bg-red-500 text-black p-1 md:p-2"
                                            onClick={() => decreaseQty(index)}
                                        >
                                            <TiMinus size={20} md:size={25} />
                                        </span>
                                        <span className="text-sm md:text-base">{Math.min(qtyArr[index], product.stock[sizeArr[index]])}</span>
                                        <span
                                            className={`cursor-pointer border rounded-full p-1 md:p-2 ${qtyArr[index] >= product.stock[sizeArr[index]] ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 text-black"}`}
                                            onClick={() => increaseQty(index)}
                                        >
                                            <TiPlus size={20} md:size={25} />
                                        </span>
                                    </div>
                                </td>

                                <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 text-base md:text-1xl">
                                    ₹{(price * qtyArr[index]).toFixed(2)}
                                </td>
                            </tr>
                        );
                    })}

                    <tr>
                        <td colSpan="3" className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 font-semibold text-base md:text-xl">Subtotal</td>
                        <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 text-base md:text-1xl">₹{subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td colSpan="3" className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 font-semibold text-base md:text-xl">Delivery Charge</td>
                        <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 text-base md:text-1xl">₹{deliveryCharge.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td colSpan="3" className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 font-semibold text-base md:text-xl">Grand Total</td>
                        <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 text-base md:text-1xl">₹{grandTotal.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>


            <div className="flex items-center flex-col md:flex-row gap-5 md:gap-30 border-b pb-4 border-t pt-4">
                <div className="flex flex-col gap-2 w-80 overflow-clip border-b md:border-b-0 pb-4 md:pb-0">
                    <h3 className="text-xl md:text-3xl font-bold mb-2">Shipping Address</h3>
                    <p className="text-gray-200 md:text-2xl font-semibold">Name: {currentUser.name}</p>
                    <p className="text-gray-200 font-semibold md:text-1xl md:w-70 text-wrap"><u>Address</u>: {currentUser.address}</p>
                    <p className="text-gray-200 font-semibold md:text-1xl"><u>Phone1</u>: {currentUser.phone1}</p>
                    <p className="text-gray-200 font-semibold md:text-1xl"><u>Phone2</u>: {currentUser.phone2}</p>
                    <p className="text-gray-200 font-semibold md:text-1xl"><u>Email</u>: {currentUser.email}</p>
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
                                defaultChecked
                            // checked={paymentMethod === "cod"}
                            // onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span>Cash on Delivery</span>
                        </label>
                    </div>
                </div>
            </div>
            <button
                className="w-full md:w-100 mt-4 text-lg py-4 rounded-2xl bg-green-600 disabled:cursor-not-allowed text-white hover:bg-green-700"
                disabled={qtyArr.reduce((sum, qty) => sum + qty, 0) === 0 || subtotal === 0}
                onClick={placeOrder}
            >
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
    )
}