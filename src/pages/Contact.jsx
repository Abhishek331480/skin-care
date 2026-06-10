import { Mail, Phone, MapPin, Clock, Send, Sparkles } from "lucide-react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const Contact = () => {
  const contactCards = [
    {
      icon: <Mail size={24} />,
      title: "Email Support",
      value: "support@skincare.com",
      desc: "For product, order, and account queries",
    },
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      value: "+91 9754812926",
      desc: "Speak with our skincare support team",
    },
    {
      icon: <MapPin size={24} />,
      title: "Visit Location",
      value: "Indore, Madhya Pradesh, India",
      desc: "Our support office location",
    },
    {
      icon: <Clock size={24} />,
      title: "Working Hours",
      value: "Mon - Sat, 10:00 AM - 7:00 PM",
      desc: "We usually respond within 24 hours",
    },
  ];

  return (
    <section className="min-h-screen overflow-hidden bg-gradient-to-b from-pink-50 via-white to-rose-50 py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-pink-100 bg-white p-8 shadow-2xl shadow-pink-100/70 md:p-14">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-pink-200/50 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-rose-200/50 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-5 py-2 text-sm font-black text-pink-700">
                <Sparkles size={16} />
                Contact SkinCare
              </span>

              <h1 className="mt-6 text-4xl font-black leading-tight text-gray-950 md:text-6xl">
                Let’s Help You Build Your Perfect Skin Routine
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
                Have questions about skincare products, your order, delivery,
                coupons, or your routine? Our support team is here to guide you
                with care and clarity.
              </p>
            </div>

            <div className="rounded-[2rem] bg-gradient-to-br from-pink-600 to-rose-500 p-8 text-white shadow-2xl shadow-pink-200">
              <Mail size={54} />

              <h3 className="mt-6 text-3xl font-black">
                We’re Here For You
              </h3>

              <p className="mt-4 leading-8 text-pink-50">
                Send us your query and our team will help you with product
                selection, order support, shipping updates, or account-related
                concerns.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
                  <p className="text-3xl font-black">24h</p>
                  <p className="mt-1 text-sm text-pink-50">Avg Response</p>
                </div>

                <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
                  <p className="text-3xl font-black">100%</p>
                  <p className="mt-1 text-sm text-pink-50">Support Care</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map((card) => (
            <div
              key={card.title}
              className="group rounded-[2rem] border border-pink-100 bg-white p-6 shadow-lg shadow-pink-100/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-pink-100"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-200 transition group-hover:scale-110">
                {card.icon}
              </div>

              <h3 className="mt-5 text-xl font-black text-gray-950">
                {card.title}
              </h3>

              <p className="mt-2 font-bold text-pink-600">{card.value}</p>

              <p className="mt-3 leading-7 text-gray-600">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Main Section */}
        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          {/* Form */}
          <div className="relative overflow-hidden rounded-[2.5rem] border border-pink-100 bg-white p-8 shadow-2xl shadow-pink-100/60 md:p-10">
            <div className="absolute -right-24 -top-24 h-60 w-60 rounded-full bg-pink-200/50 blur-3xl" />

            <div className="relative">
              <span className="inline-flex rounded-full bg-pink-100 px-5 py-2 text-sm font-black text-pink-700">
                Send Message
              </span>

              <h2 className="mt-5 text-3xl font-black text-gray-950 md:text-4xl">
                Tell Us What You Need
              </h2>

              <p className="mt-3 leading-8 text-gray-600">
                Fill out the form below and we’ll get back to you as soon as
                possible.
              </p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="rounded-2xl border border-pink-100 bg-pink-50/40 px-6 py-4 font-semibold text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="rounded-2xl border border-pink-100 bg-pink-50/40 px-6 py-4 font-semibold text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100"
                />

                <input
                  type="text"
                  placeholder="Subject"
                  className="sm:col-span-2 rounded-2xl border border-pink-100 bg-pink-50/40 px-6 py-4 font-semibold text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100"
                />

                <textarea
                  rows="6"
                  placeholder="Write your message..."
                  className="sm:col-span-2 resize-none rounded-[2rem] border border-pink-100 bg-pink-50/40 px-6 py-5 font-semibold text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100"
                />

                <button className="sm:col-span-2 flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 py-4 text-lg font-black text-white shadow-xl shadow-pink-200 transition hover:-translate-y-0.5 hover:shadow-2xl">
                  Send Message
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-8">
            <div className="rounded-[2.5rem] border border-pink-100 bg-white p-8 shadow-2xl shadow-pink-100/50">
              <h3 className="text-3xl font-black text-gray-950">
                Follow Our Glow
              </h3>

              <p className="mt-3 leading-8 text-gray-600">
                Join our skincare community for product tips, routine ideas,
                offers, and beauty updates.
              </p>

              <div className="mt-6 flex gap-4">
                {[FaInstagram, FaFacebookF, FaTwitter].map((Icon, index) => (
                  <button
                    key={index}
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-50 text-pink-600 transition hover:-translate-y-1 hover:bg-pink-600 hover:text-white hover:shadow-lg hover:shadow-pink-200"
                  >
                    <Icon size={20} />
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[2.5rem] border border-pink-100 bg-white p-2 shadow-2xl shadow-pink-100/50">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.956056220158!2d75.86364667476273!3d22.767012025817913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39630330cd69a4fd%3A0xa7b7773a212a220e!2sADITYA%20GATEWAY!5e0!3m2!1sen!2sin!4v1779348036301!5m2!1sen!2sin"
                width="100%"
                height="390"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-[2rem]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;