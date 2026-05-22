import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const OrderSuccess = () => {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 mt-8">
      <div className="max-w-lg w-full bg-white border border-pink-100 rounded-[2rem] shadow-xl p-10 text-center">
        <div className="h-20 w-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={44} className="text-green-600" />
        </div>

        <p className="text-sm font-semibold text-pink-600">
          Order Confirmed
        </p>

        <h1 className="text-4xl font-bold text-gray-950 mt-3">
          Thank you for your order!
        </h1>

        <p className="text-gray-600 mt-4 leading-7">
          Your skincare products will be packed with care and delivered soon.
        </p>

        <div className="mt-6 bg-pink-50 rounded-2xl p-4">
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-bold text-gray-950">ORD-SKIN-1001</p>
        </div>

        <Link
          to="/shop"
          className="mt-8 inline-flex w-full justify-center rounded-full bg-black px-6 py-4 text-white font-semibold hover:bg-gray-900 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </section>
  );
};

export default OrderSuccess;