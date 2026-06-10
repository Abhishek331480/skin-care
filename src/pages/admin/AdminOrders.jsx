import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import api from "../../api/api";
import toast from "react-hot-toast";

const getStatusClass = (status) => {
  if (status === "DELIVERED")
    return "bg-green-50 text-green-600 border-green-200";
  if (status === "SHIPPED") return "bg-blue-50 text-blue-600 border-blue-200";
  if (status === "PROCESSING")
    return "bg-yellow-50 text-yellow-600 border-yellow-200";
  if (status === "CANCELLED") return "bg-red-50 text-red-600 border-red-200";
  return "bg-pink-50 text-pink-600 border-pink-200";
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("ALL");

  const statusTabs = [
    "ALL",
    "PLACED",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ];

  const statusOptions = [
    "PLACED",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ];

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data.orders);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      const res = await api.put(`/orders/${orderId}/status`, {
        orderStatus: status,
      });

      toast.success(res.data.message);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, orderStatus: status } : order,
        ),
      );
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      activeStatus === "ALL" || order.orderStatus === activeStatus;

    const searchText = search.toLowerCase();

    const matchesSearch =
      order._id.toLowerCase().includes(searchText) ||
      order.user?.username?.toLowerCase().includes(searchText) ||
      order.items?.some((item) => item.name.toLowerCase().includes(searchText));

    return matchesStatus && matchesSearch;
  });

  // pagination code
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder,
  );

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <p className="py-10 font-semibold">Loading orders...</p>;
  }

  return (
    <section>
      <div className="mb-8">
        <p className="text-sm font-semibold text-pink-600">Order Management</p>
        <h1 className="text-4xl font-bold text-gray-950">Admin Orders</h1>
      </div>

      <div className="mb-8 flex flex-col xl:flex-row gap-4 xl:items-center justify-between">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search by order id, customer name, product..."
          className="
      w-full xl:max-w-md rounded-2xl border border-pink-100
      bg-white px-5 py-3 text-sm font-medium outline-none
      shadow-sm focus:border-pink-400 focus:ring-4
      focus:ring-pink-100
    "
        />

        <div className="flex flex-wrap items-center gap-2 overflow-x-auto whitespace-nowrap pb-1 border border-pink-100 p-2 rounded-2xl bg-white/80 shadow-sm">
  {statusTabs.map((status) => (
    <button
      key={status}
      onClick={() => {
        setActiveStatus(status);
        setCurrentPage(1);
      }}
      className={`
        shrink-0 rounded-xl px-4 py-2.5 text-sm font-bold transition
        ${
          activeStatus === status
            ? "bg-pink-600 text-white shadow-lg shadow-pink-200"
            : "bg-white text-gray-600 border border-pink-100 hover:bg-pink-50"
        }
      `}
    >
      {status}
    </button>
  ))}
</div>
      </div>

      {currentOrders.length === 0 && (
        <div className="rounded-3xl border border-pink-100 bg-white p-10 text-center shadow-lg">
          <p className="text-lg font-bold text-gray-900">No orders found</p>
          <p className="mt-1 text-sm text-gray-500">
            Try another search or status filter.
          </p>
        </div>
      )}

      {/* show single product on UI code*/}
      <div className="space-y-6">
        {currentOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white border border-pink-100 rounded-[2rem] p-6 shadow-xl"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-pink-100 pb-4">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <h2 className="font-bold text-gray-950">{order._id}</h2>

                <p className="text-sm text-gray-500 mt-2">
                  Customer:{" "}
                  <span className="font-semibold text-gray-900">
                    {order.user?.username || "Customer"}
                  </span>
                </p>
              </div>

              <Listbox
                value={order.orderStatus}
                onChange={(status) => handleStatusChange(order._id, status)}
              >
                <div className="relative w-56">
                  <Listbox.Button
                    className={`
                      relative w-full rounded-2xl border px-5 py-3 pr-11
                      text-left text-sm font-bold shadow-sm transition
                      focus:outline-none focus:ring-4 focus:ring-pink-100
                      ${getStatusClass(order.orderStatus)}
                    `}
                  >
                    {order.orderStatus}

                    <ChevronDown
                      size={18}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    />
                  </Listbox.Button>

                  <Listbox.Options className="absolute right-0 z-50 mt-1 w-full overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-2xl">
                    {statusOptions.map((status) => (
                      <Listbox.Option
                        key={status}
                        value={status}
                        className={({ active }) =>
                          `cursor-pointer px-5 py-1 text-sm font-semibold transition ${
                            active ? "bg-pink-50" : "bg-white"
                          }`
                        }
                      >
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 ${getStatusClass(
                            status,
                          )}`}
                        >
                          {status}
                        </span>
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>

            <div className="mt-5 space-y-4">
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-2xl object-cover bg-pink-50"
                    />

                    <div>
                      <h3 className="font-bold text-gray-950">{item.name}</h3>
                      {item.variant?.size && (
  <p className="text-sm font-semibold text-pink-600">
    Size: {item.variant.size}
  </p>
)}
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <p className="font-bold text-gray-950">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 border-t border-pink-100 pt-4 flex justify-between">
              <span className="font-bold">Total</span>
              <span className="text-2xl font-bold">₹{order.totalAmount}</span>

              {order.couponCode && (
                <p className="text-sm text-green-600">
                  Coupon: {order.couponCode} | Discount: ₹{order.discountAmount}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* show multiple product on UI  code*/}

      {/* prev and next btn code */}
      <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
          className="
      rounded-2xl border px-5 py-2 font-semibold
      disabled:opacity-50
      bg-white hover:bg-pink-50
    "
        >
          Previous
        </button>

        {/* {Array.from({ length: totalPages }).map((_, index) => (
    <button
      key={index}
      onClick={() => setCurrentPage(index + 1)}
      className={`
        h-11 w-11 rounded-2xl font-bold transition
        ${
          currentPage === index + 1
            ? "bg-pink-600 text-white shadow-lg"
            : "bg-white border hover:bg-pink-50"
        }
      `}
    >
      {index + 1}
    </button>
  ))} */}

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
          className="
      rounded-2xl border px-5 py-2 font-semibold
      disabled:opacity-50
      bg-white hover:bg-pink-50
    "
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default AdminOrders;
