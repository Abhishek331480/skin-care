import { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";
import { Download, Package, ReceiptText } from "lucide-react";
import { useNavigate } from "react-router-dom";
const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const res = await api.get("/orders/my-orders");
        setOrders(res.data.orders || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?",
    );

    if (!confirmCancel) return;

    try {
      const res = await api.put(`/orders/${orderId}/cancel`);

      toast.success(res.data.message);

      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? res.data.order : order)),
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel order");
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center font-semibold text-gray-700">
        Loading orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <section className="py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-950">No orders found</h1>
        <p className="mt-3 text-gray-500">
          You haven&apos;t placed any order yet.
        </p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-r from-pink-50 via-white to-pink-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-pink-600">
            My Purchases
          </p>
          <h1 className="mt-2 text-4xl font-black text-gray-950">My Orders</h1>
          <p className="mt-3 text-gray-500">
            Your recent skincare purchases and invoice details.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {orders.map((order) => (
            <div
              key={order._id}
              className="group overflow-hidden rounded-[2rem] border border-pink-100 bg-white shadow-xl shadow-pink-100/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="bg-gradient-to-r from-pink-500 to-rose-400 p-5 text-white">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/80">
                      Order ID
                    </p>
                    <h2 className="mt-2 break-all text-sm font-bold">
                      #{order._id}
                    </h2>
                  </div>

                  <div className="rounded-2xl bg-white/20 p-3 backdrop-blur">
                    <Package size={22} />
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-pink-600">
                    {order.orderStatus}
                  </span>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                    {order.paymentStatus}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between gap-3 rounded-2xl bg-pink-50/60 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-14 w-14 rounded-xl object-cover bg-white"
                        />

                        <div>
                          <h3 className="line-clamp-1 text-sm font-bold text-gray-950">
                            {item.name}
                          </h3>
                          {item.variant?.size && (
                            <p className="text-sm font-semibold text-pink-600">
                              Size: {item.variant.size}
                            </p>
                          )}
                          <p className="text-xs font-medium text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm font-black text-gray-950">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-pink-100 bg-white p-4">
                  {order.discountAmount > 0 && (
                    <div className="mb-2 flex justify-between text-sm font-semibold text-green-600">
                      <span>Discount</span>
                      <span>- ₹{order.discountAmount}</span>
                    </div>
                  )}

                  {order.couponCode && (
                    <p className="mb-3 text-xs font-bold text-green-600">
                      Coupon Used: {order.couponCode}
                    </p>
                  )}

                  <div className="flex items-center justify-between border-t border-pink-100 pt-3">
                    <span className="flex items-center gap-2 font-bold text-gray-950">
                      <ReceiptText size={18} />
                      Total
                    </span>

                    <span className="text-2xl font-black text-gray-950">
                      ₹{order.totalAmount}
                    </span>
                  </div>
                </div>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <button
                    onClick={() => navigate(`/order/${order._id}`)}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gray-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-pink-600 sm:w-auto"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() =>
                      window.open(`/invoice/${order._id}`, "_blank")
                    }
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gray-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-pink-600 sm:w-auto"
                  >
                    <Download size={17} />
                    Download Invoice
                  </button>

                  {["PLACED", "PROCESSING"].includes(order.orderStatus) && (
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      className="flex w-full cursor-pointer items-center justify-center rounded-full bg-red-50 px-5 py-3 text-sm font-black text-red-600 transition hover:bg-red-100 sm:w-auto"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyOrders;
