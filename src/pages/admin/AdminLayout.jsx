import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/slices/authSlice";
import api from "../../api/api";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingBag,
  TicketPercent,
  LogOut,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await api.post("/auth/admin/logout");
    dispatch(logoutUser());
    navigate("/admin/login");
  };

  const links = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard, end: true },
    { name: "Products", path: "/admin/products", icon: Package, end: true },
    { name: "Add Product", path: "/admin/products/add", icon: PlusCircle, end: true },
    { name: "Orders", path: "/admin/orders", icon: ShoppingBag, end: true },
    { name: "Coupons", path: "/admin/coupons", icon: TicketPercent, end: true },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {/* Mobile Top Bar */}
      <div className="sticky top-0 z-50 border-b border-pink-100 bg-white/90 px-4 py-3 backdrop-blur-xl md:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-pink-400 shadow-lg">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h2 className="text-lg font-black text-gray-950">
                Admin Panel
              </h2>
              <p className="text-xs font-semibold text-pink-500">
                SkinCare Dashboard
              </p>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-pink-100 bg-pink-50 text-gray-900"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="mt-4 rounded-[1.5rem] border border-pink-100 bg-white p-3 shadow-2xl">
            <nav className="space-y-2">
              {links.map((link) => {
                const Icon = link.icon;

                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.end}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                        isActive
                          ? "bg-pink-600 text-white shadow-lg shadow-pink-200"
                          : "text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                      }`
                    }
                  >
                    <Icon size={18} />
                    {link.name}
                  </NavLink>
                );
              })}
            </nav>

            <button
              onClick={() => {
                setMobileOpen(false);
                handleLogout();
              }}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-600"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-white/10 bg-black p-6 text-white md:block">
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-600 text-white shadow-lg shadow-pink-900/30">
            <ShieldCheck size={24} />
          </div>

          <div>
            <h2 className="text-2xl font-black">Admin Panel</h2>
            <p className="text-xs font-semibold text-pink-300">
              SkinCare Store
            </p>
          </div>
        </div>

        <nav className="space-y-3">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 font-bold transition ${
                    isActive
                      ? "bg-pink-600 text-white shadow-lg shadow-pink-900/40"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon size={19} />
                {link.name}
              </NavLink>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="absolute bottom-6 left-6 right-6 flex items-center justify-center gap-2 rounded-2xl bg-red-500 py-3 font-bold text-white transition hover:bg-red-600"
        >
          <LogOut size={19} />
          Logout
        </button>
      </aside>

      <main className="min-h-screen p-4 md:ml-72 md:p-8">
        <Outlet />
      </main>
    </section>
  );
};

export default AdminLayout;