import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogList from "./pages/BlogList";

import BlogForm from "./pages/BlogForm";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import FullBlogPage from "./pages/FullBlogPage";
import LikedBlogsPage from "./pages/LikedBlogs";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs" element={<BlogList />} />
       
        <Route path="/create" element={<BlogForm />} />
        <Route path="/edit/:id" element={<BlogForm editMode={true} />} />
        <Route path="/blogs/:id" element={<FullBlogPage />} />
        <Route path="/likedblogs" element={<LikedBlogsPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
