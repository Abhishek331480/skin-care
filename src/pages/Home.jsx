// import { Link } from "react-router-dom";
// import productImage from "../assets/product-image1.jpg";
// import BestSeller from "../components/BestSeller";
// import SkinTypeSection from "../components/SkinTypeSection";
// import CustomerRating from "../components/CustomerRating";
// import TrendingProducts from "../components/TrendingProduct";
// import Banner1 from "../assets/skin_care_banner1.jpg";
// import Banner2 from "../assets/Banner2.png";
// import Banner3 from "../assets/Banner3.png";
// import Banner from "../assets/skin_care_bg_banner.jpg";
// import { useEffect, useState } from "react";

// const Home = () => {
//   return (
//     <section className="min-h-[calc(100vh-82px)] bg-pink-50">
//       <div className="w-full">
//         <div>
//           <img
//             src={Banner1}
//             alt="SkinCare Banner"
//             className="
//       hidden md:block
//       w-full
//       h-auto
//       rounded
//       shadow-2xl
//     "
//           />
//         </div>

//         {/* Mobile Banner */}
//         <img
//           src={Banner}
//           alt="SkinCare Banner"
//           className="block md:hidden w-full h-[calc(80vh-82px)] rounded-3xl shadow-xl object-cover py-2 px-4"
//         />
//       </div>
//       <BestSeller />
//       <TrendingProducts />
//       <SkinTypeSection />
//       <CustomerRating />
//     </section>
//   );
// };

import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { lazy, Suspense } from "react";
const BestSeller = lazy(() => import("../components/BestSeller"));
const SkinTypeSection = lazy(() => import("../components/SkinTypeSection"));
const CustomerRating = lazy(() => import("../components/CustomerRating"));
const TrendingProducts = lazy(() => import("../components/TrendingProduct"));
import Banner1 from "../assets/skin_care_banner1.webp";
import Banner2 from "../assets/Banner2.webp";
import Banner3 from "../assets/Banner3.webp";
import Banner from "../assets/skin_care_bg_banner.jpg";

const Home = () => {
  const banners = [Banner1, Banner2, Banner3];

  const [currentBanner, setCurrentBanner] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentBanner((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="min-h-[calc(100vh-82px)] bg-pink-50">
      {/* Desktop Hero Slider */}
      <div
        className="relative hidden md:block w-full overflow-hidden bg-pink-50"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <img
          src={banners[currentBanner]}
          alt="SkinCare Banner"
          className="
            w-full
            h-auto
            object-cover
            rounded-b-[2rem]
            shadow-2xl
            transition-all
            duration-700
            ease-in-out
          "
        />

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="
            absolute left-6 top-1/2 -translate-y-1/2
            h-12 w-12 rounded-full
            bg-white/80 backdrop-blur-md
            text-pink-600
            shadow-lg
            flex items-center justify-center
            hover:bg-pink-600 hover:text-white
            transition-all duration-300
          "
        >
          <ChevronLeft size={26} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="
            absolute right-6 top-1/2 -translate-y-1/2
            h-12 w-12 rounded-full
            bg-white/80 backdrop-blur-md
            text-pink-600
            shadow-lg
            flex items-center justify-center
            hover:bg-pink-600 hover:text-white
            transition-all duration-300
          "
        >
          <ChevronRight size={26} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`
                h-3 rounded-full transition-all duration-300
                ${
                  currentBanner === index
                    ? "w-10 bg-pink-600"
                    : "w-3 bg-white/80 hover:bg-pink-300"
                }
              `}
            />
          ))}
        </div>
      </div>

      {/* Mobile Banner */}
      <img
        src={Banner}
        alt="SkinCare Banner"
        className="
          block md:hidden
          w-full
          h-[calc(80vh-82px)]
          rounded-3xl
          shadow-xl
          object-cover
          py-2
          px-4
        "
      />

     <Suspense fallback={<div>Loading...</div>}>
  <BestSeller />
  <TrendingProducts />
  <SkinTypeSection />
  <CustomerRating />
</Suspense>
    </section>
  );
};

export default Home;
