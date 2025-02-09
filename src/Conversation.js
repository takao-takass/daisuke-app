import { useEffect, useState } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const messageStreamUrl = process.env.REACT_APP_MESSAGE_STREAM_URL;
const createConversationUrl = process.env.REACT_APP_CREATE_CONVERSATION_URL;

export default function Conversation() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const addMessage = (from, message) => {
    setMessages(m => [...m, { from, message }]);
  };

  const resetMessages = () => {
    setMessages([]);
  }

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
        const response = await fetch(messageStreamUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            prompt: message
          })
        });

        if (!response.ok) {
          throw new Error('Failed to start SSE stream');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        addMessage('daisuke', '');
        let apiMessage = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          const chunk = decoder.decode(value, { stream: true });

          for (const line of chunk.split('\r\n')) {
            if (line.startsWith('data: ')) {
              const data = line.replace('data: ', '');
              apiMessage += data === '' 
                ? '\r\n'
                : data;
              updateLastMessage('daisuke', apiMessage);
            }
          }
        }

      } catch (error) {
        console.error('Error fetching API:', error);
      }
    }
  };

  
  const handleCreateConversation = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(createConversationUrl, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create conversation');
      }

      resetMessages();

    } catch (error) {
      console.error('Error fetching API:', error);
    }
  };

  useEffect(() => {
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

      <Form onSubmit={handleSubmit} style={headMarginStyle}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control 
           as="textarea"
           rows={3} 
           value={newMessage}
           onChange={(e) => setNewMessage(e.target.value)}/>
        </Form.Group>
        <Button type="submit" variant="outline-dark">送信</Button>
      </Form>
      
      <Form onSubmit={handleCreateConversation} style={headMarginStyle}>
        <Button type="submit" variant="outline-dark">新規</Button>
      </Form>
    </div>
  );
}