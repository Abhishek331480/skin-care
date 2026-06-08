import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import BestSeller from "./components/BestSeller";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import Footer from "./components/Footer";
import { useEffect } from "react";
import ScrollToTop from "./components/ScrollToTop";
import Invoice from "../src/pages/Invoice";
import AISkinTest from "../src/pages/AISkinTest";
import Compare from "./pages/Compare";
// login and register
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import ResendVerification from "./pages/ResendVerification";
import OrderDetails from "./pages/OrderDetails";
import MyCoupons from "./pages/MyCoupons";
import MyAddresses from "./pages/MyAddresses";
import HelpCenter from "./pages/HelpCenter";
import ShippingPolicy from "./pages/ShippingPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";

//redux
import { useDispatch } from "react-redux";
import { logoutUser, setUser, setAuthLoading } from "./store/slices/authSlice";
import api from "./api/api";
import { setWishlist } from "./store/slices/wishlistSlice";
import { setCart, clearCart } from "./store/slices/cartSlice";

// admin panel
import AdminLayout from "../src/pages/admin/AdminLayout";
import AdminDashboard from "../src/pages/admin/AdminDashboard";
import AdminProducts from "../src/pages/admin/AdminProducts";
import AddProduct from "../src/pages/admin/AddProduct";
import EditProduct from "../src/pages/admin/EditProduct";
import AdminOrders from "../src/pages/admin/AdminOrders";
import { useLocation } from "react-router-dom";
// import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import AdminLogin from "./pages/admin/AdminLogin";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import AdminCoupons from "./pages/admin/AdminCoupons";
import Notifications from "./pages/Notifications";

const App = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const isAdminRoute = window.location.pathname.startsWith("/admin");

  //   const profileUrl = isAdminRoute
  //     ? "/auth/admin/profile"
  //     : "/user/profile";

  //   api
  //     .get(profileUrl)
  //     .then(async (res) => {
  //     dispatch(setUser(res.data.user));

  //     try {
  //       const wishlistRes = await api.get("/wishlist");

  //       dispatch(setWishlist(wishlistRes.data.wishlist));
  //     } catch (error) {
  //       console.log("Wishlist fetch error", error);
  //     }
  //   })
  //     .catch(() => {
  //       dispatch(logoutUser());
  //     });
  // }, [dispatch]);

  useEffect(() => {
    const isAdminRoute = window.location.pathname.startsWith("/admin");
    dispatch(setAuthLoading(true));
    const profileUrl = isAdminRoute ? "/auth/admin/profile" : "/user/profile";

    api
      .get(profileUrl)
      .then(async (res) => {
        dispatch(setUser(res.data.user));

        dispatch(setAuthLoading(false));
        if (!isAdminRoute) {
          try {
            const wishlistRes = await api.get("/wishlist");
            dispatch(setWishlist(wishlistRes.data.wishlist));
          } catch (error) {
            console.log("Wishlist fetch error", error);
          }

          try {
            const cartRes = await api.get("/cart");
            dispatch(setCart(cartRes.data.cart));
          } catch (error) {
            console.log("Cart fetch error", error);
          }
        }
      })
      .catch(() => {
        dispatch(logoutUser());
        dispatch(setAuthLoading(false));
        dispatch(setWishlist([]));
        dispatch(clearCart());
      });
  }, [dispatch]);

  const AppContent = () => {
    const location = useLocation();
    const hideLayoutRoutes = [
      // "/login",
      // "/register",
      // "/forgot-password",
      "/resend-verification",
    ];

    const hideLayout =
      hideLayoutRoutes.includes(location.pathname) ||
      location.pathname.startsWith("/reset-password") ||
      location.pathname.startsWith("/verify-email") ||
      location.pathname.startsWith("/admin");

    return (
      <div className="bg-pink-50 min-h-screen">
        {!hideLayout && <Navbar />}

       <div
  className={
    hideLayout
      ? ""
      : location.pathname === "/"
      ? ""
      : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
  }
>
          <Routes>
            {/* all routes here */}
            <Route path="/" element={<Home />} />
            <Route path="/bestSeller" element={<BestSeller />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/invoice/:id" element={<Invoice />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/my-coupons" element={<MyCoupons />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/my-addresses" element={<MyAddresses />} />
            <Route path="/ai-skin-test" element={<AISkinTest />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
            {/* login and register */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            <Route
              path="/resend-verification"
              element={<ResendVerification />}
            />

            {/* admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <AdminLayout />
                </AdminProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/add" element={<AddProduct />} />
              <Route path="products/edit/:id" element={<EditProduct />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="coupons" element={<AdminCoupons />} />
            </Route>
          </Routes>
        </div>

        {!hideLayout && <Footer />}
      </div>
    );
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
