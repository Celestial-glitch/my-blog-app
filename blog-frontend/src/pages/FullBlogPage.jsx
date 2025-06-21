import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { CalendarDays, Heart, Pencil, Trash } from "lucide-react";
import defaultImage from "../assets/Blog_default.jpeg";
import defaultProfile from "../assets/profile_default.webp";
import Modal from "../components/Modal";
import defaultTech from "../assets/default_tech.jpeg";
import defaultHealth from "../assets/default_health.avif";
import defaultFinance from "../assets/default_finance.webp";
import defaultTravel from "../assets/default_traveljpg.jpg";
import defaultLifestyle from "../assets/default_lifestyle.avif";
import defaultEducation from "../assets/default_education.jpg";
import defaultPersonal from "../assets/default_personal.jpeg";
import defaultFashion from "../assets/default_fashion.avif";
import defaultFood from "../assets/default_food.avif";

const FullBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setBlog(res.data);
        setLikes(res.data.likes);

        const likedBlogs = JSON.parse(
          localStorage.getItem("likedBlogs") || "[]"
        );
        setLiked(likedBlogs.includes(id));
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlog();
  }, [id]);

  const handleLike = async (e) => {
    e.stopPropagation();
    if (liked) return;

    try {
      const res = await axios.post(
        `http://localhost:5000/api/posts/${id}/like`
      );
      setLikes(res.data.likes);
      setLiked(true);

      const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs") || "[]");
      localStorage.setItem("likedBlogs", JSON.stringify([...likedBlogs, id]));
    } catch (err) {
      console.error("Error liking blog", err);
    }
  };

  // const handleEdit = async () => {
  //   const pwd = prompt("Enter password to edit this blog:");
  //   if (!pwd) return;
  //   try {
  //     const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
  //     const blog = res.data;
  //     if (!res.data) throw new Error("Blog not found");
  //     navigate(`/edit/${id}?password=${pwd}`, { state: { blog } });
  //   } catch (err) {
  //     alert("Failed to validate password or open edit form.");
  //   }
  // };

  const handleEdit = async () => {
    const password = prompt("Enter password to edit:");
    if (!password) return;

    try {
      const validateRes = await axios.post(
        "http://localhost:5000/api/posts/validate",
        {
          blogId: id,
          password: password,
        }
      );

      if (validateRes.status === 200) {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        const blog = res.data;

        navigate(`/edit/${id}?password=${password}`, { state: { blog } });
      }
    } catch (err) {
      if (err.response && err.response.status === 403) {
        alert("Incorrect password");
      } else {
        console.error("Error validating password or fetching blog", err);
        alert("Something went wrong!");
      }
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmed) return;

    const pwd = prompt("Enter password to delete this blog:");
    if (!pwd) return;

    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        data: { password: pwd },
      });
      alert("Blog deleted successfully.");
      navigate("/blogs");
    } catch (err) {
      alert("Failed to delete blog. Check password.");
    }
  };

  if (!blog) return <div className="text-center mt-20">Loading...</div>;

  const {
    title,
    content,
    category,
    image,
    authorName,
    authorProfilePicture,
    createdAt,
  } = blog;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
};

const categoryImages = {
  Tech: defaultTech,
  "Health & Fitness": defaultHealth,
  Finance: defaultFinance,
  Travel: defaultTravel,
  Lifestyle: defaultLifestyle,
  Education: defaultEducation,
  Personal: defaultPersonal,
  "Fashion & Beauty": defaultFashion,
  Food: defaultFood,
};

  return (
      <div className="bg-gray-400 min-h-screen">
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Category */}
    <div
  className={`text-sm inline-block px-3 py-1 rounded-full mb-3 font-medium ${
    categoryColors[category] || "bg-gray-100 text-gray-700"
  }`}
>
  {category}
</div>


      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>

      {/* Author + Date + Likes */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-gray-600 mb-6 gap-4">
        <div className="flex items-center space-x-2">
          <img
  src={
    blog.authorProfilePicture
      ? "http://localhost:5000/" + blog.authorProfilePicture
      : defaultProfile
  }
  alt={authorName}
  className="w-8 h-8 rounded-full object-cover"
/>
          <span>{authorName}</span>
          <span>·</span>
          <span>{formattedDate}</span>
        </div>

        <div className="flex gap-4 items-center">
          <div
            className={`flex items-center gap-1 cursor-pointer ${
              liked ? "text-red-500" : "text-gray-500 hover:text-red-400"
            }`}
            onClick={handleLike}
          >
            <Heart className="w-5 h-5" fill={liked ? "currentColor" : "none"} />
            <span>{likes}</span>
          </div>

          <button
            onClick={handleEdit}
            className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
          >
            <Pencil className="w-4 h-4" /> Edit
          </button>

          <button
            onClick={handleDelete}
            className="flex items-center gap-1 text-red-600 hover:underline text-sm"
          >
            <Trash className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>

      {/* Blog Image */}
      <img
        src={blog.image ? `http://localhost:5000/${blog.image}` : categoryImages[blog.category] || defaultPersonal}
        alt={blog.title}
        className="w-full h-48 object-cover rounded-xl"
      />


      {/* Content */}
      <div className="prose max-w-none text-gray-800 text-lg whitespace-pre-line">
        {content}
      </div>
    </div>
    </div>
  );
};

export default FullBlogPage;
