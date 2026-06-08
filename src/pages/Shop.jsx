import React from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import {useState,useEffect} from "react";
import api from "../api/api";

const Shop = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");

const [searchParams] = useSearchParams();
const skinTypeFromUrl = searchParams.get("skinType");

//for store backend data
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);

//pagination
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);

useEffect(() => {

  const fetchProducts = async () => {

    try {

      setLoading(true);
    
      const params = {};

      if (
        selectedCategory !== "All"
      ) {
        params.category =
          selectedCategory;
      }

      if (searchTerm) {
        params.search =
          searchTerm;
      }

      if (skinTypeFromUrl) {
        params.skinType =
          skinTypeFromUrl;
      }

      const res = await api.get("/products", {
  params: {
    category:
      selectedCategory !== "All"
        ? selectedCategory
        : undefined,

    search: searchTerm || undefined,

    skinType:
      skinTypeFromUrl || undefined,

    page: currentPage,

    limit: 8,
  },
});

      setProducts(res.data.products);
      setTotalPages(res.data.totalPages); 

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  fetchProducts();

}, [
  selectedCategory,
  searchTerm,
  skinTypeFromUrl,
  currentPage
]);



  const categories = ["All", "Serum", "Sunscreen", "Moisturizer", "Cleanser"];

//   const products = [
//   {
//     id: 1,
//     name: "Vitamin C Serum",
//     category: "Serum",
//     skinType: "oily",
//     price: 499,
//     rating: 4.8,
//     image:
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: 2,
//     name: "Vitamin E Serum",
//     category: "Sunscreen",
//     skinType: "dry",
//     price: 599,
//     rating: 4.7,
//     image:
//       "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: 3,
//     name: "Hyaluronic Acid Serum",
//     category: "Moisturizer",
//     skinType: "sensitive",
//     price: 699,
//     rating: 4.9,
//     image:
//       "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: 4,
//     name: "Niacinamide Serum",
//     category: "Cleanser",
//     skinType: "Acne",
//     price: 549,
//     rating: 4.6,
//     image:
//       "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
//   },
// ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

   const matchesSkinType =
  !skinTypeFromUrl ||
  product.skinType?.toLowerCase() === skinTypeFromUrl.toLowerCase();

    return matchesSearch && matchesCategory && matchesSkinType;
  });

  return (
    <section className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[4px] text-pink-500 font-semibold">
            Shop Products
          </p>

          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">
            Premium Skincare Collection
          </h1>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Search and explore skincare products made for glowing, healthy and
            beautiful skin.
          </p>
        </div>

        {/* Filter Box */}
        <div className="bg-white/80 backdrop-blur-xl border border-pink-100 rounded-[2rem] shadow-xl shadow-pink-100/50 p-5 md:p-6 mb-10">
          <div className="flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <Search
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-pink-400"
              />

              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-full border border-pink-200 bg-pink-50/50 py-4 pl-14 pr-5 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-3">
              <div className="hidden sm:flex items-center gap-2 text-gray-500 mr-1">
                <SlidersHorizontal size={18} />
                <span className="text-sm font-medium">Filter:</span>
              </div>


              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-pink-500 text-white shadow-lg shadow-pink-300/60"
                      : "bg-gray-100 text-gray-700 hover:bg-pink-100 hover:text-pink-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>

          <p className="text-sm text-gray-400">
            Category:{" "}
            <span className="text-pink-500 font-semibold">
              {selectedCategory}
            </span>
          </p>
        </div>

        {/* Product cards */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-pink-100 rounded-[2rem] p-12 text-center shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900">
              No products found
            </h3>
            <p className="mt-2 text-gray-500">
              Try another keyword or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
             <Link key={product._id} to={`/product/${product._id}`}>
                <div className="transition-all duration-300 hover:-translate-y-2">
                  <ProductCard product={product} />
                </div>
              </Link>
            ))}
          </div>
        )}
          
      </div>
      <div className="flex items-center justify-center gap-4 mt-12">

  <button
    disabled={currentPage === 1}
    onClick={() =>
      setCurrentPage((prev) => prev - 1)
    }
    className="px-5 py-3 rounded-full border border-pink-200 disabled:opacity-50"
  >
    Prev
  </button>

  {/* <span className="font-semibold">
    Page {currentPage} of {totalPages}
  </span> */}

  <button
    disabled={currentPage === totalPages}
    onClick={() =>
      setCurrentPage((prev) => prev + 1)
    }
    className="px-5 py-3 rounded-full border border-pink-200 disabled:opacity-50"
  >
    Next
  </button>

</div>
    </section>
  );
};

export default Shop;