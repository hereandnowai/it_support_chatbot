import React from 'react';
import { QuickReplyAction } from '../types';

interface QuickReplyButtonProps {
  reply: QuickReplyAction;
  onClick: (payload: string, label: string) => void;
}

const QuickReplyButton: React.FC<QuickReplyButtonProps> = ({ reply, onClick }) => {
  return (
    <button
      onClick={() => onClick(reply.payload, reply.label)}
      className="bg-[#FFFBEA] hover:bg-[#FFF5CC] text-[#004040] font-medium py-2 px-4 rounded-full text-sm shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#FFDF00]"
    >
      {reply.label}
    </button>
  );
};

export default QuickReplyButton;