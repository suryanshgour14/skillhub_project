import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../api/courseApi";
import EditModal from "../components/EditModal";
import { toast } from "react-toastify";
import { FaTrash, FaEdit, FaBookOpen } from "react-icons/fa";
import { motion } from "framer-motion";

const CATEGORIES = ["All", "Frontend", "Backend", "Database", "Cloud", "Mobile", "General"];

const categoryDotColors = {
  Frontend: "#6366f1",
  Backend:  "#10b981",
  Database: "#f59e0b",
  Cloud:    "#06b6d4",
  Mobile:   "#ec4899",
  General:  "#64748b",
};

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCourse, setEditCourse] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";

  useEffect(() => { getCourses(); }, []);

  async function getCourses() {
    try {
      const res = await API.get("/courses");
      setCourses(res.data);
    } catch {
      toast.error("Failed to load courses");
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

  const filtered =
    activeCategory === "All"
      ? courses
      : courses.filter((c) => c.category === activeCategory);

  if (loading) return (
    <div className="page-container">
      <div className="loading-state">
        <div className="spinner" />
        <p>Loading courses...</p>
      </div>
    </div>
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1><FaBookOpen /> Available Courses</h1>
        <span className="badge-count">{filtered.length} course{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      <div className="filter-tabs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-tab ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setSearchParams(cat === "All" ? {} : { category: cat })}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>No courses in this category yet. <a href="/add-course">Add one?</a></p>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
        >
          {filtered.map((course) => (
            <motion.div
              key={course._id}
              className="course-item"
              variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0 } }}
            >
              <div className="course-item-left">
                <span
                  className="course-dot"
                  style={{ background: categoryDotColors[course.category] || "#64748b" }}
                />
                <div>
                  <p className="course-item-title">{course.title}</p>
                  <p className="course-item-meta">
                    {course.category || "General"} · {course.students?.toLocaleString()} students
                  </p>
                  {course.description && (
                    <p className="course-item-desc">
                      {course.description.length > 100
                        ? course.description.slice(0, 100) + "..."
                        : course.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="course-item-actions">
                <button
                  className="btn-icon btn-edit"
                  onClick={() => setEditCourse(course)}
                  title="Edit course"
                >
                  <FaEdit />
                </button>
                <button
                  className="btn-icon btn-delete"
                  onClick={() => handleDelete(course._id)}
                  title="Delete course"
                >
                  <FaTrash />
                </button>
              </div>
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
    </div>
  );
}

export default Courses;
