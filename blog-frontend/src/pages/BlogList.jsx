
import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const BlogList = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts");
        setBlogs(res.data);
        setFilteredBlogs(res.data);

        // Dynamically extract categories
        const cats = [...new Set(res.data.map((blog) => blog.category))];
        setCategories(cats);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // const handleCategoryChange = (category) => {
  //   setSelectedCategory(category);
  //   setFilteredBlogs(
  //     category === "All"
  //       ? blogs
  //       : blogs.filter((blog) => blog.category === category)
  //   );
  // };
  // Combined filtering logic
  useEffect(() => {
    let result = blogs;

    if (selectedCategory !== "All") {
      result = result.filter((blog) => blog.category === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
      result = result.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBlogs(result);
  }, [blogs, selectedCategory, searchQuery]);

  return (
    <div className="p-4 sm:p-6 bg-gray-300 min-h-screen flex flex-col lg:flex-row gap-4 sm:gap-6">
      {/* Sidebar with search and add */}
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onAddClick={() => navigate("/create")}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        searchValue={searchQuery}
      />

      {/* Blog Section */}
      <div className="flex-1 min-w-0">
        {/* Heading Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">MyBlog</h1>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              Our latest tips, insights, and stories, straight from the source.
            </p>
          </div>
        </div>

        {/* Blog Cards */}
        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
