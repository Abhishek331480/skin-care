import { useSelector, useDispatch } from "react-redux";
import { Trash2, ShoppingBag } from "lucide-react";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "../store/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="bg-white rounded-[2rem] border border-pink-100 shadow-xl p-10 text-center max-w-md">
          <ShoppingBag className="mx-auto text-pink-500 mb-4" size={48} />
          <h1 className="text-3xl font-bold text-gray-950">Your cart is empty</h1>
          <p className="mt-3 text-gray-600">Add products to continue shopping.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-82px)] py-5">
      <div className="mb-8">
        <p className="text-sm font-semibold text-pink-600">Your selected products</p>
        <h1 className="text-4xl font-bold text-gray-950 mt-2">Shopping Cart</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-5">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white/90 backdrop-blur-xl border border-pink-100 rounded-[2rem] p-5 shadow-sm hover:shadow-xl transition flex flex-col sm:flex-row sm:items-center justify-between gap-5"
            >
              <div className="flex items-center gap-4">
                <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-200 flex-shrink-0" />

                <div>
                  <p className="text-sm font-semibold text-pink-600">
                    {item.category}
                  </p>
                  <h2 className="text-lg font-bold text-gray-950">
                    {item.name}
                  </h2>
                  <p className="font-bold mt-2 text-gray-900">₹{item.price}</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-5">
                <div className="flex items-center gap-3 bg-pink-50 rounded-full px-3 py-2">
                  <button
                    onClick={() => dispatch(decreaseQty(item.id))}
                    className="h-8 w-8 rounded-full bg-white border border-pink-100 font-bold"
                  >
                    -
                  </button>

                  <span className="min-w-6 text-center font-bold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => dispatch(increaseQty(item.id))}
                    className="h-8 w-8 rounded-full bg-black text-white font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
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

          <button className="w-full py-4 rounded-full bg-black text-white font-semibold shadow-lg hover:bg-gray-900 transition">
            Checkout
          </button>

          <button
            onClick={() => dispatch(clearCart())}
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