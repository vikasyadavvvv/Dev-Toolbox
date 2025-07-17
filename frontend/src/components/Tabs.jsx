import React from 'react';
import { FaCode, FaLock } from 'react-icons/fa';

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center mb-6">
      <div className="relative inline-flex bg-black p-1 rounded-full shadow-inner border border-yellow-400">

        {/* Animated active indicator */}
        <div
          className={`absolute top-1 left-1 h-[88%] w-1/2 rounded-full transition-all duration-300 ease-in-out
            ${activeTab === 'json' ? 'translate-x-0' : 'translate-x-full'}
            bg-yellow-400 z-0`}
        ></div>

        {/* JSON Tab */}
        <button
          onClick={() => setActiveTab('json')}
          className={`relative z-10 flex items-center gap-2 px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200
            ${activeTab === 'json' ? 'text-black' : 'text-white hover:text-yellow-400'}`}
        >
          <FaCode />
          JSON Formatter
        </button>

        {/* Base64 Tab */}
        <button
          onClick={() => setActiveTab('base64')}
          className={`relative z-10 flex items-center gap-2 px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200
            ${activeTab === 'base64' ? 'text-black' : 'text-white hover:text-yellow-400'}`}
        >
          <FaLock />
          Base64 Tools
        </button>
      </div>
    </div>
  );
};

export default Tabs;
