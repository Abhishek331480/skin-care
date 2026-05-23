const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Products",
      value: 9,
    },
    {
      title: "Orders",
      value: 24,
    },
    {
      title: "Users",
      value: 12,
    },
    {
      title: "Revenue",
      value: "₹45,000",
    },
  ];

  return (
    <section>
      <div className="mb-8">
        <p className="text-sm font-semibold text-pink-600">
          Admin Overview
        </p>

        <h1 className="text-4xl font-bold text-gray-950 mt-2">
          Dashboard
        </h1>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-[2rem] border border-pink-100 p-6 shadow-sm hover:shadow-xl transition"
          >
            <p className="text-gray-500 text-sm">
              {item.title}
            </p>

            <h2 className="text-3xl font-bold text-gray-950 mt-3">
              {item.value}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminDashboard;