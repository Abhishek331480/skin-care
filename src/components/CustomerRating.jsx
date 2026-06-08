import customer1 from "../assets/customer1.jpg";
import customer2 from "../assets/customer2.jpg";
import customer3 from "../assets/customer3.jpg";    

const CustomerRating = () => {
  const reviews = [
    {
      name: "Aarushi Sharma",
      rating: 5,
      review: "My skin feels softer and brighter after using these products.",
      image:`${customer1}`
    },
    {
      name: "Priya Mehta",
      rating: 4,
      review: "Loved the serum. Lightweight and perfect for daily routine.",
      image:`${customer2}`
    },
    {
      name: "Neha Verma",
      rating: 5,
      review: "Great products for sensitive skin. No irritation at all.",
      image:`${customer3}`
    },
  ];

  return (
          // <div className="max-w-7xl mx-auto px-4">

    <section className="py-16 max-w-7xl mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="text-sm font-semibold text-pink-600">Customer Love</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 mt-2">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 mt-4">
          Real experiences from skincare lovers.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((item) => (
          <div
            key={item.name}
            className="bg-white border border-pink-100 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition"
          >
            <div className="flex gap-1 text-yellow-500 mb-4">
              {"★".repeat(item.rating)}
              {"☆".repeat(5 - item.rating)}
            </div>

            <p className="text-gray-600 leading-7">"{item.review}"</p>

            <div className="mt-6 flex items-center gap-3">
              {/* <div className="h-11 w-11 rounded-full bg-gradient-to-br from-pink-200 to-rose-300" /> */}
              <img src={item.image} alt={item.name} className="h-11 w-11 rounded-full object-cover" />

              <div>
                <h3 className="font-bold text-gray-950">{item.name}</h3>
                <p className="text-sm text-gray-500">Verified Customer</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerRating;