import React from 'react';

function ChatMessage({ message, isAi, timestamp }) {
  return (
    <div className={`message ${isAi ? 'ai' : 'user'}`}>
      <div className={`message-content ${isAi ? 'ai-message' : 'user-message'}`}>
        <p>{message}</p>
        <span className="timestamp">{timestamp }</span>
      </div>
    </div>
  );
}

export default ChatMessage;