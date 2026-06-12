import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-16 bg-black text-white sm:mt-20">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-black sm:text-3xl">SkinCare</h2>

            <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-gray-400 sm:mx-0 sm:text-base">
              Premium skincare products crafted for healthy, glowing, and
              confident skin.
            </p>

            <div className="mt-6 flex justify-center gap-4 sm:justify-start">
              <FaInstagram className="text-2xl text-pink-500" />
              <FaFacebookF className="text-2xl text-blue-600" />
              <FaTwitter className="text-2xl text-sky-500" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="mb-4 text-lg font-bold sm:text-xl">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-sm text-gray-400 sm:text-base">
              <Link to="/" className="transition hover:text-pink-500">
                Home
              </Link>
              <Link to="/shop" className="transition hover:text-pink-500">
                Shop
              </Link>
              <Link to="/about" className="transition hover:text-pink-500">
                About
              </Link>
              <Link to="/contact" className="transition hover:text-pink-500">
                Contact
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="text-center sm:text-left">
            <h3 className="mb-4 text-lg font-bold sm:text-xl">Support</h3>

            <div className="flex flex-col gap-3 text-sm text-gray-400 sm:text-base">
              <Link to="/help-center" className="transition hover:text-pink-500">
                Help Center
              </Link>
              <Link to="/shipping-policy" className="transition hover:text-pink-500">
                Shipping Policy
              </Link>
              <Link to="/privacy-policy" className="transition hover:text-pink-500">
                Privacy Policy
              </Link>
              <Link
                to="/terms-and-conditions"
                className="transition hover:text-pink-500"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="text-center sm:text-left">
            <h3 className="mb-4 text-lg font-bold sm:text-xl">
              Subscribe Newsletter
            </h3>

            <p className="mx-auto mb-5 max-w-sm text-sm leading-7 text-gray-400 sm:mx-0 sm:text-base">
              Get skincare tips, offers, and new product updates.
            </p>

            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-pink-500 sm:text-base"
              />

              <button className="w-full rounded-full bg-pink-600 py-3 text-sm font-bold transition hover:bg-pink-700 active:scale-95 sm:text-base">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-gray-500 sm:mt-14 sm:text-sm">
          © 2026 SkinCare. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;