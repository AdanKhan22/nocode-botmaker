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
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600"
      >
        {isOpen ? 'Close Chat' : 'Chat with AI'}
      </button>

      {isOpen && (
        <div className="fixed bottom-16 right-4 bg-white border border-gray-300 rounded-lg shadow-lg w-80 p-4">
          <h1 className="text-lg font-bold mb-2">AI Chatbot</h1>
          <form onSubmit={handleSubmit}>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message here..."
              rows={4}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              {loading ? 'Generating...' : 'Send'}
            </button>
          </form>

          {error && <p className="text-red-500 mt-2">{error}</p>}
          {response && (
            <div className="mt-4 p-2 bg-gray-100 border border-gray-300 rounded">
              <h2 className="font-bold">AI Response:</h2>
              <p>{response}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;