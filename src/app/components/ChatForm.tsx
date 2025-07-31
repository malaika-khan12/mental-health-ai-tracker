// src/app/components/ChatForm.tsx

'use client';

import React, { useState } from 'react';
import { sendMessage } from '../actions/sendMessage';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

export default function ChatForm() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const aiReply = await sendMessage(userMessage.text);
    setMessages((prev) => [...prev, { text: aiReply, sender: 'ai' }]);
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.sender === 'user' ? '#d1e7ff' : '#e2e3e5',
            }}
          >
            <span>{msg.text}</span>
          </div>
        ))}
        {loading && <div style={styles.typing}>Mikki is typing...</div>}
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          Send
        </button>
      </form>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  chatBox: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    height: '500px',
    overflowY: 'auto',
    marginBottom: '10px',
    backgroundColor: '#f9f9f9',
  },
  message: {
    maxWidth: '70%',
    padding: '10px',
    borderRadius: '8px',
    fontSize: '14px',
  },
  form: {
    display: 'flex',
    gap: '10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 16px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  typing: {
    fontStyle: 'italic',
    color: '#555',
    fontSize: '13px',
  },
};
