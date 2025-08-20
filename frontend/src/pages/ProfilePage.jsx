import { Route, Routes } from "react-router-dom"
import ProfileSideBar from "../components/ProfileSideBar"
import Profile from "../components/ProfileComponents/Profile"
import EditDetails from "../components/ProfileComponents/EditDetails"
import Orders from "../components/ProfileComponents/Orders"
import Likes from "../components/ProfileComponents/Likes"
import ManageProducts from "../components/ProfileComponents/ManageProducts"
import ManageUsers from "../components/ProfileComponents/ManageUsers"
import AddNewProduct from "../components/ProfileComponents/AddNewProduct"
import AuthRoute from "../components/AuthRoute"
import AllOrders from "../components/ProfileComponents/AllOrders"
import { Dropdown, DropdownDivider, DropdownItem } from "flowbite-react"
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";

export default function ProfilePage() {

    return (
        <div className="flex h-full px-2 gap-2 overflow-clip">
            <div className="flex-1/5 overflow-auto hidden lg:block">
                <ProfileSideBar />
            </div>

            <div className="flex-4/5 h-auto overflow-auto">
                <Routes>
                    <Route path="/user" element={<Profile />} />
                    <Route path="/edit-profile" element={<EditDetails />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/likes" element={<Likes />} />
                    <Route element={<AuthRoute />}>
                        <Route path="/mng-products" element={<ManageProducts />} />
                        <Route path="/mng-users" element={<ManageUsers />} />
                        <Route path="/add-product" element={<AddNewProduct />} />
                        <Route path="/list-orders" element={<AllOrders />} />
                    </Route>
                </Routes>

                <Dropdown label={<HiOutlineSquare3Stack3D size={30} />} className="fixed top-20 lg:hidden left-3 bg-transparent focus:bg-transparent">
                    <DropdownItem className="focus:bg-transparent">
                        <ProfileSideBar />
                    </DropdownItem>

                </Dropdown>

            </div>
        </div>
    )
}
