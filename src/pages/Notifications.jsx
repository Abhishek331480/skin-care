import { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";
import { Bell, CheckCheck, Clock, Inbox, Trash2 } from "lucide-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const filters = ["ALL", "ORDER", "COUPON", "SYSTEM", "UNREAD"];

  // const fetchNotifications = async () => {
  //   try {
  //     const res = await api.get("/notifications");
  //     setNotifications(res.data.notifications);
  //     setUnreadCount(res.data.unreadCount);
  //   } catch (error) {
  //     toast.error("Failed to fetch notifications");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const markAllRead = async () => {
    try {
      await api.put("/notifications/read-all");
      window.dispatchEvent(new Event("notificationsUpdated"));
      toast.success("All notifications marked as read");
      fetchNotifications();
    } catch (error) {
      toast.error("Failed to update notifications");
    }
  };

  const markRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      window.dispatchEvent(new Event("notificationsUpdated"));
      fetchNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   fetchNotifications();
  // }, []);

  useEffect(() => {
  const fetchNotifications = async (showLoader = false) => {
    try {
      if (showLoader) setLoading(true);

      const res = await api.get("/notifications");

      setNotifications(res.data.notifications || []);
      setUnreadCount(res.data.unreadCount || 0);
    } catch (error) {
      console.log(error);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  fetchNotifications(true);

  const interval = setInterval(() => {
    fetchNotifications(false);
  }, 10000);

  return () => clearInterval(interval);
}, []);
  

  const deleteNotification = async (id) => {
  try {
    const res = await api.delete(`/notifications/${id}`);

    window.dispatchEvent(
      new Event("notificationsUpdated")
    );

    toast.success(res.data.message);
    fetchNotifications();
  } catch (error) {
    toast.error("Failed to delete notification");
  }
};

  const deleteAllNotifications = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete all notifications?"
  );

  if (!confirmDelete) return;

  try {
    const res = await api.delete("/notifications");

    window.dispatchEvent(
      new Event("notificationsUpdated")
    );

    toast.success(res.data.message);
    fetchNotifications();
  } catch (error) {
    toast.error("Failed to delete notifications");
  }
};

  const filteredNotifications = notifications.filter((notification) => {
    if (activeFilter === "ALL") return true;
    if (activeFilter === "UNREAD") return !notification.isRead;
    return notification.type === activeFilter;
  });


  useEffect(() => {
  const handleNotificationUpdate = () => {
    fetchNotifications();
  };

  window.addEventListener(
    "notificationsUpdated",
    handleNotificationUpdate
  );

  return () => {
    window.removeEventListener(
      "notificationsUpdated",
      handleNotificationUpdate
    );
  };
}, []);

  if (loading) {
    return (
      <section className="min-h-screen bg-[#fafafa] px-4 py-24">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto flex h-16 w-16 animate-pulse items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
            <Bell size={30} />
          </div>

          <p className="mt-5 font-bold text-gray-900">
            Loading notifications...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#fafafa] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-pink-500">
              Notification Center
            </p>

            <h1 className="mt-3 text-4xl font-black text-gray-950 sm:text-5xl">
              Notifications
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
              Stay updated with your orders, offers and account activity.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Unread
              </p>
              <p className="mt-1 text-3xl font-black text-gray-950">
                {unreadCount}
              </p>
            </div>

            {filteredNotifications.length > 0 && (
              <button
                onClick={markAllRead}
                disabled={unreadCount === 0}
                className={`flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-bold transition ${
                  unreadCount === 0
                    ? "cursor-not-allowed bg-gray-200 text-gray-400"
                    : "bg-gray-950 text-white hover:bg-pink-600"
                }`}
              >
                <CheckCheck size={18} />
                Mark All Read
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={deleteAllNotifications}
                className="flex items-center justify-center gap-2 rounded-2xl bg-red-50 px-6 py-4 text-sm font-bold text-red-600 transition hover:bg-red-100"
              >
                <Trash2 size={18} />
                Delete All
              </button>
            )}
          </div>
        </div>

        <div className="mb-8 mt-6 flex flex-wrap gap-3 rounded-3xl border border-pink-100 bg-white p-3 shadow-sm">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-5 py-3 text-sm font-black transition ${
                activeFilter === filter
                  ? "bg-pink-600 text-white shadow-lg shadow-pink-200"
                  : "bg-white text-gray-600 ring-1 ring-pink-100 hover:bg-pink-50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Empty */}
        {filteredNotifications.length === 0 ? (
          <div className="rounded-[2rem] border border-gray-100 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-pink-50 text-pink-600">
              <Inbox size={38} />
            </div>

            <h2 className="mt-6 text-2xl font-black text-gray-950">
              No notifications yet
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              New updates will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification._id}
                onClick={() => markRead(notification._id)}
                className="group relative cursor-pointer rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:border-pink-200 hover:shadow-[0_20px_60px_rgba(236,72,153,0.12)] sm:p-6"
              >
                {!notification.isRead && (
                  <div className="absolute left-0 top-0 h-full w-1 rounded-l-3xl bg-pink-500" />
                )}

                <div className="flex items-start gap-4 sm:gap-5">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                      notification.isRead
                        ? "bg-gray-100 text-gray-500"
                        : "bg-pink-100 text-pink-600"
                    }`}
                  >
                    <Bell size={20} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-base font-black text-gray-950 sm:text-lg">
                        {notification.title}
                        <div className="mt-2">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-black ${
                              notification.type === "ORDER"
                                ? "bg-blue-100 text-blue-700"
                                : notification.type === "COUPON"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-purple-100 text-purple-700"
                            }`}
                          >
                            {notification.type}
                          </span>
                        </div>
                      </h2>

                      {/* {!notification.isRead && (
                        <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-pink-600" />
                      )} */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification._id);
                        }}
                        className="rounded-full bg-red-50 p-2 text-red-500 transition hover:bg-red-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <p className="mt-2 text-sm leading-7 text-gray-600">
                      {notification.message}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-gray-400">
                      <Clock size={14} />
                      {new Date(notification.createdAt).toLocaleString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Notifications;
