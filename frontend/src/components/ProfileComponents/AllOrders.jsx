import { Modal, ModalBody, ModalHeader, Spinner } from "flowbite-react"
import { useEffect, useState } from "react"

export default function AllOrders() {

    const [orders, setOrders] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [productIndex, setProductIndex] = useState()
    const [updateStatus, setUpdateStatus] = useState("")
    const [otpError, setOtpError] = useState(false)
    const [otp, setOtp] = useState("")

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

        const fetchProducts = async () => {

            try {

                setLoading(true)

                const res = await fetch('/api/order/allOrders')
                if (!res.ok) throw new Error("Error")
                const data = await res.json()
                setOrders(data.orders)
                setLoading(false)
                showToastMessage("Fetched Successfully")

            } catch (error) {
                console.log(error);
                showToastMessage("Something went wrong")
                setLoading(false)
            }

        }

        fetchProducts()

    }, [])

    const upDateStatus = async () => {

        try {
            setLoading(true)
            const res = await fetch('/api/order/upDateOrderStatus', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderId: orders[productIndex]._id,
                    status: updateStatus
                }),
            })

            if (!res.ok) throw new Error("Not Updated")
            setLoading(false)
            showToastMessage("Status Updated Successfully")

            // const data = await res.json()

        } catch (error) {
            console.log(error);
            showToastMessage("Something went wrong")
            setLoading(false)
        }

    }

    const checkOnDelivery = async () => {

        if (otp !== orders[productIndex].otpCode) {
            setOtpError(true)
            setOtp("Wrong Otp")
            return
        }

        try {

            setLoading(true)
            const res = await fetch('/api/order/upDateOrderStatus', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderId: orders[productIndex]._id,
                    status: "Delivered"
                }),
            })

            if (!res.ok) throw new Error("Not Updated");
            
            setLoading(false)
            showToastMessage("Status Updated Successfully")

            // const data = await res.json()

        } catch (error) {
            console.log(error);
            showToastMessage("Something went wrong")
            setLoading(false)
        }

    }

    if (orders.length === 0) return <h1>No Orders</h1>;

    return (
        <div>
            <table className="table w-full text-center">
                <thead>
                    <tr className="border-b">
                        <th className='px-4 py-2'>Item Name</th>
                        <th className='px-4 py-2'>Status</th>
                        <th className='px-4 py-2'>QTY</th>
                        <th className='px-4 py-2'>Total Amount</th>
                        <th className='px-4 py-2'>Date</th>
                        <th className='px-4 py-2'>Update</th>
                    </tr>
                </thead>

                <tbody>

                    {orders && orders.length > 0 &&

                        orders.map((order, index) => (
                            <tr key={index} className="">
                                <td className='px-4 py-2'>
                                    {
                                        order.items.map((item, index) =>
                                            <h1 key={index}>{item.productName} x <span className="font-bold">{item.quantity}</span>  x <span className="font-bold"> {item.size} </span></h1>
                                        )
                                    }
                                </td>
                                <td
                                    className={`px-4 py-2 text-green-500 ${["Pending", "Processing", "Shipped"].includes(order.status) ? "text-yellow-400" : ""} 
                                        ${["Cancelled", "Return Requested", "Returned"].includes(order.status) ? "text-red-500" : ""}`}
                                >
                                    {order.status}
                                </td>
                                <td className='px-4 py-2'>{order.items.reduce((sum, obj) => sum + obj.quantity, 0)}</td>
                                <td className='px-4 py-2'>₹ {order.totalAmount}</td>
                                <td className='px-4 py-2'>{order.createdAt.slice(0, 10)}</td>
                                <td className='px-4 py-2'>
                                    <button
                                        className="btn btn-primary w-20 h-8"
                                        onClick={() => { setOpenModal(true); setProductIndex(index); setUpdateStatus(order.status) }}
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <Modal show={openModal} size="sm" onClose={() => { setOpenModal(false); setOtpError(false); setOtp("") }} popup>
                <ModalHeader />
                <ModalBody className="flex items-center gap-5 justify-center">
                    <div className="flex flex-col items-center gap-5 border-r pr-5">
                        <h1>Update Status</h1>
                        <select className="select h-10" id="selectFloating" onChange={(e) => setUpdateStatus(e.target.value)} value={updateStatus}>
                            <option>Pending</option>
                            <option>Processing</option>
                            <option>Shipped</option>
                            <option>Returned</option>
                        </select>
                        <button className="btn btn-outline w-20 h-8" onClick={upDateStatus}>Submit</button>
                    </div>

                    <div className="flex flex-col items-center gap-5">
                        <h1>Product Delivery</h1>
                        <input type="text" className="input" placeholder="Enter OTP" style={{ border: otpError ? "red 1px solid" : "" }} value={otp} onChange={(e) => setOtp(e.target.value)} />
                        <button className="btn btn-outline w-20 h-8" onClick={checkOnDelivery}>Submit</button>
                    </div>

                    {/* <button className="btn btn-error disabled:cursor-not-allowed" disabled={returnMsg.trim() === ""} onClick={sendReturnRequest}>Submit</button> */}
                </ModalBody>
            </Modal>

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
