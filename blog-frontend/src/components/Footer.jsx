import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo & App Name */}
        <div className="flex items-center space-x-3">
          <img
            src={logo} // 🔁 Replace with your logo path
            alt="Logo"
            className="w-10 h-10 object-cover"
          />
          <span className="text-xl font-semibold tracking-wider">MyBlog</span>
        </div>

        {/* Contact Info */}
        <div className="text-sm text-gray-300 text-center md:text-left">
          <p>Contact us at:</p>
          <p>Email: contact@myblog.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>

        {/* Socials (Optional) */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-cyan-400">Instagram</a>
          <a href="#" className="hover:text-cyan-400">LinkedIn</a>
          <a href="#" className="hover:text-cyan-400">Twitter</a>
        </div>
      </div>

      <div className="text-center text-gray-500 text-xs mt-6">
        © {new Date().getFullYear()} MyBlog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
