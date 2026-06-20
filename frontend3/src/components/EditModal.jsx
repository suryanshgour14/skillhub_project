import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const CATEGORIES = ["Frontend", "Backend", "Database", "Cloud", "Mobile", "General"];

function EditModal({ course, onSave, onClose }) {
  const [form, setForm] = useState({
    title: course.title,
    students: course.students,
    category: course.category || "General",
    description: course.description || ""
  });
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    if (!form.title || !form.students) return;
    setLoading(true);
    await onSave(course._id, { ...form, students: Number(form.students) });
    setLoading(false);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Course</h2>
          <button className="modal-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Course Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Complete React Masterclass"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Students Count</label>
              <input
                type="number"
                value={form.students}
                onChange={(e) => setForm({ ...form, students: e.target.value })}
                placeholder="e.g. 1200"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="3"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Brief description of the course..."
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
