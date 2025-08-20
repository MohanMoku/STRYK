import { Modal, ModalBody, ModalHeader, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import ReactQuill from "react-quill-new";

export default function ManageProducts() {

    const [message, setMessage] = useState("")
    const [showMessage, setShowMessage] = useState(false)
    const [productToDisplay, setProductToDisplay] = useState({})
    const [openModal, setOpenModal] = useState(false)

    const showToastMessage = (msg) => {
        setMessage(msg);
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);

    }

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const fetchAllProducts = async () => {
            try {

                setLoading(true)
                const res = await fetch('/api/product/getAllProducts')
                if (!res.ok) {
                    throw new Error(res.statusText);
                }

                const data = await res.json();


                setProducts(data.products);
                setLoading(false)
                showToastMessage("Products fetched Successfully")

            } catch (error) {
                setLoading(false)
                showToastMessage("Try Again Later")
                console.log(error);
            }
        }

        fetchAllProducts()

    }, [])

    const openProduct = (i) => {
        const selected = products[i];
        setProductToDisplay(selected);
        setOpenModal(true);
    };


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setProductToDisplay((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleStockChange = (size, newValue) => {
        setProductToDisplay((prev) => ({
            ...prev,
            stock: {
                ...prev.stock,
                [size]: Number(newValue)
            }
        }));
    };

    const handleImageChange = async (e, index) => {

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

                setProductToDisplay((prev) => {
                    const updatedImages = [...prev.images];
                    updatedImages[index] = newUri.url;
                    return {
                        ...prev,
                        images: updatedImages
                    };
                });
                showToastMessage("Image added successfully")
                setLoading(false)

            } catch (error) {
                showToastMessage("Image is not Added")
                console.log(error);
                setLoading(false)
            }
        }

    };

    const updateProduct = async () => {

        try {

            setLoading(true)

            const res = await fetch(`/api/product/updateProduct?id=${productToDisplay._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productToDisplay),
            });
            if (!res.ok) {
                throw new Error("Failed to update user");
            }
            showToastMessage("Product Details Updated")
            setLoading(false)
            window.location.reload();

        } catch (error) {
            showToastMessage("Product Details Not Updated")
            setLoading(false)
            console.log(error);
        }

    }

    return (
        <div className="pt-10 lg:pt-0">
            <h1 className="fixed top-20 left-30 text-red-500 md:hidden">make horizontal view</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Team</th>
                        <th>Year</th>
                        <th>Price</th>
                        <th>Offer</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>

                    {products.map((product, index) => (

                        <tr key={index}>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="bg-base-content/10 h-15 w-15 rounded-md">
                                            <img src={product.images[0]} alt="image" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-medium">{product.name}</div>
                                    </div>
                                </div>
                            </td>
                            <td>{product.team}</td>
                            <td>
                                <div className="flex items-center">{product.year}</div>
                            </td>
                            <td>{String.fromCharCode(8377) + " " + product.price}</td>

                            <td>{product.offer}</td>

                            <td>
                                <IoEye className="text-2xl cursor-pointer" onClick={() => openProduct(index)} />
                            </td>

                        </tr>
                    ))
                    }
                </tbody>
            </table>

            <Modal show={openModal} size="xl" onClose={() => setOpenModal(false)} popup >
                <ModalHeader />
                <ModalBody className="flex flex-col gap-2 items-center overflow-y-auto max-h-[80vh]">

                    <h1 className="text-center text-4xl mb-10 font-bold">Add New Product</h1>

                    <div className="input-floating w-96">
                        <input
                            type="text"
                            placeholder="Name"
                            className="input bg-transparent"
                            id="name"
                            name="name"
                            value={productToDisplay.name}
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
                            value={productToDisplay.team}
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
                            value={productToDisplay.year}
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
                            value={productToDisplay.price}
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
                            value={productToDisplay.offer}
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
                            value={productToDisplay.category}
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
                            value={productToDisplay.weight}
                            onChange={handleChange}
                        />
                        <label className="input-floating-label">Weight</label>
                    </div>

                    <div className="flex justify-center items-center gap-2">
                        <h1>is Featured: </h1>
                        <input
                            type="checkbox"
                            checked={productToDisplay.isFeatured}
                            name="isFeatured"
                            onChange={handleChange}
                        />
                    </div>

                    <p>Description: </p>

                    <ReactQuill
                        className="w-100"
                        theme="snow"
                        id="description"
                        value={productToDisplay.description}
                        onChange={
                            (content) =>
                                setProductToDisplay((prev) => (
                                    { ...prev, description: content }
                                ))} />
                    {/* <div dangerouslySetInnerHTML={{ __html: product.description }} /> */}

                    <div className="flex flex-wrap gap-5 justify-center items-center px-20">

                        {
                            productToDisplay?.images?.map((image, i) => (
                                <div key={i}>
                                    <div className="flex flex-col items-center gap-1">
                                        <img src={image} alt="image" className="w-25" />
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

                            {productToDisplay?.stock &&
                                Object.keys(productToDisplay.stock).map((size) => (
                                    <div key={size} className="flex">
                                        <h2 className="flex justify-center items-center w-20">{size}</h2>
                                        <input
                                            type="number"
                                            value={productToDisplay.stock[size]}
                                            className="rounded-lg w-20 m-1 text-black border px-2"
                                            min="0"
                                            onChange={(e) => handleStockChange(size, e.target.value)}
                                        />
                                    </div>
                                ))
                            }


                        </div>
                        <button className="btn btn-primary mt-5" onClick={updateProduct}>Update</button>
                    </div>

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
