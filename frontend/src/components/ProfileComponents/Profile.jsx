import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {

    const currentUser = useSelector((state) => state.user.currentUser);

    const {
        name = "Add Details",
        email = "Add Details",
        dob = "DOB",
        phone1 = "Phone 1",
        phone2 = "Phone 2",
        address = "Add Details",
        dpUri = "https://tse2.mm.bing.net/th/id/OIP.3wq2ORmQZGjLR_QM0-VojgHaHA?rs=1&pid=ImgDetMain&o=7&rm=3"
    } = currentUser || {};

    return (
        <div className="flex items-center justify-center overflow-auto">

            <div className="w-200 flex items-center justify-center flex-col gap-2">

                <img src={dpUri} alt="img" className="rounded-full w-35 h-35 m-10" />

                <h1 className="border w-105 px-5 h-10.5 py-2 text-center rounded-2xl">{name}</h1>
                <h2 className="border w-105 px-5 h-10.5 py-2 text-center rounded-2xl">{email}</h2>
                {
                    dob === "DOB" ? <h2 className="border w-105 px-5 h-10.5 py-2 text-center rounded-2xl">{dob}</h2> : <h2 className="border w-105 px-5 h-10.5 py-2 text-center rounded-2xl">{new Date(dob).toLocaleDateString('en-IN')}</h2>
                }
                <div className="flex gap-5">
                    <h2 className="border w-50 h-10.5 px-5 py-2 text-center rounded-2xl">{phone1}</h2>
                    <h2 className="border w-50 px-5 h-10.5 py-2 text-center rounded-2xl">{phone2}</h2>
                </div>
                <p className="border w-105 px-5 h-20 py-2 text-center rounded-2xl">{address}</p>

                <Link to={'/profile/edit-profile'} className="flex items-center justify-center mt-12 py-2 px-5 rounded-3xl bg-blue-500 gap-2 hover:bg-amber-400 hover:text-black">
                    <MdEdit className="text-2xl" /><span className="font-bold">Edit</span>
                </Link>

            </div>

        </div>
    )
}
