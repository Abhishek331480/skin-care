import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom";

const faqs = [
  {
    question: "How can I track my order?",
    answer:
      "Once your order has been shipped, you can track its status from the My Orders page.",
  },
  {
    question: "Can I cancel my order?",
    answer:
      "Orders can be cancelled before they are shipped. After dispatch, cancellation may not be available.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Most orders are delivered within 3-7 business days depending on your location.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can contact our support team through the Contact Us page.",
  },
];

const HelpCenter = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <section className="min-h-screen overflow-x-hidden bg-gradient-to-b from-pink-50 via-white to-pink-50 px-4 py-10 sm:px-6 sm:py-14 lg:py-20">
      <div className="mx-auto w-full max-w-5xl">
        {/* Hero */}
        <div className="mb-10 text-center sm:mb-14">
          <span className="inline-flex items-center rounded-full bg-pink-100 px-4 py-2 text-xs font-semibold text-pink-700 sm:px-5 sm:text-sm">
            Support Center
          </span>

          <h1 className="mt-5 text-3xl font-black leading-tight text-gray-900 sm:mt-6 sm:text-4xl lg:text-5xl">
            How Can We Help?
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:mt-5 sm:text-lg">
            Find answers to frequently asked questions about orders,
            shipping, returns, payments, and skincare products.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4 sm:space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="
                overflow-hidden rounded-2xl sm:rounded-3xl
                border border-pink-100
                bg-white/80 backdrop-blur-md
                shadow-lg shadow-pink-100/40
                transition-all duration-300
                hover:shadow-2xl hover:shadow-pink-100
                sm:hover:-translate-y-1
              "
            >
              <button
                type="button"
                onClick={() =>
                  setOpenFaq(openFaq === index ? null : index)
                }
                className="
                  flex w-full items-start justify-between
                  gap-3 p-4 text-left sm:items-center sm:p-6
                "
              >
                <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
                  <div
                    className="
                      flex h-10 w-10 shrink-0 items-center justify-center
                      rounded-xl sm:h-12 sm:w-12 sm:rounded-2xl
                      bg-gradient-to-r from-pink-500 to-rose-500
                      text-sm font-bold text-white sm:text-base
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <h2 className="min-w-0 text-base font-bold leading-6 text-gray-900 sm:text-lg md:text-xl">
                    {faq.question}
                  </h2>
                </div>

                <ChevronDown
                  size={22}
                  className={`mt-2 shrink-0 text-pink-600 transition-transform duration-300 sm:mt-0 ${
                    openFaq === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`
                  overflow-hidden transition-all duration-300
                  ${
                    openFaq === index
                      ? "max-h-96 px-4 pb-5 sm:px-6 sm:pb-6"
                      : "max-h-0"
                  }
                `}
              >
                <div className="border-l-2 border-pink-100 pl-4 sm:ml-16 sm:pl-5">
                  <p className="text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
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
            mt-10 rounded-3xl
            bg-gradient-to-r from-pink-600 to-rose-500
            p-6 text-center text-white
            shadow-2xl shadow-pink-200
            sm:mt-14 sm:p-10
          "
        >
          <h3 className="text-2xl font-black sm:text-3xl">
            Still Need Help?
          </h3>

          <p className="mt-3 text-sm leading-7 text-pink-100 sm:text-base">
            Our skincare experts are ready to assist you with any questions.
          </p>

          <NavLink
            to="/contact"
            className="mt-6 inline-flex w-full justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-pink-600 shadow-lg transition hover:scale-105 sm:mt-7 sm:w-auto sm:px-8 sm:text-base"
          >
            Contact Support
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default HelpCenter;