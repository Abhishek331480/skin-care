import { Mail, Phone, MapPin, Clock } from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";

const Contact = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[400px] bg-pink-200/30 blur-3xl rounded-full" />

      <div className="relative">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-pink-600">
            Contact Us
          </p>

          <h1 className="text-5xl sm:text-6xl font-bold text-gray-950 mt-4 leading-tight">
            Let’s Build Your
            <span className="block text-pink-600">
              Perfect Skin Routine
            </span>
          </h1>

          <p className="text-gray-600 mt-6 leading-8 text-lg">
            Have questions about skincare, orders, or products?
            Our team is always ready to help you glow confidently.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          
          {/* Left Form */}
          <div className="relative bg-white/70 backdrop-blur-2xl border border-pink-100 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl overflow-hidden">
            
            {/* Small Glow */}
            <div className="absolute -top-20 -right-20 h-40 w-40 bg-pink-100 rounded-full blur-3xl opacity-60" />

            <div className="relative">
              <h2 className="text-3xl font-bold text-gray-950 mb-3">
                Send a Message
              </h2>

              <p className="text-gray-500 mb-8">
                Fill out the form and we’ll get back to you shortly.
              </p>

              <div className="space-y-5">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full rounded-full border border-pink-100 bg-white/80 px-6 py-4 outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full rounded-full border border-pink-100 bg-white/80 px-6 py-4 outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition"
                />

                <textarea
                  rows="6"
                  placeholder="Write your message..."
                  className="w-full rounded-[2rem] border border-pink-100 bg-white/80 px-6 py-5 outline-none resize-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition"
                />

                <button className="w-full rounded-full bg-black py-4 text-white font-semibold text-lg shadow-xl hover:bg-gray-900 transition">
                  Send Message
                </button>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            
            {/* Cards */}
            <div className="grid sm:grid-cols-2 gap-5">
              
              <div className="bg-white border border-pink-100 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition">
                <div className="h-14 w-14 rounded-2xl bg-pink-50 flex items-center justify-center mb-5">
                  <Mail className="text-pink-600" />
                </div>

                <h3 className="text-xl font-bold text-gray-950">Email</h3>

                <p className="text-gray-600 mt-2 leading-7">
                  support@skincare.com
                </p>
              </div>

              <div className="bg-white border border-pink-100 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition">
                <div className="h-14 w-14 rounded-2xl bg-pink-50 flex items-center justify-center mb-5">
                  <Phone className="text-pink-600" />
                </div>

                <h3 className="text-xl font-bold text-gray-950">Phone</h3>

                <p className="text-gray-600 mt-2 leading-7">
                  +91 9754812926
                </p>
              </div>

              <div className="bg-white border border-pink-100 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition">
                <div className="h-14 w-14 rounded-2xl bg-pink-50 flex items-center justify-center mb-5">
                  <MapPin className="text-pink-600" />
                </div>

                <h3 className="text-xl font-bold text-gray-950">Address</h3>

                <p className="text-gray-600 mt-2 leading-7">
                  Indore, Madhya Pradesh, India
                </p>
              </div>

              <div className="bg-white border border-pink-100 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition">
                <div className="h-14 w-14 rounded-2xl bg-pink-50 flex items-center justify-center mb-5">
                  <Clock className="text-pink-600" />
                </div>

                <h3 className="text-xl font-bold text-gray-950">
                  Working Hours
                </h3>

                <p className="text-gray-600 mt-2 leading-7">
                  Mon - Sat <br />
                  10:00 AM - 7:00 PM
                </p>
              </div>
            </div>

            {/* Socials */}
            <div className="bg-white border border-pink-100 rounded-[2rem] p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-950 mb-5">
                Follow Us
              </h3>

              <div className="flex gap-4">
                <button className="h-14 w-14 rounded-2xl bg-pink-50 flex items-center justify-center hover:bg-pink-600 hover:text-white transition">
                  <FaInstagram size={20} />
                </button>

                <button className="h-14 w-14 rounded-2xl bg-pink-50 flex items-center justify-center hover:bg-pink-600 hover:text-white transition">
                  <FaFacebookF size={20} />
                </button>

                <button className="h-14 w-14 rounded-2xl bg-pink-50 flex items-center justify-center hover:bg-pink-600 hover:text-white transition">
                  <FaTwitter size={20} />
                </button>
              </div>
            </div>

            {/* Map */}
            <div className="overflow-hidden rounded-[2.5rem] border border-pink-100 shadow-2xl p-2 bg-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.956056220158!2d75.86364667476273!3d22.767012025817913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39630330cd69a4fd%3A0xa7b7773a212a220e!2sADITYA%20GATEWAY!5e0!3m2!1sen!2sin!4v1779348036301!5m2!1sen!2sin"
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-[2rem]"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;