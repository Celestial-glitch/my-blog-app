import { useNavigate } from "react-router-dom";
import heroGif from "../assets/cover_photo.gif";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/blogs");
  };

  return (
    <div className="hero bg-gray-300 min-h-screen pl-3">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src={heroGif}
          className="max-w-sm rounded-lg"
          alt="Blog illustration"
        />
        <div className="text-gray-800">
          <h1 className="text-5xl font-bold">Discover Inspiring Blogs</h1>
          <p className="py-6 text-lg">
            Explore thoughts, stories, and ideas from around the world.
            Share your voice or read from diverse writers on topics ranging
            from tech to travel, lifestyle, and more.
          </p>
          <button className="btn btn-primary" onClick={handleClick}>
            Browse Blogs
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
