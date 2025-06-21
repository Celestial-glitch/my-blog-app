import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const BlogForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editBlog = location.state?.blog;

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    blogDescription: "",
    category: "",
    password: "",
    authorName: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [authorImageFile, setAuthorImageFile] = useState(null);

  const categories = [
    "Tech",
    "Health & Fitness",
    "Finance",
    "Travel",
    "Lifestyle",
    "Education",
    "Personal",
    "Fashion & Beauty",
    "Food",
  ];

  useEffect(() => {
    if (editBlog) {
      setFormData({
        ...editBlog,
        password: "", // Password should not be pre-filled for security
      });
    }
  }, [editBlog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append text fields
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    // Append image files
    if (imageFile) data.append("image", imageFile);
    if (authorImageFile) data.append("authorProfilePicture", authorImageFile);

    if (!editBlog) {
      try {
        await axios.post("http://localhost:5000/api/posts", data);
        alert("Blog created successfully!");
        navigate("/blogs");
      } catch (error) {
        console.error("Error creating blog:", error);
        alert("Error creating blog");
      }
    } else {
      try {
        await axios.put(
          `http://localhost:5000/api/posts/${editBlog._id}`,
          data
        );
        alert("Blog updated successfully!");
        navigate("/blogs");
      } catch (error) {
        console.error("Error updating blog:", error);
        alert("Error updating blog");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-400 to-white flex items-center justify-center p-4">
      {/* Custom styles for placeholder text visibility */}
      <style jsx>{`
        input::placeholder,
        textarea::placeholder,
        select option[value=""][disabled] {
          color: #6b7280; /* A darker gray, equivalent to text-gray-500 */
          opacity: 1; /* Ensure full opacity in Firefox */
        }
        /* Style for selected default option in dropdown before user selects */
        select:required:invalid {
          color: #6b7280; /* Apply the darker gray to the "Select a category" text */
        }
        select option {
          color: #1f2937; /* Ensure actual options are dark */
        }
      `}</style>

      <div className="max-w-4xl w-full mx-auto p-8 bg-white shadow-2xl rounded-xl">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
          {!editBlog ? "Create New Blog Post" : "Edit Blog Post"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Blog Title
            </label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="A catchy title for your blog"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#6366F1] focus:border-[#6366F1] transition duration-200 text-gray-900"
            />
          </div>

          <div>
            <label
              htmlFor="blogDescription"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Short Description
            </label>
            <textarea
              id="blogDescription"
              name="blogDescription"
              value={formData.blogDescription}
              onChange={handleChange}
              placeholder="A brief summary of your blog post (max 160 characters)"
              rows="2"
              required
              maxLength="160"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#6366F1] focus:border-[#6366F1] transition duration-200 resize-y text-gray-900"
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Blog Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your amazing blog content here..."
              rows="10"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#6366F1] focus:border-[#6366F1] transition duration-200 resize-y text-gray-900"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#6366F1] focus:border-[#6366F1] transition duration-200 bg-white appearance-none text-gray-900"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="blogImage"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Upload Blog Image
            </label>
            <input
              id="blogImage"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#6366F1] hover:file:bg-blue-100 cursor-pointer"
            />
            {editBlog?.image && !imageFile && (
              <p className="text-sm text-gray-500 mt-2">
                Current Image:{" "}
                <span className="font-semibold">
                  {editBlog.image.split("/").pop()}
                </span>
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="authorName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Author Name
            </label>
            <input
              id="authorName"
              name="authorName"
              value={formData.authorName}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#6366F1] focus:border-[#6366F1] transition duration-200 text-gray-900"
            />
          </div>

          <div>
            <label
              htmlFor="authorImage"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Author Profile Picture
            </label>
            <input
              id="authorImage"
              type="file"
              accept="image/*"
              onChange={(e) => setAuthorImageFile(e.target.files[0])}
              className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#6366F1] hover:file:bg-blue-100 cursor-pointer"
            />
            {editBlog?.authorProfilePicture && !authorImageFile && (
              <p className="text-sm text-gray-500 mt-2">
                Current Profile Picture:{" "}
                <span className="font-semibold">
                  {editBlog.authorProfilePicture.split("/").pop()}
                </span>
              </p>
            )}
          </div>

          {!editBlog && (
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password to create blog"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#6366F1] focus:border-[#6366F1] transition duration-200 text-gray-900"
              />
            </div>
          )}

          <button
            type="submit"
            // Using the specific hex code for the blue color from the image
            className="w-full bg-[#6366F1] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2 transition duration-200 ease-in-out transform hover:scale-105"
          >
            {!editBlog ? "Publish Blog Post" : "Update Blog Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;