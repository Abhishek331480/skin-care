import { Link } from "react-router-dom";
// import { Instagram, Facebook, Twitter } from "lucide-react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold">SkinCare</h2>

            <p className="text-gray-400 mt-4 leading-7">
              Premium skincare products crafted for healthy, glowing, and
              confident skin.
            </p>

            <div className="flex gap-4 mt-6">
               <FaInstagram className="text-pink-500 text-2xl" />

              <FaFacebookF className="text-blue-600 text-2xl" />

               <FaTwitter className="text-sky-500 text-2xl" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-5">Quick Links</h3>

            <div className="flex flex-col gap-3 text-gray-400">
              <Link to="/">Home</Link>
              <Link to="/shop">Shop</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>

          {/* Support */}
          {/* Support */}
<div>
  <h3 className="text-xl font-semibold mb-5">Support</h3>

  <div className="flex flex-col gap-3 text-gray-400">
    <Link
      to="/help-center"
      className="hover:text-pink-500 transition"
    >
      Help Center
    </Link>

    <Link
      to="/shipping-policy"
      className="hover:text-pink-500 transition"
    >
      Shipping Policy
    </Link>

    <Link
      to="/privacy-policy"
      className="hover:text-pink-500 transition"
    >
      Privacy Policy
    </Link>

    <Link
      to="/terms-and-conditions"
      className="hover:text-pink-500 transition"
    >
      Terms & Conditions
    </Link>
  </div>
</div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-5">
              Subscribe Newsletter
            </h3>

            <p className="text-gray-400 leading-7 mb-5">
              Get skincare tips, offers, and new product updates.
            </p>

            <div className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded-full bg-white/10 border border-white/10 px-5 py-3 outline-none focus:border-pink-500"
              />

              <button className="rounded-full bg-pink-600 py-3 font-semibold hover:bg-pink-700 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-14 pt-6 text-center text-gray-500 text-sm">
          © 2026 SkinCare. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;