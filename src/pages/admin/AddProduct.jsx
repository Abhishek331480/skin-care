import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, PackagePlus, ImagePlus } from "lucide-react";
import api from "../../api/api";
import toast from "react-hot-toast";

const AddProduct = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    skinType: "",
    ingredients: "",
    benefits: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const form = new FormData();

      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("price", Number(formData.price));
      form.append("category", formData.category);
      form.append("stock", Number(formData.stock));
      form.append("skinType", formData.skinType);
      form.append("ingredients", formData.ingredients);
      form.append("benefits", formData.benefits);

      images.forEach((image) => {
        form.append("images", image);
      });

      await api.post("/products", form);

      toast.success("Product added successfully");
      navigate("/admin/products");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-pink-100 bg-white px-5 py-4 text-gray-800 outline-none transition focus:border-pink-400 focus:ring-4 focus:ring-pink-100";

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-pink-50 to-white/0 p-4 md:p-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[4px] text-pink-500">
            Admin Product
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold text-gray-950">
            Add New Product
          </h1>
          <p className="mt-3 text-gray-500">
            Create a premium skincare product with images, benefits and details.
          </p>
        </div>

       
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-[2.5rem] border border-pink-100 bg-white/80 backdrop-blur-xl p-6 md:p-8 shadow-2xl"
      >
        <div className="grid md:grid-cols-2 gap-5">
          <input
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
          />

          <input
            name="category"
            placeholder="Category e.g. Serum"
            value={formData.category}
            onChange={handleChange}
            className={inputClass}
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className={inputClass}
          />

          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className={inputClass}
          />

          <input
            name="skinType"
            placeholder="Skin Type e.g. Oily Skin"
            value={formData.skinType}
            onChange={handleChange}
            className={inputClass}
          />

          <label className="relative flex cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-pink-200 bg-pink-50/60 px-5 py-4 text-pink-700 font-semibold hover:bg-pink-100 transition">
            <ImagePlus size={22} />
            {images.length > 0 ? `${images.length} images selected` : "Upload Images"}
            <input
              type="file"
              multiple
              accept="image/*"
              // onChange={(e) => setImages(Array.from(e.target.files))}
              onChange={(e) => {
  const newFiles = Array.from(e.target.files);

  setImages((prev) => {
    const totalFiles = [...prev, ...newFiles];

    if (totalFiles.length > 4) {
      toast.error("Maximum 4 images allowed");
      return prev;
    }

    return totalFiles;
  });

  e.target.value = "";
}}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </label>

          {images.length > 0 && (
            <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="h-32 overflow-hidden rounded-2xl border border-pink-100 bg-pink-50"
                >
                  <img
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            className={`${inputClass} md:col-span-2 rounded-[2rem] resize-none`}
          />

          <input
            name="ingredients"
            placeholder="Ingredients comma separated"
            value={formData.ingredients}
            onChange={handleChange}
            className={`${inputClass} md:col-span-2`}
          />

          <input
            name="benefits"
            placeholder="Benefits comma separated"
            value={formData.benefits}
            onChange={handleChange}
            className={`${inputClass} md:col-span-2`}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-black py-4 text-white font-bold text-lg shadow-xl hover:bg-gray-900 transition disabled:opacity-50"
        >
          <Upload size={20} />
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </section>
  );
};

export default AddProduct;