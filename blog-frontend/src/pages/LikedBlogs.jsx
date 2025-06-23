import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const LikedBlogsPage = () => {
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikedBlogs = async () => {
      const likedIds = JSON.parse(localStorage.getItem("likedBlogs")) || [];
      console.log("Fetching liked blog IDs:", likedIds);



      //Promise.all() to send multiple GET requests in parallel.
      try {
        const blogFetches = await Promise.all(
          likedIds.map(async (id) => {
            try {
              const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
              return res.data;
            } catch (err) {
              console.warn("Blog not found or error:", id);
              return null;
            }
          })
        );

        const filtered = blogFetches.filter(Boolean);
        setLikedBlogs(filtered);
      } catch (err) {
        console.error("Failed to fetch liked blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedBlogs();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="bg-gray-300 min-h-screen">
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl text-gray-800 font-bold mb-6">Liked Blogs</h1>
      {likedBlogs.length === 0 ? (
        <p className="text-center text-gray-400">No liked blogs yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* maps through liked blogs */}
          {likedBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default LikedBlogsPage;
