import { useState, useEffect,useRef } from "react";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { RiCoupon3Line } from "react-icons/ri";
import { Menu,X,Heart,Sparkles,User,Package,LogOut,ChevronDown,Bell,Home} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/slices/authSlice";
import api from "../api/api";
import toast from "react-hot-toast";
import { clearWishlist } from "../store/slices/wishlistSlice";
import { clearCart } from "../store/slices/cartSlice";
import { GitCompareArrows } from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const [unreadCount, setUnreadCount] = useState(0);
const [openAccount, setOpenAccount] = useState(false);
  //login logout code
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const isWelcomeOfferActive =
  isAuthenticated &&
  user?.welcomeOffer &&
  user.welcomeOffer.isUsed === false &&
  user.welcomeOffer.expiresAt &&
  new Date(user.welcomeOffer.expiresAt) > new Date();


  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const wishlistCount = wishlistItems.length;

  const compareItems = useSelector(
  (state) => state.compare.compareItems
);

const compareCount = compareItems.length;

  const [isOpen, setIsOpen] = useState(false);
  const profileRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (e) => {
    if (
      profileRef.current &&
      !profileRef.current.contains(e.target)
    ) {
      setOpenProfile(false);
    }
  };

  useEffect(() => {
  if (openAccount) {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  }
}, [openAccount]);

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
  const [openProfile, setOpenProfile] = useState(false);
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const fetchUnreadNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setUnreadCount(res.data.unreadCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUnreadNotifications();
    }
  }, [user]);

  useEffect(() => {
    const handleNotificationUpdate = () => {
      if (user) {
        fetchUnreadNotifications();
      }
    };

    window.addEventListener("notificationsUpdated", handleNotificationUpdate);

    return () => {
      window.removeEventListener(
        "notificationsUpdated",
        handleNotificationUpdate,
      );
    };
  }, [user]);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");

      dispatch(logoutUser());
      dispatch(clearWishlist());
      dispatch(clearCart());
      toast.success("Logout successful");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    // <header className="sticky top-0 z-50 border-b border-pink-100/80 bg-white/80 backdrop-blur-2xl">
    // <header className="sticky top-0 z-[9999] border-b border-pink-100/80 bg-white/80 backdrop-blur-2xl">
    <header className="sticky top-0 z-[9999] border-b border-pink-100/80 bg-white/80 backdrop-blur-2xl">
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
            to="/ai-skin-test"
            className="relative h-11 w-27 rounded-full border border-pink-100 bg-white flex items-center justify-center text-gray-700 hover:text-pink-600 hover:border-pink-200 hover:shadow-md transition"
          >
            AI Skin Test
          </NavLink>

          <NavLink
            to="/cart"
            className="relative h-11 w-11 rounded-full border border-pink-100 bg-white flex items-center justify-center text-gray-700 hover:text-pink-600 hover:border-pink-200 hover:shadow-md transition"
          >
            <FaShoppingCart size={21} />

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-black text-white text-[11px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/notifications"
            className="relative h-11 w-11 rounded-full border border-pink-100 bg-white flex items-center justify-center text-gray-700 hover:text-pink-600 hover:border-pink-200 hover:shadow-md transition"
          >
            <Bell size={20} />

            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-black text-white">
                {unreadCount}
              </span>
            )}
          </NavLink>

          {isAuthenticated ? (
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setOpenProfile(!openProfile)}
                className="flex items-center gap-3 rounded-full border border-pink-100 bg-white px-3 py-1.5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-bold uppercase text-pink-400">
                  {user?.username?.charAt(0)}
                </div>

                <ChevronDown size={18} className="text-gray-700" />
              </button>

              {openProfile && (
                <div className="absolute right-0 top-14 z-50 w-72 rounded-3xl border border-pink-100 bg-white p-3 shadow-2xl">
                  <NavLink
                    to="/profile"
                    onClick={() => setOpenProfile(false)}
                    className="flex items-center gap-4 rounded-2xl px-4 py-3 text-gray-800 hover:bg-pink-50 transition"
                  >
                    <User size={21} />
                    <span className="font-medium">My Profile</span>
                  </NavLink>

                  <NavLink
                    to="/my-addresses"
                    className="flex items-center gap-4 rounded-2xl px-4 py-3 text-gray-800 hover:bg-pink-50 transition"
                  >
                    <Home size={21} />
                    <span className="font-medium">My Address</span>
                  </NavLink>

                  <NavLink
                    to="/my-orders"
                    onClick={() => setOpenProfile(false)}
                    className="flex items-center gap-4 rounded-2xl px-4 py-3 text-gray-800 hover:bg-pink-50 transition"
                  >
                    <Package size={21} />
                    <span className="font-medium">Orders</span>
                  </NavLink>

                  <NavLink
                    to="/my-coupons"
                    className="flex items-center gap-4 rounded-2xl px-4 py-3 text-gray-800 hover:bg-pink-50 transition"
                  >
                    <RiCoupon3Line size={21} />
                    <span className="font-medium">My Coupons</span>
                  </NavLink>

                  <NavLink
  to="/compare"
  onClick={() => setOpenProfile(false)}
  className="flex items-center justify-between rounded-2xl px-4 py-3 text-gray-800 hover:bg-pink-50 transition"
>
  <div className="flex items-center gap-4">
    <GitCompareArrows size={21} />
    <span className="font-medium">Compare Products</span>
  </div>

  {compareCount > 0 && (
    <span className="rounded-full bg-pink-600 px-2 py-0.5 text-xs font-bold text-white">
      {compareCount}
    </span>
  )}
</NavLink>

                  <NavLink
                    to="/wishlist"
                    onClick={() => setOpenProfile(false)}
                    className="flex items-center justify-between rounded-2xl px-4 py-3 text-gray-800 hover:bg-pink-50 transition"
                  >
                    <div className="flex items-center gap-4">
                      <Heart size={21} />
                      <span className="font-medium">Wishlist</span>
                    </div>

                    {wishlistCount > 0 && (
                      <span className="rounded-full bg-pink-600 px-2 py-0.5 text-xs font-bold text-white">
                        {wishlistCount}
                      </span>
                    )}
                  </NavLink>

                  <button
                    onClick={() => {
                      setOpenProfile(false);
                      handleLogout();
                    }}
                    className="flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-red-600 hover:bg-red-50 transition"
                  >
                    <LogOut size={21} />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              )}
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
       <div className="flex items-center gap-3 lg:hidden">

  {/* Notification Bell */}
  <NavLink
    to="/notifications"
    onClick={() => setIsOpen(false)}
    className="relative flex h-11 w-11 items-center justify-center rounded-full border border-pink-100 bg-white text-pink-600 shadow-sm hover:bg-pink-50 transition"
  >
    <Bell size={20} />

    {unreadCount > 0 && (
      <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-black text-white">
        {unreadCount}
      </span>
    )}
  </NavLink>

  {/* Hamburger Menu */}
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="h-11 w-11 rounded-full border border-pink-100 bg-white flex items-center justify-center text-gray-800 shadow-sm hover:bg-pink-50 transition"
  >
    {isOpen ? <X size={24} /> : <Menu size={24} />}
  </button>

</div>
      </nav>

      {isAuthenticated && isWelcomeOfferActive && (
  <div className="bg-pink-50 py-2 text-black">
    <marquee className="text-sm font-bold tracking-wide">
      🎉 Welcome Offer: Get {user.welcomeOffer.discountPercent}% OFF on products for your first 3 days. Offer valid till{" "}
      {new Date(user.welcomeOffer.expiresAt).toLocaleDateString("en-IN")}
    </marquee>
  </div>
)}

      {/* Mobile Menu */}
      {isOpen && (
<div
  className={`
    lg:hidden fixed left-0 right-0 bottom-0 z-[9999]
    overflow-y-scroll overscroll-y-contain
    border-t border-pink-100 bg-white/95 backdrop-blur-xl
    px-4 pb-32 shadow-xl
    ${isWelcomeOfferActive ? "top-[112px]" : "top-[80px]"}
  `}>  
    <div className="mx-auto max-w-7xl pt-4 pb-32 space-y-3">
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

{/* ================================ */}
    {isAuthenticated && (
  <div className="mt-4 rounded-3xl border border-pink-100 bg-white p-3 shadow-sm">
    <button
      onClick={() => setOpenAccount(!openAccount)}
      className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-gray-800 hover:bg-pink-50 transition"
    >
      <div className="flex items-center gap-3">
        <User size={21} />
        <span className="font-bold">My Account Details</span>
      </div>

      <ChevronDown
        size={20}
        className={`transition ${openAccount ? "rotate-180" : ""}`}
      />
    </button>

    {openAccount && (
      <div className="mt-2 space-y-1 border-t border-pink-100 pt-2">
        <NavLink
          to="/profile"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-4 rounded-2xl px-4 py-3 text-gray-800 hover:bg-pink-50 transition"
        >
          <User size={21} />
          <span className="font-medium">My Profile</span>
        </NavLink>

        <NavLink
          to="/my-addresses"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-4 rounded-2xl px-4 py-3 text-gray-800 hover:bg-pink-50 transition"
        >
          <Home size={21} />
          <span className="font-medium">My Address</span>
        </NavLink>

        <NavLink
          to="/my-orders"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-4 rounded-2xl px-4 py-3 text-gray-800 hover:bg-pink-50 transition"
        >
          <Package size={21} />
          <span className="font-medium">My Orders</span>
        </NavLink>

        <NavLink
          to="/my-coupons"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-4 rounded-2xl px-4 py-3 text-gray-800 hover:bg-pink-50 transition"
        >
          <RiCoupon3Line size={21} />
          <span className="font-medium">My Coupons</span>
        </NavLink>
      </div>
    )}
  </div>
)}
{/* ============================= */}
            <div className="grid grid-cols-2 gap-3 pt-3">
  <NavLink
    to="/ai-skin-test"
    onClick={() => setIsOpen(false)}
    className="flex items-center justify-center gap-2 rounded-2xl border border-pink-100 bg-pink-50 px-4 py-3 text-sm font-semibold text-pink-700"
  >
    <Sparkles size={18} />
    AI Skin Test
  </NavLink>

  <NavLink
    to="/wishlist"
    onClick={() => setIsOpen(false)}
    className="flex items-center justify-center gap-2 rounded-2xl border border-pink-100 bg-pink-50 px-4 py-3 text-sm font-semibold text-pink-700"
  >
    <Heart size={18} />
    Wishlist ({wishlistCount})
  </NavLink>

  <NavLink
  to="/compare"
  onClick={() => setIsOpen(false)}
  className="flex items-center justify-center gap-2 rounded-2xl border border-pink-100 bg-pink-50 px-4 py-3 text-sm font-semibold text-pink-700"
>
  <GitCompareArrows size={18} />
  Compare ({compareCount})
</NavLink>

  <NavLink
    to="/cart"
    onClick={() => setIsOpen(false)}
    className="flex items-center justify-center gap-2 rounded-2xl border border-pink-100 bg-pink-50 px-4 py-3 text-sm font-semibold text-pink-700"
  >
    <FaShoppingCart size={18} />
    Cart ({cartCount})
  </NavLink>
</div>

            {isAuthenticated ? (
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="block w-full rounded-full bg-red-500 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full rounded-full bg-gray-950 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-pink-600 transition"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
