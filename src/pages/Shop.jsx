import React from 'react'
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const Shop = () => {
   
    const [searchTerm, setSearchTerm] = React.useState("");
    const [selectedCategory, setSelectedCategory] = React.useState("All");

const categories = ["All", "Serum", "Sunscreen", "Moisturizer", "Cleanser"]; 
 const products = [
  {
    id: 1,
    name: "Vitamin C Serum",
    category: "Serum",
    price: 499,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Vitamin E Serum",
    category: "Sunscreen",
    price: 499,
    rating: 4.8,
  },
  {
    id: 3,
    name: "Hyaluronic Acid Serum",
    category: "Moisturizer",
    price: 499,
    rating: 4.8,
  },
  {
    id: 4,
    name: "Niacinamide Serum",
    category: "Cleanser",
    price: 499,
    rating: 4.8,
  },
];

    // Filter products based on search term and selected category
  const filteredProducts = products.filter((product) => {
  const matchesSearch =
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesCategory =
    selectedCategory === "All" || product.category === selectedCategory;

  return matchesSearch && matchesCategory;
});

  return (
    <section>
         <input 
      type='text' 
      placeholder='Search products...' 
      value={searchTerm} 
      onChange={(e) => setSearchTerm(e.target.value)} 
      className='m-5 border border-pink-300 rounded-full px-4 py-2 w-full max-w-md mx-auto block focus:outline-none '
    />
     <div>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`m-2 px-4 py-2 rounded-full ${
              selectedCategory === category
                ? "bg-pink-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
     </div>

     {/* if product is not available */}
     

    {/* Product cards */}
    {filteredProducts.length === 0 ? (
  <p className="text-center text-gray-500 mt-10">
    No products found
  </p>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 m-8">
    {filteredProducts.map((product) => (
      <Link key={product.id} to={`/product/${product.id}`}>
        <ProductCard product={product} />
      </Link>
    ))}
  </div>
)}
    </section>
  )
}

export default Shop;