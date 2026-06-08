import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import toast from "react-hot-toast";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [images, setImages] = useState([]);
  const [variants, setVariants] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    skinType: "",
    ingredients: "",
    benefits: "",
    isBestSeller: false,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        const product = res.data.product;

        setFormData({
          name: product.name || "",
          description: product.description || "",
          price: product.price || "",
          category: product.category || "",
          stock: product.stock || "",
          skinType: product.skinType || "",
          ingredients: product.ingredients?.join(", ") || "",
          benefits: product.benefits?.join(", ") || "",
          images: product.images || [],
          isBestSeller: product.isBestSeller || false,
        });
        setVariants(product.variants || []);
      } catch (error) {
        toast.error("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      const form = new FormData();

      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("price", formData.price);
      form.append("category", formData.category);
      form.append("stock", formData.stock);
      form.append("skinType", formData.skinType);
      form.append("ingredients", formData.ingredients);
      form.append("benefits", formData.benefits);
      form.append("variants", JSON.stringify(variants));
      form.append("isBestSeller", formData.isBestSeller);
      images.forEach((image) => {
        form.append("images", image);
      });

      const res = await api.put(`/products/${id}`, form);

      toast.success(res.data.message || "Product updated successfully");

      navigate("/admin/products");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update product");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <p className="font-semibold">Loading product...</p>;
  }

  return (
    <section>
      <div className="mb-8">
        <p className="text-sm font-semibold text-pink-600">Admin Product</p>
        <h1 className="text-4xl font-bold text-gray-950 mt-2">Edit Product</h1>
      </div>

      <form
        onSubmit={handleUpdate}
        className="bg-white border border-pink-100 rounded-[2rem] p-6 shadow-xl grid md:grid-cols-2 gap-5"
      >
        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="border rounded-full px-5 py-4"
        />

        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="border rounded-full px-5 py-4"
        />

        <input
          name="price"
          type="number"
         placeholder="Base Price / Auto from variants"
          value={formData.price}
          onChange={handleChange}
          className="border rounded-full px-5 py-4"
        />

        <input
          name="stock"
          type="number"
          placeholder="Base Stock / Auto from variants"
          value={formData.stock}
          onChange={handleChange}
          className="border rounded-full px-5 py-4"
        />

        <input
          name="skinType"
          placeholder="Skin Type"
          value={formData.skinType}
          onChange={handleChange}
          className="border rounded-full px-5 py-4"
        />

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

        <div className="md:col-span-2">
          <p className="font-semibold mb-3">Current Images</p>

          <div className="flex flex-wrap gap-4">
            {Array.isArray(formData.images) &&
              formData.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="product"
                  className="h-24 w-24 rounded-2xl object-cover border"
                />
              ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-3">Upload New Images</label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages(Array.from(e.target.files))}
            className="w-full border rounded-2xl px-5 py-4"
          />
        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="md:col-span-2 border rounded-[2rem] px-5 py-4"
        />

        <input
          name="ingredients"
          placeholder="Ingredients comma separated"
          value={formData.ingredients}
          onChange={handleChange}
          className="md:col-span-2 border rounded-full px-5 py-4"
        />

        <input
          name="benefits"
          placeholder="Benefits comma separated"
          value={formData.benefits}
          onChange={handleChange}
          className="md:col-span-2 border rounded-full px-5 py-4"
        />

        <div className="md:col-span-2 rounded-[2rem] border border-pink-100 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold">Product Variants</h3>

            <button
              type="button"
              onClick={addVariant}
              className="rounded-full bg-pink-600 px-4 py-2 text-white"
            >
              + Add Variant
            </button>
          </div>

          <div className="space-y-4">
            {variants.map((variant, index) => (
              <div key={index} className="grid gap-3 md:grid-cols-4">
                <input
                  placeholder="Size"
                  value={variant.size}
                  onChange={(e) =>
                    handleVariantChange(index, "size", e.target.value)
                  }
                  className="border rounded-xl px-4 py-3"
                />

                <input
                  type="number"
                  placeholder="Price"
                  value={variant.price}
                  onChange={(e) =>
                    handleVariantChange(index, "price", e.target.value)
                  }
                  className="border rounded-xl px-4 py-3"
                />

                <input
                  type="number"
                  placeholder="Stock"
                  value={variant.stock}
                  onChange={(e) =>
                    handleVariantChange(index, "stock", e.target.value)
                  }
                  className="border rounded-xl px-4 py-3"
                />

                <div className="flex gap-2">
                  <input
                    placeholder="SKU"
                    value={variant.sku}
                    onChange={(e) =>
                      handleVariantChange(index, "sku", e.target.value)
                    }
                    className="flex-1 border rounded-xl px-4 py-3"
                  />

                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="rounded-xl bg-red-100 px-4 text-red-600"
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={updating}
          className="md:col-span-2 rounded-full bg-black py-4 text-white font-semibold disabled:opacity-50 cursor-pointer"
        >
          {updating ? "Updating..." : "Update Product"}
        </button>
      </form>
    </section>
  );
};

export default EditProduct;
