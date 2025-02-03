import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Simulate form submission
    console.log("Form submitted:", formData);

    // Reset form after submission
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary text-light px-4">
      <div className="max-w-4xl w-full bg-secondary bg-opacity-90 rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
        <p className="text-center text-sm text-light mb-8">
          We’d love to hear from you! Please fill out the form below or reach us
          via email.
        </p>

        {submitted && (
          <div className="mb-4 text-green-500 text-center">
            Thank you for reaching out! We’ll get back to you soon.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-1"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-primary focus:ring-2 focus:ring-accent focus:outline-none"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-1"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-primary focus:ring-2 focus:ring-accent focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Message Field */}
          <div className="mt-6">
            <label
              htmlFor="message"
              className="block text-sm font-medium mb-1"
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-primary focus:ring-2 focus:ring-accent focus:outline-none"
              placeholder="Enter your message"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 w-full py-2 px-4 bg-accent text-light font-bold rounded-lg hover:bg-highlight transition duration-300"
          >
            Submit
          </button>
        </form>

        {/* Contact Information */}
        <div className="mt-8 text-center">
          <p className="text-sm">
            Alternatively, reach us at:{" "}
            <a
              href="mailto:support@railwayplatform.com"
              className="text-accent hover:underline"
            >
              support@railwayplatform.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
