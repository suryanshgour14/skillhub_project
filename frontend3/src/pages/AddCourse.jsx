import { useState } from "react";
import API from "../api/courseApi";
import { toast } from "react-toastify";
import { FaPlusCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const CATEGORIES = ["Frontend", "Backend", "Database", "Cloud", "Mobile", "General"];

function AddCourse() {
  const [course, setCourse] = useState({
    title: "",
    students: "",
    category: "Frontend",
    description: ""
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!course.title || !course.students) {
      toast.error("Title and students count are required");
      return;
    }

    setLoading(true);
    try {
      await API.post("/courses", { ...course, students: Number(course.students) });
      toast.success("Course Added Successfully");
      setCourse({ title: "", students: "", category: "Frontend", description: "" });
    } catch {
      toast.error("Failed To Add Course");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="page-header">
        <h1><FaPlusCircle /> Add New Course</h1>
      </div>

      <form onSubmit={handleSubmit} className="modern-form">
        <div className="form-row">
          <div className="form-group">
            <label>Course Title *</label>
            <input
              type="text"
              placeholder="e.g. Complete React Masterclass"
              value={course.title}
              onChange={(e) => setCourse({ ...course, title: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Category *</label>
            <select
              value={course.category}
              onChange={(e) => setCourse({ ...course, category: e.target.value })}
            >
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Number of Students *</label>
          <input
            type="number"
            placeholder="e.g. 1200"
            value={course.students}
            onChange={(e) => setCourse({ ...course, students: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Description (optional)</label>
          <textarea
            rows="4"
            placeholder="Brief description of what students will learn..."
            value={course.description}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Adding..." : "Add Course"}
        </button>
      </form>
    </motion.div>
  );
}

export default AddCourse;
