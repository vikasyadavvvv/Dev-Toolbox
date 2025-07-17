import React, { useState } from 'react';
import { FaCopy, FaMagic, FaCheck, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { SiJson } from 'react-icons/si';

const JsonFormatter = () => {
  const [input, setInput] = useState('');
  const [formatted, setFormatted] = useState('');
  const [error, setError] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormat = async () => {
    if (!input.trim()) {
      setError('Please enter some JSON to format');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('https://dev-toolbox-os3t.vercel.app/api/format-json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawJson: input }),
      });
      const data = await res.json();

      if (data.success) {
        setFormatted(data.formatted);
        setError('');
      } else {
        setError(data.message || 'Invalid JSON format');
        setFormatted('');
      }
    } catch (err) {
      setError('Server error - please try again later');
      setFormatted('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!formatted) return;
    navigator.clipboard.writeText(formatted);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setFormatted('');
    setError('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black text-white shadow-lg rounded-xl p-6 max-w-3xl mx-auto"
      style={{ border: '2px solid #facc15' }} // yellow-400 border
    >
      <div className="flex items-center gap-3 mb-6">
        <SiJson className="text-2xl" style={{ color: '#facc15' }} />
        <h2 className="text-2xl font-bold text-white">JSON Formatter</h2>
      </div>

      <div className="mb-6">
        <label className="block text-white font-medium mb-2">Raw JSON Input</label>
        <textarea
          className="w-full h-48 p-4 rounded-lg resize-none bg-white text-black"
          placeholder='{"name": "Vikas", "age": 25}'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            border: '2px solid #facc15',
            outline: 'none',
            boxShadow: '0 0 5px #facc15',
            transition: 'all 0.2s',
          }}
        />
      </div>

      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleFormat}
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold shadow-md"
          style={{
            backgroundColor: isLoading ? '#e6b800' : '#facc15',
            color: 'black',
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Formatting...
            </>
          ) : (
            <>
              <FaMagic /> Format JSON
            </>
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClear}
          className="flex items-center gap-2 px-6 py-3 bg-white text-black border rounded-full font-semibold transition-all"
          style={{
            borderColor: '#facc15',
          }}
        >
          <FaTimes /> Clear
        </motion.button>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 p-4 mb-6 bg-red-100 text-red-800 rounded-lg"
          >
            <FaTimes className="text-red-600" />
            <span className="font-medium">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {formatted && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          <div className="flex justify-between items-center mb-3">
            <label className="block text-white font-medium">Formatted Output</label>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium"
              style={{
                backgroundColor: '#facc15',
                color: 'black',
              }}
            >
              {isCopied ? (
                <>
                  <FaCheck className="text-green-700" /> Copied!
                </>
              ) : (
                <>
                  <FaCopy /> Copy
                </>
              )}
            </motion.button>
          </div>

          <pre
            className="relative bg-black border rounded-lg p-4 overflow-x-auto whitespace-pre-wrap text-sm text-white font-mono"
            style={{ borderColor: '#facc15' }}
          >
            {formatted}
          </pre>
        </motion.div>
      )}
    </motion.div>
  );
};

export default JsonFormatter;

