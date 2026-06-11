import {
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
    <section className="min-h-screen overflow-x-hidden bg-gradient-to-b from-pink-50 via-white to-rose-50 px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-pink-100 bg-white p-5 shadow-2xl shadow-pink-100/70 sm:p-8 md:p-14 lg:rounded-[2.5rem]">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-pink-200/40 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-rose-200/40 blur-3xl" />

          {/* Hero */}
          <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-10">
            <div>
              <span className="inline-flex rounded-full bg-pink-100 px-4 py-2 text-xs font-bold text-pink-700 sm:px-5 sm:text-sm">
                Terms & Conditions
              </span>

              <h1 className="mt-4 text-3xl font-black leading-tight text-gray-950 sm:mt-6 sm:text-4xl lg:text-6xl">
                Terms Governing The Use Of SkinCare
              </h1>

              <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
                These Terms & Conditions outline your rights, responsibilities,
                and obligations when using our website, products, and services.
              </p>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-pink-600 to-rose-500 p-5 text-white shadow-2xl shadow-pink-200 sm:p-8 lg:rounded-[2rem]">
              <Scale size={48} className="sm:h-14 sm:w-14" />

              <h3 className="mt-4 text-2xl font-black sm:mt-6 sm:text-3xl">
                Fair & Transparent
              </h3>

              <p className="mt-4 text-sm leading-7 text-pink-50 sm:text-base sm:leading-8">
                Our goal is to provide a secure, transparent, and trustworthy
                shopping experience for every customer.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/15 p-4">
                  <p className="text-2xl font-black sm:text-3xl">100%</p>
                  <p className="mt-1 text-sm">Transparent Policies</p>
                </div>

                <div className="rounded-2xl bg-white/15 p-4">
                  <p className="text-2xl font-black sm:text-3xl">24/7</p>
                  <p className="mt-1 text-sm">Customer Support</p>
                </div>
              </div>
            </div>
          </div>

          {/* Terms Section */}
          <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-16 sm:gap-6 md:grid-cols-2">
            {termsSections.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="
                    rounded-3xl border border-pink-100 bg-white
                    p-5 shadow-lg shadow-pink-100/40
                    transition-all duration-300
                    hover:shadow-2xl hover:shadow-pink-100
                    sm:p-7 sm:hover:-translate-y-1
                    lg:rounded-[2rem]
                  "
                >
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div
                      className="
                        flex h-12 w-12 shrink-0 items-center justify-center
                        rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500
                        text-white sm:h-14 sm:w-14
                      "
                    >
                      <Icon size={24} />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-start gap-2 sm:items-center sm:gap-3">
                        <span className="shrink-0 text-sm font-black text-pink-500 sm:text-base">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <h3 className="text-lg font-black leading-6 text-gray-950 sm:text-xl">
                          {item.title}
                        </h3>
                      </div>

                      <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Important Notice */}
          <div className="mt-10 rounded-3xl border border-pink-100 bg-white p-5 shadow-xl shadow-pink-100/60 sm:mt-16 sm:p-8 lg:rounded-[2rem]">
            <div className="flex flex-col gap-5 md:flex-row md:items-center">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-pink-100 text-pink-600 sm:h-16 sm:w-16">
                <AlertTriangle size={30} />
              </div>

              <div>
                <h3 className="text-xl font-black text-gray-950 sm:text-2xl">
                  Important Legal Notice
                </h3>

                <p className="mt-2 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
                  By creating an account, placing an order, or using our
                  website, you acknowledge and agree to these Terms &
                  Conditions.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 overflow-hidden rounded-3xl bg-gradient-to-r from-pink-600 to-rose-500 p-6 text-center text-white shadow-2xl shadow-pink-200 sm:mt-16 sm:p-10 lg:rounded-[2.5rem]">
            <Headphones size={42} className="mx-auto" />

            <h2 className="mt-5 text-2xl font-black sm:text-3xl md:text-4xl">
              Need Clarification?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-pink-50 sm:text-base sm:leading-8">
              If you have questions regarding our Terms & Conditions, our
              support team will be happy to assist you.
            </p>

            <NavLink
              to="/contact"
              className="
                mt-7 inline-flex w-full justify-center rounded-full
                bg-white px-8 py-4 font-black text-pink-600
                shadow-lg transition hover:scale-105 sm:w-auto
              "
            >
              Contact Support
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsConditions;