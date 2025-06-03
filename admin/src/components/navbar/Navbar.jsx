import React from 'react';
import { assets } from '../../assets/assets';

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-gray-800 text-white shadow-md border-b border-gray-700">
      <div className="flex items-center gap-3">
      </div>
      <img
        src={assets.labodine}
        alt="Profile"
        className="h-20 w-25 rounded-full object-cover border-2 border-orange-400"
      />
    </div>
  );
};

export default Navbar;
