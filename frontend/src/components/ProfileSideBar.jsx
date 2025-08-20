import { NavLink, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { GiCardboardBox } from "react-icons/gi";
import { FcLike } from "react-icons/fc";
import { FaFirstOrder } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { MdAddToPhotos } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../app/store";
import { useState } from "react";

export default function ProfileSideBar() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const signout = async () => {

        try {
            setLoading(true)
            await fetch('/api/auth/signout')
            setLoading(false)
            navigate('/')
            dispatch(signOut());
        } catch (error) {
            setLoading(false)
            console.log(error);
        }

    }

    const { role } = useSelector(state => state.user.currentUser);

    return (

        <div className="h-auto flex justify- flex-col items-center p-5 bg-transparent">
            <div className="flex items-center flex-col gap-5">
                <NavLink to="/profile/user" className={({ isActive }) =>
                    `btn w-55 ${!isActive ? "btn-outline" : "btn-gradient btn-secondary"}`
                }><FaUser className="text-lime-400" /> Profile</NavLink>
                <NavLink to="/profile/edit-profile" className={({ isActive }) =>
                    `btn w-55 ${isActive ? "btn-gradient btn-secondary" : "btn-outline"}`
                }><FaEdit className="text-fuchsia-400" /> Edit Profile</NavLink>
                <NavLink to="/profile/orders" className={({ isActive }) =>
                    `btn w-55 ${isActive ? "btn-gradient btn-secondary" : "btn-outline"}`
                }><GiCardboardBox className="text-blue-400" /> Orders</NavLink>
                <NavLink to="/profile/likes" className={({ isActive }) =>
                    `btn w-55 ${isActive ? "btn-gradient btn-secondary" : "btn-outline"}`
                }><FcLike />Likes</NavLink>
                {role === "admin" &&
                    <>
                        <NavLink to="/profile/mng-products" className={({ isActive }) =>
                            `btn w-55 ${isActive ? "btn-gradient btn-secondary" : "btn-outline"}`
                        }><AiFillProduct className="text-blue-500" />Manage Products</NavLink>
                        <NavLink to="/profile/mng-users" className={({ isActive }) =>
                            `btn w-55 ${isActive ? "btn-gradient btn-secondary" : "btn-outline"}`
                        }><FaPeopleGroup className="text-pink-600" />Manage Users</NavLink>
                        <NavLink to="/profile/list-orders" className={({ isActive }) =>
                            `btn w-55 ${isActive ? "btn-gradient btn-secondary" : "btn-outline"}`
                        }><FaFirstOrder className="text-gray-200" /> All Orders</NavLink>
                        <NavLink to="/profile/add-product" className={({ isActive }) =>
                            `btn w-55 ${isActive ? "btn-gradient btn-secondary" : "btn-outline"}`
                        }><MdAddToPhotos className="text-yellow-600" /> Add Products</NavLink>
                    </>
                }
                <button className="btn btn-gradient w-55 btn-error" onClick={signout}
                >Log out</button>
            </div>

            {
                loading && (
                    <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
                        <Spinner color="success" aria-label="Loading" size="xl" />
                    </div>
                )
            }

        </div>
    )
}
