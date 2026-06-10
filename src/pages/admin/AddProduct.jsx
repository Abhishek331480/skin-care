import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  ImagePlus,
  Sparkles,
  PackagePlus,
  X,
  IndianRupee,
  Boxes,
} from "lucide-react";
import api from "../../api/api";
import toast from "react-hot-toast";

const AddProduct = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [variants, setVariants] = useState([
    {
      size: "",
      price: "",
      stock: "",
      sku: "",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    skinType: "",
    ingredients: "",
    benefits: "",
    variants: [],
    isBestSeller: false,
  });

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variants];

    updatedVariants[index][field] = value;

    setVariants(updatedVariants);
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        size: "",
        price: "",
        stock: "",
        sku: "",
      },
    ]);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
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
      form.append("variants", JSON.stringify(variants));
      form.append("isBestSeller", formData.isBestSeller);
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
    "w-full rounded-2xl border border-pink-100 bg-pink-50/40 px-5 py-4 font-semibold text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100";

  return (
    <section className="min-h-screen p-4 md:p-8">
      <div className="mb-8 relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/75 p-6 md:p-8 shadow-[0_20px_70px_rgba(236,72,153,0.18)] backdrop-blur-xl">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-pink-300/30 blur-3xl" />
        <div className="absolute -bottom-24 left-20 h-56 w-56 rounded-full bg-purple-300/20 blur-3xl" />

        <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-4 py-2 text-sm font-bold text-pink-700">
              <Sparkles size={16} />
              Premium Product Studio
            </div>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-950">
              Add New Product
            </h1>

            <p className="mt-3 max-w-2xl text-gray-500">
              Create a luxury skincare product with images, pricing, benefits,
              ingredients and stock details.
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-[2.5rem] border border-white/70 bg-white/85 p-5 md:p-8 shadow-[0_25px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl"
      >
        <div className="mb-7 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-pink-600">Product Details</p>
            <h2 className="text-3xl font-black text-gray-950">
              Basic Information
            </h2>
          </div>

          <span className="rounded-full border border-pink-100 bg-pink-50 px-4 py-2 text-sm font-bold text-pink-700">
            Max 4 Images
          </span>
        </div>

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

          <div className="relative">
            <IndianRupee
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-pink-500"
            />
            <input
              name="price"
              type="number"
              placeholder="Base Price / Auto from variants"
              value={formData.price}
              onChange={handleChange}
              className={`${inputClass} pl-12`}
            />
          </div>

          <div className="relative">
            <Boxes
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-pink-500"
            />
            <input
              name="stock"
              type="number"
              placeholder="Base Stock / Auto from variants"
              value={formData.stock}
              onChange={handleChange}
              className={`${inputClass} pl-12`}
            />
          </div>

          <input
            name="skinType"
            placeholder="Skin Type e.g. Oily Skin"
            value={formData.skinType}
            onChange={handleChange}
            className={inputClass}
          />
          {/* <select
  name="skinType"
  value={formData.skinType}
  onChange={handleChange}
  className={inputClass}
>
  <option value="">Select Skin Type</option>
  <option value="Oily">Oily</option>
  <option value="Dry">Dry</option>
  <option value="Sensitive">Sensitive</option>
  <option value="Combination">Combination</option>
  <option value="Acne">Acne</option>
</select> */}

          <label className="flex items-center gap-3 rounded-2xl border border-pink-100 bg-pink-50/40 px-5 py-4 font-bold text-gray-700">
            <input
              type="checkbox"
              name="isBestSeller"
              checked={formData.isBestSeller}
              onChange={handleChange}
              className="h-5 w-5 accent-pink-600"
            />
            Mark as Best Seller
          </label>

          <label className="relative flex cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-pink-200 bg-gradient-to-br from-pink-50 to-white px-5 py-4 text-pink-700 font-black transition hover:border-pink-300 hover:bg-pink-100">
            <ImagePlus size={22} />
            {images.length > 0
              ? `${images.length} images selected`
              : "Upload Product Images"}

            <input
              type="file"
              multiple
              accept="image/*"
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
              className="absolute inset-0 cursor-pointer opacity-0"
            />
          </label>

          {images.length > 0 && (
            <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="group relative h-36 overflow-hidden rounded-3xl border border-pink-100 bg-pink-50 shadow-sm"
                >
                  <img
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-500 shadow-lg transition hover:bg-red-50"
                  >
                    <X size={16} />
                  </button>
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
            className={`${inputClass} md:col-span-2 resize-none rounded-[2rem]`}
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

          <div className="md:col-span-2 mt-4 rounded-[2rem] border border-pink-100 bg-pink-50/30 p-5">
            <div className="mb-4 md:flex md:items-center md:justify-between">
              <h3 className="text-xl font-black text-gray-950 mb-3 text-center">
                Product Variants
              </h3>

              <button
                type="button"
                onClick={addVariant}
                className="
    w-full sm:w-auto
    rounded-full bg-pink-600
    px-5 py-3
    text-sm font-bold text-white
    shadow-lg shadow-pink-200
    transition hover:bg-pink-700
  "
              >
                + Add Variant
              </button>
            </div>

            <div className="space-y-4">
              {variants.map((variant, index) => (
                <div
                  key={index}
                  className="grid gap-3 rounded-2xl border border-pink-100 bg-white p-4 md:grid-cols-4"
                >
                  <input
                    type="text"
                    placeholder="Size (10ml)"
                    value={variant.size}
                    onChange={(e) =>
                      handleVariantChange(index, "size", e.target.value)
                    }
                    className={inputClass}
                  />

                  <input
                    type="number"
                    placeholder="Price"
                    value={variant.price}
                    onChange={(e) =>
                      handleVariantChange(index, "price", e.target.value)
                    }
                    className={inputClass}
                  />

                  <input
                    type="number"
                    placeholder="Stock"
                    value={variant.stock}
                    onChange={(e) =>
                      handleVariantChange(index, "stock", e.target.value)
                    }
                    className={inputClass}
                  />

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="SKU"
                      value={variant.sku}
                      onChange={(e) =>
                        handleVariantChange(index, "sku", e.target.value)
                      }
                      className={inputClass}
                    />

                    {variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariant(index)}
                        className="rounded-xl bg-red-100 px-4 text-red-600"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="w-full rounded-2xl border border-pink-100 bg-white px-6 py-4 font-black text-gray-700 shadow-sm transition hover:bg-pink-50 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-gray-950 via-pink-900 to-gray-950 px-6 py-4 text-lg font-black text-white shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Upload size={20} />
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddProduct;
