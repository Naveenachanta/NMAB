import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ChatWrapper = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  font-family: 'Helvetica Neue', sans-serif;
`;

const ChatBubble = styled.div`
  background-color: #000;
  color: #fff;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ChatBox = styled.div`
  width: 380px;
  max-height: 550px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: fadeIn 0.3s ease;
`;

const Header = styled.div`
  background: #000;
  color: white;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseBtn = styled.button`
  background: transparent;
  border: none;
  font-size: 1.2rem;
  color: white;
  cursor: pointer;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;

const Messages = styled.div`
  padding: 1rem;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InputWrapper = styled.div`
  display: flex;
  border-top: 1px solid #eee;
  padding: 0.8rem;
  align-items: center;
  background-color: #fafafa;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.6rem 0.9rem;
  border: none;
  outline: none;
  font-size: 0.95rem;
  background: transparent;
`;

const SendButton = styled.button`
  background: #000;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 8px;
  transition: 0.2s ease;

  &:hover {
    background: #333;
  }
`;

const PromptBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 1rem;
`;

const Prompt = styled.div`
  background: #f1f1f1;
  color: #333;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #000;
    color: white;
  }
`;

const MessageBubble = styled.div`
  background: ${({ type }) => (type === 'user' ? '#f2f2f2' : '#eaeaea')};
  color: #333;
  padding: 12px 16px;
  border-radius: 14px;
  max-width: 85%;
  align-self: ${({ type }) => (type === 'user' ? 'flex-end' : 'flex-start')};
  display: flex;
  align-items: flex-end;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const AmayaChat = () => {
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userImage, setUserImage] = useState('/default-avatar.png');
  const messagesRef = useRef(null);

  const prompts = [
    'Best skincare for oily skin?',
    'What do I apply first: serum or moisturizer?',
    'Suggest a night routine',
    'What product helps with dark spots?'
  ];

  const botImage = '/amaya-avatar.png';

  useEffect(() => {
    const fetchProfileImage = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data.profilePic) {
          localStorage.setItem('profilePic', res.data.profilePic);
          setUserImage(res.data.profilePic);
        }
      } catch (err) {
        console.error('Failed to fetch profile image:', err);
      }
    };

    const cached = localStorage.getItem('profilePic');
    if (cached && cached !== '/default-avatar.png') {
      setUserImage(cached);
    } else {
      fetchProfileImage();
    }
  }, []);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text) return;
    const newMessages = [...messages, { type: 'user', text }];
    setMessages(newMessages);
    setInput('');

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/ask-gpt`, { message: text });
      setMessages([...newMessages, { type: 'bot', text: res.data.reply }]);
    } catch (err) {
      setMessages([...newMessages, { type: 'bot', text: 'Oops! Amaya is having a moment. Try again later.' }]);
    }
  };

  return (
    <ChatWrapper>
      {!expanded ? (
        <ChatBubble onClick={() => setExpanded(true)}>💬</ChatBubble>
      ) : (
        <ChatBox>
          <Header>
            Hi, I’m Amaya ✨
            <CloseBtn onClick={() => setExpanded(false)}>×</CloseBtn>
          </Header>

          <Messages ref={messagesRef}>
            {messages.length === 0 && (
              <PromptBox>
                {prompts.map((p, i) => (
                  <Prompt key={i} onClick={() => sendMessage(p)}>{p}</Prompt>
                ))}
              </PromptBox>
            )}
            {messages.map((msg, i) => (
              <MessageBubble key={i} type={msg.type}>
                {msg.type === 'bot' ? (
                  <>
                    <Avatar src={botImage} alt="Amaya" />
                    <span>{msg.text}</span>
                  </>
                ) : (
                  <>
                    <span>{msg.text}</span>
                    <Avatar src={userImage} alt="You" />
                  </>
                )}
              </MessageBubble>
            ))}
          </Messages>

          <InputWrapper>
            <Avatar src={userImage} alt="You" />
            <Input
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
            />
            <SendButton onClick={() => sendMessage(input)}>→</SendButton>
          </InputWrapper>
        </ChatBox>
      )}
    </ChatWrapper>
  );
};

export default AmayaChat;
