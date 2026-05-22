import { useSelector } from "react-redux";

const Profile = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return (
      <section className="py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Please login first</h1>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-xl mx-auto bg-white border border-pink-100 rounded-[2rem] p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-gray-950">My Profile</h1>

        <div className="mt-6 space-y-4">
          <p><strong>Username:</strong> {user?.username}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>
      </div>
    </section>
  );
};

export default Profile;