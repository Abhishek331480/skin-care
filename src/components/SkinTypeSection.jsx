import { Link } from "react-router-dom";

const SkinTypeSection = () => {
  const skinTypes = [
    {
      name: "Oily Skin",
      desc: "Lightweight care to balance excess oil and shine.",
      path: "/shop?skinType=oily",
      image:
        "https://i1-c.pinimg.com/1200x/49/02/06/490206d7ccc21a88ec6e0c4c6d21df04.jpg",
    },

    {
      name: "Dry Skin",
      desc: "Deep hydration for soft, smooth, nourished skin.",
      path: "/shop?skinType=dry",
      image:
        "https://i1-c.pinimg.com/1200x/63/b5/62/63b562ba3e2130b1a2cff61ad4d6a740.jpg",
    },

    {
      name: "Sensitive Skin",
      desc: "Gentle formulas made for easily irritated skin.",
      path: "/shop?skinType=sensitive",
      image:
        "https://i1-c.pinimg.com/736x/ac/c1/34/acc134d3f1b18069342c7b8b67d297af.jpg",
    },

    {
      name: "Combination Skin",
      desc: "Balanced skincare for oily and dry areas.",
      path: "/shop?skinType=acne",
      image:
        "https://i.pinimg.com/736x/b9/f0/a3/b9f0a351cbf25d84bd7f4d9a37ff9762.jpg",
    },

    {
      name: "Acne Prone",
      desc: "Targeted care for breakouts and clogged pores.",
      path: "/shop?skinType=combination",
      image:
        "https://i.pinimg.com/736x/87/47/2b/87472b131932ec4de770b273ea438cd1.jpg",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-semibold tracking-[4px] uppercase text-pink-600">
            Personalized Care
          </p>

          <h2 className="text-4xl sm:text-5xl font-bold text-gray-950 mt-3">
            Shop by Skin Type
          </h2>

          <p className="text-gray-600 mt-5 leading-8">
            Discover skincare routines specially crafted for your unique skin
            concerns and daily glow goals.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {skinTypes.map((type) => (
            <Link
              key={type.name}
              to={type.path}
              className="
                group overflow-hidden rounded-[2rem]
                bg-white border border-pink-100
                shadow-sm hover:shadow-2xl
                hover:-translate-y-2
                transition-all duration-500
              "
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={type.image}
                  alt={type.name}
                  className="
                    w-full h-full object-cover object-center 
                    group-hover:scale-110
                    transition-transform duration-700
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                <div className="absolute bottom-5 left-5">
                  <span className="rounded-full bg-white/90 backdrop-blur-md px-4 py-2 text-sm font-semibold text-pink-600 shadow">
                    Skin Care
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-7">
                <h3 className="text-2xl font-bold text-gray-950 group-hover:text-pink-600 transition">
                  {type.name}
                </h3>

                <p className="text-gray-600 mt-3 leading-7">
                  {type.desc}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    Personalized Products
                  </span>

                  <span
                    className="
                      font-semibold text-pink-600
                      group-hover:translate-x-1
                      transition-transform
                    "
                  >
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkinTypeSection;