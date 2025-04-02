import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ChatWrapper = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
`;

const ChatBubble = styled.div`
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 12px 20px;
  border-radius: 30px;
  font-size: 0.95rem;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(255,255,255,0.15);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);

  &:hover {
    transform: scale(1.05);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const ChatBox = styled.div`
  width: 370px;
  max-height: 520px;
  border-radius: 20px;
  backdrop-filter: blur(14px);
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 8px 40px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: popIn 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.15);

  @keyframes popIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Header = styled.div`
  padding: 1rem;
  font-weight: bold;
  font-size: 1rem;
  text-align: center;
  color: white;
`;

const CloseBtn = styled.div`
  position: absolute;
  right: 15px;
  top: 10px;
  font-size: 1.1rem;
  color: white;
  cursor: pointer;
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
  border-top: 1px solid rgba(255,255,255,0.1);
  padding: 0.7rem;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.6rem 0.8rem;
  border: none;
  outline: none;
  background: transparent;
  color: white;
  font-size: 0.95rem;

  &::placeholder {
    color: #ddd;
  }
`;

const SendButton = styled.button`
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const PromptBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Prompt = styled.div`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const MessageBubble = styled.div`
  background: ${({ type }) => (type === 'user' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.08)')};
  color: white;
  padding: 10px 14px;
  border-radius: 12px;
  max-width: 80%;
  align-self: ${({ type }) => (type === 'user' ? 'flex-end' : 'flex-start')};
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;

const Avatar = styled.img`
  width: 26px;
  height: 26px;
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

  const botImage = "/amaya-avatar.png";

  useEffect(() => {
    const fetchProfileImage = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data.profilePic) {
          localStorage.setItem("profilePic", res.data.profilePic);
          setUserImage(res.data.profilePic);
        }
      } catch (err) {
        console.error("⚠️ Failed to fetch profile image:", err);
      }
    };

    const cached = localStorage.getItem("profilePic");
    if (cached && cached !== '/default-avatar.png') {
      setUserImage(cached);
    }

    fetchProfileImage();
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
        <ChatBubble onClick={() => setExpanded(true)}>Chat With Amaya ↑</ChatBubble>
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
