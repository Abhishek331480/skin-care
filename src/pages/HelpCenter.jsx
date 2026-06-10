import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom";

const faqs = [
  {
    question: "How can I track my order?",
    answer:
      "Once your order has been shipped, you can track its status from the My Orders page."
  },
  {
    question: "Can I cancel my order?",
    answer:
      "Orders can be cancelled before they are shipped. After dispatch, cancellation may not be available."
  },
  {
    question: "How long does delivery take?",
    answer:
      "Most orders are delivered within 3-7 business days depending on your location."
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can contact our support team through the Contact Us page."
  }
];

const HelpCenter = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <section className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50 py-20">
      <div className="max-w-5xl mx-auto px-5">

        {/* Hero */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center rounded-full bg-pink-100 px-5 py-2 text-sm font-semibold text-pink-700">
            Support Center
          </span>

          <h1 className="mt-6 text-5xl font-black text-gray-900">
            How Can We Help?
          </h1>

          <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to frequently asked questions about orders,
            shipping, returns, payments, and skincare products.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="
                overflow-hidden rounded-3xl
                border border-pink-100
                bg-white/80 backdrop-blur-md
                shadow-lg shadow-pink-100/40
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-2xl hover:shadow-pink-100
              "
            >
              <button
                onClick={() =>
                  setOpenFaq(openFaq === index ? null : index)
                }
                className="
                  flex w-full items-center justify-between
                  p-6 text-left
                "
              >
                <div className="flex items-center gap-4">
                  <div
                    className="
                      flex h-12 w-12 items-center justify-center
                      rounded-2xl
                      bg-gradient-to-r from-pink-500 to-rose-500
                      text-white font-bold
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <h2 className="text-lg md:text-xl font-bold text-gray-900">
                    {faq.question}
                  </h2>
                </div>

                <ChevronDown
                  size={22}
                  className={`text-pink-600 transition-transform duration-300 ${
                    openFaq === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`
                  overflow-hidden transition-all duration-300
                  ${
                    openFaq === index
                      ? "max-h-96 pb-6 px-6"
                      : "max-h-0"
                  }
                `}
              >
                <div className="ml-16 border-l-2 border-pink-100 pl-5">
                  <p className="leading-8 text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Support Card */}
        <div
          className="
            mt-14 rounded-[2rem]
            bg-gradient-to-r
            from-pink-600 to-rose-500
            p-10 text-center text-white
            shadow-2xl shadow-pink-200
          "
        >
          <h3 className="text-3xl font-black">
            Still Need Help?
          </h3>

          <p className="mt-3 text-pink-100">
            Our skincare experts are ready to assist you with any questions.
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

export default HelpCenter;