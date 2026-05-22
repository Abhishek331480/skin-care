import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <section className="py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold text-pink-600">Secure Checkout</p>
        <h1 className="text-4xl font-bold text-gray-950">Checkout</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2rem] border border-pink-100 shadow-xl p-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-4">Contact Info</h2>
            <input className="w-full border rounded-full px-5 py-3" placeholder="Email address" />
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <input className="border rounded-full px-5 py-3" placeholder="Full name" />
              <input className="border rounded-full px-5 py-3" placeholder="Phone number" />
              <input className="sm:col-span-2 border rounded-full px-5 py-3" placeholder="Address" />
              <input className="border rounded-full px-5 py-3" placeholder="City" />
              <input className="border rounded-full px-5 py-3" placeholder="Pincode" />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="border rounded-2xl p-4 cursor-pointer">
                <input type="radio" name="payment" defaultChecked /> Cash on Delivery
              </label>
              <label className="border rounded-2xl p-4 cursor-pointer">
                <input type="radio" name="payment" /> Online Payment
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] border border-pink-100 shadow-xl p-6 h-fit sticky top-28">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between gap-4">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-bold">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="border-t my-6" />

          <div className="flex justify-between mb-6">
            <span className="text-lg font-bold">Total</span>
            <span className="text-2xl font-bold">₹{totalAmount}</span>
          </div>
          
         
          <button className="w-full py-4 rounded-full bg-black text-white font-semibold"
            onClick={() => navigate('/order-success')}
          >
            Place Order
          </button>
          
        </div>
      </div>
    </section>
  );
};

export default Checkout;