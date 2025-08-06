import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:8080/messages', {
        method: 'POST',
        body: message,
        credentials: 'include',
        headers: {
          'Content-Type': 'text/plain'
        }
      });
      setMessage('');
    } catch (error) {
      console.error("Error submitting message:", error);
    }
  };

  const handleGetMessages = async () => {
    try {
      const response = await fetch('http://localhost:8080/messages', { credentials: 'include' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error getting messages:", error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ padding: '5px', marginRight: '5px' }}
        />
        <button type="submit" style={{ padding: '5px' }}>Submit</button>
      </form>
      <button onClick={handleGetMessages} style={{ padding: '5px', marginBottom: '10px' }}>Get Messages</button>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {messages.map((msg, index) => (
          <li key={index} style={{ marginBottom: '5px' }}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
