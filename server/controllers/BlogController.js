import Blog from '../models/Blog.js';
import bcrypt from 'bcryptjs';

// Get all posts
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().select('-password');
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single post
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).select('-password');
    if (!blog) return res.status(404).json({ message: "Not Found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new post
export const createBlog = async (req, res) => {
  const {
    title,
    content,
    password,
    authorName,
    blogDescription,
    category 
  } = req.body;

  const image = req.files?.image?.[0]?.filename
    ? `uploads/${req.files.image[0].filename}`
    : null;

  const authorProfilePicture = req.files?.authorProfilePicture?.[0]?.filename
    ? `uploads/${req.files.authorProfilePicture[0].filename}`
    : null;


  try {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newBlog = new Blog({
      title,
      content,
      password: hashedPassword,
      authorName,
      authorProfilePicture,
      blogDescription,
      image,
      category
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Validate password
export const validatePassword = async (req, res) => {
  try {
    const { blogId, password } = req.body;

    if (!blogId || !password) {
      return res.status(400).json({ message: "Blog ID and password are required." });
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    console.log("given password:" + password);
    console.log("blog password:" + blog.password);

    const isMatch = await bcrypt.compare(password, blog.password);
    if (!isMatch) {
      console.log("password not match");
      return res.status(403).json({ message: "Incorrect password!" });
    }

    console.log("password match");

    return res.status(200).json({ message: "Password is correct!" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Update post
// export const updateBlog = async (req, res) => {
//   const blogId = req.params.id;
//   const { password } = req.body;

//   if (!password) {
//     return res.status(400).json({ message: "Password is required" });
//   }

//   try {
//     const blog = await Blog.findById(blogId);
//     if (!blog) {
//       return res.status(404).json({ message: "Blog not found" });
//     }

//     if (blog.password !== password) {
//       return res.status(403).json({ message: "Incorrect password" });
//     }

//     // List of fields we allow to update
//     const updatableFields = [
//       'title',
//       'content',
//       'image',
//       'blogDescription',
//       'category'
//     ];

//     for (const field of updatableFields) {
//       if (field in req.body) {
//         blog[field] = req.body[field];
//       }
//     }

//     await blog.save();
//     res.status(200).json({ message: "Blog updated successfully", blog });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export const updateBlog = async (req, res) => {
  const blogId = req.params.id;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const { title, content, blogDescription, category, password, authorName } = req.body;

    // Update text fields
    if (title) blog.title = title;
    if (content) blog.content = content;
    if (blogDescription) blog.blogDescription = blogDescription;
    if (category) blog.category = category;
    if (authorName) blog.authorName = authorName;

    // Update files (optional)
    if (req.files?.image?.[0]) {
      blog.image = req.files.image[0].path;
    }

    if (req.files?.authorProfilePicture?.[0]) {
      blog.authorProfilePicture = req.files.authorProfilePicture[0].path;
    }

    await blog.save();

    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};




// Delete post
export const deleteBlog = async (req, res) => {
  const blogId = req.params.id;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const isMatch = await bcrypt.compare(password, blog.password);
    if (!isMatch) {
      return res.status(403).json({ message: "Incorrect password" });
    }

    await blog.deleteOne();
    res.status(200).json({ message: "Blog deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// // controllers/BlogController.js
// export const likeBlog = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const blog = await Blog.findById(id);
//     if (!blog) return res.status(404).json({ message: "Blog not found" });

//     blog.likes += 1;
//     await blog.save();
//     res.json({ likes: blog.likes });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
export const likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not Found" });

    blog.likes += 1;
    await blog.save();
    res.status(200).json({ likes: blog.likes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
