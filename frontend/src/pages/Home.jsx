import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";

export default function Home() {

    const bgImage =
        "https://res.cloudinary.com/db7hvuhnt/image/upload/v1755710658/photo-1574629810360-7efbbe195018_df6lrd.avif"; // Stadium background image

    const featured = [
        {
            title: "Club Passion",
            desc: "Rep your Club. Wear the colors with pride.",
            img: "https://res.cloudinary.com/db7hvuhnt/image/upload/v1755708369/BAR%C3%87A_Attitude_2_s4cpue.jpg",
        },
        {
            title: "For the Nation",
            desc: "From the streets to the world stage",
            img: "https://res.cloudinary.com/db7hvuhnt/image/upload/v1755708932/69b8840177eb61417fbead6345cd05f3_1_tb8d2s.jpg",
        },
        {
            title: "Retro Legacy",
            desc: "Legends never fade. Jersey that tell history",
            img: "https://res.cloudinary.com/db7hvuhnt/image/upload/v1755709354/676f98caf66a69166117b7298d5420c3_1_djcwui.jpg",
        },
    ];

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <div
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    backgroundBlendMode: "overlay",
                }}
                className="bg-cover bg-center w-full h-[70vh] md:h-[90vh] flex flex-col justify-center items-center text-center px-4 md:px-6"
            >
                <h1 className="text-6xl sm:text-5xl md:text-6xl font-extrabold text-yellow-400 drop-shadow-lg">
                    STRYK
                </h1>
                <p className="text-base sm:text-lg md:text-3xl text-gray-200 mt-3 md:mt-4 max-w-md md:max-w-xl px-2">
                    Where the game meets Culture
                </p>
                <a
                    href="/products"
                    className="mt-6 md:mt-8 bg-green-500 hover:bg-green-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-xl font-bold text-base md:text-lg transition"
                >
                    Shop Now
                </a>
            </div>

            {/* Featured Products */}
            <div className="py-12 sm:py-16 px-4 sm:px-6 md:px-20 bg-[#000000]/60">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-yellow-400">
                    Football Jerseys for the Bold.
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                    {featured.map((item, idx) => (
                        <div
                            key={idx}
                            className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition group bg-gray-800 min-h-[380px] sm:min-h-[420px]"
                        >

                            <div className="overflow-hidden">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-60 sm:h-72 md:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                            </div>
                            <div className="p-4 sm:p-6">
                                <h5 className="font-bold text-lg sm:text-xl mb-2 text-white">{item.title}</h5>
                                <p className="text-gray-300 text-sm sm:text-base">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>

    );
}
