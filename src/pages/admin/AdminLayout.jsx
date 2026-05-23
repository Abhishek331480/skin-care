import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const links = [
    { name: "Dashboard", path: "/admin" },
    { name: "Products", path: "/admin/products" },
    { name: "Add Product", path: "/admin/products/add" },
  ];

  return (
    <section className="h-screen bg-gray-50 overflow-hidden">
      <div className="grid h-full md:grid-cols-[260px_1fr]">
        
        {/* SIDEBAR */}
        <aside className="h-screen bg-black text-white p-6 overflow-hidden">
          <h2 className="text-2xl font-bold mb-8">
            Admin Panel
          </h2>

          <nav className="space-y-3">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}

                // IMPORTANT FIX
                end

                className={({ isActive }) =>
                  `block rounded-2xl px-4 py-3 font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-pink-600 text-white shadow-lg shadow-pink-500/20"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="h-screen overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default AdminLayout;