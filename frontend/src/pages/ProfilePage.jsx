import { Route, Routes } from "react-router-dom"
import ProfileSideBar from "../components/ProfileSideBar"
import Profile from "../components/ProfileComponents/Profile"
import EditDetails from "../components/ProfileComponents/EditDetails"
import Orders from "../components/ProfileComponents/Orders"
import Likes from "../components/ProfileComponents/Likes"
import ManageProducts from "../components/ProfileComponents/ManageProducts"
import ManageUsers from "../components/ProfileComponents/ManageUsers"
import AddNewProduct from "../components/ProfileComponents/AddNewProduct"
import TrackOrder from "../components/ProfileComponents/TrackOrders"
import AuthRoute from "../components/AuthRoute"
import AllOrders from "../components/ProfileComponents/AllOrders"

export default function ProfilePage() {

    return (
        <div className="flex h-full px-2 gap-2 overflow-clip">
            <div className="flex-1/5 overflow-auto">
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
                        <Route path="/track-order" element={<TrackOrder />} />
                    </Route>
                </Routes>
            </div>
        </div>
    )
}
