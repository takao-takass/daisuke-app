import { useEffect, useState } from 'react';

export default function Conversation() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const addMessage = (from, message) => {
    setMessages(m => [...m, { from, message }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      addMessage('you', newMessage);
      const message = newMessage;
      setNewMessage('');

      try {
        const response = await fetch('https://httpbin.org/post', {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: JSON.stringify({ message })
        });
        const data = await response.json();
        const apiMessage = JSON.stringify(data);
        addMessage('daisuke', apiMessage);
      } catch (error) {
        console.error('Error fetching API:', error);
      }
    }
  };

  useEffect(() => {
    console.log('Messages updated:', messages);
  }, [messages]);

  const headMarginStyle = {
    margin: '2em'
  };

  return (
    <div style={headMarginStyle}>

      {messages.map((msg, index) => (
        <div key={index}>
          <h4>{msg.from}</h4>
          <div>{msg.message}</div>
        </div>
      ))}

      <form onSubmit={handleSubmit} style={headMarginStyle}>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="メッセージを入力してください"
        />
        <button type="submit">送信</button>
      </form>

    </div>
  );
}