import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, ShoppingBag, Heart, Sparkles } from "lucide-react";
import { useSelector , useDispatch } from "react-redux";
import { logoutUser } from "../store/slices/authSlice";
import api from "../api/api";
import toast from "react-hot-toast";

const Navbar = () => {
  const dispatch = useDispatch();

  //login logout code
const { user, isAuthenticated } = useSelector(
  (state) => state.auth
);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const wishlistCount = wishlistItems.length;

  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = async () => {
  try {
    await api.post("/auth/logout");

    dispatch(logoutUser());

    toast.success("Logout successful");
  } catch (error) {
    toast.error("Logout failed");
  }
};

  return (
    <header className="sticky top-0 z-50 border-b border-pink-100/80 bg-white/80 backdrop-blur-2xl">
      <nav className="max-w-7xl mx-auto h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          className="group flex items-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-400 flex items-center justify-center shadow-lg shadow-pink-200 group-hover:scale-105 transition">
            <Sparkles size={22} className="text-white" />
          </div>

          <div>
            <h1 className="text-xl leading-none font-extrabold tracking-tight text-gray-950">
              SkinCare
            </h1>
            <p className="text-[11px] font-medium tracking-[2px] uppercase text-pink-500">
              Beauty Store
            </p>
          </div>
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center rounded-full border border-pink-100 bg-pink-50/60 p-1 shadow-sm">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-white text-pink-600 shadow-sm"
                    : "text-gray-600 hover:text-pink-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <NavLink
            to="/wishlist"
            className="relative h-11 w-11 rounded-full border border-pink-100 bg-white flex items-center justify-center text-gray-700 hover:text-pink-600 hover:border-pink-200 hover:shadow-md transition"
          >
            <Heart size={21} />

            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-pink-600 text-white text-[11px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className="relative h-11 w-11 rounded-full border border-pink-100 bg-white flex items-center justify-center text-gray-700 hover:text-pink-600 hover:border-pink-200 hover:shadow-md transition"
          >
            <ShoppingBag size={21} />

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-black text-white text-[11px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </NavLink>

          {isAuthenticated ? (
  <div className="flex items-center gap-3">
    <NavLink to="/profile" className="font-medium text-gray-700">
      {user?.username}
    </NavLink>

    <button
      onClick={handleLogout}
      className="px-5 py-2 rounded-full bg-black text-white text-sm font-medium"
    >
      Logout
    </button>
  </div>
) : (
  <NavLink
    to="/login"
    className="px-5 py-2 rounded-full bg-black text-white text-sm font-medium"
  >
    Login
  </NavLink>
)}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden h-11 w-11 rounded-full border border-pink-100 bg-white flex items-center justify-center text-gray-800 shadow-sm hover:bg-pink-50 transition"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-pink-100 bg-white/95 backdrop-blur-xl px-4 pb-5 shadow-xl">
          <div className="max-w-7xl mx-auto pt-4 space-y-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-2xl px-4 py-3 text-base font-semibold transition ${
                    isActive
                      ? "bg-pink-50 text-pink-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="grid grid-cols-2 gap-3 pt-3">
              <NavLink
                to="/wishlist"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 rounded-2xl border border-pink-100 bg-pink-50 px-4 py-3 text-sm font-semibold text-pink-700"
              >
                <Heart size={18} />
                Wishlist ({wishlistCount})
              </NavLink>

              <NavLink
                to="/cart"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 rounded-2xl border border-pink-100 bg-pink-50 px-4 py-3 text-sm font-semibold text-pink-700"
              >
                <ShoppingBag size={18} />
                Cart ({cartCount})
              </NavLink>
            </div>

            <NavLink
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full rounded-full bg-gray-950 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-pink-600 transition"
            >
              Login
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;