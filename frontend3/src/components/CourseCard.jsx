import { FaUsers, FaEdit, FaTrash, FaTag } from "react-icons/fa";
import { motion } from "framer-motion";

const categoryColors = {
  Frontend:  { bg: "#e0e7ff", text: "#4338ca" },
  Backend:   { bg: "#d1fae5", text: "#065f46" },
  Database:  { bg: "#fef3c7", text: "#92400e" },
  Cloud:     { bg: "#cffafe", text: "#155e75" },
  Mobile:    { bg: "#fce7f3", text: "#9d174d" },
  General:   { bg: "#f1f5f9", text: "#475569" },
};

function CourseCard({ title, students, category = "General", description = "", onEdit, onDelete }) {
  const colors = categoryColors[category] || categoryColors.General;

  return (
    <motion.div
      className="card"
      whileHover={{ y: -4, boxShadow: "0 20px 40px -4px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="card-header">
        <span className="badge" style={{ backgroundColor: colors.bg, color: colors.text }}>
          <FaTag style={{ fontSize: 9 }} />
          {category}
        </span>
      </div>

      <h2 className="card-title">{title}</h2>

      {description && (
        <p className="card-desc">
          {description.length > 90 ? description.slice(0, 90) + "..." : description}
        </p>
      )}

      <p className="card-students">
        <FaUsers /> {students?.toLocaleString()} Students
      </p>

      <div className="card-actions">
        <span className="btn-view">View Course</span>
        {onEdit && (
          <button className="btn-icon btn-edit" onClick={onEdit} title="Edit course">
            <FaEdit />
          </button>
        )}
        {onDelete && (
          <button className="btn-icon btn-delete" onClick={onDelete} title="Delete course">
            <FaTrash />
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default CourseCard;
