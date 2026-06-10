import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2, Plus, Package, Search } from "lucide-react";
import api from "../../api/api";
import toast from "react-hot-toast";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("ALL");

  const stockTabs = ["ALL", "IN_STOCK", "LOW_STOCK", "OUT_OF_STOCK"];

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await api.get("/products", {
        params: {
          limit: 100,
        },
      });

      setProducts(res.data.products || []);
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      product.name?.toLowerCase().includes(searchText) ||
      product.category?.toLowerCase().includes(searchText) ||
      product.description?.toLowerCase().includes(searchText);

    const matchesStock =
      stockFilter === "ALL" ||
      (stockFilter === "IN_STOCK" && product.stock > 5) ||
      (stockFilter === "LOW_STOCK" &&
        product.stock > 0 &&
        product.stock <= 5) ||
      (stockFilter === "OUT_OF_STOCK" && product.stock <= 0);

    return matchesSearch && matchesStock;
  });

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);

      toast.success("Product deleted successfully");

      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="space-y-5">
        <div>
          <p className="text-sm font-semibold text-pink-600">
            Product Management
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-950">
            Products
          </h1>
        </div>

        <div className="rounded-[2rem] border border-pink-100 bg-white p-8 shadow-sm">
          <p className="text-gray-500">Loading products...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-10">
      {/* Header */}
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-pink-600">
            Product Management
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-950 sm:text-4xl">
            Products
          </h1>
        </div>

        <Link
          to="/admin/products/add"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-gray-200 transition hover:bg-gray-900"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      {/* Search + Tabs */}
      <div className="mb-7 rounded-[2rem] border border-pink-100 bg-white p-4 shadow-sm sm:p-5">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-pink-100 bg-pink-50/40 py-4 pl-11 pr-4 text-sm font-semibold text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-100"
          />
        </div>

        <div className="mt-4 flex scrollbar-hide gap-3 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible md:pb-0">
          {stockTabs.map((status) => (
            <button
              key={status}
              onClick={() => setStockFilter(status)}
              className={`
                shrink-0 whitespace-nowrap rounded-2xl px-5 py-3 text-xs font-bold transition sm:text-sm
                ${
                  stockFilter === status
                    ? "bg-pink-600 text-white shadow-lg shadow-pink-200"
                    : "border border-pink-100 bg-white text-gray-600 hover:border-pink-300 hover:bg-pink-50"
                }
              `}
            >
              {status === "ALL" && "All"}
              {status === "IN_STOCK" && "In Stock"}
              {status === "LOW_STOCK" && "Low Stock"}
              {status === "OUT_OF_STOCK" && "Out of Stock"}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-[2rem] border border-pink-100 bg-white p-10 text-center shadow-sm">
          <Package className="mx-auto mb-4 text-pink-500" size={48} />
          <h2 className="text-2xl font-bold text-gray-950">
            No products found
          </h2>
          <p className="mt-2 text-gray-500">
            Add your first skincare product.
          </p>
        </div>
      ) : (
        <div className="md:overflow-hidden md:rounded-[2rem] md:border md:border-pink-100 md:bg-white md:shadow-xl">
          {/* Desktop Table Header */}
          <div className="hidden bg-pink-50 px-6 py-4 text-sm font-bold text-gray-700 md:grid md:grid-cols-[80px_1.5fr_1fr_1fr_1fr_140px] md:gap-4">
            <span>Image</span>
            <span>Name</span>
            <span>Category</span>
            <span>Price</span>
            <span>Stock</span>
            <span className="text-right">Actions</span>
          </div>

          {/* Product List */}
          <div className="space-y-5 md:space-y-0 md:divide-y md:divide-pink-100">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="
                  rounded-[1.8rem] border border-pink-100 bg-white p-4 shadow-sm transition
                  hover:shadow-lg hover:shadow-pink-100/70
                  md:grid md:grid-cols-[80px_1.5fr_1fr_1fr_1fr_140px]
                  md:items-center md:gap-4 md:rounded-none md:border-0 md:p-0 md:px-6 md:py-5 md:shadow-none md:hover:bg-pink-50/40
                "
              >
                {/* Mobile Top */}
                <div className="flex gap-4 md:contents">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="h-24 w-24 shrink-0 rounded-3xl bg-pink-50 object-cover md:h-16 md:w-16 md:rounded-2xl"
                  />

                  <div className="min-w-0 flex-1 md:contents">
                    <div className="min-w-0">
                      <h3 className="line-clamp-1 text-sm font-extrabold text-gray-950 sm:text-base">
                        {product.name}
                      </h3>

                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500 md:line-clamp-1 md:text-sm">
                        {product.description}
                      </p>

                      {product.variants?.length > 0 && (
                        <div className="mt-3 md:mt-2">
                          <p className="text-xs font-bold text-pink-600">
                            {product.variants.length} Variants
                          </p>

                          <div className="mt-2 flex flex-wrap gap-2">
                            {product.variants.map((variant, index) => (
                              <span
                                key={index}
                                className="rounded-full bg-pink-50 px-2.5 py-1 text-[10px] font-bold text-pink-700"
                              >
                                {variant.size}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <p className="mt-4 text-xs font-semibold text-gray-700 md:mt-0 md:text-sm md:font-normal">
                      <span className="text-gray-400 md:hidden">
                        Category:{" "}
                      </span>
                      {product.category}
                    </p>

                    <div className="mt-2 md:mt-0">
                      <p className="text-sm font-extrabold text-gray-950 md:text-base">
                        ₹{product.price}
                      </p>

                      {product.variants?.length > 0 && (
                        <p className="text-[11px] font-medium text-gray-400">
                          Base Price
                        </p>
                      )}
                    </div>

                    <p
                      className={`mt-2 text-xs font-extrabold md:mt-0 md:text-sm ${
                        product.stock > 0 ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {product.stock > 0
                        ? `${product.stock} left`
                        : "Out of stock"}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-5 flex items-center justify-end gap-3 border-t border-pink-50 pt-4 md:mt-0 md:border-t-0 md:pt-0">
                  <Link
                    to={`/admin/products/edit/${product._id}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-pink-100 bg-white text-gray-700 transition hover:bg-pink-100"
                  >
                    <Edit size={17} />
                  </Link>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-red-100 bg-white text-red-500 transition hover:bg-red-50"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminProducts;