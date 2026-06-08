import { useEffect, useState } from "react";
import {
  Package,
  ShoppingBag,
  Users,
  IndianRupee,
  Clock,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import api from "../../api/api";
import toast from "react-hot-toast";
import Chart from "react-apexcharts";


const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const getStatusClass = (status) => {
    if (status === "DELIVERED")
      return "bg-emerald-500/10 text-emerald-700 border-emerald-200";
    if (status === "SHIPPED")
      return "bg-blue-500/10 text-blue-700 border-blue-200";
    if (status === "PROCESSING")
      return "bg-amber-500/10 text-amber-700 border-amber-200";
    if (status === "CANCELLED")
      return "bg-red-500/10 text-red-700 border-red-200";

    return "bg-pink-500/10 text-pink-700 border-pink-200";
  };

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        setStats(res.data);
      } catch (error) {
        toast.error("Failed to fetch dashboard stats");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen bg-[#fff7fb] p-4 md:p-8">
        <div className="animate-pulse space-y-8">
          <div className="h-32 rounded-[2rem] bg-pink-100" />
          <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-40 rounded-[2rem] bg-pink-100" />
            ))}
          </div>
          <div className="h-96 rounded-[2rem] bg-pink-100" />
        </div>
      </section>
    );
  }

  const cards = [
    {
      title: "Total Products",
      value: stats?.totalProducts || 0,
      icon: Package,
      gradient: "from-pink-500 to-rose-500",
    },
    {
      title: "Total Orders",
      value: stats?.totalOrders || 0,
      icon: ShoppingBag,
      gradient: "from-violet-500 to-fuchsia-500",
    },
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Total Revenue",
      value: `₹${stats?.totalRevenue || 0}`,
      icon: IndianRupee,
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      title: "Pending Orders",
      value: stats?.pendingOrders || 0,
      icon: Clock,
      gradient: "from-amber-500 to-orange-500",
    },
  ];

  // const chartData =
  // stats?.monthlyRevenue?.map((item) => ({
  //   month: `${item._id.month}/${item._id.year}`,
  //   revenue: item.revenue,
  //   orders: item.orders,
  // })) || [];

 const currentMonthRevenue =
  stats?.monthlyRevenue?.[stats.monthlyRevenue.length - 1];

const staticData = [
  {
    month: "Jan",
    revenue: 15000,
    orders: 4,
  },
  {
    month: "Feb",
    revenue: 35000,
    orders: 7,
  },
  {
    month: "Mar",
    revenue: 70000,
    orders: 12,
  },
  {
    month: "Apr",
    revenue: 30000,
    orders: 9,
  },
  {
    month: "May",
    revenue: 156000,
    orders: 30,
  },
];

const dynamicData =
  stats?.monthlyRevenue?.map((item) => ({
    month: new Date(
      item._id.year,
      item._id.month - 1
    ).toLocaleString("default", {
      month: "short",
    }),

    revenue: item.revenue,
    orders: item.orders,
  })) || [];

const chartData = [
  ...staticData,
  ...dynamicData,
];

const revenueOptions = {
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  stroke: {
    curve: "smooth",
    width: 4,
  },
  colors: ["#ec4899"],
  xaxis: {
    categories: chartData.map((item) => item.month),
  },
  grid: {
    borderColor: "#fbcfe8",
  },
  
};

const revenueSeries = [
  {
    name: "Revenue",
    data: chartData.map((item) => item.revenue),
  },
];

const orderStatusOptions = {
  labels: ["Total Orders", "Pending Orders", "Completed Orders"],
  colors: ["#ec4899", "#f59e0b", "#10b981"],
  legend: {
    position: "bottom",
  },
};

const completedOrders =
  (stats?.totalOrders || 0) - (stats?.pendingOrders || 0);

const orderStatusSeries = [
  stats?.totalOrders || 0,
  stats?.pendingOrders || 0,
  completedOrders < 0 ? 0 : completedOrders,
];

const ordersOptions = {
  chart: {
    toolbar: { show: false },
  },
  colors: ["#8b5cf6"],
  xaxis: {
    categories: chartData.map((item) => item.month),
  },
  grid: {
    borderColor: "#ede9fe",
  },
};

const ordersSeries = [
  {
    name: "Orders",
    data: chartData.map((item) => item.orders),
  },
];

const lowStockProducts = stats?.lowStockProducts || [];

const topSellingProducts = stats?.topSellingProducts || [];
//   console.log("STATS:", stats);
// console.log("CHART DATA:", chartData);

  return (
    <section className="min-h-screen p-4 md:p-8">
      <div className="mb-8 overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/70 p-6 md:p-8 shadow-[0_20px_70px_rgba(236,72,153,0.18)] backdrop-blur-xl relative">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-pink-300/30 blur-3xl" />
        <div className="absolute -bottom-24 left-20 h-56 w-56 rounded-full bg-purple-300/20 blur-3xl" />

        <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-4 py-2 text-sm font-bold text-pink-700">
              <Sparkles size={16} />
              Admin Overview
            </div>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-950">
               Dashboard
            </h1>

            {/* <p className="mt-3 max-w-xl text-gray-500">
              Manage products, orders, users and revenue from one premium admin
              control panel.
            </p> */}
          </div>

          <div className="rounded-3xl border border-pink-100 bg-white/80 px-5 py-4 shadow-lg">
            <p className="text-sm text-gray-500">Total Revenue</p>
            <h2 className="mt-1 text-3xl font-black text-gray-950">
              ₹{stats?.totalRevenue || 0}
            </h2>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-4">
  {cards.map((card) => {
    const Icon = card.icon;

    return (
      <div
        key={card.title}
        className="group relative overflow-hidden rounded-[1.7rem] border border-white/70 bg-white/85 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(236,72,153,0.15)]"
      >
        {/* glow */}
        <div
          className={`absolute -right-8 -top-8 h-20 w-20 rounded-full bg-gradient-to-br ${card.gradient} opacity-20 blur-2xl`}
        />

        {/* top */}
        <div className="relative flex items-start justify-between">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${card.gradient} text-white shadow-lg`}
          >
            <Icon size={20} />
          </div>

          <ArrowUpRight
            size={18}
            className="text-gray-300 transition group-hover:text-pink-500"
          />
        </div>

        {/* content */}
        <div className="relative mt-5">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
            {card.title}
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-tight text-gray-950">
            {card.value}
          </h2>
        </div>
      </div>
    );
  })}
</div>


{/* <div className="mt-10 rounded-[2rem] border border-pink-100 bg-white p-6 shadow-xl">
  <div className="mb-6">
    <p className="text-sm font-semibold text-pink-600">
      Revenue Analytics
    </p>

    <h2 className="text-2xl font-bold text-gray-950">
      Monthly Revenue
    </h2>
  </div>

    <Chart
      options={revenueOptions}
      series={revenueSeries}
      type="area"
      height={330}
    />

    <div className="rounded-[2rem] border border-pink-100 bg-white p-6 shadow-xl">
    <div className="mb-6">
      <p className="text-sm font-semibold text-pink-600">
        Order Analytics
      </p>
      <h2 className="text-2xl font-bold text-gray-950">
        Order Status
      </h2>
    </div>

    <Chart
      options={orderStatusOptions}
      series={orderStatusSeries}
      type="donut"
      height={330}
    />
  </div>

  <div className="rounded-[2rem] border border-pink-100 bg-white p-6 shadow-xl xl:col-span-2">
    <div className="mb-6">
      <p className="text-sm font-semibold text-purple-600">
        Orders Growth
      </p>
      <h2 className="text-2xl font-bold text-gray-950">
        Monthly Orders
      </h2>
    </div>

    <Chart
      options={ordersOptions}
      series={ordersSeries}
      type="bar"
      height={330}
    />
  </div>
</div> */}

<div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-3">
  {/* Revenue Chart */}
  <div className="rounded-[2rem] border border-pink-100 bg-white p-6 shadow-xl xl:col-span-2">
    <div className="mb-6">
      <p className="text-sm font-semibold text-pink-600">
        Revenue Analytics
      </p>

      <h2 className="text-2xl font-bold text-gray-950">
        Monthly Revenue
      </h2>
    </div>

    <Chart
      options={revenueOptions}
      series={revenueSeries}
      type="area"
      height={330}
    />
  </div>

  {/* Order Status */}
  <div className="rounded-[2rem] border border-pink-100 bg-white p-6 shadow-xl">
    <div className="mb-6">
      <p className="text-sm font-semibold text-pink-600">
        Order Analytics
      </p>

      <h2 className="text-2xl font-bold text-gray-950">
        Order Status
      </h2>
    </div>

    <Chart
      options={orderStatusOptions}
      series={orderStatusSeries}
      type="donut"
      height={330}
    />
  </div>

  {/* Monthly Orders */}
  <div className="relative overflow-hidden rounded-[2.5rem] border border-purple-100 bg-white p-6 shadow-[0_25px_70px_rgba(124,58,237,0.14)] xl:col-span-3">
  <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-purple-300/30 blur-3xl" />
  <div className="absolute -bottom-20 left-10 h-44 w-44 rounded-full bg-pink-300/25 blur-3xl" />

  <div className="relative mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <div>
      <div className="mb-3 inline-flex items-center rounded-full border border-purple-100 bg-purple-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-purple-600">
        Orders Growth
      </div>

      <h2 className="text-3xl font-black tracking-tight text-gray-950">
        Monthly Orders
      </h2>

      <p className="mt-2 text-sm font-medium text-gray-500">
        Track monthly order performance and growth.
      </p>
    </div>

    <div className="rounded-3xl border border-purple-100 bg-white/80 px-5 py-4 shadow-lg">
      <p className="text-xs font-bold uppercase text-gray-400">
        Total Orders
      </p>
      <h3 className="mt-1 text-3xl font-black text-gray-950">
        {stats?.totalOrders || 0}
      </h3>
    </div>
  </div>

  <div className="relative rounded-[2rem] border border-purple-100 bg-gradient-to-br from-purple-50/80 via-white to-pink-50/70 p-4">
    <Chart
      options={ordersOptions}
      series={ordersSeries}
      type="bar"
      height={350}
    />
  </div>
</div>
</div>

 {/* top selling product */}
<div className="mt-10 rounded-[2.5rem] border border-white/70 bg-white/85 p-6 shadow-xl">
  <div className="mb-6">
    <p className="text-sm font-bold text-pink-600">
      Product Analytics
    </p>

    <h2 className="text-3xl font-black text-gray-950">
      Top Selling Products
    </h2>
  </div>

  <div className="space-y-4">
    {topSellingProducts.length === 0 ? (
      <p className="text-gray-500">No selling data found.</p>
    ) : (
      topSellingProducts.map((product, index) => (
        <div
          key={product._id}
          className="flex items-center justify-between rounded-3xl border border-pink-100 bg-white p-5 shadow-sm"
        >
          <div>
            <p className="text-sm font-bold text-pink-600">
              #{index + 1}
            </p>

            <h3 className="font-black text-gray-950">
              {product.name}
            </h3>
          </div>

          <div className="text-right">
            <p className="font-bold text-gray-950">
              {product.totalSold} sold
            </p>

            <p className="text-sm text-green-600">
              ₹{product.revenue}
            </p>
          </div>
        </div>
      ))
    )}
  </div>
</div>
 
  {/* outof stock alert code  */}

  <div className="mt-10 rounded-[2.5rem] border border-red-100 bg-white p-6 shadow-xl">
  <div className="mb-6">
    <p className="text-sm font-bold text-red-500">
      Inventory Alerts
    </p>

    <h2 className="text-3xl font-black text-gray-950">
      Low Stock Products
    </h2>
  </div>

  <div className="space-y-4">
    {lowStockProducts.length === 0 ? (
      <p className="text-gray-500">
        All products have enough stock.
      </p>
    ) : (
      lowStockProducts.map((product) => (
        <div
          key={product._id}
          className="flex items-center justify-between rounded-3xl border border-red-100 bg-red-50/40 p-5"
        >
          <div className="flex items-center gap-4">
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="h-14 w-14 rounded-2xl object-cover bg-white"
            />

            <div>
              <h3 className="font-black text-gray-950">
                {product.name}
              </h3>

              <p className="text-sm text-gray-500">
                {product.category}
              </p>
            </div>
          </div>

          <span className="rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white">
            {product.stock} left
          </span>
        </div>
      ))
    )}
  </div>
</div>


      {/* recent orders */}
      <div className="mt-10 overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/80 p-5 md:p-7 shadow-[0_25px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl">
        <div className="mb-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-pink-600">Latest Activity</p>
            <h2 className="mt-1 text-3xl font-black text-gray-950">
              Recent Orders
            </h2>
          </div>

          <span className="rounded-full border border-pink-100 bg-pink-50 px-4 py-2 text-sm font-bold text-pink-700">
            {stats?.recentOrders?.length || 0} Orders
          </span>
        </div>

        {stats?.recentOrders?.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-pink-200 bg-pink-50/60 p-10 text-center">
            <p className="font-bold text-gray-700">No recent orders found.</p>
            <p className="mt-1 text-sm text-gray-500">
              Latest orders will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {stats?.recentOrders?.map((order) => (
              <div
                key={order._id}
                className="group flex flex-col gap-5 rounded-3xl border border-pink-100 bg-white p-5 shadow-sm transition-all duration-300 hover:border-pink-200 hover:shadow-xl md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white font-black shadow-lg">
                    {(order.user?.username || "C").charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <p className="font-black text-gray-950">
                      {order.user?.username || "Customer"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.user?.email || "No email available"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 md:justify-end">
                  <span className="rounded-2xl bg-gray-50 px-4 py-2 font-black text-gray-950">
                    ₹{order.totalAmount}
                  </span>

                  <span className="rounded-2xl bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString("en-IN")}
                  </span>

                  <span
                    className={`rounded-full border px-4 py-2 text-sm font-black ${getStatusClass(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminDashboard;