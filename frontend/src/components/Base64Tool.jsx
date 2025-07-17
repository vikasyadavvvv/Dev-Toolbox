import React, { useState } from 'react';
import { FaCopy, FaCheck, FaLock, FaUnlock, FaExchangeAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Base64Tool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    const url = `http://localhost:5000/api/${mode}`;
    const body = mode === 'encode' ? { text: input } : { base64: input };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        setOutput(data.encoded || data.decoded);
      } else {
        setOutput(data.message);
      }
    } catch {
      setOutput('Server error');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-black text-white border border-yellow-400 shadow-2xl rounded-2xl p-8 max-w-4xl mx-auto mt-10"
    >
      {/* Mode Toggle */}
      <div className="flex justify-center mb-6 space-x-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setMode('encode')}
          className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
            mode === 'encode'
              ? 'bg-yellow-400 text-black shadow-md'
              : 'bg-white text-black hover:bg-gray-100'
          }`}
        >
          <FaLock /> Encode
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setMode('decode')}
          className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
            mode === 'decode'
              ? 'bg-yellow-400 text-black shadow-md'
              : 'bg-white text-black hover:bg-gray-100'
          }`}
        >
          <FaUnlock /> Decode
        </motion.button>
      </div>

      {/* Input/Output Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Area */}
        <div>
          <label className="block text-yellow-400 text-lg font-semibold mb-2">
            {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
          </label>
          <textarea
            className="w-full h-40 p-4 rounded-lg resize-none text-black bg-white border border-yellow-400 
                       focus:outline-none focus:ring-2 focus:ring-yellow-300"
            placeholder={mode === 'encode' ? 'Hello World' : 'SGVsbG8gV29ybGQ='}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* Output Area */}
        <div>
          <label className="block text-yellow-400 text-lg font-semibold mb-2">Output</label>
          <div className="relative">
            <div className="w-full h-40 p-4 border border-yellow-400 rounded-lg bg-black text-white overflow-y-auto whitespace-pre-wrap">
              {output || (
                <span className="text-gray-400 italic">Output will appear here...</span>
              )}
            </div>

            {/* Copy Button */}
            <AnimatePresence>
              {output && (
                <motion.button
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  onClick={handleCopy}
                  className="absolute top-2 right-2 bg-yellow-400 text-black px-3 py-1 rounded-md flex items-center gap-2 shadow-md hover:bg-yellow-300 transition"
                >
                  {copied ? (
                    <>
                      <FaCheck className="text-green-700" />
                      Copied
                    </>
                  ) : (
                    <>
                      <FaCopy />
                      Copy
                    </>
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center mt-8">
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={handleSubmit}
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-3 rounded-full shadow-lg transition"
        >
          <FaExchangeAlt />
          {mode === 'encode' ? 'Encode Text' : 'Decode Base64'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Base64Tool;
