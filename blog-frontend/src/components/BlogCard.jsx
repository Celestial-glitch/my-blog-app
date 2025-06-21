
import { useNavigate } from "react-router-dom";
import { CalendarDays, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import defaultImage from "../assets/Blog_default.jpeg";
import axios from "axios";
import defaultProfile from "../assets/profile_default.webp";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(blog.likes);

  // Load liked state from localStorage
  useEffect(() => {
    const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs")) || [];
    setLiked(likedBlogs.includes(blog._id));
  }, [blog._id]);

  const handleLike = async (e) => {
    e.stopPropagation(); // Prevent navigation when like is clicked

    if (liked) return;

    try {
      await axios.post(`http://localhost:5000/api/posts/${blog._id}/like`);
      setLikeCount((prev) => prev + 1);
      setLiked(true);

      // Save to localStorage
      const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs")) || [];
      likedBlogs.push(blog._id);
      localStorage.setItem("likedBlogs", JSON.stringify(likedBlogs));
    } catch (err) {
      console.error("Error liking blog:", err);
    }
  };
 

  const categoryColors = {
  Tech: "bg-blue-100 text-blue-800",
  "Health & Fitness": "bg-green-100 text-green-800",
  Finance: "bg-yellow-100 text-yellow-800",
  Travel: "bg-purple-100 text-purple-800",
  Lifestyle: "bg-pink-100 text-pink-800",
  Education: "bg-indigo-100 text-indigo-800",
  Personal: "bg-gray-100 text-gray-800",
  "Fashion & Beauty": "bg-rose-100 text-rose-800",
  Food: "bg-orange-100 text-orange-800",
};



  return (
    <div
      onClick={() => navigate(`/blogs/${blog._id}`)}
      className="cursor-pointer w-[300px] h-[400px] bg-white rounded-2xl shadow-md overflow-hidden max-w-md mx-auto p-4 space-y-4 border"
    >
      <img
  src={
    blog.image
      ? `http://localhost:5000/${blog.image}`
      : defaultImage
  }
  alt={blog.title}
  className="w-full h-48 object-cover rounded-xl"
/>


      {blog.category && (
  <div
    className={`inline-block text-xs px-3 py-1 rounded-full font-medium w-fit ${
      categoryColors[blog.category] || "bg-gray-100 text-gray-800"
    }`}
  >
    {blog.category}
  </div>
)}

      <h2 className="text-xl font-bold text-gray-800">{blog.title}</h2>

      <div className="flex items-center space-x-3">
        <img
          src={
              blog.authorProfilePicture
                ? "http://localhost:5000/" + blog.authorProfilePicture
                : defaultProfile
            }
          alt={blog.authorName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="text-sm font-medium text-gray-700">
          {blog.authorName}
        </span>
      </div>

      <p className="text-gray-600 text-sm">{blog.blogDescription}</p>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <CalendarDays className="w-4 h-4" />
          <span>
            {new Date(blog.createdAt).toLocaleDateString("en-IN")},{" "}
            {new Date(blog.createdAt).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <div className="flex items-center gap-1" onClick={handleLike}>
          <Heart
            className={`w-4 h-4 ${
              liked ? "fill-red-500 text-red-500" : "text-gray-500"
            }`}
          />
         


          <span>{likeCount}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
