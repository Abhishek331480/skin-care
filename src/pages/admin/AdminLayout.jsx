import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const links = [
    { name: "Dashboard", path: "/admin" },
    { name: "Products", path: "/admin/products" },
    { name: "Add Product", path: "/admin/products/add" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Coupons", path: "/admin/coupons" },
  ];

  return (
    <section className="min-h-screen bg-gray-50">
      <aside className="md:fixed md:left-0 md:top-0 md:h-screen md:w-64 bg-black text-white p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-8">
          Admin Panel
        </h2>

        <nav className="flex md:block gap-3 overflow-x-auto md:overflow-visible md:space-y-3">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end
              className={({ isActive }) =>
                `shrink-0 block rounded-2xl px-4 py-3 font-medium transition ${
                  isActive
                    ? "bg-pink-600 text-white"
                    : "text-gray-300 hover:bg-white/10"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="md:ml-64 min-h-screen p-4 md:p-8">
        <Outlet />
      </main>
    </section>
  );
};

export default AdminLayout;