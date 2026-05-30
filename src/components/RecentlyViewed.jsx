import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const RecentlyViewed = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const viewed =
      JSON.parse(localStorage.getItem("recentlyViewed")) || [];

    setItems(viewed);
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="mt-20">
      <div className="mb-8">
        <p className="text-sm font-semibold text-pink-600">
          Based on your activity
        </p>

        <h2 className="text-4xl font-bold text-gray-950">
          Recently Viewed
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="group overflow-hidden rounded-[2rem] border border-pink-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="h-64 overflow-hidden bg-pink-50">
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-5">
              <p className="text-sm font-semibold text-pink-600">
                {product.category}
              </p>

              <h3 className="mt-2 text-lg font-bold text-gray-950">
                {product.name}
              </h3>

              <p className="mt-3 text-xl font-black text-gray-950">
                ₹{product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewed;