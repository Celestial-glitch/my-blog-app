import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-black text-white shadow-md">
      <Link to="/blogs">
        <h1 className="text-xl font-bold tracking-wider">MyBlog</h1>
      </Link>
      <ul className="flex space-x-6 text-sm">
        <li>
          <Link to="/" className="hover:text-cyan-400">
            Home
          </Link>
        </li>
        <li>
          <Link to="/blogs" className="hover:text-cyan-400">
            All Blogs
          </Link>
        </li>
        <li>
          <Link to="/likedblogs" className="text-white hover:text-blue-300 ">
            Liked Blogs
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
