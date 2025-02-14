import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <img src="not-found.svg" alt="Not Found" className="w-80 mb-6" />
      <h1 className="text-3xl font-bold text-gray-800">Page Not Found</h1>
      <p className="text-gray-600 mt-2">Oops! The page you are looking for doesn’t exist.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
