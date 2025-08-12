import { useState } from "react"
import { useEffect } from "react"

export default function ManageUsers() {

    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {

        const fetchAllUsers = async () => {
            try {

                const res = await fetch('/api/users/allusers')
                if (!res.ok) {
                    throw new Error(res.statusText);
                }

                const data = await res.json();
                setAllUsers(data.userList);

            } catch (error) {
                console.log(error);
            }
        }

        fetchAllUsers()

    }, [])

    const deleteUser = async (id) => {

        try {

            const res = await fetch(`/api/users/deleteuser?id=${id}`, {
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

        } catch (error) {
            console.log(error);
            
        }

    }


    return (
        <div className="mt-8 overflow-x-auto">
            <table className="table">
                {/* <!-- head --> */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created at</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <!-- row 1 --> */}
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
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}
