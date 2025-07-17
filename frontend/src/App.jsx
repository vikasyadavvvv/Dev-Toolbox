import React, { useState } from 'react';
import { FaHeart, FaTools } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Tabs from './components/Tabs';
import JsonFormatter from './components/JsonFormatter';
import Base64Tool from './components/Base64Tool';

function App() {
  const [activeTab, setActiveTab] = useState('json');

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gradient-to-br from-white via-yellow-50 to-black flex flex-col items-center px-4 py-10">
      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-4xl mb-8 animate-fade-in">
        <h1 className="text-4xl font-extrabold tracking-wide flex items-center gap-3 text-black dark:text-white">
          <FaTools className="text-yellow-400 text-5xl animate-pulse drop-shadow-xl" />
          <span className="bg-yellow-400 px-4 py-1 rounded-full shadow text-black">Dev Toolbox</span>
        </h1>
      </div>

      {/* Tabs */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="w-full max-w-4xl mt-6 p-6 rounded-2xl shadow-xl bg-white text-black border border-yellow-400 transition-all duration-300 ease-in-out hover:shadow-2xl">
        {activeTab === 'json' ? <JsonFormatter /> : <Base64Tool />}
      </div>

      {/* Footer */}
     <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        marginTop: '4rem',
        fontSize: '0.875rem',
        color: '#fff',
        backgroundColor: '#000',
        padding: '1.5rem 2rem',
        textAlign: 'center',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(255, 215, 0, 0.3)',
      }}
    >
      <div style={{ marginBottom: '0.5rem' }}>
        © {new Date().getFullYear()} <span style={{ color: '#FFD700', fontWeight: 'bold' }}>Vikas Yadav</span>. All rights reserved.
      </div>
      <div style={{ fontSize: '0.8rem', color: '#ccc' }}>
        Made with passion in India. | <a href="mailto:vy532555@gmail.com" style={{ color: '#FFD700', textDecoration: 'none' }}>Contact</a>
      </div>
    </motion.footer>
    </div>
  );
}

export default App;


