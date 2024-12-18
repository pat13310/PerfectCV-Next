'use client';

import { useState } from 'react';
import { SparklesIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

export default function AssistantPage() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    {
      role: 'assistant',
      content: 'Bonjour ! Je suis votre assistant CV. Je peux vous aider à améliorer votre CV, suggérer des formulations professionnelles, et répondre à vos questions sur la recherche d\'emploi. Comment puis-je vous aider aujourd\'hui ?'
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message to chat
    setChatHistory(prev => [...prev, { role: 'user', content: message }]);
    
    // TODO: Implement actual AI response
    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: 'Cette fonctionnalité sera bientôt disponible. Restez à l\'écoute !'
      }]);
    }, 1000);

    setMessage('');
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col">
      <div className="flex items-center justify-between px-4 py-5 sm:px-6 border-b border-gray-200">
        <div className="flex items-center">
          <SparklesIcon className="h-6 w-6 text-violet-600" />
          <h1 className="ml-3 text-lg font-semibold leading-6 text-gray-900">
            Assistant IA
          </h1>
        </div>
        <span className="inline-flex items-center rounded-md bg-violet-50 px-2 py-1 text-xs font-medium text-violet-700 ring-1 ring-inset ring-violet-600/20">
          Beta
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`flex ${
              chat.role === 'assistant' ? 'justify-start' : 'justify-end'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                chat.role === 'assistant'
                  ? 'bg-white border border-gray-200'
                  : 'bg-violet-600 text-white'
              }`}
            >
              {chat.content}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Posez votre question ici..."
            className="flex-1 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600"
          />
          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
          >
            <PaperAirplaneIcon className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
