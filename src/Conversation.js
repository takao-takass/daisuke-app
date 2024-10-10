import { useEffect, useState } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css'; // スタイルシートをインポート

export default function Conversation() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const addMessage = (from, message) => {
    setMessages(m => [...m, { from, message }]);
  };

  const updateLastMessage = (from, message) => {
    setMessages(m => {
      const updatedMessages = [...m];
      updatedMessages[updatedMessages.length - 1] = { from, message };
      return updatedMessages;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      addMessage('you', newMessage);
      const message = newMessage;
      setNewMessage('');

      try {
        const response = await fetch('http://127.0.0.1:8000/conversation/message', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            prompt: message
          })
        });

        addMessage('daisuke', '');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let apiMessage = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          apiMessage += decoder.decode(value, { stream: true });
          updateLastMessage('daisuke', apiMessage);
        }

      } catch (error) {
        console.error('Error fetching API:', error);
      }
    }
  };

  useEffect(() => {
    console.log('Messages updated:', messages);
  }, [messages]);

  useEffect(() => {
    // メッセージが更新されるたびにコードブロックをハイライト
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }, [messages]);

  const headMarginStyle = {
    margin: '2em'
  };

  return (
    <div style={headMarginStyle}>

      {messages.map((msg, index) => (
        <div key={index}>
          <h4>{msg.from}</h4>
          <div dangerouslySetInnerHTML={{ __html: marked(msg.message) }} />
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