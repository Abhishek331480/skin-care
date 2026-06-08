import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import oily_skin from "../assets/oily_skin.jpg";
import dry_skin from "../assets/dry_skin.jpg";
import sensitive_skin from "../assets/sensetive_skin.jpg";
import Combination_skin from "../assets/combination_skin.jpg";
import acne_prone_skin from "../assets/acne_skin.jpg";
const SkinTypeSection = () => {
  const skinTypes = [
    {
      name: "Oily Skin",
      desc: "Lightweight care to balance excess oil and shine.",
      path: "/shop?skinType=oily",
      image: oily_skin,
    },
    {
      name: "Dry Skin",
      desc: "Deep hydration for soft, smooth, nourished skin.",
      path: "/shop?skinType=dry",
      image: dry_skin,
    },
    {
      name: "Sensitive Skin",
      desc: "Gentle formulas made for easily irritated skin.",
      path: "/shop?skinType=sensitive",
      image:sensitive_skin,
        
    },
    {
      name: "Combination Skin",
      desc: "Balanced skincare for oily and dry areas.",
      path: "/shop?skinType=combination",
      image: Combination_skin,
    },
    {
      name: "Acne Prone",
      desc: "Targeted care for breakouts and clogged pores.",
      path: "/shop?skinType=acne prone",
      image: acne_prone_skin,
    },
  ];

  return (
    <section className="relative overflow-hidden  py-24">
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-pink-200/40 blur-3xl" />
      <div className="absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-rose-200/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-pink-100 bg-white/80 px-5 py-2 shadow-sm backdrop-blur-xl">
            <Sparkles size={16} className="text-pink-500" />
            <span className="text-xs font-black uppercase tracking-[4px] text-pink-600">
              Personalized Care
            </span>
          </div>

          <h2 className="text-4xl font-black tracking-tight text-gray-950 sm:text-5xl md:text-6xl">
            Shop by{" "}
            <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-pink-400 bg-clip-text text-transparent">
              Skin Type
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-600">
            Discover luxury skincare routines crafted for your unique skin
            concerns, daily glow goals and healthy radiant skin.
          </p>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {skinTypes.map((type, index) => (
            <Link
              key={type.name}
              to={type.path}
              className={`
                group relative overflow-hidden rounded-[2rem]
                border border-white/70 bg-white/70 p-2
                shadow-[0_20px_70px_rgba(15,23,42,0.08)]
                backdrop-blur-2xl transition-all duration-500
                hover:-translate-y-2
                hover:shadow-[0_35px_100px_rgba(236,72,153,0.22)]
                ${index === 4 ? "lg:col-start-2" : ""}
              `}
            >
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white via-pink-50/70 to-rose-100/60 opacity-0 transition duration-500 group-hover:opacity-100" />

              <div className="relative overflow-hidden rounded-[1.7rem]">
                <div className="relative h-[360px] overflow-hidden">
                  <img
                    src={type.image}
                    alt={type.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-rose-600/20" />

                  {/* <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-white/85 px-4 py-2 text-[10px] font-black uppercase tracking-[2px] text-pink-700 shadow-xl backdrop-blur-xl">
                    Skin Ritual
                  </div> */}

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-3xl font-black text-white drop-shadow-lg">
                      {type.name}
                    </h3>

                    <p className="mt-3 max-w-sm text-sm leading-6 text-white/85">
                      {type.desc}
                    </p>
                  </div>
                </div>

                <div className="relative flex items-center justify-between bg-white px-6 py-5">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[2px] text-gray-400">
                      Curated Products
                    </p>
                    <p className="mt-1 text-sm font-bold text-gray-950">
                      Personalized for your skin
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-gray-950 via-pink-700 to-rose-500 text-white shadow-xl shadow-pink-200 transition duration-300 group-hover:scale-110">
                    <ArrowRight size={19} />
                  </div>
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