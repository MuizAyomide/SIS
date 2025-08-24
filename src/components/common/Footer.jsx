import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Student Information System. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Version 1.0.0
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;