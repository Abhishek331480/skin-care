// import { useSelector, useDispatch } from "react-redux";
// import { Trash2, ShoppingBag } from "lucide-react";
// import { Link } from "react-router-dom";
// import toast from "react-hot-toast";

// const Cart = () => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart.cartItems);

//   const totalAmount = cartItems.reduce(
//   (total, item) =>
//     total +
//     (item.variant?.price || item.product?.price) * item.quantity,
//   0
// );

//   if (cartItems.length === 0) {
//     return (
//       <section className="min-h-[70vh] flex items-center justify-center px-4">
//         <div className="bg-white rounded-[2rem] border border-pink-100 shadow-xl p-10 text-center max-w-md">
//           <ShoppingBag className="mx-auto text-pink-500 mb-4" size={48} />
//           <h1 className="text-3xl font-bold text-gray-950">
//             Your cart is empty
//           </h1>
//           <p className="mt-3 text-gray-600">
//             Add products to continue shopping.
//           </p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="min-h-[calc(100vh-82px)] py-5">
//       <div className="mb-8">
//         <p className="text-sm font-semibold text-pink-600">
//           Your selected products
//         </p>
//         <h1 className="text-4xl font-bold text-gray-950 mt-2">Shopping Cart</h1>
//       </div>

//       <div className="grid lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2 space-y-5">
//           {cartItems.map((item) => (
//             <div
//               key={item.cartKey}
//               className="bg-white/90 backdrop-blur-xl border border-pink-100 rounded-[2rem] p-5 shadow-sm hover:shadow-xl transition flex flex-col sm:flex-row sm:items-center justify-between gap-5"
//             >
//               <div className="flex items-center gap-4">
//                 {/* <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-200 flex-shrink-0"/> */}
//                 <img
//                   src={item.product?.images?.[0]}
//                   alt={item.name}
//                   className="h-25 w-25 rounded-xl object-cover bg-pink-50 p-1"
//                 />
//                 <div>
//                   <p className="text-sm font-semibold text-pink-600">
//                    {item.product?.category}
//                   </p>
//                   <h2 className="text-lg font-bold text-gray-950">
//                     {item.product?.name}
//                   </h2>
//                   <div className="mt-2">
//                     <p className="font-bold text-gray-900">₹{item.variant?.price || item.product?.price}</p>

//                    {item.variant && (
//   <p className="text-sm font-semibold text-pink-600">
//     Size: {item.variant.size}
//   </p>
// )}
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center justify-between sm:justify-end gap-5">
//                 <div className="flex items-center gap-3 bg-pink-50 rounded-full px-3 py-2">
//                   <button
//                     onClick={() => dispatch(decreaseQty(item.cartKey))}
//                     className="h-8 w-8 rounded-full bg-white border border-pink-100 font-bold"
//                   >
//                     -
//                   </button>

//                   <span className="min-w-6 text-center font-bold">
//                     {item.quantity}
//                   </span>

//                   <button
//                     onClick={() => dispatch(increaseQty(item.cartKey))}
//                     className="h-8 w-8 rounded-full bg-black text-white font-bold"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <button
//                   onClick={() => {
//                     dispatch(removeFromCart(item.cartKey));
//                     toast.error("Removed from cart");
//                   }}
//                   className="h-11 w-11 rounded-full border border-red-100 text-red-500 flex items-center justify-center hover:bg-red-50 transition"
//                 >
//                   <Trash2 size={18} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="bg-white/90 backdrop-blur-xl border border-pink-100 rounded-[2rem] p-6 shadow-xl h-fit sticky top-28">
//           <h2 className="text-2xl font-bold text-gray-950 mb-6">
//             Order Summary
//           </h2>

//           <div className="space-y-4 text-gray-600">
//             <div className="flex justify-between">
//               <span>Items</span>
//               <span>{cartItems.length}</span>
//             </div>

//             <div className="flex justify-between">
//               <span>Subtotal</span>
//               <span>₹{totalAmount}</span>
//             </div>

//             <div className="flex justify-between">
//               <span>Shipping</span>
//               <span className="text-green-600 font-semibold">Free</span>
//             </div>
//           </div>

//           <div className="border-t border-pink-100 my-6" />

//           <div className="flex justify-between items-center mb-6">
//             <span className="text-lg font-bold text-gray-950">Total</span>
//             <span className="text-3xl font-bold text-gray-950">
//               ₹{totalAmount}
//             </span>
//           </div>

//           {/* <button className="w-full py-4 rounded-full bg-black text-white font-semibold shadow-lg hover:bg-gray-900 transition">
//             Checkout
//           </button> */}
//           <button className="w-full py-4 rounded-full bg-black text-white font-semibold shadow-lg hover:bg-gray-900 transition">
//             <Link to="/checkout">Checkout</Link>
//           </button>

//           <button
//             onClick={() => dispatch(clearCart())}
//             className="w-full mt-3 py-4 rounded-full border border-red-100 text-red-500 font-semibold hover:bg-red-50 transition"
//           >
//             Clear Cart
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Cart;

import { useSelector, useDispatch } from "react-redux";
import { Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/api";
import { setCart, clearCart } from "../store/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const isWelcomeOfferActive =
    isAuthenticated &&
    user?.welcomeOffer &&
    user.welcomeOffer.isUsed === false &&
    user.welcomeOffer.expiresAt &&
    new Date(user.welcomeOffer.expiresAt) > new Date();

  const getItemPrice = (item) => {
    const originalPrice = item.variant?.price || item.product?.price || 0;

    if (!isWelcomeOfferActive) {
      return originalPrice;
    }

    return Math.round(
      originalPrice - (originalPrice * user.welcomeOffer.discountPercent) / 100,
    );
  };

  const originalAmount = cartItems.reduce(
    (total, item) =>
      total + (item.variant?.price || item.product?.price || 0) * item.quantity,
    0,
  );

  const totalAmount = cartItems.reduce(
    (total, item) => total + getItemPrice(item) * item.quantity,
    0,
  );

  const welcomeDiscount = originalAmount - totalAmount;

  const handleIncreaseQty = async (cartKey) => {
    try {
      const res = await api.put(`/cart/${cartKey}/increase`);
      dispatch(setCart(res.data.cart));
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to increase quantity",
      );
    }
  };

  const handleDecreaseQty = async (cartKey) => {
    try {
      const res = await api.put(`/cart/${cartKey}/decrease`);
      dispatch(setCart(res.data.cart));
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to decrease quantity",
      );
    }
  };

  const handleRemoveFromCart = async (cartKey) => {
    try {
      const res = await api.delete(`/cart/${cartKey}`);
      dispatch(setCart(res.data.cart));
      toast.error("Removed from cart");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to remove cart item",
      );
    }
  };

  const handleClearCart = async () => {
    try {
      await api.delete("/cart");
      dispatch(clearCart());
      toast.success("Cart cleared");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to clear cart");
    }
  };

  if (cartItems.length === 0) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="bg-white rounded-[2rem] border border-pink-100 shadow-xl p-10 text-center max-w-md">
          <ShoppingBag className="mx-auto text-pink-500 mb-4" size={48} />
          <h1 className="text-3xl font-bold text-gray-950">
            Your cart is empty
          </h1>
          <p className="mt-3 text-gray-600">
            Add products to continue shopping.
          </p>

          <Link
            to="/shop"
            className="mt-6 inline-flex rounded-full bg-black px-6 py-3 text-white font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-82px)] py-5">
      <div className="mb-8">
        <p className="text-sm font-semibold text-pink-600">
          Your selected products
        </p>
        <h1 className="text-4xl font-bold text-gray-950 mt-2">Shopping Cart</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-5">
          {cartItems.map((item) => (
            <div
              key={item.cartKey}
              className="bg-white/90 backdrop-blur-xl border border-pink-100 rounded-[2rem] p-5 shadow-sm hover:shadow-xl transition flex flex-col sm:flex-row sm:items-center justify-between gap-5"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product?.images?.[0]}
                  alt={item.product?.name}
                  className="h-25 w-25 rounded-xl object-cover bg-pink-50 p-1"
                />

                <div>
                  <p className="text-sm font-semibold text-pink-600">
                    {item.product?.category}
                  </p>

                  <h2 className="text-lg font-bold text-gray-950">
                    {item.product?.name}
                  </h2>

                  <div className="mt-2">
                    {isWelcomeOfferActive ? (
                      <div>
                        <p className="text-sm font-bold text-gray-400 line-through">
                          ₹{item.variant?.price || item.product?.price}
                        </p>

                        <p className="font-black text-gray-900">
                          ₹{getItemPrice(item)}
                        </p>

                        <p className="text-xs font-black text-pink-600">
                          {user.welcomeOffer.discountPercent}% Welcome OFF
                        </p>
                      </div>
                    ) : (
                      <p className="font-bold text-gray-900">
                        ₹{item.variant?.price || item.product?.price}
                      </p>
                    )}

                    {item.variant && (
                      <p className="text-sm font-semibold text-pink-600">
                        Size: {item.variant.size}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-5">
                <div className="flex items-center gap-3 bg-pink-50 rounded-full px-3 py-2">
                  <button
                    onClick={() => handleDecreaseQty(item.cartKey)}
                    className="h-8 w-8 rounded-full bg-white border border-pink-100 font-bold"
                  >
                    -
                  </button>

                  <span className="min-w-6 text-center font-bold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => handleIncreaseQty(item.cartKey)}
                    className="h-8 w-8 rounded-full bg-black text-white font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleRemoveFromCart(item.cartKey)}
                  className="h-11 w-11 rounded-full border border-red-100 text-red-500 flex items-center justify-center hover:bg-red-50 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/90 backdrop-blur-xl border border-pink-100 rounded-[2rem] p-6 shadow-xl h-fit sticky top-28">
          <h2 className="text-2xl font-bold text-gray-950 mb-6">
            Order Summary
          </h2>

          <div className="space-y-4 text-gray-600">
            <div className="flex justify-between">
              <span>Items</span>
              <span>{cartItems.length}</span>
            </div>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{totalAmount}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600 font-semibold">Free</span>
            </div>
          </div>

          <div className="border-t border-pink-100 my-6" />

          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-bold text-gray-950">Total</span>
            <span className="text-3xl font-bold text-gray-950">
              ₹{totalAmount}
            </span>
          </div>

          <Link
            to="/checkout"
            className="block text-center w-full py-4 rounded-full bg-black text-white font-semibold shadow-lg hover:bg-gray-900 transition"
          >
            Checkout
          </Link>

          <button
            onClick={handleClearCart}
            className="w-full mt-3 py-4 rounded-full border border-red-100 text-red-500 font-semibold hover:bg-red-50 transition"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
