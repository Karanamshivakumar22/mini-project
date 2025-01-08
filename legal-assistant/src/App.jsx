import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './components/ChatMessage';
import TypingIndicator from './components/TypingIndicator';

const initialMessages = [
  {
    text: "Hello! I'm your AI legal assistant. How can I help you today?",
    isAi: true,
    timestamp: new Date().toLocaleTimeString(),
  },
];

function App() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      isAi: false,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        text: "I understand your query. Please note that this is general information and not legal advice.",
        isAi: true,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleClear = () => {
    setMessages(initialMessages);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Legal Assistant Powered By AI Chatbot Technology</h1>
      </header>
      <div className="chat-container">
        <div className="messages">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.text}
              isAi={message.isAi}
              timestamp={message.timestamp}
            />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="message-input"
          />
          <button onClick={handleSend} className="send-button" disabled={!input.trim()}>
            Send
          </button>
          <button onClick={handleClear} className="clear-button">
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;