import { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  ShieldCheck,
  CalendarDays,
  LockKeyhole,
  Sparkles,
} from "lucide-react";

const Profile = () => {
  

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [updating, setUpdating] = useState(false);
  const [changing, setChanging] = useState(false);

 

  const fetchProfile = async () => {
    try {
      const res = await api.get("/user/profile");
      setProfile(res.data.user);
      setUsername(res.data.user.username);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      const res = await api.put("/user/profile", {
        username,
      });

      toast.success(res.data.message);
      setProfile(res.data.user);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      setChanging(true);

      const res = await api.put("/user/change-password", {
        oldPassword,
        newPassword,
      });

      toast.success(res.data.message);
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setChanging(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center font-bold">Loading profile...</div>;
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-[2.5rem] border border-white/70 bg-white/80 p-8 shadow-[0_25px_80px_rgba(236,72,153,0.16)] backdrop-blur-xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-4 py-2 text-sm font-black text-pink-600">
            <Sparkles size={16} />
            My Account
          </div>

          <h1 className="mt-4 text-4xl font-black text-gray-950">
            Profile Settings
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your account information and password.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          <div className="rounded-[2.5rem] border border-pink-100 bg-white p-7 shadow-xl">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-4xl font-black text-white shadow-xl">
              {profile?.username?.charAt(0).toUpperCase()}
            </div>

            <h2 className="mt-5 text-center text-2xl font-black text-gray-950">
              {profile?.username}
            </h2>

            <p className="mt-1 text-center text-gray-500">
              {profile?.email}
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 rounded-2xl bg-pink-50 p-4">
                <Mail className="text-pink-600" size={20} />
                <span className="text-sm font-bold text-gray-700">
                  {profile?.email}
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-green-50 p-4">
                <ShieldCheck className="text-green-600" size={20} />
                <span className="text-sm font-bold text-gray-700">
                  {profile?.isEmailVerified ? "Verified Account" : "Not Verified"}
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4">
                <CalendarDays className="text-gray-600" size={20} />
                <span className="text-sm font-bold text-gray-700">
                  Joined:{" "}
                  {new Date(profile?.createdAt).toLocaleDateString("en-IN")}
                </span>
                {/* <pre>
{JSON.stringify(profile?.welcomeOffer, null, 2)}
</pre> */}
              </div>
                <div className="rounded-[2rem] border border-pink-100 bg-gradient-to-r from-pink-50 to-rose-50 p-5">
  <p className="text-xs font-black uppercase tracking-[3px] text-pink-600">
    Refer & Earn
  </p>

  <div className="mt-3">
    <p className="text-sm font-semibold text-gray-500">
      Your Referral Code
    </p>

    <div className="mt-2 flex items-center justify-between gap-3">
      <span className="rounded-full bg-white px-4 py-2 text-lg font-black tracking-widest text-pink-600 shadow">
        {profile?.referralCode || "N/A"}
      </span>

      <button
        onClick={() => {
          navigator.clipboard.writeText(
            profile?.referralCode || ""
          );
          toast.success("Referral code copied");
        }}
        className="rounded-full bg-black px-4 py-2 text-sm font-bold text-white hover:bg-gray-900"
      >
        Copy
      </button>
    </div>
  </div>

  <div className="mt-4 rounded-2xl bg-white p-3 text-center shadow-sm">
    <p className="text-xs font-semibold text-gray-500">
      Total Referrals
    </p>

    <p className="mt-1 text-2xl font-black text-pink-600">
      {profile?.totalReferrals || 0}
    </p>

   <p className="mt-2 text-sm font-semibold text-gray-500">
  Reward Referrals Remaining:{" "}
  {Math.max(
    0,
    (profile?.maxReferralRewards || 10) -
      (profile?.totalReferrals || 0)
  )}
</p>
  </div>
</div>
            </div>
          </div>

          <div className="space-y-8">
            <form
              onSubmit={handleUpdateProfile}
              className="rounded-[2.5rem] border border-pink-100 bg-white p-7 shadow-xl"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-black text-gray-950">
                  Update Profile
                </h2>
                <p className="mt-1 text-gray-500">
                  Change your display username.
                </p>
              </div>

              <label className="text-sm font-bold text-gray-700">
                Username
              </label>

              <div className="relative mt-2">
                <User
                  size={19}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-pink-400"
                />

                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-full border border-pink-100 bg-pink-50/50 py-4 pl-12 pr-5 font-medium outline-none focus:ring-4 focus:ring-pink-100"
                />
              </div>

              <button
                type="submit"
                disabled={updating}
                className="mt-5 rounded-full bg-black px-8 py-4 font-black text-white shadow-xl disabled:opacity-50"
              >
                {updating ? "Updating..." : "Update Profile"}
              </button>
            </form>

            <form
              onSubmit={handleChangePassword}
              className="rounded-[2.5rem] border border-pink-100 bg-white p-7 shadow-xl"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-black text-gray-950">
                  Change Password
                </h2>
                <p className="mt-1 text-gray-500">
                  Update your account password securely.
                </p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <LockKeyhole
                    size={19}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-pink-400"
                  />

                  <input
                    type="password"
                    placeholder="Old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full rounded-full border border-pink-100 bg-pink-50/50 py-4 pl-12 pr-5 font-medium outline-none focus:ring-4 focus:ring-pink-100"
                    required
                  />
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={19}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-pink-400"
                  />

                  <input
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded-full border border-pink-100 bg-pink-50/50 py-4 pl-12 pr-5 font-medium outline-none focus:ring-4 focus:ring-pink-100"
                    required
                  />
                </div>
              
              </div>

              <button
                type="submit"
                disabled={changing}
                className="mt-5 rounded-full bg-pink-600 px-8 py-4 font-black text-white shadow-xl disabled:opacity-50"
              >
                {changing ? "Changing..." : "Change Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;