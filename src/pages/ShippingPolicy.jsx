import {
  PackageCheck,
  Truck,
  MapPin,
  Clock,
  BadgeIndianRupee,
  Bell,
  AlertCircle,
  RefreshCcw,
  Headphones,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const shippingSections = [
  {
    icon: PackageCheck,
    title: "Order Processing",
    text: "Orders are usually processed within 1–2 business days after successful payment confirmation. Orders placed on weekends or public holidays will be processed on the next working day.",
  },
  {
    icon: Truck,
    title: "Delivery Timeline",
    text: "Most orders are delivered within 3–7 business days depending on your location, courier availability, and serviceable area coverage.",
  },
  {
    icon: MapPin,
    title: "Shipping Locations",
    text: "We currently ship to most serviceable locations across India. Delivery availability may vary based on courier partner coverage.",
  },
  {
    icon: BadgeIndianRupee,
    title: "Shipping Charges",
    text: "Shipping charges, if applicable, will be clearly shown during checkout before payment. Free shipping offers may be available on selected orders.",
  },
  {
    icon: Bell,
    title: "Order Tracking",
    text: "Once your order is shipped, tracking updates will be available on the My Orders page. You may also receive updates through email or website notifications.",
  },
  {
    icon: AlertCircle,
    title: "Delivery Delays",
    text: "Delays may occur due to weather, holidays, high order volume, courier issues, or circumstances beyond our control.",
  },
  {
    icon: RefreshCcw,
    title: "Failed Delivery",
    text: "If delivery fails due to incorrect address, unavailable customer, or unreachable phone number, re-dispatch may require additional shipping charges.",
  },
  {
    icon: Headphones,
    title: "Shipping Support",
    text: "For delivery issues, damaged packages, or tracking help, please contact our support team through the Contact Us page.",
  },
];

const ShippingPolicy = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-rose-50 py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        
        {/* Hero */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-pink-100 bg-white p-8 shadow-2xl shadow-pink-100/70 md:p-14">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-pink-200/40 blur-3xl" />
          <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-rose-200/40 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full bg-pink-100 px-5 py-2 text-sm font-bold text-pink-700">
                Shipping Policy
              </span>

              <h1 className="mt-6 text-4xl font-black leading-tight text-gray-950 md:text-6xl">
                Fast, Safe & Reliable Delivery
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
                At SkinCare, we make sure your skincare essentials are packed
                carefully and delivered safely to your doorstep. This policy
                explains our shipping process, delivery timelines, tracking,
                charges, and support details.
              </p>
            </div>

            <div className="rounded-[2rem] bg-gradient-to-br from-pink-600 to-rose-500 p-8 text-white shadow-2xl shadow-pink-200">
              <Truck size={52} />

              <h3 className="mt-6 text-3xl font-black">
                Delivery Promise
              </h3>

              <p className="mt-4 leading-8 text-pink-50">
                Carefully packed skincare products, timely dispatch, and easy
                tracking from your account dashboard.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
                  <p className="text-3xl font-black">1–2</p>
                  <p className="mt-1 text-sm text-pink-50">Processing Days</p>
                </div>

                <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
                  <p className="text-3xl font-black">3–7</p>
                  <p className="mt-1 text-sm text-pink-50">Delivery Days</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-[2rem] border border-pink-100 bg-white p-7 shadow-lg shadow-pink-100/50">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
              <PackageCheck size={26} />
            </div>
            <h3 className="mt-5 text-xl font-black text-gray-950">
              Order Confirmed
            </h3>
            <p className="mt-3 leading-7 text-gray-600">
              After successful payment, your order is verified and prepared
              for packing.
            </p>
          </div>

          <div className="rounded-[2rem] border border-pink-100 bg-white p-7 shadow-lg shadow-pink-100/50">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
              <Clock size={26} />
            </div>
            <h3 className="mt-5 text-xl font-black text-gray-950">
              Packed & Shipped
            </h3>
            <p className="mt-3 leading-7 text-gray-600">
              Products are securely packed and handed over to our courier
              partner.
            </p>
          </div>

          <div className="rounded-[2rem] border border-pink-100 bg-white p-7 shadow-lg shadow-pink-100/50">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
              <Truck size={26} />
            </div>
            <h3 className="mt-5 text-xl font-black text-gray-950">
              Delivered Safely
            </h3>
            <p className="mt-3 leading-7 text-gray-600">
              Your skincare essentials are delivered safely to your selected
              address.
            </p>
          </div>
        </div>

        {/* Policy Cards */}
        <div className="mt-16">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-black text-gray-950 md:text-4xl">
              Shipping Information
            </h2>
            <p className="mt-3 text-gray-600">
              Everything you need to know before and after placing an order.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {shippingSections.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="group rounded-[2rem] border border-pink-100 bg-white p-7 shadow-lg shadow-pink-100/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-pink-100"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-200">
                      <Icon size={25} />
                    </div>

                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-pink-500">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-xl font-black text-gray-950">
                          {item.title}
                        </h3>
                      </div>

                      <p className="mt-3 leading-8 text-gray-600">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Note */}
        <div className="mt-16 rounded-[2rem] border border-pink-100 bg-white p-8 shadow-xl shadow-pink-100/60">
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
              <AlertCircle size={30} />
            </div>

            <div>
              <h3 className="text-2xl font-black text-gray-950">
                Important Delivery Note
              </h3>

              <p className="mt-2 leading-8 text-gray-600">
                Please ensure that your shipping address, phone number, and
                delivery details are correct before placing the order. Incorrect
                information may cause delivery delays or failed delivery attempts.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-pink-600 to-rose-500 p-10 text-center text-white shadow-2xl shadow-pink-200">
          <h2 className="text-3xl font-black md:text-4xl">
            Need Help With Your Delivery?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-pink-50">
            Our support team is here to help you with order tracking, delivery
            delays, damaged packages, or shipping-related questions.
          </p>

          <NavLink
            to="/contact"
            className="mt-7 inline-flex rounded-full bg-white px-8 py-4 font-black text-pink-600 shadow-lg transition hover:scale-105"
          >
            Contact Support
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default ShippingPolicy;