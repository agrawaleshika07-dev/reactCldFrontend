import React, { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8080/messages', {
      method: 'POST',
      body: text,
      credentials: 'include',
      headers: {
        'Content-Type': 'text/plain'
      }
    });
    setText('');
  };

  const handleGetMessages = async () => {
    const response = await fetch('http://localhost:8080/messages', { credentials: 'include' });
    const data = await response.json();
    setMessages(data);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        style={{ padding: '5px', border: '1px solid #ccc' }} 
      />
      <button onClick={handleSubmit} style={{ padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>Submit</button>
      <button onClick={handleGetMessages} style={{ padding: '5px 10px', backgroundColor: '#2196F3', color: 'white', border: 'none', cursor: 'pointer' }}>Get Messages</button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {messages.map((msg, index) => (
          <li key={index} style={{ margin: '5px 0' }}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
