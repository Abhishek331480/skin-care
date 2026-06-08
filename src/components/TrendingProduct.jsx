import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, TrendingUp } from "lucide-react";
import api from "../api/api";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchTopSelling = async () => {
      try {
        const res = await api.get("/products/top-selling");
        setProducts(res.data.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTopSelling();
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-b from-pink-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12 text-center">
          <p className="text-sm tracking-[4px] uppercase text-pink-500 font-semibold">
            Trending Now
          </p>

          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-gray-900">
            Top Selling Products
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Products loved and purchased most by our customers.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="group rounded-[2rem] border border-pink-100 bg-white p-4 shadow-sm transition hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative h-64 overflow-hidden rounded-[1.5rem] bg-pink-50">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-black/80 px-3 py-1.5 text-xs font-bold text-white">
                  <TrendingUp size={14} />
                  {product.totalSold || 0} sold
                </span>
              </div>

              <div className="pt-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-pink-600">
                    {product.category}
                  </span>

                  <span className="flex items-center gap-1 text-sm font-bold text-amber-500">
                    <Star size={15} fill="currentColor" />
                    {product.rating || 0}
                  </span>
                </div>

                <h3 className="line-clamp-1 text-lg font-black text-gray-950 group-hover:text-pink-600">
                  {product.name}
                </h3>

                {product.variants?.length > 0 ? (
                  <div className="mt-3">
                    <p className="text-2xl font-black text-gray-950">
                      From ₹{product.price}
                    </p>
                    <p className="text-xs font-semibold text-gray-500">
                      {product.variants.length} sizes available
                    </p>
                  </div>
                ) : (
                  <p className="mt-3 text-2xl font-black text-gray-950">
                    ₹{product.price}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;