import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, ShoppingBag ,Heart } from "lucide-react";

// redux
import { useSelector } from "react-redux";


const Navbar = () => {
    // redux
const cartItems = useSelector((state) => state.cart.cartItems);
const cartCount = cartItems.reduce(
  (total, item) => total + item.quantity,
  0
);

// wishlist
const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
const wishlistCount = wishlistItems.length;

const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-pink-100">
      <nav className="max-w-7xl mx-auto h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2">
          <img src="/favicon.svg" alt="SkinCare logo" className="h-9 w-9" />
          <span className="text-xl font-bold text-black">SkinCare</span>
        </NavLink>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-xl font-medium transition-colors ${
                  isActive
                    ? "text-pink-600"
                    : "text-gray-700 "
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
        <button className="relative text-gray-700 hover:text-pink-600 transition-colors">
            <NavLink to="/wishlist" className="relative text-gray-700 hover:text-pink-600">
  <Heart size={22} />
  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-black text-white text-xs flex items-center justify-center">
    {wishlistCount}
  </span>
</NavLink>
          </button>
          <button className="relative text-gray-700 hover:text-pink-600 transition-colors">
           <NavLink to="/cart">
           <ShoppingBag size={22} />
           <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-black text-white text-xs flex items-center justify-center">
              {cartCount}
            </span>
         </NavLink>
          </button>

          <button className="px-5 py-2 rounded-full bg-black text-white text-sm font-medium hover:black transition">
           <NavLink to="/login">Login</NavLink>
          </button>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-pink-50"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-pink-100 px-4 py-5 space-y-4 shadow-lg">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block text-base font-medium ${
                  isActive ? "text-pink-600" : "text-gray-700"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <div className="pt-4 border-t border-pink-100 flex items-center justify-between">
            <button className="flex items-center gap-2 text-gray-700">
              <ShoppingBag size={20} />
              Cart {cartCount}
            </button>

            <button className="px-5 py-2 rounded-full bg-pink-600 text-white text-sm font-medium">
              Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;