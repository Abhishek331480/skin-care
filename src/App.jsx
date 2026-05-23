import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Navbar from './components/Navbar';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import BestSeller from './components/BestSeller';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Footer from './components/Footer';
import { useEffect } from 'react';
// login and register
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile'
//redux
import { useDispatch } from "react-redux";
import { logoutUser , setUser} from "./store/slices/authSlice";
import api from "./api/api"


// admin panel
import AdminLayout from "../src/pages/admin/AdminLayout";
import AdminDashboard from "../src/pages/admin/AdminDashboard";
import AdminProducts from "../src/pages/admin/AdminProducts";
import AddProduct from "../src/pages/admin/AddProduct";
import EditProduct from "../src/pages/admin/EditProduct";

import { useLocation } from "react-router-dom";

const App = () => {
 
  const dispatch = useDispatch();

useEffect(() => {
  api
    .get("/user/profile")
    .then((res) => {
      dispatch(setUser(res.data.user));
    })
    .catch(() => {
      dispatch(logoutUser());
    });
}, [dispatch]);


const AppContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div className="bg-pink-50 min-h-screen">
      {!isAdminPage && <Navbar />}

      <div className={isAdminPage ? "" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}>
        <Routes>
          {/* all routes here */}
          <Route path='/' element={<Home />} />
              <Route path='/bestSeller' element={<BestSeller />} />
              <Route path='/shop' element={<Shop />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/about' element={<About />} />
              <Route path='/product/:id' element={<ProductDetails />} />
              <Route path='/cart' element={<Cart/>}/>
             <Route path="/wishlist" element={<Wishlist />} />
             <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/order-success' element={<OrderSuccess/>}/>
              {/* login and register */}
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path="/profile" element={<Profile/>} />


              {/* admin routes */}
      <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<AdminDashboard />} />
      <Route path="products" element={<AdminProducts />} />
      <Route path="products/add" element={<AddProduct />} />
      <Route path="products/edit/:id" element={<EditProduct />} />
     </Route>
        </Routes>
      </div>

      {!isAdminPage && <Footer />}
    </div>
  );
};

  return (
    <BrowserRouter>
      <AppContent/>
    </BrowserRouter>
    
  )
}

export default App;