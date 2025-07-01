import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChatMessage, QuickReplyAction, GroundingChunk } from '../types';
import MessageBubble from '../components/MessageBubble';
import ChatInput from '../components/ChatInput';
import QuickReplyButton from '../components/QuickReplyButton';
import { GeminiService } from '../services/geminiService';
import { QUICK_REPLY_OPTIONS, BOT_GREETING_MESSAGE } from '../constants';
import { ArrowTopRightOnSquareIcon } from '../components/icons';

const chatbotAvatarUrl = "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/caramel.jpeg";

const EmployeeChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuickReplies, setCurrentQuickReplies] = useState<QuickReplyAction[]>(QUICK_REPLY_OPTIONS.INITIAL);
  const [geminiService, setGeminiService] = useState<GeminiService | null>(null);
  const [chatError, setChatError] = useState<string | null>(null);
  const [sources, setSources] = useState<GroundingChunk[]>([]);

  const chatWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const service = new GeminiService();
      setGeminiService(service);
    } catch (error) {
       console.error("Failed to initialize Gemini Service:", error);
       if (error instanceof Error && error.message.includes("Gemini API Key is not configured")) {
           setChatError("Chat service is unavailable: API_KEY is not configured or invalid. Please contact an administrator.");
       } else {
           setChatError("Could not initialize chat service. An unexpected error occurred.");
       }
    }
  }, []);

  const addMessage = useCallback((text: string, sender: 'user' | 'bot', newQuickReplies?: QuickReplyAction[], newSources?: GroundingChunk[]) => {
    const messageData: ChatMessage = { 
      id: Date.now().toString(), 
      text, 
      sender, 
      timestamp: Date.now(),
      avatar: sender === 'bot' ? chatbotAvatarUrl : undefined
    };
    setMessages(prev => [...prev, messageData]);
    
    if (newQuickReplies) {
      setCurrentQuickReplies(newQuickReplies);
    }
    if (newSources) {
      setSources(prevSrc => [...prevSrc, ...newSources]);
    } else if (sender === 'user' || text === BOT_GREETING_MESSAGE) { 
      setSources([]);
    }
  }, []);


  useEffect(() => {
     if (geminiService && messages.length === 0 && !chatError) {
      addMessage(BOT_GREETING_MESSAGE, 'bot', QUICK_REPLY_OPTIONS.INITIAL);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geminiService, chatError]);


  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (text: string, isQuickReply: boolean = false) => {
    if (!geminiService) {
        const serviceUnavailableMsg = chatError || "Chat service is currently unavailable. Please try again later or contact support.";
        addMessage(serviceUnavailableMsg, 'bot');
        if (!chatError) setChatError(serviceUnavailableMsg);
        return;
    }
    
    setChatError(null);
    if (!isQuickReply) {
        addMessage(text, 'user');
    }
    setIsLoading(true);
    setCurrentQuickReplies([]);

    if (text === QUICK_REPLY_OPTIONS.ESCALATE.payload) {
        addMessage("Okay, I'll connect you with a human agent. Please wait a moment. (This is a simulated escalation).", 'bot');
        setCurrentQuickReplies([QUICK_REPLY_OPTIONS.MAIN_MENU]);
        setIsLoading(false);
        return;
    }
     if (text === QUICK_REPLY_OPTIONS.MAIN_MENU.payload) {
        addMessage("Sure, what can I help you with?", 'bot', QUICK_REPLY_OPTIONS.INITIAL);
        setIsLoading(false);
        return;
    }

    try {
      const response = await geminiService.sendMessage(text);
      addMessage(response.text, 'bot', undefined, response.candidates?.[0]?.groundingMetadata?.groundingChunks);
      
      if (response.text.toLowerCase().includes("anything else") || response.text.toLowerCase().includes("resolved")) {
        setCurrentQuickReplies([QUICK_REPLY_OPTIONS.MAIN_MENU, QUICK_REPLY_OPTIONS.ESCALATE]);
      } else if (response.text.toLowerCase().includes("escalate to a human agent") || response.text.toLowerCase().includes("connect you with a human agent")) {
         setCurrentQuickReplies([QUICK_REPLY_OPTIONS.ESCALATE, QUICK_REPLY_OPTIONS.MAIN_MENU]);
      }
      else {
        setCurrentQuickReplies([
            ...QUICK_REPLY_OPTIONS.INITIAL.slice(0,2), 
            QUICK_REPLY_OPTIONS.ESCALATE, 
            QUICK_REPLY_OPTIONS.MAIN_MENU
        ]);
      }

    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred with the chat service.";
      addMessage(`Sorry, I encountered an error: ${errorMessage}. Please try again.`, 'bot');
      setChatError(`Chat Error: ${errorMessage}`);
      setCurrentQuickReplies([QUICK_REPLY_OPTIONS.MAIN_MENU, QUICK_REPLY_OPTIONS.ESCALATE]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReplyClick = (payload: string, label: string) => {
    addMessage(`Selected: ${label}`, 'user'); 
    handleSendMessage(payload, true); 
  };
  
  const uniqueDisplaySources = sources.reduce((acc, current) => {
    const uri = current.web?.uri || current.retrievedContext?.uri;
    if (uri && !acc.find(item => (item.web?.uri === uri) || (item.retrievedContext?.uri === uri))) {
      return acc.concat([current]);
    }
    return acc;
  }, [] as GroundingChunk[]);


  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-180px)] sm:h-[calc(100vh-160px)] py-2"> {/* Adjusted height for footer */}
      <div className="bg-white w-full max-w-lg h-full flex flex-col rounded-xl shadow-2xl overflow-hidden border border-gray-200">
        <header className="bg-[#004040] text-white p-4 text-center">
          <h2 className="text-xl font-semibold">HERE AND NOW AI Chat</h2>
        </header>
        
        {chatError && (
          <div className="p-3 bg-red-100 text-red-700 text-sm text-center">
            {chatError}
          </div>
        )}

        <div ref={chatWindowRef} className="flex-grow p-4 space-y-2 overflow-y-auto bg-gray-50">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
               <div className="flex items-end max-w-xs">
                <div className="p-1 rounded-full bg-gray-200 mr-2 flex-shrink-0 flex items-center justify-center w-8 h-8">
                    <img src={chatbotAvatarUrl} alt="Bot Typing Avatar" className="w-6 h-6 rounded-full object-cover" />
                </div>
                <div className="px-4 py-3 rounded-xl shadow bg-white text-[#004040] rounded-bl-none">
                    <div className="flex items-center">
                        <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-[#004040] rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-[#004040] rounded-full animate-pulse [animation-delay:0.2s]"></div>
                            <div className="w-2 h-2 bg-[#004040] rounded-full animate-pulse [animation-delay:0.4s]"></div>
                        </div>
                        <span className="text-sm text-gray-500 ml-2">Bot is typing...</span>
                    </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {uniqueDisplaySources.length > 0 && (
          <div className="p-3 border-t bg-gray-50 text-xs text-gray-600">
            <h4 className="font-semibold mb-1 text-[#004040]">Sources:</h4>
            <ul className="list-disc list-inside space-y-1">
              {uniqueDisplaySources.map((chunk, index) => {
                const uri = chunk.web?.uri || chunk.retrievedContext?.uri;
                const title = chunk.web?.title || chunk.retrievedContext?.title || uri;
                if (uri) {
                  return (
                    <li key={index}>
                      <a href={uri} target="_blank" rel="noopener noreferrer" className="text-[#004040] hover:text-[#FFDF00] hover:underline inline-flex items-center">
                        {title}
                        <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1" />
                      </a>
                    </li>
                  );
                }
                return null; 
              })}
            </ul>
          </div>
        )}

        {currentQuickReplies.length > 0 && !isLoading && !chatError && (
          <div className="p-3 border-t border-gray-200 bg-gray-50 flex flex-wrap gap-2 justify-center">
            {currentQuickReplies.map((reply) => (
              <QuickReplyButton key={reply.id} reply={reply} onClick={handleQuickReplyClick} />
            ))}
          </div>
        )}

        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading || !!chatError} /> 
      </div>
    </div>
  );
};

export default EmployeeChatPage;