import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";

const FeedbackSection = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState(user?.email || "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    if (!message.trim()) {
      alert("Please enter your feedback.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("https://bazario-server-pearl.vercel.app/feedback", {
        email,
        message,
      });
      alert("Thank you for your feedback!");
      setMessage("");
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <section className="py-12 px-6 bg-[#f0f0f0] text-[#001f3f]">
      <h2 className="text-3xl font-bold mb-6 text-[#001f3f]">
        Send Us Your Feedback
      </h2>
      <p className="mb-6 max-w-2xl">
        We’d love to hear from you! Share your thoughts and help us improve.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-4 max-w-4xl"
      >
        <input
          type="email"
          placeholder={user?.email || "Your email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d4ff00]"
          readOnly={!!user}
          required
        />
        <textarea
          placeholder="Your feedback..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d4ff00] resize-none h-32 md:h-auto"
          required
        />
        <button
          type="submit"
          className={`bg-[#d4ff00] text-[#001f3f] px-6 py-4 rounded-xl font-bold flex items-center justify-center hover:scale-105 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Send Feedback"} <FaPaperPlane className="ml-2" />
        </button>
      </form>
    </section>
  );
};

export default FeedbackSection;
