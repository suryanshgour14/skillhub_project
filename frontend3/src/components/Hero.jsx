import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaRocket, FaPlus } from "react-icons/fa";

function Hero({ totalCourses = 0, totalStudents = 0 }) {
  return (
    <motion.section
      className="hero"
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
    >
      <motion.div
        className="hero-badge"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        🚀 Learn · Build · Grow
      </motion.div>

      <h1 className="hero-title">
        Master Modern <span className="hero-gradient">Technology</span>
      </h1>

      <p className="hero-subtitle">
        Build real-world applications using React, Node.js, MongoDB and the full MERN stack.
        Start learning today.
      </p>

      <div className="hero-actions">
        <Link to="/courses" className="btn btn-primary">
          <FaRocket /> Explore Courses
        </Link>
        <Link to="/add-course" className="btn btn-outline">
          <FaPlus /> Add Course
        </Link>
      </div>

      <div className="hero-stats">
        <div className="hero-stat">
          <span className="stat-number">{totalCourses}+</span>
          <span className="stat-label">Courses Available</span>
        </div>
        <div className="hero-stat-divider" />
        <div className="hero-stat">
          <span className="stat-number">{totalStudents.toLocaleString()}+</span>
          <span className="stat-label">Students Enrolled</span>
        </div>
        <div className="hero-stat-divider" />
        <div className="hero-stat">
          <span className="stat-number">5+</span>
          <span className="stat-label">Tech Categories</span>
        </div>
      </div>
    </motion.section>
  );
}

export default Hero;
