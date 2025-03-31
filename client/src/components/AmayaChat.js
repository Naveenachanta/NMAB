import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ChatWrapper = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
`;

const ChatBubble = styled.div`
  background-color: #d60480;
  color: #fff;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ChatBox = styled.div`
  width: 320px;
  max-height: 500px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: popIn 0.3s ease;

  @keyframes popIn {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
  }
`;
export const InputWithAvatar = styled.div`
  position: relative;
  width: 100%;
`;

export const ChatUserAvatar = styled.img`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ccc;
`;

const Header = styled.div`
  background: #d60480;
  color: white;
  padding: 1rem;
  font-weight: bold;
  font-size: 1.1rem;
  text-align: center;
`;

const Messages = styled.div`
  padding: 1rem;
  flex: 1;
  overflow-y: auto;
`;

const InputWrapper = styled.div`
  display: flex;
  border-top: 1px solid #eee;
`;

 const Input = styled.input`
  padding: 12px 40px 12px 16px;
  width: 100%;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  outline: none;
`;


const SendButton = styled.button`
  background: #d60480;
  border: none;
  color: white;
  padding: 0 1rem;
  font-weight: bold;
  cursor: pointer;
`;

const PromptBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 1rem;
`;

const Prompt = styled.div`
  background: #f3f3f3;
  color: #333;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  cursor: pointer;

  &:hover {
    background: #d60480;
    color: white;
  }
`;

export const MessageBubble = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;

  .chat-avatar {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 10px;
    object-fit: cover;
  }

  .user-avatar {
    border: 2px solid #000;
  }

  .bot-avatar {
    border: 2px solid #ff0077;
  }

  span {
    background-color: #f2f2f2;
    padding: 10px 15px;
    border-radius: 20px;
    max-width: 80%;
  }
`;


const AmayaChat = () => {
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const prompts = [
    'Best skincare for oily skin?',
    'What do I apply first: serum or moisturizer?',
    'Suggest a night routine',
    'What product helps with dark spots?'
  ];

  const sendMessage = async (text) => {
    if (!text) return;
    const newMessages = [...messages, { type: 'user', text }];
    setMessages(newMessages);
    setInput('');
  
    try {
      const res = await axios.post('https://api.swotandstudy.com/api/ask-gpt', { message: input });
      setMessages([...newMessages, { type: 'bot', text: res.data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { type: 'bot', text: 'Oops! Amaya is having a moment. Try again later.' }]);
    }
  };
  return (
    <ChatWrapper>
      {!expanded ? (
        <ChatBubble onClick={() => setExpanded(true)}>💬</ChatBubble>
      ) : (
        <ChatBox>
          <Header>Hi, I’m Amaya ✨</Header>
          <Messages>
            {messages.length === 0 && (
              <PromptBox>
                {prompts.map((p, i) => (
                  <Prompt key={i} onClick={() => sendMessage(p)}>{p}</Prompt>
                ))}
              </PromptBox>
            )}
            {messages.map((msg, i) => (
  <MessageBubble key={i} type={msg.type}>
  {msg.type === 'user' && (
  <img
    src={localStorage.getItem("profileImage") || "/default-avatar.png"}
    alt="User"
    className="chat-avatar user-avatar"
  />
)}

    {msg.type === 'bot' && (
      <img
        src="/bot-avatar.png"
        alt="Amaya"
        className="chat-avatar bot-avatar"
      />
    )}
    <span>{msg.text}</span>
  </MessageBubble>
))}

          </Messages>
          <InputWrapper>
  <InputWithAvatar>
    <Input
      placeholder="Ask me anything..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
    />
    <ChatUserAvatar
      src={localStorage.getItem("profileImage") || "/default-avatar.png"}
      alt="User Avatar"
    />
  </InputWithAvatar>
  <SendButton onClick={() => sendMessage(input)}>→</SendButton>
</InputWrapper>

        </ChatBox>
      )}
    </ChatWrapper>
  );
};

export default AmayaChat;
