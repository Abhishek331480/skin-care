import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2, Plus, Package } from "lucide-react";
import api from "../../api/api";
import toast from "react-hot-toast";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
   

   const [search, setSearch] = useState("");
   const [stockFilter, setStockFilter] = useState("ALL");
   const stockTabs = [
  "ALL",
  "IN_STOCK",
  "LOW_STOCK",
  "OUT_OF_STOCK",
];
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await api.get("/products", {
        params: {
          limit: 100,
        },
      });

      setProducts(res.data.products);
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
  const matchesStock =
    stockFilter === "ALL" ||
    (stockFilter === "IN_STOCK" && product.stock > 5) ||
    (stockFilter === "LOW_STOCK" &&
      product.stock > 0 &&
      product.stock <= 5) ||
    (stockFilter === "OUT_OF_STOCK" &&
      product.stock <= 0);

  return matchesStock;
});

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);

      toast.success("Product deleted successfully");

      setProducts((prev) =>
        prev.filter((product) => product._id !== id)
      );
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section>
        <h1 className="text-3xl font-bold text-gray-950">Products</h1>
        <p className="mt-4 text-gray-500">Loading products...</p>
      </section>
    );
  }

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-sm font-semibold text-pink-600">
            Product Management
          </p>
          <h1 className="text-4xl font-bold text-gray-950 mt-2">
            Products
          </h1>
        </div>

        <Link
          to="/admin/products/add"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-white font-semibold hover:bg-gray-900 transition"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
  <input
    type="text"
    placeholder="Search products..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full rounded-2xl border border-pink-100 bg-white px-5 py-4 outline-none focus:ring-4 focus:ring-pink-100 md:max-w-md"
  />

 <div className="flex flex-wrap gap-3 mt-4">
  {stockTabs.map((status) => (
    <button
      key={status}
      onClick={() => setStockFilter(status)}
      className={`
        rounded-2xl px-5 py-3 text-sm font-bold transition
        ${
          stockFilter === status
            ? "bg-pink-600 text-white shadow-lg shadow-pink-200"
            : "bg-white border border-pink-100 text-gray-600 hover:border-pink-300"
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
        <div className="bg-white border border-pink-100 rounded-[2rem] p-12 text-center shadow-sm">
          <Package className="mx-auto text-pink-500 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-gray-950">
            No products found
          </h2>
          <p className="text-gray-500 mt-2">
            Add your first skincare product.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-pink-100 rounded-[2rem] shadow-xl overflow-hidden">
          <div className="hidden md:grid grid-cols-[80px_1.5fr_1fr_1fr_1fr_140px] gap-4 px-6 py-4 bg-pink-50 text-sm font-bold text-gray-700">
            <span>Image</span>
            <span>Name</span>
            <span>Category</span>
            <span>Price</span>
            <span>Stock</span>
            <span className="text-right">Actions</span>
          </div>

          <div className="divide-y divide-pink-100">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="grid md:grid-cols-[80px_1.5fr_1fr_1fr_1fr_140px] gap-4 px-6 py-5 items-center hover:bg-pink-50/40 transition"
              >
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="h-16 w-16 rounded-2xl object-cover bg-pink-50"
                />

                <div>
                  <h3 className="font-bold text-gray-950">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-1">
                    {product.description}
                  </p>
                </div>

                <p className="text-gray-700">{product.category}</p>

                <p className="font-bold text-gray-950">
                  ₹{product.price}
                </p>

                <p
                  className={`font-semibold ${
                    product.stock > 0
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {product.stock > 0
                    ? `${product.stock} left`
                    : "Out of stock"}
                </p>

                <div className="flex justify-start md:justify-end gap-3">
                  <Link
                    to={`/admin/products/edit/${product._id}`}
                    className="h-10 w-10 rounded-full border border-pink-100 flex items-center justify-center text-gray-700 hover:bg-pink-100 transition"
                  >
                    <Edit size={17} />
                  </Link>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="h-10 w-10 rounded-full border border-red-100 flex items-center justify-center text-red-500 hover:bg-red-50 transition"
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