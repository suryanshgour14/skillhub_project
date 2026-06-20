import { useState } from "react";
import API from "../api/courseApi";
import { toast } from "react-toastify";
import { FaEnvelope, FaUser, FaComment } from "react-icons/fa";
import { motion } from "framer-motion";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await API.post("/contact", formData);
      toast.success("Message Sent Successfully");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast.error("Failed To Send Message");
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
        <h1><FaEnvelope /> Contact Us</h1>
      </div>
      <p className="page-subtitle">Have a question or feedback? We'd love to hear from you.</p>

      <form onSubmit={handleSubmit} className="modern-form">
        <div className="form-group">
          <label><FaUser /> Your Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label><FaEnvelope /> Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label><FaComment /> Message</label>
          <textarea
            rows="5"
            placeholder="Write your message here..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </motion.div>
  );
}

export default Contact;
