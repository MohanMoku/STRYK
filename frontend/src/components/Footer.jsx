import { AiFillInstagram } from "react-icons/ai";
import { IoMdMail } from "react-icons/io";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

export default function Footer() {

    const navigate = useNavigate();

    return (
        <>
            <footer className="bg-base-800">
                <div className="footer bg-base-900/60 px-10 py-1 pt-2 flex justify-between ">
                    <div className="text-base-content">
                        <h6 className="footer-title">Quick Link</h6>
                        <a href="/" className="link link-hover">Home</a>
                        <a href="products" className="link link-hover">Shop</a>
                        <a href="about-us" className="link link-hover">About</a>
                        <a href="about-us" className="link link-hover">Contact</a>
                    </div>
                    <div className="text-base-content">
                        <h6 className="footer-title">Categories</h6>
                        <a href="#" className="link link-hover">Premier League</a>
                        <a href="#" className="link link-hover">La Liga</a>
                        <a href="#" className="link link-hover">Serie A</a>
                        <a href="#" className="link link-hover">Bundesliga</a>
                    </div>
                    <div className="text-base-content">
                        <h6 className="footer-title">Socials</h6>
                        <a href="https://www.instagram.com/shop.stryk?igsh=cXp3YzkwZW04YXl6" className="link link-hover flex items-center gap-2"><AiFillInstagram />Instagram</a>
                        <a href="https://www.stryk.onrender.com" className="link link-hover flex items-center gap-2"><AiFillGoogleCircle />Google</a>
                        <a href="mailto:shopstryk@gmail.com" className="link link-hover flex items-center gap-2"><IoMdMail />Email</a>
                    </div>
                    <form className="gap-6 hidden md:block">
                        <div className="flex items-center gap-2 text-xl font-bold text-base-content">
                            <img src="https://res.cloudinary.com/db7hvuhnt/image/upload/v1755681744/Picsart_25-08-19_22-10-24-479_1_tyfojt.png" alt="img" className="w-10 h-10" />
                            <span>STRYK</span>
                        </div>
                        <p className="text-base-content text-sm">Premium Football Jerseys</p>
                        <fieldset>
                            <label className="label-text"> Subscribe for updates and exclusive offers </label>
                            <div className="flex w-full flex-wrap gap-1 sm:flex-nowrap">
                                <input className="input input-sm" id="subscribeLetter" placeholder="example123@gmail.com" />
                                <button className="btn btn-sm btn-primary" type="submit" onClick={() => navigate("/sign-up")}>Subscribe</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
                <p className='text-center'>
                    STRYK
                </p>
            </footer>
        </>
    )
}
