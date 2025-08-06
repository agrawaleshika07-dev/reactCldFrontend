import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8080/messages', {
      method: 'POST',
      body: message,
      credentials: 'include',
      headers: {
        'Content-Type': 'text/plain'
      }
    });
    setMessage('');
  };

  const handleGetMessages = async () => {
    const response = await fetch('http://localhost:8080/messages', { credentials: 'include' });
    const data = await response.json();
    setMessages(data);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', marginBottom: '10px' }}>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} style={{ padding: '8px', marginRight: '10px' }} />
        <button type="submit" style={{ padding: '8px', backgroundColor: 'lightblue' }}>Submit</button>
      </form>
      <button onClick={handleGetMessages} style={{ padding: '8px', backgroundColor: 'lightgreen' }}>Get Messages</button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {messages.map((msg, index) => (
          <li key={index} style={{ marginBottom: '5px' }}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
