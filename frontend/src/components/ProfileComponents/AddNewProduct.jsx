import { useState } from "react"
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Spinner } from "flowbite-react";

export default function AddNewProduct() {

    const [message, setMessage] = useState("")
    const [showMessage, setShowMessage] = useState(false)

    const showToastMessage = (msg) => {
        setMessage(msg);
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);

    }

    const [loading, setLoading] = useState(false)

    const [product, setProduct] = useState({
        name: "",
        team: "",
        year: "",
        description: "",
        price: "",
        offer: "",
        category: "",
        weight: "",
    })
    const [productImages, setProductImages] = useState([])

    const [stocks, setStocks] = useState({
        XS: 0,
        S: 0,
        M: 0,
        L: 0,
        XL: 0,
        XXL: 0,
    })

    const [isFeatured, setIsFeatured] = useState(false)

    const handleStockChange = (size, value) => {
        setStocks((prev) => ({
            ...prev,
            [size]: Number(value)
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = async (e, i) => {

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

                setProductImages((prev) => {
                    const updated = [...prev];
                    updated[i] = newUri.url;
                    return updated;
                });

                setLoading(false)
            } catch (error) {

                showToastMessage("Image is not Added")
                console.log(error);
                setLoading(false)
            }
        }
        setLoading(false)
    }

    const addProduct = async () => {

        try {
            setLoading(true)

            const newProductToAdd = {
                ...product,
                images: productImages,
                stock: stocks,
                isFeatured: isFeatured
            }

            const res = await fetch(`/api/product/addProduct`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProductToAdd),
            });

            if (!res.ok) {
                throw new Error("Failed to upload Product");
            }

            const data = await res.json();
            console.log(data);

            setLoading(false)
            showToastMessage("Product Added Successfully")
            window.location.reload();
            
        } catch (error) {
            setLoading(false)
            showToastMessage("Try Again Later")
            console.log(error);
        }

    }

    return (

        <div className="flex items-center flex-col justify-center pb-5">
            <div className="flex gap-1 h-auto p-10">

                <div className="w-7/12 flex flex-col gap-2 p-15 items-center justify-center">

                    <h1 className="text-center text-4xl mb-10 font-bold">Add New Product</h1>

                    <div className="input-floating w-96">
                        <input
                            type="text"
                            placeholder="Name"
                            className="input bg-transparent"
                            id="name"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                        />
                        <label className="input-floating-label">Name</label>
                    </div>

                    <div className="input-floating w-96">
                        <input
                            type="text"
                            placeholder="Team"
                            className="input bg-transparent"
                            id="team"
                            name="team"
                            value={product.team}
                            onChange={handleChange}
                        />
                        <label className="input-floating-label">Team</label>
                    </div>

                    <div className="input-floating w-96">
                        <input
                            type="text"
                            placeholder="Year"
                            className="input bg-transparent"
                            id="year"
                            name="year"
                            value={product.year}
                            onChange={handleChange}
                        />
                        <label className="input-floating-label">Year</label>
                    </div>

                    <div className="input-floating w-96">
                        <input
                            type="number"
                            placeholder="Price"
                            className="input bg-transparent"
                            id="price"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                        />
                        <label className="input-floating-label">Price</label>
                    </div>

                    <div className="input-floating w-96">
                        <input
                            type="number"
                            placeholder="Offer"
                            className="input bg-transparent"
                            id="offer"
                            name="offer"
                            value={product.offer}
                            onChange={handleChange}
                        />
                        <label className="input-floating-label">Offer</label>
                    </div>

                    <div className="input-floating w-96">
                        <input
                            type="text"
                            placeholder="Category"
                            className="input bg-transparent"
                            id="category"
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                        />
                        <label className="input-floating-label">Category</label>
                    </div>

                    <div className="input-floating w-96">
                        <input
                            type="text"
                            placeholder="Weight"
                            className="input bg-transparent"
                            id="weight"
                            name="weight"
                            value={product.weight}
                            onChange={handleChange}
                        />
                        <label className="input-floating-label">Weight</label>
                    </div>

                    <div className="flex justify-center items-center gap-2">
                        <h1>is Featured: </h1>
                        <input
                            type="checkbox"
                            checked={isFeatured}
                            onChange={(e) => setIsFeatured(e.target.checked)}
                        />
                    </div>

                    <p>Description: </p>

                    <ReactQuill
                        className="w-100"
                        theme="snow"
                        id="description"
                        value={product.description}
                        onChange={
                            (content) =>
                                setProduct((prev) => (
                                    { ...prev, description: content }
                                ))} />

                </div>

                <div className="w-5/12">



                    <div className="flex flex-wrap gap-5 justify-center items-center px-10">

                        {
                            [0, 1, 2, 3].map((i) => (
                                <div key={i}>
                                    <div className="flex flex-col items-center gap-1">
                                        <img src={productImages.length > i && productImages[i] ? productImages[i] : "https://skala.or.id/wp-content/uploads/2024/01/dummy-post-square-1-1.jpg"} alt="image" className="w-25" />
                                        <label className='btn btn-accent mb-2 cursor-pointer'>
                                            Add Image
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => handleImageChange(e, i)}
                                            />
                                        </label>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div className="flex flex-col justify-center items-center p-4">
                        <p className="text-lg font-bold mb-3">Size and Stocks</p>
                        <div className="flex items-center justify-center flex-col bg-gray-100 rounded-xl text-black p-4">
                            <div className="text-center flex font-semibold border-b pb-2 w-40">
                                <h2 className="flex items-center justify-center w-20">Size</h2>
                                <h2 className="flex items-center justify-center w-20">Stock</h2>
                            </div>

                            {Object.keys(stocks).map((size) => (
                                <div key={size} className="flex">
                                    <h2 className="flex justify-center items-center w-20">{size}</h2>
                                    <input
                                        type="number"
                                        value={stocks[size]}
                                        onChange={(e) => handleStockChange(size, e.target.value)}
                                        className="rounded-lg w-20 m-1 text-black border px-2"
                                        min="0"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
            <button className="btn btn-primary mt-5" onClick={addProduct}>Add Product</button>

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
