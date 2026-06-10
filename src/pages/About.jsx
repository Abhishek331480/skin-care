import {
  Sparkles,
  ShieldCheck,
  Leaf,
  Star,
  ShoppingBag,
  Users,
  Clock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import CustomerImage from "../assets/happyCustomer.jpg";
import { NavLink } from "react-router-dom";
import Banner from "../assets/Glowing-skin-mobile.jpg";
const About = () => {
  const stats = [
    ["10k+", "Happy Customers"],
    ["50+", "Skin Products"],
    ["4.9★", "Average Rating"],
  ];

  const features = [
    {
      icon: ShieldCheck,
      title: "Dermatology-Inspired",
      text: "Formulas designed with skin-friendly ingredients for daily care.",
    },
    {
      icon: Leaf,
      title: "Clean Ingredients",
      text: "Gentle, honest, and effective skincare without unnecessary harshness.",
    },
    {
      icon: Star,
      title: "Visible Glow",
      text: "Products crafted to support smoother, healthier-looking skin.",
    },
  ];

  return (
    <section className="min-h-screen overflow-hidden bg-gradient-to-b from-pink-50 via-white to-rose-50 py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-[2.8rem] border border-pink-100 bg-white p-8 shadow-2xl shadow-pink-100/70 md:p-14">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-pink-200/50 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-rose-200/50 blur-3xl" />

          <div className="relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-5 py-2 text-sm font-black text-pink-700">
                <Sparkles size={16} />
                About SkinCare
              </span>

              <h1 className="mt-6 text-4xl font-black leading-tight text-gray-950 md:text-6xl">
                Luxury Skincare Made For Your Everyday Glow
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
                We create clean, gentle, and result-focused skincare essentials
                for every skin type. Our mission is to make premium skincare
                simple, effective, and easy to trust.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <NavLink
                  to="/bestSeller"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 px-8 py-4 font-black text-white shadow-xl shadow-pink-200 transition hover:-translate-y-1 hover:shadow-2xl"
                >
                  Shop Best Sellers
                  <ArrowRight size={20} />
                </NavLink>

                <NavLink
                  to="/ai-skin-test"
                  className="inline-flex items-center justify-center rounded-full border border-pink-200 bg-white px-8 py-4 font-black text-pink-600 transition hover:bg-pink-50"
                >
                  Take Skin Test
                </NavLink>
              </div>

              <div className="mt-8 rounded-2xl border border-pink-100 bg-pink-50/70 p-5">
                <div className="flex gap-3">
                  <Clock className="mt-1 shrink-0 text-pink-600" size={22} />
                  <p className="leading-7 text-gray-700">
                    <span className="font-black text-gray-950">
                      Limited Glow Offer:
                    </span>{" "}
                    Start your skincare routine today and unlock exclusive
                    product deals before they expire.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.8rem] bg-gradient-to-br from-pink-300 to-rose-300 blur-2xl opacity-40" />

              <div className="relative overflow-hidden rounded-[2.8rem] border border-pink-100 bg-white p-3 shadow-2xl shadow-pink-100">
                {/* Desktop Image */}
                <img
                  src={CustomerImage}
                  alt="Happy skincare customer"
                  className="hidden md:block h-[520px] w-full rounded-[2.3rem] object-cover"
                />

                {/* Mobile Image */}
                <img
                  src={Banner}
                  alt="Skincare Banner"
                  className="block md:hidden w-full h-auto rounded-[2.3rem] object-contain"
                />

                {/* Desktop Overlay Card */}
                <div className="hidden md:block absolute bottom-1 left-7 right-7 rounded-[2rem] bg-white/90 p-5 shadow-xl backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white">
                      <Users size={24} />
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-gray-950">
                        Trusted by 10k+ Customers
                      </h3>
                      <p className="text-sm text-gray-600">
                        Daily glow, clean care, premium feel.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Trust Card */}
              <div className="block md:hidden mt-4 rounded-3xl bg-white p-5 shadow-lg shadow-pink-100">
                <h3 className="text-xl font-black text-gray-950">
                  Trusted by 10k+ Customers
                </h3>

                <p className="mt-2 text-gray-600">
                  Daily glow, clean care, premium feel.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {stats.map(([value, label]) => (
            <div
              key={label}
              className="rounded-[2rem] border border-pink-100 bg-white p-8 text-center shadow-lg shadow-pink-100/50 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-pink-100"
            >
              <h3 className="text-4xl font-black text-gray-950">{value}</h3>
              <p className="mt-2 font-semibold text-gray-600">{label}</p>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2.5rem] border border-pink-100 bg-white p-8 shadow-2xl shadow-pink-100/50 md:p-10">
            <span className="inline-flex rounded-full bg-pink-100 px-5 py-2 text-sm font-black text-pink-700">
              Our Mission
            </span>

            <h2 className="mt-5 text-3xl font-black text-gray-950 md:text-4xl">
              Skincare That Feels Premium, But Stays Simple
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              Our mission is to help every customer build a routine that is easy
              to follow, suitable for their skin type, and focused on real
              results. We believe skincare should feel luxurious without being
              confusing.
            </p>

            <div className="mt-7 space-y-4">
              {[
                "Skin-type based product guidance",
                "Gentle formulas for daily use",
                "Clean ingredients and transparent care",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="text-pink-600" size={22} />
                  <p className="font-semibold text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.5rem] bg-gradient-to-br from-pink-600 to-rose-500 p-8 text-white shadow-2xl shadow-pink-200 md:p-10">
            <ShoppingBag size={48} />

            <h2 className="mt-6 text-3xl font-black md:text-4xl">
              Why Customers Choose Us
            </h2>

            <p className="mt-5 leading-8 text-pink-50">
              We combine premium product presentation, trusted skincare
              information, honest ingredients, and easy shopping to create a
              smooth beauty experience from product discovery to delivery.
            </p>

            <NavLink
              to="/shop"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 font-black text-pink-600 shadow-lg transition hover:scale-105"
            >
              Explore Products
              <ArrowRight size={19} />
            </NavLink>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-black text-gray-950 md:text-4xl">
              Built For Real Skin Needs
            </h2>
            <p className="mt-3 text-gray-600">
              Clean care, premium feel, and daily confidence.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-[2rem] border border-pink-100 bg-white p-7 shadow-lg shadow-pink-100/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-pink-100"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-200 transition group-hover:scale-110">
                    <Icon size={25} />
                  </div>

                  <span className="mt-6 block text-sm font-black text-pink-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-2 text-xl font-black text-gray-950">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-8 text-gray-600">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Urgency CTA */}
        <div className="mt-16 overflow-hidden rounded-[2.8rem] bg-gradient-to-r from-pink-600 to-rose-500 p-10 text-center text-white shadow-2xl shadow-pink-200 md:p-14">
          <Sparkles size={46} className="mx-auto" />

          <h2 className="mt-5 text-3xl font-black md:text-5xl">
            Your Glow Routine Shouldn’t Wait
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-pink-50">
            Discover skincare essentials made for your skin type and start your
            glow journey today. Limited offers may end soon.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <NavLink
              to="/shop"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 font-black text-pink-600 shadow-lg transition hover:scale-105"
            >
              Shop Now
              <ArrowRight size={20} />
            </NavLink>

            <NavLink
              to="/ai-skin-test"
              className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/15 px-8 py-4 font-black text-white backdrop-blur transition hover:bg-white/25"
            >
              Find My Skin Type
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
