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
  background-color: #000;
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
  width: 360px;
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

const Header = styled.div`
  background: #000;
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
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InputWrapper = styled.div`
  display: flex;
  border-top: 1px solid #eee;
  padding: 0.6rem;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.6rem 0.8rem;
  border: none;
  outline: none;
  font-size: 0.95rem;
`;

const SendButton = styled.button`
  background: #000;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-left: 8px;
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
    background: #000;
    color: white;
  }
`;

const MessageBubble = styled.div`
  background: ${({ type }) => (type === 'user' ? '#f1f1f1' : '#eee')};
  color: #333;
  padding: 10px 14px;
  border-radius: 12px;
  max-width: 80%;
  align-self: ${({ type }) => (type === 'user' ? 'flex-end' : 'flex-start')};
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
`;

const AmayaChat = () => {
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userImage, setUserImage] = useState("/default-avatar.png");
  const messagesRef = useRef(null);

  const prompts = [
    'Best skincare for oily skin?',
    'What do I apply first: serum or moisturizer?',
    'Suggest a night routine',
    'What product helps with dark spots?'
  ];

  const botImage = "/amaya-avatar.png";

  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setUserImage(savedImage);
    } else {
      const token = localStorage.getItem("token");
      if (!token) return;

      axios.get("https://api.swotandstudy.com/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const image = res.data.profileImage;
        if (image) {
          localStorage.setItem("profileImage", image);
          setUserImage(image);
        }
      })
      .catch((err) => {
        console.error("AmayaChat: Failed to load profile image", err);
      });
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
          <Header>Hi, I’m Amaya ✨</Header>
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
