import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useEffect, useState } from "react"

export default function Orders() {

    const [orders, setOrders] = useState([])
    const [returnMsg, setReturnMsg] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const [productIndex, setProductIndex] = useState()

    useEffect(() => {

        const fetchProducts = async () => {

            try {
                const res = await fetch('/api/users/getOrders')
                if (!res.ok) throw new Error("Error")
                const data = await res.json()
                setOrders(data.orders)

            } catch (error) {
                console.log(error);
            }
        }

        fetchProducts()

    }, [])

    const sendReturnRequest = async () => {

        try {

            const tempOrder = orders[productIndex]
            const res = await fetch('/api/order/orderReturnRequest', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderId: tempOrder._id,
                    message: returnMsg
                }),
            })

            if (!res.ok) throw new Error("Error")

            const data = await res.json()
            console.log(data);

            setOpenModal(false)
            setProductIndex(null)
            setReturnMsg("")
            window.location.reload()

        } catch (error) {
            console.log(error);
        }

    }

    if (orders.length === 0) {
        return <h1>No Orders</h1>
    }

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
                        {/* <th className='px-4 py-2'>? Return ?</th> */}
                    </tr>
                </thead>

                <tbody>

                    {orders && orders.length > 0 &&

                        orders.map((order, index) => (
                            <tr key={index} className="">
                                <td className='px-4 py-2'>
                                    {
                                        order.items.map((item, index) =>
                                            <h1 key={index}>{item.productName} x {item.quantity}</h1>
                                        )
                                    }
                                </td>
                                <td className={`px-4 py-2 text-green-500 ${["Pending", "Processing", "Shipped"].includes(order.status) ? "text-yellow-400" : ""} 
                                        ${["Cancelled", "Return Requested", "Returned"].includes(order.status) ? "text-red-500" : ""}`}>{order.status}</td>
                                <td className='px-4 py-2'>{order.items.reduce((sum, obj) => sum + obj.quantity, 0)}</td>
                                <td className='px-4 py-2'>₹ {order.totalAmount}</td>
                                <td className='px-4 py-2'>{order.createdAt.slice(0, 10)}</td>
                                {/* <td className='px-4 py-2'>
                                    <button
                                        className="btn btn-error w-20 h-8"
                                        disabled={["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Return Requested", "Returned"].includes(order.status)}
                                        onClick={() => { setOpenModal(true); setProductIndex(index) }}
                                    >
                                        Return
                                    </button>
                                </td> */}
                            </tr>
                        ))}
                </tbody>
            </table>

            <Modal show={openModal} size="sm" onClose={() => { setOpenModal(false); setReturnMsg("") }} popup>
                <ModalHeader />
                <ModalBody className="flex flex-col items-center gap-5">
                    <textarea value={returnMsg} placeholder="Enter Return Reason" className="w-full h-30 text-black" onChange={(e) => setReturnMsg(e.target.value)} required />
                    <button className="btn btn-error disabled:cursor-not-allowed" disabled={returnMsg.trim() === ""} onClick={sendReturnRequest}>Submit</button>
                </ModalBody>
            </Modal>

        </div>
    )
}
