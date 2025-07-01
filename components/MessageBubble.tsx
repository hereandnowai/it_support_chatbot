import React from 'react';
import { ChatMessage } from '../types';
import { UserCircleIcon } from './icons';

const chatbotAvatarUrl = "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/caramel.jpeg";

const MessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.sender === 'user';
  const time = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-end max-w-xs md:max-w-md lg:max-w-lg ${isUser ? 'flex-row-reverse' : ''}`}>
        <div className={`p-1 rounded-full ${isUser ? 'bg-[#004040] ml-2' : 'bg-gray-200 mr-2'} flex-shrink-0 flex items-center justify-center w-8 h-8`}>
          {isUser ? 
            <UserCircleIcon className="w-5 h-5 text-white" /> : 
            <img src={message.avatar || chatbotAvatarUrl} alt="Bot Avatar" className="w-6 h-6 rounded-full object-cover" />
          }
        </div>
        <div
          className={`px-4 py-3 rounded-xl shadow ${
            isUser ? 'bg-[#004040] text-white rounded-br-none' : 'bg-white text-[#004040] rounded-bl-none'
          }`}
        >
          <p className="text-sm break-words whitespace-pre-wrap">{message.text}</p>
          <p className={`text-xs mt-1 ${isUser ? 'text-teal-200 text-right' : 'text-gray-500 text-left'}`}>
            {time}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;