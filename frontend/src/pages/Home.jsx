import Footer from "../components/Footer";
import bgImage from "../assets/bgImage.avif";
import { NavLink } from "react-router-dom";

export default function Home() {
    return (
        <div className="overflow-hidden">
            <div
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    backgroundBlendMode: "overlay"
                }}
                className="bg-cover bg-center w-full h-[90vh]  px-60 py-20 overflow-auto scroll-hidden">

                <h1 className="text-center text-6xl font-extrabold text-green-500 mb-10">PLAY BOLD</h1>
                <div className="flex justify-start">

                    <div className="card group hover:shadow-sm rounded-2xl w-80">
                        <figure>
                            <img src="https://images.unsplash.com/photo-1551958219-acbc608c6377?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Shoes" className="transition-transform duration-500 group-hover:scale-110" />
                        </figure>
                        <div className="card-body bg-gray-700 rounded-b-2xl">
                            <h5 className="card-title mb-2.5">The Spirit of the Game</h5>
                            <p className="mb-6">Football isn’t just a game, it’s a way of life.</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">

                    <div className="card group hover:shadow-sm rounded-2xl w-80">
                        <figure>
                            <img src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Shoes" className="transition-transform duration-500 group-hover:scale-110" />
                        </figure>
                        <div className="card-body bg-gray-700 rounded-b-2xl">
                            <h5 className="card-title mb-2.5">Play with Heart</h5>
                            <p className="mb-6">Play with passion, win with pride.</p>
                        </div>
                    </div>
                </div>
                <div className="">

                    <div className="card group hover:shadow-sm rounded-2xl w-80">
                        <figure>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbJ3a_78gPV9sCd_70k4lV3Yz7ivI2M8V0LL9m7WiOLR0CB-qOT0za3d-Ly2Jvg4Nw1HA&usqp=CAU" alt="Shoes" className="transition-transform w-full duration-500 group-hover:scale-110" />
                        </figure>
                        <div className="card-body bg-gray-700 rounded-b-2xl">
                            <h5 className="card-title mb-2.5">Every Kick Counts</h5>
                            <p className="mb-6">Every kick tells a story.</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center p-10">
                <NavLink to={"/products"} className="btn btn-success text-2xl font-bold">Shop Now</NavLink>
                </div>

            </div>
            <Footer />
        </div>
    );
}
