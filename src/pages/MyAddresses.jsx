import { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";
import { MapPin, Trash2, Edit, CheckCircle2 } from "lucide-react";

const emptyForm = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  isDefault: false,
};

const MyAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAddresses = async () => {
    try {
      const res = await api.get("/addresses");
      setAddresses(res.data.addresses);
    } catch (error) {
      toast.error("Failed to fetch addresses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        const res = await api.put(`/addresses/${editingId}`, formData);
        toast.success(res.data.message);
      } else {
        const res = await api.post("/addresses", formData);
        toast.success(res.data.message);
      }

      setFormData(emptyForm);
      setEditingId(null);
      fetchAddresses();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save address");
    }
  };

  const handleEdit = (address) => {
    setEditingId(address._id);

    setFormData({
      fullName: address.fullName,
      phone: address.phone,
      address: address.address,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      isDefault: address.isDefault,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this address?")) return;

    try {
      const res = await api.delete(`/addresses/${id}`);
      toast.success(res.data.message);
      fetchAddresses();
    } catch (error) {
      toast.error("Failed to delete address");
    }
  };

  const setDefaultAddress = async (address) => {
    try {
      const res = await api.put(`/addresses/${address._id}`, {
        ...address,
        isDefault: true,
      });

      toast.success(res.data.message);
      fetchAddresses();
    } catch (error) {
      toast.error("Failed to set default address");
    }
  };

  if (loading) {
    return <div className="py-20 text-center font-bold">Loading addresses...</div>;
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-[2.5rem] border border-white bg-white/90 p-8 shadow-xl">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-pink-600">
            Delivery
          </p>

          <h1 className="mt-3 text-4xl font-black text-gray-950">
            My Addresses
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your saved delivery addresses.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[2.5rem] border border-pink-100 bg-white p-6 shadow-xl"
          >
            <h2 className="text-2xl font-black text-gray-950">
              {editingId ? "Edit Address" : "Add New Address"}
            </h2>

            <div className="mt-6 space-y-4">
              {[
                ["fullName", "Full Name"],
                ["phone", "Phone"],
                ["address", "Address"],
                ["city", "City"],
                ["state", "State"],
                ["pincode", "Pincode"],
              ].map(([name, label]) => (
                <input
                  key={name}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={label}
                  className="w-full rounded-full border border-pink-100 bg-pink-50/50 px-5 py-4 outline-none focus:ring-4 focus:ring-pink-100"
                  required
                />
              ))}

              <label className="flex items-center gap-3 font-bold text-gray-700">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleChange}
                />
                Set as default address
              </label>

              <button className="w-full rounded-full bg-black py-4 font-black text-white">
                {editingId ? "Update Address" : "Save Address"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setFormData(emptyForm);
                  }}
                  className="w-full rounded-full bg-gray-100 py-4 font-black text-gray-700"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          <div className="space-y-5">
            {addresses.length === 0 ? (
              <div className="rounded-[2.5rem] border border-pink-100 bg-white p-10 text-center shadow-xl">
                <MapPin size={42} className="mx-auto text-pink-500" />
                <h2 className="mt-4 text-2xl font-black text-gray-950">
                  No addresses saved
                </h2>
                <p className="mt-2 text-gray-500">
                  Add your first delivery address.
                </p>
              </div>
            ) : (
              addresses.map((item) => (
                <div
                  key={item._id}
                  className="rounded-[2rem] border border-pink-100 bg-white p-6 shadow-xl"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="mb-3 flex items-center gap-3">
                        <h3 className="text-xl font-black text-gray-950">
                          {item.fullName}
                        </h3>

                        {item.isDefault && (
                          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-600">
                            Default
                          </span>
                        )}
                      </div>

                      <p className="font-semibold text-gray-600">
                        {item.phone}
                      </p>
                      <p className="mt-2 text-gray-600">{item.address}</p>
                      <p className="text-gray-600">
                        {item.city}, {item.state} - {item.pincode}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {!item.isDefault && (
                        <button
                          onClick={() => setDefaultAddress(item)}
                          className="rounded-full bg-green-50 p-3 text-green-600 hover:bg-green-100"
                        >
                          <CheckCircle2 size={18} />
                        </button>
                      )}

                      <button
                        onClick={() => handleEdit(item)}
                        className="rounded-full bg-blue-50 p-3 text-blue-600 hover:bg-blue-100"
                      >
                        <Edit size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="rounded-full bg-red-50 p-3 text-red-600 hover:bg-red-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyAddresses;