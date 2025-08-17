import { PiWhatsappLogoBold } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";

export default function ShareButtons({ productUrl, productName }) {
    const encodedUrl = encodeURIComponent(productUrl);
    const encodedText = encodeURIComponent(`Check this out: ${productName} - ${productUrl}`);

    const whatsappLink = `https://wa.me/?text=${encodedText}`;
    const twitterLink = `https://twitter.com/intent/tweet?text=${encodedText}`;
    const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    const emailLink = `mailto:?subject=${encodeURIComponent("Check this out!")}&body=${encodedText}`;
    return (
        <div className="flex gap-4">
            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            ><PiWhatsappLogoBold /></a>

            <a
                href={twitterLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            ><FaXTwitter /></a>

            <a
                href={facebookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
            ><FaFacebookF /></a>

            <a
                href={emailLink}
                className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            ><MdMailOutline /></a>
        </div>
    );
}
