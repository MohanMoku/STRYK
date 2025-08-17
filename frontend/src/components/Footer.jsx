import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { AiFillGoogleCircle } from "react-icons/ai";

export default function Footer() {
    return (
        <>
            <footer className="bg-base-200">
                <div className="footer bg-base-200/60 px-10 py-1 pt-2 flex justify-between ">
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
                        <a href="#" className="link link-hover flex items-center gap-2"><AiFillInstagram />Instagram</a>
                        <a href="#" className="link link-hover flex items-center gap-2"><AiFillGoogleCircle />Google</a>
                        <a href="#" className="link link-hover flex items-center gap-2"><FaFacebookSquare />Facebook</a>
                        <a href="#" className="link link-hover flex items-center gap-2"><FaSquareXTwitter />Twitter</a>
                    </div>
                    <form className="gap-6">
                        <div className="flex items-center gap-2 text-xl font-bold text-base-content">
                            <span>STRYK</span>
                        </div>
                        <p className="text-base-content text-sm">Premium Football Jerseys</p>
                        <fieldset>
                            <label className="label-text" for="subscribeLetter"> Subscribe for updates and exclusive offers </label>
                            <div className="flex w-full flex-wrap gap-1 sm:flex-nowrap">
                                <input className="input input-sm" id="subscribeLetter" placeholder="example123@gmail.com" />
                                <button className="btn btn-sm btn-primary" type="submit">Subscribe</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
                <p className='text-center'>
                    © 2023 STRYK. All rights reserved.
                </p>
            </footer>
        </>
    )
}
