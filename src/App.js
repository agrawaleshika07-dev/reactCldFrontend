import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/messages', {
        method: 'POST',
        body: message,
        credentials: 'include',
        headers: {
          'Content-Type': 'text/plain'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setMessage('');
    } catch (error) {
      console.error('Error submitting message:', error);
    }
  };

  const handleGetMessages = async () => {
    try {
      const response = await fetch('http://localhost:8080/messages', {
        method: 'GET',
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Message App</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ padding: '10px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: 'lightblue' }}>Submit</button>
      </form>
      <button onClick={handleGetMessages} style={{ marginTop: '10px', padding: '10px', backgroundColor: 'lightgreen' }}>Get Messages</button>
      <ul style={{marginTop: '10px'}}>
        {messages.map((msg, index) => (
          <li key={index} style={{ listStyleType: 'none' }}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
