import {
  ShieldCheck,
  User,
  ShoppingBag,
  CreditCard,
  Cookie,
  Truck,
  LockKeyhole,
  Mail,
  Share2,
  FileText,
  Baby,
  Headphones,
} from "lucide-react";
import {NavLink} from "react-router-dom";

const privacySections = [
  {
    icon: User,
    title: "Information We Collect",
    text: "We may collect your name, email address, phone number, shipping address, billing address, account details, and order-related information when you use our website.",
  },
  {
    icon: ShoppingBag,
    title: "How We Use Your Data",
    text: "Your information is used to process orders, manage your account, provide customer support, send order updates, improve our services, and personalize your shopping experience.",
  },
  {
    icon: CreditCard,
    title: "Payment Security",
    text: "Payments are processed through trusted third-party payment providers. SkinCare does not store your complete card, UPI, or banking details on our servers.",
  },
  {
    icon: Cookie,
    title: "Cookies & Preferences",
    text: "We may use cookies to improve website performance, remember your preferences, analyze traffic, and provide a smoother shopping experience.",
  },
  {
    icon: Truck,
    title: "Delivery Information",
    text: "Your delivery details may be shared with shipping and logistics partners only when required to fulfill your order and provide tracking updates.",
  },
  {
    icon: LockKeyhole,
    title: "Data Protection",
    text: "We use reasonable security measures to protect your personal information from unauthorized access, misuse, alteration, or disclosure.",
  },
  {
    icon: Mail,
    title: "Marketing Updates",
    text: "With your permission, we may send skincare tips, product recommendations, offers, and promotional updates. You can unsubscribe at any time.",
  },
  {
    icon: Share2,
    title: "Third-Party Services",
    text: "Our website may use third-party services such as payment gateways, analytics tools, email providers, and courier partners. These services follow their own privacy policies.",
  },
  {
    icon: FileText,
    title: "Your Privacy Rights",
    text: "You may request access, correction, or deletion of your personal information, subject to applicable legal, security, and operational requirements.",
  },
  {
    icon: Baby,
    title: "Children’s Privacy",
    text: "Our services are not intended for children under the age of 13. We do not knowingly collect personal information from minors without proper consent.",
  },
];

const PrivacyPolicy = () => {
  return (
    <section className="min-h-screen overflow-x-hidden bg-gradient-to-b from-pink-50 via-white to-rose-50 py-10 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl lg:rounded-[2.5rem] border border-pink-100 bg-white p-5 sm:p-8 md:p-14 shadow-2xl shadow-pink-100/70">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-pink-200/40 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-rose-200/40 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full bg-pink-100 px-5 py-2 text-sm font-bold text-pink-700">
                Privacy Policy
              </span>

              <h1 className="mt-4 sm:mt-6 text-3xl sm:text-4xl lg:text-6xl font-black leading-tight text-gray-950">
                Your Privacy Matters To Us
              </h1>

              <p className="mt-4 sm:mt-6 max-w-3xl text-base sm:text-lg leading-7 sm:leading-8 text-gray-600">
                At SkinCare, we respect your privacy and are committed to
                protecting your personal information. This policy explains how
                we collect, use, store, and protect your data when you shop
                with us.
              </p>
            </div>

           <div className="rounded-3xl lg:rounded-[2rem] bg-gradient-to-br from-pink-600 to-rose-500 p-5 sm:p-8 text-white shadow-2xl shadow-pink-200">
              <ShieldCheck size={56} />

              <h3 className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-black">
                Secure Shopping
              </h3>

              <p className="mt-4 leading-8 text-pink-50">
                Your account details, order information, and personal data are
                handled with care, transparency, and secure practices.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
                  <p className="text-3xl font-black">100%</p>
                  <p className="mt-1 text-sm text-pink-50">Secure Checkout</p>
                </div>

                <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
                  <p className="text-3xl font-black">0</p>
                  <p className="mt-1 text-sm text-pink-50">Data Selling</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Cards */}
        <div className="mt-10 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          <div className="rounded-[2rem] border border-pink-100 bg-white p-7 shadow-lg shadow-pink-100/50">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
              <LockKeyhole size={26} />
            </div>
            <h3 className="mt-5 text-xl font-black text-gray-950">
              Protected Data
            </h3>
            <p className="mt-3 leading-7 text-gray-600">
              We use security practices to protect your personal and account
              information.
            </p>
          </div>

          <div className="rounded-[2rem] border border-pink-100 bg-white p-7 shadow-lg shadow-pink-100/50">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
              <CreditCard size={26} />
            </div>
            <h3 className="mt-5 text-xl font-black text-gray-950">
              Safe Payments
            </h3>
            <p className="mt-3 leading-7 text-gray-600">
              Complete card or banking details are not stored on our servers.
            </p>
          </div>

          <div className="rounded-[2rem] border border-pink-100 bg-white p-7 shadow-lg shadow-pink-100/50">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
              <ShieldCheck size={26} />
            </div>
            <h3 className="mt-5 text-xl font-black text-gray-950">
              No Data Selling
            </h3>
            <p className="mt-3 leading-7 text-gray-600">
              We do not sell your personal information to third parties.
            </p>
          </div>
        </div>

        {/* Policy Sections */}
       <div className="mt-10 sm:mt-16">
          <div className="mb-8 text-center">
           <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-950">
              How We Handle Your Information
            </h2>
            <p className="mt-3 text-gray-600">
              Clear, transparent, and responsible privacy practices.
            </p>
          </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {privacySections.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="group rounded-3xl lg:rounded-[2rem] border border-pink-100 bg-white p-5 sm:p-7 shadow-lg shadow-pink-100/40 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-100 sm:hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-200">
                      <Icon size={25} />
                    </div>

                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-pink-500">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                       <h3 className="text-lg sm:text-xl font-black text-gray-950">
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

        {/* Important Note */}
        <div className="mt-10 sm:mt-16 rounded-3xl lg:rounded-[2rem] border border-pink-100 bg-white p-5 sm:p-8 shadow-xl shadow-pink-100/60">
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
              <ShieldCheck size={30} />
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-gray-950">
                Privacy Commitment
              </h3>

              <p className="mt-2 leading-8 text-gray-600">
                We only collect information that is necessary to provide our
                services, process your orders, improve your experience, and
                support your account. Your trust is important to us.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-pink-600 to-rose-500 p-10 text-center text-white shadow-2xl shadow-pink-200">
          <Headphones size={42} className="mx-auto" />

          <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-black">
            Have Questions About Your Data?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-pink-50">
            Our support team can help you with privacy questions, account data,
            order information, or security-related concerns.
          </p>

          <NavLink
            to="/contact"
className="mt-7 inline-flex w-full sm:w-auto justify-center rounded-full bg-white px-8 py-4 font-black text-pink-600 shadow-lg transition hover:scale-105"          >
            Contact Support
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;