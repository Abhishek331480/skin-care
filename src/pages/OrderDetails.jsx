import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  MapPin,
  Package,
  ReceiptText,
  Truck,
} from "lucide-react";
import api from "../api/api";
import toast from "react-hot-toast";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${id}`);
        setOrder(res.data.order);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="py-24 text-center text-lg font-black text-gray-900">
        Loading order...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-24 text-center text-lg font-black text-gray-900">
        Order not found
      </div>
    );
  }

  const subTotal = order.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const statusClass =
    order.orderStatus === "DELIVERED"
      ? "bg-green-100 text-green-700"
      : order.orderStatus === "CANCELLED"
      ? "bg-red-100 text-red-700"
      : "bg-pink-100 text-pink-700";

  const paymentClass =
    order.paymentStatus === "PAID"
      ? "bg-green-100 text-green-700"
      : "bg-orange-100 text-orange-700";


      const handleCancelOrder = async () => {
  const confirmCancel = window.confirm(
    "Are you sure you want to cancel this order?"
  );

  if (!confirmCancel) return;

  try {
    const res = await api.put(`/orders/${order._id}/cancel`);

    toast.success(res.data.message);

    setOrder(res.data.order);
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to cancel order");
  }
};


  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 overflow-hidden rounded-[2rem] border border-white bg-white/90 p-6 shadow-xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Link
                to="/my-orders"
                className="inline-flex items-center gap-2 text-sm font-bold text-pink-600 hover:text-pink-700"
              >
                <ArrowLeft size={17} />
                Back to orders
              </Link>

              <p className="mt-5 text-sm font-black uppercase tracking-[0.25em] text-pink-500">
                Order Details
              </p>

              <h1 className="mt-2 break-all text-2xl font-black text-gray-950 md:text-4xl">
                #{order._id}
              </h1>

              <p className="mt-3 text-sm font-semibold text-gray-500">
                Ordered on{" "}
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <span
                className={`rounded-full px-5 py-3 text-center text-sm font-black ${paymentClass}`}
              >
                Payment: {order.paymentStatus}
              </span>

              <span
                className={`rounded-full px-5 py-3 text-center text-sm font-black ${statusClass}`}
              >
                Order: {order.orderStatus}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1fr_420px]">
          {/* Left */}
          <div className="space-y-8">
            {/* Products */}
            <div className="rounded-[2rem] border border-white bg-white/90 p-5 shadow-xl sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
                  <Package size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-950">
                    Ordered Products
                  </h2>
                  <p className="text-sm font-semibold text-gray-500">
                    {order.items.length} item(s) in this order
                  </p>
                </div>
              </div>

              <div className="mt-7 space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="group rounded-[1.5rem] border border-pink-100 bg-gradient-to-br from-white to-pink-50/60 p-4 transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-28 w-full rounded-2xl bg-white object-cover sm:h-24 sm:w-24"
                      />

                      <div className="flex-1">
                        <h3 className="text-lg font-black text-gray-950">
                          {item.name}
                        </h3>

                        <p className="mt-2 text-sm font-semibold text-gray-500">
                          Quantity: {item.quantity} × ₹{item.price}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white px-5 py-3 text-left shadow-sm sm:text-right">
                        <p className="text-xs font-bold uppercase text-gray-400">
                          Total
                        </p>
                        <p className="text-xl font-black text-gray-950">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping */}
            <div className="rounded-[2rem] border border-white bg-white/90 p-5 shadow-xl sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
                  <MapPin size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-950">
                    Shipping Address
                  </h2>
                  <p className="text-sm font-semibold text-gray-500">
                    Delivery details
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-pink-100 bg-pink-50/50 p-5 leading-8">
                <p className="text-lg font-black text-gray-950">
                  {order.shippingAddress.fullName}
                </p>
                <p className="font-semibold text-gray-600">
                  {order.shippingAddress.phone}
                </p>
                <p className="font-semibold text-gray-600">
                  {order.shippingAddress.address}
                </p>
                <p className="font-semibold text-gray-600">
                  {order.shippingAddress.city}, {order.shippingAddress.state}
                </p>
                <p className="font-semibold text-gray-600">
                  Pincode: {order.shippingAddress.pincode}
                </p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-8 xl:sticky xl:top-8 xl:self-start">
            {/* Summary */}
            <div className="rounded-[2rem] border border-white bg-white/95 p-6 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-950 text-white">
                  <ReceiptText size={22} />
                </div>
                <h2 className="text-xl font-black text-gray-950">
                  Price Summary
                </h2>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-950">₹{subTotal}</span>
                </div>

                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-sm font-bold text-green-600">
                    <span>Discount ({order.couponCode})</span>
                    <span>- ₹{order.discountAmount}</span>
                  </div>
                )}

                <div className="border-t border-dashed pt-5">
                  <div className="flex justify-between text-2xl font-black text-gray-950">
                    <span>Total</span>
                    <span>₹{order.totalAmount}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => window.open(`/invoice/${order._id}`, "_blank")}
                className="mt-7 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gray-950 px-6 py-4 text-sm font-black text-white transition hover:bg-pink-600"
              >
                <Download size={18} />
                Download Invoice
              </button>
              {["PLACED", "PROCESSING"].includes(order.orderStatus) && (
  <button
    onClick={handleCancelOrder}
    className="mt-4 flex w-full items-center justify-center rounded-full bg-red-50 px-6 py-4 text-sm font-black text-red-600 transition hover:bg-red-100"
  >
    Cancel Order
  </button>
)}
            </div>

            {/* Status */}
            {/* <div className="rounded-[2rem] border border-white bg-white/95 p-6 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
                  <Truck size={22} />
                </div>
                <h2 className="text-xl font-black text-gray-950">
                  Order Tracking
                </h2>
              </div>

              <div className="mt-6 space-y-4">
                {["PLACED", "PROCESSING", "SHIPPED", "DELIVERED"].map(
                  (step, index) => (
                    <div key={step} className="flex items-center gap-4">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-black ${
                          order.orderStatus === step ||
                          order.orderStatus === "DELIVERED"
                            ? "bg-pink-600 text-white"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {index + 1}
                      </div>

                      <p className="font-black text-gray-800">{step}</p>
                    </div>
                  )
                )}
              </div>
            </div> */}

            <div className="mt-6">
  <h3 className="mb-5 font-black text-gray-950">Order Timeline</h3>

  {["PLACED", "PROCESSING", "SHIPPED", "DELIVERED"].map((status, index, arr) => {
    const currentIndex = arr.indexOf(order.orderStatus);
    const isActive = index <= currentIndex;
    const isLast = index === arr.length - 1;

    return (
      <div key={status} className="relative flex gap-4">
        {!isLast && (
          <div
            className={`absolute left-[7px] top-6 h-full w-[2px] ${
              isActive ? "bg-pink-600" : "bg-gray-200"
            }`}
          />
        )}

        <div
          className={`relative z-10 mt-1 h-4 w-4 rounded-full ring-4 ${
            isActive
              ? "bg-pink-600 ring-pink-100"
              : "bg-gray-300 ring-gray-100"
          }`}
        />

        <div className="pb-6">
          <p
            className={`text-sm font-black ${
              isActive ? "text-gray-950" : "text-gray-400"
            }`}
          >
            {status}
          </p>

          <p className="mt-1 text-xs font-semibold text-gray-400">
            {isActive ? "Completed" : "Pending"}
          </p>
        </div>
      </div>
    );
  })}
</div>

            <Link
              to="/my-orders"
              className="block rounded-full bg-white px-6 py-4 text-center font-black text-gray-950 shadow-xl ring-1 ring-pink-100 transition hover:bg-pink-50"
            >
              Back to My Orders
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;