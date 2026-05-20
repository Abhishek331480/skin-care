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

// login and register
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <BrowserRouter>
      <div className='bg-pink-50 min-h-screen'>
         <Navbar/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

             <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/shop' element={<Shop />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/about' element={<About />} />
              <Route path='/product/:id' element={<ProductDetails />} />
              <Route path='/cart' element={<Cart/>}/>
             <Route path="/wishlist" element={<Wishlist />} />
              {/* login and register */}
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
             </Routes>
        </div>
      </div>
    </BrowserRouter>
    
  )
}

export default App;