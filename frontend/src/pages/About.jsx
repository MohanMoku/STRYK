import { FaInstagram, FaFacebook, FaEnvelope, FaPhone } from "react-icons/fa";

export default function About() {

    

    const founders = [
        {
            name: "Rohan",
            email: "rohan@example.com",
            phone: "+91 6366083048",
            socials: {
                instagram: "https://instagram.com/shop.stryk",
            },
        },
        {
            name: "Nithin",
            email: "mohan@example.com",
            phone: "+91 76764402579",
            socials: {
                instagram: "https://instagram.com/shop.stryk",
            },
        },
    ];

    return (
        <div className="min-h-[100%] bg-gray-700 flex flex-col items-center py-12 px-6">
            <h1 className="text-5xl font-bold text-green-600 mb-6">About Us</h1>

            <p className="max-w-3xl text-center text-lg text-gray-50 mb-12 leading-relaxed">
                Our journey started with just an idea — Two college friends sitting in a classroom,
                dreaming of building something meaningful. That dream turned into this platform.
                We wanted to make buying football kits and jerseys simple, fun, and reliable.
                What started as a late-night conversation is now a growing community of football fans
                across the country.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                {founders.map((f, idx) => (
                    <div
                        key={idx}
                        className="bg-white shadow-lg rounded-2xl w-70 md:w-100 p-6 flex flex-col items-center text-center border border-gray-200 hover:shadow-xl transition"
                    >
                        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                            {f.name.charAt(0)}
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">{f.name}</h2>
                        {/* <p className="text-gray-600 mb-2">{f.email}</p> */}
                        <p className="text-gray-600 flex items-center justify-center gap-2 mb-4">
                            <FaPhone className="text-green-500" /> {f.phone}
                        </p>
                        <div className="flex gap-4 mt-2">
                            <a href={f.socials.instagram} target="_blank" rel="noreferrer">
                                <FaInstagram className="text-pink-500 text-2xl hover:scale-110 transition" />
                            </a>
                            {/* <a href={f.socials.facebook} target="_blank" rel="noreferrer">
                                <FaFacebook className="text-blue-600 text-2xl hover:scale-110 transition" />
                            </a> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
