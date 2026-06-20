import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import CourseCard from "../components/CourseCard";
import EditModal from "../components/EditModal";
import API from "../api/courseApi";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

function Home() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editCourse, setEditCourse] = useState(null);

  useEffect(() => { fetchCourses(); }, []);

  async function fetchCourses() {
    try {
      const res = await API.get("/courses");
      setCourses(res.data);
    } catch {
      setError("Unable to Load Courses");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this course? This cannot be undone.")) return;
    try {
      await API.delete(`/courses/${id}`);
      setCourses((prev) => prev.filter((c) => c._id !== id));
      toast.success("Course deleted");
    } catch {
      toast.error("Failed to delete course");
    }
  }

  async function handleEdit(id, data) {
    try {
      const res = await API.put(`/courses/${id}`, data);
      setCourses((prev) => prev.map((c) => (c._id === id ? res.data : c)));
      toast.success("Course updated");
      setEditCourse(null);
    } catch {
      toast.error("Failed to update course");
    }
  }

  const totalStudents = courses.reduce((sum, c) => sum + (c.students || 0), 0);

  const filtered = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      (c.category || "").toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="loading-state">
      <div className="spinner" />
      <p>Loading courses...</p>
    </div>
  );

  if (error) return <div className="error-state"><p>{error}</p></div>;

  return (
    <>
      <Hero totalCourses={courses.length} totalStudents={totalStudents} />

      <div className="search-wrapper">
        <FaSearch className="search-icon" />
        <input
          className="search"
          type="text"
          placeholder="Search by course name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>No courses found. <a href="/add-course">Add one?</a></p>
        </div>
      ) : (
        <motion.div
          className="courses"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {filtered.map((course) => (
            <motion.div
              key={course._id}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <CourseCard
                {...course}
                onEdit={() => setEditCourse(course)}
                onDelete={() => handleDelete(course._id)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {editCourse && (
        <EditModal
          course={editCourse}
          onSave={handleEdit}
          onClose={() => setEditCourse(null)}
        />
      )}
    </>
  );
}

export default Home;
