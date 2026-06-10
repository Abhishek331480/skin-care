import {
  FileText,
  UserCheck,
  ShoppingBag,
  CreditCard,
  Truck,
  RotateCcw,
  ShieldCheck,
  Copyright,
  AlertTriangle,
  RefreshCw,
  Headphones,
  Scale,
} from "lucide-react";
import { NavLink } from "react-router-dom";
const TermsConditions = () => {

  const termsSections = [
  {
    icon: UserCheck,
    title: "Acceptance of Terms",
    text: "By accessing or using SkinCare, you agree to comply with these Terms & Conditions and all applicable laws and regulations.",
  },
  {
    icon: UserCheck,
    title: "User Accounts",
    text: "You are responsible for maintaining the confidentiality of your account credentials and all activities that occur under your account.",
  },
  {
    icon: ShoppingBag,
    title: "Product Information",
    text: "We strive to provide accurate descriptions, pricing, and images. Minor variations in packaging or appearance may occur.",
  },
  {
    icon: CreditCard,
    title: "Pricing & Payments",
    text: "All prices are subject to change without prior notice. Payment must be completed successfully before order processing begins.",
  },
  {
    icon: Truck,
    title: "Orders & Delivery",
    text: "Orders are processed and delivered according to our Shipping Policy. Delivery estimates are approximate and not guaranteed.",
  },
  {
    icon: RotateCcw,
    title: "Returns & Refunds",
    text: "Return and refund requests are governed by our Refund Policy and subject to eligibility requirements.",
  },
  {
    icon: ShieldCheck,
    title: "Product Usage Disclaimer",
    text: "Results may vary depending on individual skin type. Products are intended for cosmetic purposes only and are not medical treatments.",
  },
  {
    icon: Copyright,
    title: "Intellectual Property",
    text: "All content including logos, product images, text, graphics, and designs are owned by SkinCare and protected by law.",
  },
  {
    icon: AlertTriangle,
    title: "Limitation of Liability",
    text: "SkinCare shall not be liable for indirect, incidental, special, or consequential damages arising from website or product usage.",
  },
  {
    icon: RefreshCw,
    title: "Changes to Terms",
    text: "We reserve the right to update these Terms & Conditions at any time. Continued use constitutes acceptance of updates.",
  },
];

  return (
   <div className="relative overflow-hidden rounded-[2.5rem] border border-pink-100 bg-white p-8 shadow-2xl shadow-pink-100/70 md:p-14">

  <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-pink-200/40 blur-3xl" />
  <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-rose-200/40 blur-3xl" />

  <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">

    <div>
      <span className="inline-flex rounded-full bg-pink-100 px-5 py-2 text-sm font-bold text-pink-700">
        Terms & Conditions
      </span>

      <h1 className="mt-6 text-4xl font-black leading-tight text-gray-950 md:text-6xl">
        Terms Governing The Use Of SkinCare
      </h1>

      <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
        These Terms & Conditions outline your rights, responsibilities,
        and obligations when using our website, products, and services.
      </p>
    </div>

    <div className="rounded-[2rem] bg-gradient-to-br from-pink-600 to-rose-500 p-8 text-white shadow-2xl shadow-pink-200">
      <Scale size={56} />

      <h3 className="mt-6 text-3xl font-black">
        Fair & Transparent
      </h3>

      <p className="mt-4 leading-8 text-pink-50">
        Our goal is to provide a secure, transparent, and trustworthy
        shopping experience for every customer.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white/15 p-4">
          <p className="text-3xl font-black">100%</p>
          <p className="mt-1 text-sm">Transparent Policies</p>
        </div>

        <div className="rounded-2xl bg-white/15 p-4">
          <p className="text-3xl font-black">24/7</p>
          <p className="mt-1 text-sm">Customer Support</p>
        </div>
      </div>
    </div>

  </div>
  {/* term section */}
  <div className="mt-16 grid gap-6 md:grid-cols-2">
  {termsSections.map((item, index) => {
    const Icon = item.icon;

    return (
      <div
        key={index}
        className="
          rounded-[2rem]
          border border-pink-100
          bg-white
          p-7
          shadow-lg shadow-pink-100/40
          transition-all duration-300
          hover:-translate-y-1
          hover:shadow-2xl hover:shadow-pink-100
        "
      >
        <div className="flex items-start gap-5">

          <div
            className="
              flex h-14 w-14 shrink-0
              items-center justify-center
              rounded-2xl
              bg-gradient-to-br
              from-pink-500
              to-rose-500
              text-white
            "
          >
            <Icon size={24} />
          </div>

          <div>
            <div className="flex items-center gap-3">
              <span className="font-black text-pink-500">
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
{/* import notice section */}
<div className="mt-16 rounded-[2rem] border border-pink-100 bg-white p-8 shadow-xl shadow-pink-100/60">
  <div className="flex flex-col gap-5 md:flex-row md:items-center">

    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
      <AlertTriangle size={30} />
    </div>

    <div>
      <h3 className="text-2xl font-black text-gray-950">
        Important Legal Notice
      </h3>

      <p className="mt-2 leading-8 text-gray-600">
        By creating an account, placing an order, or using our website,
        you acknowledge and agree to these Terms & Conditions.
      </p>
    </div>

  </div>
</div>

{/* premium CTA Footer */}
<div className="mt-16 overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-pink-600 to-rose-500 p-10 text-center text-white shadow-2xl shadow-pink-200">

  <Headphones size={42} className="mx-auto" />

  <h2 className="mt-5 text-3xl font-black md:text-4xl">
    Need Clarification?
  </h2>

  <p className="mx-auto mt-4 max-w-2xl leading-8 text-pink-50">
    If you have questions regarding our Terms & Conditions,
    our support team will be happy to assist you.
  </p>

  <NavLink
    to="/contact"
    className="
      mt-7 inline-flex
      rounded-full
      bg-white
      px-8 py-4
      font-black
      text-pink-600
      shadow-lg
      transition
      hover:scale-105
    "
  >
    Contact Support
  </NavLink>

</div>
</div>



  );
};

export default TermsConditions;