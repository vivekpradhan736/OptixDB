import React from 'react';
import { Link } from 'react-router-dom';
import { CloudUploadIcon, FolderIcon, CodeIcon, ChartPieIcon, LockClosedIcon } from '@heroicons/react/outline';

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100 font-sans">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-gray-800">OptixDB</div>
            <div className="flex space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-black">
            Manage Your Media with Ease
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-black">
            Upload, organize, and access your files securely with OptixDB. Perfect for individuals, teams, and developers.
          </p>
          <Link
            to="/dashboard"
            className="inline-block text-black bg-white text-blue-600 px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-100"
          >
            Get Started Free
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Why Choose OptixDB?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg shadow-md bg-gray-50">
              <CloudUploadIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy File Uploads</h3>
              <p className="text-gray-600">
                Upload images, videos, and more with a simple drag-and-drop interface.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-md bg-gray-50">
              <FolderIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Organize with Folders</h3>
              <p className="text-gray-600">
                Keep your media tidy with custom folders and subfolders.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-md bg-gray-50">
              <CodeIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Developer API</h3>
              <p className="text-gray-600">
                Integrate with your apps using our secure API and API keys.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-md bg-gray-50">
              <ChartPieIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Storage Insights</h3>
              <p className="text-gray-600">
                Track storage usage and file types with detailed analytics.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-md bg-gray-50">
              <LockClosedIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Access</h3>
              <p className="text-gray-600">
                Your data is protected with robust authentication and encryption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Join thousands of users managing their media effortlessly with OptixDB.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-100"
          >
            Sign Up Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">OptixDB</h3>
              <p className="text-gray-400">
                Your all-in-one solution for media management and API integration.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/login" className="text-gray-400 hover:text-white">Login</Link>
                </li>
                <li>
                  <Link to="/signup" className="text-gray-400 hover:text-white">Sign Up</Link>
                </li>
                <li>
                  <a href="#features" className="text-gray-400 hover:text-white">Features</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">Email: support@mediasaas.com</p>
              <p className="text-gray-400">Phone: +1-800-123-4567</p>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            &copy; 2025 OptixDB. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;