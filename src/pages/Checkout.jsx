import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";
import { clearCart } from "../store/slices/cartSlice";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const { user, isAuthenticated } = useSelector(
  (state) => state.auth
);

const isWelcomeOfferActive =
  isAuthenticated &&
  user?.welcomeOffer &&
  user.welcomeOffer.isUsed === false &&
  user.welcomeOffer.expiresAt &&
  new Date(user.welcomeOffer.expiresAt) > new Date();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // address state
  const [addresses, setAddresses] = useState([]);
const [selectedAddressId, setSelectedAddressId] = useState("");

  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [couponLoading, setCouponLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState("");

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // payment state
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const fetchAddresses = async () => {
  try {
    const res = await api.get("/addresses");

    setAddresses(res.data.addresses);

    const defaultAddress =
      res.data.addresses.find((item) => item.isDefault) ||
      res.data.addresses[0];

    if (defaultAddress) {
      setSelectedAddressId(defaultAddress._id);

      setShippingAddress({
        fullName: defaultAddress.fullName,
        phone: defaultAddress.phone,
        address: defaultAddress.address,
        city: defaultAddress.city,
        state: defaultAddress.state,
        pincode: defaultAddress.pincode,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchAddresses();
}, []);

const handleSelectAddress = (address) => {
  setSelectedAddressId(address._id);

  setShippingAddress({
    fullName: address.fullName,
    phone: address.phone,
    address: address.address,
    city: address.city,
    state: address.state,
    pincode: address.pincode,
  });
};



 const originalAmount = cartItems.reduce(
  (total, item) =>
    total +
    (item.variant?.price || item.product?.price || 0) *
      item.quantity,
  0
);

const welcomeDiscount = isWelcomeOfferActive
  ? Math.round(
      (originalAmount *
        user.welcomeOffer.discountPercent) /
        100
    )
  : 0;

const totalAmount =
  originalAmount - welcomeDiscount;
  // const payableAmount = finalAmount || totalAmount;
  const payableAmount =finalAmount > 0? finalAmount : totalAmount;

  // coupan code
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter coupon code");
      return;
    }

    try {
      setCouponLoading(true);

      const res = await api.post("/coupons/validate", {
        code: couponCode,
        totalAmount,
      });

      setDiscountAmount(res.data.discountAmount);
      setFinalAmount(res.data.finalAmount);
      setAppliedCoupon(res.data.couponCode);

      toast.success(res.data.message);
    } catch (error) {
      setDiscountAmount(0);
      setFinalAmount(0);
      setAppliedCoupon("");

      toast.error(error.response?.data?.message || "Invalid coupon");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleRemoveCoupon = () => {
    setCouponCode("");
    setDiscountAmount(0);
    setFinalAmount(0);
    setAppliedCoupon("");

    toast.success("Coupon removed");
  };

  const handleOnlinePayment = async (orderPayload) => {
    const isLoaded = await loadRazorpayScript();

    if (!isLoaded) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    const res = await api.post("/payments/create-order", {
      amount: payableAmount,
    });

    const options = {
      key: res.data.key,
      amount: res.data.order.amount,
      currency: res.data.order.currency,
      name: "SkinCare Store",
      description: "Order Payment",
      order_id: res.data.order.id,

     handler: async function (response) {
  try {
    const verifyRes = await api.post("/payments/verify", {
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
    });

    toast.success(verifyRes.data.message);

    const orderRes = await api.post("/orders", {
      ...orderPayload,
      paymentStatus: "PAID",
    });

toast.success(orderRes.data.message);
await api.delete("/cart");
dispatch(clearCart());
window.dispatchEvent(new Event("notificationsUpdated"));
navigate("/my-orders");

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Payment verification failed"
    );
  }
},

      prefill: {
        name: shippingAddress.fullName,
        contact: shippingAddress.phone,
      },

      theme: {
        color: "#ec4899",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

//       const items = cartItems.map((item) => ({
//   product: item._id || item.product || item.id,
//   name: item.name,
//   image: item.images?.[0] || item.image,
//   price: item.price,
//   quantity: item.quantity,

//   variant: item.selectedVariant
//     ? {
//         size: item.selectedVariant.size,
//         price: item.selectedVariant.price,
//         sku: item.selectedVariant.sku,
//       }
//     : null,
// }));
const items = cartItems.map((item) => ({
  product: item.product?._id,

  name: item.product?.name,

  image: item.product?.images?.[0],

  price:
    item.variant?.price ||
    item.product?.price,

  quantity: item.quantity,

  variant: item.variant
    ? {
        size: item.variant.size,
        price: item.variant.price,
        sku: item.variant.sku,
      }
    : null,
}));

      const orderPayload = {
        items,
        shippingAddress,
        totalAmount: payableAmount,
        discountAmount,
        couponCode: appliedCoupon,
      };

      if (paymentMethod === "ONLINE") {
        await handleOnlinePayment(orderPayload);
        return;
      }

      const res = await api.post("/orders", {
        ...orderPayload,
        paymentStatus: "PENDING",
      });

     toast.success(res.data.message || "Order placed successfully");

await api.delete("/cart");

dispatch(clearCart());

window.dispatchEvent(new Event("notificationsUpdated"));

navigate("/my-orders");
    } catch (error) {
      console.log("ORDER ERROR:", error.response?.data || error.message);

      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  // razorpay code
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  return (
    <form onSubmit={handlePlaceOrder}>
      <section className="px-4 sm:px-6 lg:px-0 py-6 sm:py-10 overflow-x-hidden">
        <div className="mb-8">
          <p className="text-sm font-semibold text-pink-600">Secure Checkout</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-950">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
<div className="lg:col-span-2 bg-white rounded-3xl lg:rounded-[2rem] border border-pink-100 shadow-xl p-4 sm:p-6 space-y-6">            <div>
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>

              {addresses.length > 0 && (
  <div className="mb-6 grid gap-4 sm:grid-cols-2">
    {addresses.map((item) => (
      <button
        key={item._id}
        type="button"
        onClick={() => handleSelectAddress(item)}
        className={`rounded-2xl border p-4 text-left transition ${
          selectedAddressId === item._id
            ? "border-pink-500 bg-pink-50"
            : "border-pink-100 bg-white hover:bg-pink-50"
        }`}
      >
        <div className="mb-2 flex items-center justify-between">
          <p className="font-black text-gray-950">{item.fullName}</p>

          {item.isDefault && (
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-600">
              Default
            </span>
          )}
        </div>

        <p className="text-sm font-semibold text-gray-600">{item.phone}</p>
        <p className="mt-1 text-sm text-gray-500">{item.address}</p>
        <p className="text-sm text-gray-500">
          {item.city}, {item.state} - {item.pincode}
        </p>
      </button>
    ))}
  </div>
)}

              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  name="fullName"
                  value={shippingAddress.fullName}
                  onChange={handleChange}
                 className="w-full min-w-0 rounded-full border border-gray-300 px-4 py-3 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
                  placeholder="Full name"
                  required
                />

                <input
                  name="phone"
                  value={shippingAddress.phone}
                  onChange={handleChange}
                  className="w-full min-w-0 rounded-full border border-gray-300 px-4 py-3 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
                  placeholder="Phone number"
                  required
                />

                <input
                  name="address"
                  value={shippingAddress.address}
                  onChange={handleChange}
                 className="w-full min-w-0 rounded-full border border-gray-300 px-4 py-3 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
                  placeholder="Address"
                  required
                />

                <input
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleChange}
                  className="w-full min-w-0 rounded-full border border-gray-300 px-4 py-3 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
                  placeholder="City"
                  required
                />

                <input
                  name="state"
                  value={shippingAddress.state}
                  onChange={handleChange}
                  className="w-full min-w-0 rounded-full border border-gray-300 px-4 py-3 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
                  placeholder="State"
                  required
                />

                <input
                  name="pincode"
                  value={shippingAddress.pincode}
                  onChange={handleChange}
                  className="w-full min-w-0 rounded-full border border-gray-300 px-4 py-3 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
                  placeholder="Pincode"
                  required
                />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="border rounded-2xl p-4 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                  />{" "}
                  Cash on Delivery
                </label>

                <label className="border rounded-2xl p-4 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "ONLINE"}
                    onChange={() => setPaymentMethod("ONLINE")}
                  />{" "}
                  Online Payment
                </label>
              </div>
            </div>
          </div>

<div className="bg-white rounded-3xl lg:rounded-[2rem] border border-pink-100 shadow-xl p-4 sm:p-6 h-fit lg:sticky lg:top-28">            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="mb-6">
              <p className="font-semibold mb-3">Apply Coupon</p>

             <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
className="w-full min-w-0 rounded-full border border-pink-100 px-5 py-3 outline-none focus:ring-4 focus:ring-pink-100"                />

                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={couponLoading}
                 className="w-full sm:w-auto rounded-full bg-pink-600 px-6 py-3 font-semibold text-white disabled:opacity-50"
                >
                  {couponLoading ? "Applying..." : "Apply"}
                </button>
              </div>

              {appliedCoupon && (
                <div className="mt-4 rounded-2xl bg-green-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-green-700">
                        Coupon Applied: {appliedCoupon}
                      </p>

                      <p className="text-sm text-green-600 mt-1">
                        Discount: ₹{discountAmount}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t my-6" />

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>

               <span className="font-semibold">
  ₹{originalAmount}
</span>
              </div>
              {welcomeDiscount > 0 && (
  <div className="flex justify-between text-pink-600">
    <span>
      Welcome Offer (
      {user.welcomeOffer.discountPercent}%)
    </span>

    <span className="font-semibold">
      - ₹{welcomeDiscount}
    </span>
  </div>
)}

              {discountAmount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>

                  <span className="font-semibold">- ₹{discountAmount}</span>
                </div>
              )}

              <div className="border-t pt-3 flex justify-between">
                <span className="text-xl font-bold">Final Total</span>

                <span className="text-2xl font-bold">₹{payableAmount}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || cartItems.length === 0}
              className="w-full py-4 rounded-full bg-black text-white font-semibold disabled:opacity-50"
            >
              {loading
                ? "Processing..."
                : paymentMethod === "ONLINE"
                  ? "Pay Now"
                  : "Place Order"}
            </button>
          </div>
        </div>
      </section>
    </form>
  );
};

export default Checkout;
