import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";

const Invoice = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/my-orders`);
        const foundOrder = res.data.orders.find((item) => item._id === id);
        setOrder(foundOrder);
      } catch (error) {
        toast.error("Failed to fetch invoice");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading)
    return (
      <p className="py-20 text-center text-sm sm:text-base">
        Loading invoice...
      </p>
    );

  if (!order)
    return (
      <p className="py-20 text-center text-sm sm:text-base">
        Invoice not found
      </p>
    );

  const subTotal = order.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <section className="min-h-screen bg-gray-100 px-3 py-4 sm:px-6 sm:py-8 lg:py-10">
      <div className="print-area mx-auto w-full max-w-4xl rounded-2xl bg-white p-4 shadow-xl sm:rounded-[2rem] sm:p-8">
        
        {/* Header */}
        <div className="flex flex-col gap-5 border-b pb-5 sm:flex-row sm:items-start sm:justify-between sm:pb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-950 sm:text-4xl">
              SkinCare
            </h1>
            <p className="mt-1 text-sm text-gray-500 sm:mt-2">
              Premium Skincare Store
            </p>
          </div>

          <div className="sm:text-right">
            <h2 className="text-2xl font-bold text-pink-600 sm:text-3xl">
              INVOICE
            </h2>
            <p className="mt-2 break-all text-xs text-gray-500 sm:text-sm">
              #{order._id}
            </p>
          </div>
        </div>

        {/* Billing + Order Details */}
        <div className="mt-6 grid gap-6 sm:mt-8 sm:grid-cols-2">
          <div className="rounded-2xl bg-gray-50 p-4 sm:bg-transparent sm:p-0">
            <h3 className="mb-2 font-bold text-gray-950">Bill To</h3>
            <div className="space-y-1 text-sm text-gray-700 sm:text-base">
              <p className="font-semibold">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.phone}</p>
              <p>{order.shippingAddress.address}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}
              </p>
              <p>{order.shippingAddress.pincode}</p>
            </div>
          </div>

          <div className="rounded-2xl bg-pink-50 p-4 sm:bg-transparent sm:p-0 sm:text-right">
            <h3 className="mb-2 font-bold text-gray-950">Order Details</h3>
            <div className="space-y-1 text-sm text-gray-700 sm:text-base">
              <p>Status: {order.orderStatus}</p>
              <p>Payment: {order.paymentStatus}</p>
              <p>
                Date: {new Date(order.createdAt).toLocaleDateString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="mt-8 hidden overflow-hidden rounded-2xl border sm:block">
          <table className="w-full text-left">
            <thead className="bg-pink-50">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Qty</th>
                <th className="p-4">Price</th>
                <th className="p-4 text-right">Total</th>
              </tr>
            </thead>

            <tbody>
              {order.items.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="p-4">
                    <p className="font-semibold">{item.name}</p>

                    {item.variant?.size && (
                      <p className="mt-1 text-sm font-semibold text-pink-600">
                        Size: {item.variant.size}
                      </p>
                    )}
                  </td>

                  <td className="p-4">{item.quantity}</td>
                  <td className="p-4">₹{item.price}</td>
                  <td className="p-4 text-right">
                    ₹{item.price * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Product Cards */}
        <div className="mt-8 space-y-4 sm:hidden">
          {order.items.map((item) => (
            <div
              key={item._id}
              className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-bold text-gray-950">{item.name}</p>

                  {item.variant?.size && (
                    <p className="mt-1 text-sm font-semibold text-pink-600">
                      Size: {item.variant.size}
                    </p>
                  )}
                </div>

                <p className="shrink-0 font-black text-gray-950">
                  ₹{item.price * item.quantity}
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-gray-50 p-3">
                  <p className="text-gray-500">Qty</p>
                  <p className="font-bold text-gray-950">{item.quantity}</p>
                </div>

                <div className="rounded-xl bg-gray-50 p-3">
                  <p className="text-gray-500">Price</p>
                  <p className="font-bold text-gray-950">₹{item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total Box */}
        <div className="mt-8 flex justify-end">
          <div className="w-full rounded-2xl bg-gray-50 p-4 sm:max-w-sm sm:bg-transparent sm:p-0">
            <div className="space-y-3 text-sm sm:text-base">
              <div className="flex justify-between gap-4">
                <span>Subtotal</span>
                <span className="font-semibold">₹{subTotal}</span>
              </div>

              {order.discountAmount > 0 && (
                <div className="flex justify-between gap-4 text-green-600">
                  <span>Discount ({order.couponCode})</span>
                  <span className="font-semibold">- ₹{order.discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between gap-4 border-t pt-3 text-xl font-black sm:text-2xl">
                <span>Total</span>
                <span>₹{order.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col gap-4 border-t pt-5 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
          <p className="text-center text-sm text-gray-500 sm:text-left">
            Thank you for shopping with SkinCare.
          </p>

          <button
            onClick={() => window.print()}
            className="no-print w-full rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 sm:w-auto sm:text-base"
          >
            Print / Save PDF
          </button>
        </div>
      </div>
    </section>
  );
};

export default Invoice;