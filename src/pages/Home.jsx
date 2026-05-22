import { Link } from "react-router-dom";
import productImage from "../assets/product-image1.jpg";
import BestSeller from "../components/BestSeller";
import SkinTypeSection from "../components/SkinTypeSection";
import CustomerRating from "../components/CustomerRating"
const Home = () => {
  return (
    <section className="min-h-[calc(100vh-82px)] bg-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center py-16">
        {/* Left Content */}
        <div className="space-y-6">
          <p className="inline-block px-4 py-2 rounded-full bg-pink-100 text-pink-700 text-sm font-medium">
            Premium Skincare Collection
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Glow Naturally, <br />
            Care Deeply
          </h1>

          <p className="text-gray-600 text-lg max-w-xl">
            Discover skincare products made for every skin type. Clean, gentle,
            and effective care for your daily routine.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/shop"
              className="px-6 py-3 rounded-full bg-pink-600 text-white font-medium text-center hover:bg-pink-700 transition"
            >
              Shop Now
            </Link>

            <button className="px-6 py-3 rounded-full border border-pink-300 text-pink-700 font-medium hover:bg-pink-100 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="relative">
          <div
            className="h-[420px] rounded-[2rem] shadow-xl flex items-center justify-center bg-cover bg-center"
            style={{
              backgroundImage: `url(${productImage})`,
            }}
          >
          </div>

          <div className="absolute -bottom-5 left-6 bg-white rounded-2xl shadow-lg px-5 py-4">
            <p className="text-sm text-gray-500">Trusted by</p>
            <p className="text-xl font-bold text-gray-900">10k+ Users</p>
          </div>

          <div className="absolute top-6 -right-2 bg-white rounded-2xl shadow-lg px-5 py-4">
            <p className="text-sm text-gray-500">Rating</p>
            <p className="text-xl font-bold text-gray-900">4.9 ★</p>
          </div>
        </div>
      </div>
      <BestSeller/>
     <SkinTypeSection/>
     <CustomerRating/>
    </section>
  );
};

export default Home;
