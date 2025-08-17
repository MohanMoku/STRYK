import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserFailure, updateUserStart, updateUserSuccess } from '../../app/store';
import { MdMyLocation } from "react-icons/md";
import { Spinner } from "flowbite-react";

const EditDetails = () => {

    const [message, setMessage] = useState("")
    const [showMessage, setShowMessage] = useState(false)

    const showToastMessage = (msg) => {
        setMessage(msg);
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);

    }

    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        dob: "",
        phone1: "",
        phone2: "",
        address: "",
        dpUri: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-concept-285140929.jpg"
    });

    useEffect(() => {
        if (currentUser) {
            setUserData(prev => ({ ...prev, ...currentUser }));
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = async (e) => {
        setLoading(true)
        const file = e.target.files[0];
        if (file) {
            try {

                const data = new FormData();
                data.append("file", file)
                data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET)
                data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_NAME)

                const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`, {
                    method: "POST",
                    body: data
                })

                const newUri = await res.json()

                setUserData(prev => ({
                    ...prev,
                    dpUri: newUri.url
                }));
                showToastMessage("Image Uploaded")

            } catch (error) {
                console.log(error);
                showToastMessage("Try again Later")
            }
        }
        setLoading(false)
    };

    const updateUser = async () => {

        try {

            dispatch(updateUserStart)
            const updatedFields = {
                name: userData.name,
                dob: userData.dob,
                phone1: userData.phone1,
                phone2: userData.phone2,
                address: userData.address,
                dpUri: userData.dpUri
            };

            setLoading(true)

            const res = await fetch(`/api/users/updateUser/?id=${currentUser._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedFields),
            });

            if (!res.ok) {
                throw new Error("Failed to update user");
            }

            const data = await res.json();
            showToastMessage("User Details Updated")
            setLoading(false)
            dispatch(updateUserSuccess(data));

        } catch (err) {
            setLoading(false)
            showToastMessage("Try Again Later")
            dispatch(updateUserFailure(currentUser));
            console.error(err);
        }

    }

    const getUserLocation = () => {

        setLoading(true)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    const lat = pos.coords.latitude;
                    const lon = pos.coords.longitude;

                    try {

                        const res = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
                        );
                        const data = await res.json();

                        setUserData((prev) => ({
                            ...prev,
                            latitude: lat,
                            longitude: lon,
                            address: data.display_name
                        }));

                        setLoading(false)
                        showToastMessage("Location Fetched")

                    } catch (error) {
                        setLoading(false)
                        console.error("Error fetching address:", error);
                    }
                },
                (err) => {
                    setLoading(false)
                    showToastMessage("Location not found")
                    console.error("Error getting location:", err);
                }
            );
        } else {
            console.log("Geolocation not supported by your browser");
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center overflow-auto">
            <div className="w-200 flex p-5 items-center justify-center flex-col gap-2">
                <img src={userData.dpUri} alt="img" className="rounded-full w-35 h-35 mt-2" />

                <label className='btn btn-accent mb-2 cursor-pointer'>
                    Change Image
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </label>

                <input
                    type="text"
                    placeholder="Name"
                    className="input text-center bg-transparent w-105"
                    id="name"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Email"
                    className="input text-center bg-transparent w-105"
                    id="email"
                    name="email"
                    value={userData.email}
                    readOnly
                />
                <input
                    type="date"
                    placeholder="DOB"
                    className="input text-center bg-transparent w-105"
                    id="dob"
                    name="dob"
                    value={userData.dob}
                    onChange={handleChange}
                />
                <div className="flex gap-5">
                    <input
                        type="number"
                        placeholder="phone1"
                        className="input text-center bg-transparent w-50"
                        id="phone1"
                        name="phone1"
                        value={userData.phone1}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        placeholder="phone2"
                        className="input text-center bg-transparent w-50"
                        id="phone2"
                        name="phone2"
                        value={userData.phone2}
                        onChange={handleChange}
                    />
                </div>

                <textarea
                    className="textarea bg-transparent w-105"
                    placeholder="address"
                    name="address"
                    value={userData.address}
                    onChange={handleChange}
                ></textarea>
                <button className=' w-auto px-5 btn btn-accent' onClick={getUserLocation}><MdMyLocation size={25} />Get Location</button>

                <button className="btn btn-primary mt-5" onClick={updateUser}>Update</button>
            </div>

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
};

export default EditDetails;
