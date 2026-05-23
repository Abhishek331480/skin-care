import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const Contact = () => {
  const contactCards = [
    {
      icon: <Mail />,
      title: "Email",
      value: "support@skincare.com",
    },
    {
      icon: <Phone />,
      title: "Phone",
      value: "+91 9754812926",
    },
    {
      icon: <MapPin />,
      title: "Address",
      value: "Indore, Madhya Pradesh, India",
    },
    {
      icon: <Clock />,
      title: "Working Hours",
      value: "Mon - Sat, 10:00 AM - 7:00 PM",
    },
  ];

  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-pink-300/30 blur-3xl" />
      <div className="absolute bottom-20 right-0 h-[320px] w-[320px] rounded-full bg-rose-200/40 blur-3xl" />

      <div className="relative">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[5px] text-pink-600">
            Contact Us
          </p>

          <h1 className="mt-5 text-5xl font-extrabold leading-tight text-gray-950 sm:text-6xl">
            Let’s Build Your
            <span className="block bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
              Perfect Skin Routine
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Have questions about products, skincare routines, or your order?
            Our team is here to help you glow confidently.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-pink-100 bg-white p-8  backdrop-blur-xl sm:p-10">
            <div className="absolute -right-24 -top-24 h-52 w-52 rounded-full bg-pink-200/60 blur-3xl" />

            <div className="relative">
              <div className="mb-8">
                <p className="text-sm font-semibold text-pink-600">
                  Send Message
                </p>
                <h2 className="mt-2 text-3xl font-bold text-gray-950">
                  Tell us what you need
                </h2>
                <p className="mt-3 text-gray-500">
                  Fill the form and we’ll get back to you shortly.
                </p>
              </div>

              <div className="space-y-5">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full rounded-2xl border border-pink-100 bg-pink-50/40 px-6 py-4 outline-none transition focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-100"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full rounded-2xl border border-pink-100 bg-pink-50/40 px-6 py-4 outline-none transition focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-100"
                />

                <textarea
                  rows="6"
                  placeholder="Write your message..."
                  className="w-full resize-none rounded-[2rem] border border-pink-100 bg-pink-50/40 px-6 py-5 outline-none transition focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-100"
                />

                <button className="flex w-full items-center justify-center gap-3 rounded-full bg-black py-4 text-lg font-bold text-white shadow-xl transition hover:bg-gray-900 hover:shadow-2xl">
                  Send Message
                  <Send size={18} />
                </button>
              </div>
    

             <div className="rounded-[2rem] border border-pink-100 bg-white p-6 shadow-sm mt-10">
              <h3 className="mb-5 text-2xl font-bold text-gray-950">
                Follow Our Glow
              </h3>

              <div className="flex gap-4">
                {[FaInstagram, FaFacebookF, FaTwitter].map((Icon, index) => (
                  <button
                    key={index}
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-50 text-pink-600 transition hover:-translate-y-1 hover:bg-pink-600 hover:text-white hover:shadow-lg"
                  >
                    <Icon size={20} />
                  </button>
                ))}
              </div>
            </div>

            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              {contactCards.map((card) => (
                <div
                  key={card.title}
                  className="group rounded-[2rem] border border-pink-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-50 text-pink-600 transition group-hover:bg-pink-600 group-hover:text-white">
                    {card.icon}
                  </div>

                  <h3 className="text-xl font-bold text-gray-950">
                    {card.title}
                  </h3>

                  <p className="mt-2 leading-7 text-gray-600">
                    {card.value}
                  </p>
                </div>
              ))}
            </div>

           

            <div className="overflow-hidden rounded-[2.5rem] border border-pink-100 bg-white p-2 ">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.956056220158!2d75.86364667476273!3d22.767012025817913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39630330cd69a4fd%3A0xa7b7773a212a220e!2sADITYA%20GATEWAY!5e0!3m2!1sen!2sin!4v1779348036301!5m2!1sen!2sin"
                width="100%"
                height="320"
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