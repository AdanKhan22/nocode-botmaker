import React, { useState } from 'react';
import { generateResponse } from './openaiClient';

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const aiResponse = await generateResponse(userInput);
      setResponse(aiResponse);
    } catch (err) {
      setError('Failed to fetch response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full shadow-lg hover:from-purple-600 hover:to-pink-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300"
      >
        {isOpen ? 'Close Chat' : 'Chat with AI'}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-4 bg-gradient-to-br from-gray-100 via-purple-100 to-pink-100 border border-gray-300 rounded-2xl shadow-2xl w-96 p-6 animate-slide-in">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">AI Chat Assistant</h1>
          <form onSubmit={handleSubmit}>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask me anything..."
              rows={5}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-purple-500 focus:outline-none mb-4 text-gray-700"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all focus:ring-4 focus:ring-pink-300"
            >
              {loading ? 'Generating...' : 'Send'}
            </button>
          </form>

          {error && <p className="text-red-500 mt-4">{error}</p>}
          {response && (
            <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h2 className="font-semibold text-gray-800">AI Response:</h2>
              <p className="text-gray-600 mt-2">{response}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;