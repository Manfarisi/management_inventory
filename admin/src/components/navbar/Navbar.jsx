import React from 'react';
import { assets } from '../../assets/assets';

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-gray-800 text-white shadow-md border-b border-gray-700">
      <div className="flex items-center gap-3">
        <img src={assets.logo} alt="Logo" className="h-25 w-25" />
        <h1 className="text-lg font-semibold">Labodine Inventory</h1>
      </div>
      <img
        src={assets.profile_image}
        alt="Profile"
        className="h-10 w-10 rounded-full object-cover border-2 border-orange-400"
      />
    </div>
  );
};

export default Navbar;
