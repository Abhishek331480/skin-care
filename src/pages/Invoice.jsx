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

  if (loading) return <p className="py-20 text-center">Loading invoice...</p>;

  if (!order) return <p className="py-20 text-center">Invoice not found</p>;

  const subTotal = order.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <section className="py-10 bg-gray-100 min-h-screen">
      <div className="print-area max-w-4xl mx-auto bg-white rounded-[2rem] p-8 shadow-2xl ">
        <div className="flex justify-between border-b pb-6">
          <div>
            <h1 className="text-4xl font-black text-gray-950">SkinCare</h1>
            <p className="text-gray-500 mt-2">Premium Skincare Store</p>
          </div>

          <div className="text-right">
            <h2 className="text-3xl font-bold text-pink-600">INVOICE</h2>
            <p className="text-sm text-gray-500 mt-2">#{order._id}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mt-8">
          <div>
            <h3 className="font-bold text-gray-950 mb-2">Bill To</h3>
            <p>{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.phone}</p>
            <p>{order.shippingAddress.address}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state}
            </p>
            <p>{order.shippingAddress.pincode}</p>
          </div>

          <div className="sm:text-right">
            <h3 className="font-bold text-gray-950 mb-2">Order Details</h3>
            <p>Status: {order.orderStatus}</p>
            <p>Payment: {order.paymentStatus}</p>
            <p>Date: {new Date(order.createdAt).toLocaleDateString("en-IN")}</p>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border">
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

        <div className="mt-8 flex justify-end">
          <div className="w-full max-w-sm space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subTotal}</span>
            </div>

            {order.discountAmount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount ({order.couponCode})</span>
                <span>- ₹{order.discountAmount}</span>
              </div>
            )}

            <div className="border-t pt-3 flex justify-between text-2xl font-black">
              <span>Total</span>
              <span>₹{order.totalAmount}</span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-between items-center border-t pt-6">
          <p className="text-sm text-gray-500">
            Thank you for shopping with SkinCare.
          </p>

          <button
            onClick={() => window.print()}
            className="no-print rounded-full bg-black px-6 py-3 font-semibold text-white"
          >
            Print / Save PDF
          </button>
        </div>
      </div>
    </section>
  );
};

export default Invoice;
