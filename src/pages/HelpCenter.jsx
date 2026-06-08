const HelpCenter = () => {
  return (
    <section className="py-16">
      <h1 className="text-4xl font-black text-gray-950">Help Center</h1>

      <div className="mt-8 space-y-6 text-gray-600 leading-8">
        <div>
          <h2 className="text-xl font-bold text-gray-950">How can I track my order?</h2>
          <p>You can track your order from My Orders page after login.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-950">Can I cancel my order?</h2>
          <p>You can cancel your order before it is shipped.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-950">How can I contact support?</h2>
          <p>You can contact us from the Contact page.</p>
        </div>
      </div>
    </section>
  );
};

export default HelpCenter;