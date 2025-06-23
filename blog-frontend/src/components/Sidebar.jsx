
const categoryColors = {
  Tech: "bg-blue-100 text-blue-700",
  "Health & Fitness": "bg-green-100 text-green-700",
  Finance: "bg-yellow-100 text-yellow-700",
  Travel: "bg-purple-100 text-purple-700",
  Lifestyle: "bg-pink-100 text-pink-700",
  Education: "bg-indigo-100 text-indigo-700",
  Personal: "bg-gray-100 text-gray-700",
  "Fashion & Beauty": "bg-rose-100 text-rose-700",
  Food: "bg-orange-100 text-orange-700",
  All: "bg-slate-100 text-slate-700", // optional style for "All"
};

// props
const Sidebar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  onSearchChange,
  searchValue,
  onAddClick,
}) => {
  return (
   
    <aside className="w-60 sm:w-60 lg:w-64 xl:w-72 bg-white shadow-md p-4 sm:p-6 rounded-xl space-y-4 sm:space-y-6">
 <div className="sticky top-0 bg-white z-10 pb-4">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search blogs..."
        value={searchValue}
        onChange={onSearchChange}
        className="w-full px-4 py-2 border text-gray-600 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-400"
      />

      {/* Add Blog Button */}
      <button
        onClick={onAddClick}
        className="btn btn-primary w-full mt-4"
      >
        + Add Blog
      </button>

      {/* Category Filter */}
      <div>
        <h2 className="text-xl text-gray-800 font-bold mb-4 pt-8">Filter by Category</h2>
        </div>
        <ul className="space-y-2">
          {["All", ...categories].map((cat, idx) => (
            <li key={idx}>
              <button
                onClick={() => onCategoryChange(cat)}
                className={`w-full text-left px-4 py-2 rounded-md transition font-medium ${
  selectedCategory === cat
    ? `${categoryColors[cat] || "bg-blue-100 text-blue-700"}`
    : "hover:bg-gray-100 text-gray-700"
}`}

              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>

  );
};

export default Sidebar;
