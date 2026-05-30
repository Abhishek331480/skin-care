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
      });
    } catch (error) {
      toast.error("Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
}, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
        <h1 className="text-4xl font-bold text-gray-950 mt-2">
          Edit Product
        </h1>
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
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border rounded-full px-5 py-4"
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
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
  <label className="block font-semibold mb-3">
    Upload New Images
  </label>

  <input
    type="file"
    multiple
    accept="image/*"
    onChange={(e) =>
      setImages(Array.from(e.target.files))
    }
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