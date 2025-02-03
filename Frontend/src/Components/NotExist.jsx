import React from "react";

const NotExist = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-light px-4">
      <div className="text-center">
        {/* Error Code */}
        <h1 className="text-9xl font-extrabold text-accent mb-6">404</h1>

        {/* Error Message */}
        <h2 className="text-3xl font-semibold mb-4 text-highlight">
          Oops! Page Not Found
        </h2>
        <p className="text-lg text-gray-200 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        {/* Navigation Button */}
        <a
          href="/"
          className="inline-block px-8 py-3 text-lg font-medium text-light bg-accent rounded-lg shadow-lg hover:bg-highlight transition duration-300"
        >
          Return to Home
        </a>
      </div>

    </div>
  );
};

export default NotExist;
