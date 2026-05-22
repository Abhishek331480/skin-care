import CustomerImage from "../assets/happyCustomer.jpg";
const About = () => {
  return (
    <section className="py-16">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <p className="text-sm font-semibold text-pink-600">About SkinCare</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-950 mt-3">
          Clean skincare made for everyday glow
        </h1>
        <p className="text-gray-600 mt-5 leading-8">
          We create gentle, effective, and skin-friendly products for every skin
          type. Our goal is to make skincare simple, safe, and result-driven.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* <div className="h-[420px] rounded-[2rem] bg-gradient-to-br from-pink-100 via-white to-rose-200 shadow-xl" /> */}
        <img
          src={CustomerImage}
          alt="About Us"
          className="h-[420px] rounded-[2rem] object-cover bg-pink-50 p-1 shadow-xl"
        />

        <div className="space-y-6">
          <div className="bg-white border border-pink-100 rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-950">Our Mission</h2>
            <p className="text-gray-600 mt-3 leading-7">
              To help everyone build a skincare routine that is easy to follow,
              affordable, and made for their unique skin needs.
            </p>
          </div>

          <div className="bg-white border border-pink-100 rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-950">Why Choose Us?</h2>
            <p className="text-gray-600 mt-3 leading-7">
              Dermatology-inspired formulas, skin-type based recommendations,
              honest ingredients, and premium care at accessible prices.
            </p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mt-14">
        {[
          ["10k+", "Happy Customers"],
          ["50+", "Skin Products"],
          ["4.9★", "Average Rating"],
        ].map(([value, label]) => (
          <div
            key={label}
            className="bg-white border border-pink-100 rounded-3xl p-6 text-center shadow-sm"
          >
            <h3 className="text-3xl font-bold text-gray-950">{value}</h3>
            <p className="text-gray-600 mt-2">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;