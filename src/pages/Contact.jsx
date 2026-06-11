import { Mail, Phone, MapPin, Clock, Send, Sparkles } from "lucide-react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const Contact = () => {
  const contactCards = [
    {
      icon: <Mail size={22} />,
      title: "Email Support",
      value: "support@skincare.com",
      desc: "For product, order, and account queries",
    },
    {
      icon: <Phone size={22} />,
      title: "Call Us",
      value: "+91 9754812926",
      desc: "Speak with our skincare support team",
    },
    {
      icon: <MapPin size={22} />,
      title: "Visit Location",
      value: "Indore, Madhya Pradesh, India",
      desc: "Our support office location",
    },
    {
      icon: <Clock size={22} />,
      title: "Working Hours",
      value: "Mon - Sat, 10:00 AM - 7:00 PM",
      desc: "We usually respond within 24 hours",
    },
  ];

  const inputClass =
    "w-full rounded-2xl border border-pink-100 bg-pink-50/40 px-4 py-3.5 text-sm sm:px-6 sm:py-4 sm:text-base font-semibold text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100";

  return (
    <section className="min-h-screen overflow-hidden bg-gradient-to-b from-pink-50 via-white to-rose-50 py-10 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Hero */}
        <div className="relative overflow-hidden rounded-[1.8rem] sm:rounded-[2.5rem] border border-pink-100 bg-white p-5 sm:p-8 lg:p-14 shadow-2xl shadow-pink-100/70">
          <div className="absolute -right-24 -top-24 h-60 w-60 rounded-full bg-pink-200/50 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-60 w-60 rounded-full bg-rose-200/50 blur-3xl" />

          <div className="relative grid gap-7 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-2 text-xs sm:text-sm font-black text-pink-700">
                <Sparkles size={15} />
                Contact SkinCare
              </span>

              <h1 className="mt-5 text-3xl font-black leading-tight text-gray-950 sm:text-4xl md:text-5xl lg:text-6xl">
                Let’s Help You Build Your Perfect Skin Routine
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600 sm:text-base md:text-lg md:leading-8">
                Have questions about skincare products, your order, delivery,
                coupons, or your routine? Our support team is here to guide you
                with care and clarity.
              </p>
            </div>

            <div className="rounded-[1.7rem] sm:rounded-[2rem] bg-gradient-to-br from-pink-600 to-rose-500 p-5 sm:p-8 text-white shadow-2xl shadow-pink-200">
              <Mail size={44} />

              <h3 className="mt-5 text-2xl sm:text-3xl font-black">
                We’re Here For You
              </h3>

              <p className="mt-3 text-sm sm:text-base leading-7 sm:leading-8 text-pink-50">
                Send us your query and our team will help you with product
                selection, order support, shipping updates, or account-related
                concerns.
              </p>

              <div className="mt-6 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
                  <p className="text-2xl sm:text-3xl font-black">24h</p>
                  <p className="mt-1 text-xs sm:text-sm text-pink-50">
                    Avg Response
                  </p>
                </div>

                <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
                  <p className="text-2xl sm:text-3xl font-black">100%</p>
                  <p className="mt-1 text-xs sm:text-sm text-pink-50">
                    Support Care
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="mt-10 sm:mt-14 lg:mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map((card) => (
            <div
              key={card.title}
              className="group rounded-[1.7rem] sm:rounded-[2rem] border border-pink-100 bg-white p-5 sm:p-6 shadow-lg shadow-pink-100/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-pink-100"
            >
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-200 transition group-hover:scale-110">
                {card.icon}
              </div>

              <h3 className="mt-4 text-lg sm:text-xl font-black text-gray-950">
                {card.title}
              </h3>

              <p className="mt-2 break-words text-sm sm:text-base font-bold text-pink-600">
                {card.value}
              </p>

              <p className="mt-2 text-sm sm:text-base leading-7 text-gray-600">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Main Section */}
        <div className="mt-10 sm:mt-14 lg:mt-16 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          
          {/* Form */}
          <div className="relative overflow-hidden rounded-[1.8rem] sm:rounded-[2.5rem] border border-pink-100 bg-white p-5 sm:p-8 lg:p-10 shadow-2xl shadow-pink-100/60">
            <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-pink-200/50 blur-3xl" />

            <div className="relative">
              <span className="inline-flex rounded-full bg-pink-100 px-4 py-2 text-xs sm:text-sm font-black text-pink-700">
                Send Message
              </span>

              <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-black text-gray-950">
                Tell Us What You Need
              </h2>

              <p className="mt-3 text-sm sm:text-base leading-7 sm:leading-8 text-gray-600">
                Fill out the form below and we’ll get back to you as soon as
                possible.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <input type="text" placeholder="Your Name" className={inputClass} />

                <input type="email" placeholder="Email Address" className={inputClass} />

                <input
                  type="text"
                  placeholder="Subject"
                  className={`sm:col-span-2 ${inputClass}`}
                />

                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="sm:col-span-2 w-full resize-none rounded-[1.5rem] sm:rounded-[2rem] border border-pink-100 bg-pink-50/40 px-4 py-4 sm:px-6 sm:py-5 text-sm sm:text-base font-semibold text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100"
                />

                <button className="sm:col-span-2 flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 py-3.5 sm:py-4 text-base sm:text-lg font-black text-white shadow-xl shadow-pink-200 transition hover:-translate-y-0.5 hover:shadow-2xl">
                  Send Message
                  <Send size={19} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-6 sm:space-y-8">
            <div className="rounded-[1.8rem] sm:rounded-[2.5rem] border border-pink-100 bg-white p-5 sm:p-8 shadow-2xl shadow-pink-100/50">
              <h3 className="text-2xl sm:text-3xl font-black text-gray-950">
                Follow Our Glow
              </h3>

              <p className="mt-3 text-sm sm:text-base leading-7 sm:leading-8 text-gray-600">
                Join our skincare community for product tips, routine ideas,
                offers, and beauty updates.
              </p>

              <div className="mt-5 flex flex-wrap gap-3 sm:gap-4">
                {[FaInstagram, FaFacebookF, FaTwitter].map((Icon, index) => (
                  <button
                    key={index}
                    className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-pink-50 text-pink-600 transition hover:-translate-y-1 hover:bg-pink-600 hover:text-white hover:shadow-lg hover:shadow-pink-200"
                  >
                    <Icon size={19} />
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.8rem] sm:rounded-[2.5rem] border border-pink-100 bg-white p-2 shadow-2xl shadow-pink-100/50">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.956056220158!2d75.86364667476273!3d22.767012025817913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39630330cd69a4fd%3A0xa7b7773a212a220e!2sADITYA%20GATEWAY!5e0!3m2!1sen!2sin!4v1779348036301!5m2!1sen!2sin"
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[280px] rounded-[1.5rem] sm:h-[340px] lg:h-[390px] sm:rounded-[2rem]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;