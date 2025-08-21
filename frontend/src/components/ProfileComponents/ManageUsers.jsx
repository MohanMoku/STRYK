import { useState, useEffect } from "react"
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { Spinner } from "flowbite-react";
import { IoEye } from "react-icons/io5";

export default function ManageUsers() {

    const [openModal, setOpenModal] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
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

    const [user, setUser] = useState({
        name: "Add Details",
        email: "Add Details",
        dob: "DOB",
        phone1: "Phone 1",
        phone2: "Phone 2",
        address: "Add Details",
        dpUri: "https://tse2.mm.bing.net/th/id/OIP.3wq2ORmQZGjLR_QM0-VojgHaHA?rs=1&pid=ImgDetMain&o=7&rm=3"
    }
    );

    useEffect(() => {

        const fetchAllUsers = async () => {
            try {

                setLoading(true)
                const res = await fetch('/api/users/allUsers')
                if (!res.ok) {
                    throw new Error(res.statusText);
                }

                const data = await res.json();

                setLoading(false)
                setAllUsers(data.userList);
                showToastMessage("Details fetched successfully")

            } catch (error) {
                setLoading(false)
                showToastMessage("Network Error")
                console.log(error);
            }
        }

        fetchAllUsers()

    }, [])

    const deleteUser = async (id) => {

        try {

            setLoading(true)

            const res = await fetch(`/api/users/deleteUser/?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!res.ok) {
                throw new Error(res.statusText);
            }

            setAllUsers(
                allUsers.filter(user => user._id !== id)
            )
            setLoading(false)
            showToastMessage("Details Deleted successfully")

        } catch (error) {
            setLoading(false)
            console.log(error);
            showToastMessage("Network Error")

        }

    }

    const openUser = (index) => {

        setUser({
            ...{
                name: "Add Details",
                email: "Add Details",
                dob: "DOB",
                phone1: "Phone 1",
                phone2: "Phone 2",
                address: "Add Address",
                dpUri: "https://tse2.mm.bing.net/th/id/OIP.3wq2ORmQZGjLR_QM0-VojgHaHA?rs=1&pid=ImgDetMain&o=7&rm=3"
            }, ...allUsers[index]
        })
        setOpenModal(true)

    }

    return (
        <div className="mt-8 overflow-x-auto pt-4 lg:pt-0">
            <h1 className="fixed top-20 left-30 text-red-500 md:hidden">make horizontal view</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created at</th>
                        <th>Delete</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>

                    {allUsers.map((user, index) => (

                        <tr key={index}>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="bg-base-content/10 h-10 w-10 rounded-md">
                                            <img src={user.dpUri} alt="image" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-medium">{user.name}</div>
                                    </div>
                                </div>
                            </td>
                            <td>{user.email}</td>
                            <td>
                                <div className="flex items-center">{user.role}</div>
                            </td>
                            <td>{new Date(user.createdAt).toLocaleDateString('en-IN')}</td>

                            <td>
                                {user.role !== 'admin' &&

                                    <button onClick={() => deleteUser(user._id)} className="h-8 btn btn-gradient btn-error">Delete</button>
                                }
                            </td>

                            <td>
                                <IoEye className="text-2xl cursor-pointer" onClick={() => openUser(index)} />
                            </td>

                        </tr>
                    ))
                    }
                </tbody>
            </table>

            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <ModalHeader />
                <ModalBody>
                    <div className="flex items-center justify-center flex-col gap-2">

                        <img src={user.dpUri} alt="img" className="rounded-full w-35 h-35 m-10" />

                        <h1 className="border w-50 md:w-105 px-5 h-10.5 py-2 text-center rounded-2xl">{user.name}</h1>
                        <h2 className="border w-80 md:w-105 px-5 h-10.5 py-2 text-center rounded-2xl">{user.email}</h2>
                        {
                            user.dob === "DOB" ?
                                <h2 className="border w-50 md:w-105 px-5 h-10.5 py-2 text-center rounded-2xl">{user.dob}</h2> :
                                <h2 className="border w-50 md:w-105 px-5 h-10.5 py-2 text-center rounded-2xl">{new Date(user.dob).toLocaleDateString('en-IN')}</h2>
                        }
                        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-5">
                            <h2 className="border w-50 h-10.5 px-5 py-2 text-center rounded-2xl">{user.phone1}</h2>
                            <h2 className="border w-50 px-5 h-10.5 py-2 text-center rounded-2xl">{user.phone2}</h2>
                        </div>
                        <p className="border w-70 md:w-105 px-5 h-auto py-2 text-center rounded-2xl">{user.address}</p>

                    </div>
                </ModalBody>
            </Modal>

            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
                    <Spinner color="success" aria-label="Loading" size="xl" />
                </div>
            )}

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
