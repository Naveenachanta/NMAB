import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
  ChatContainer,
  ChatHeader,
  ChatBody,
  MessageRow,
  MessageBubble,
  BotAvatar,
  UserAvatar,
  ChatInputWrapper,
  ChatInput,
  SendButton,
  ToggleChatButton,
  InputAvatar,
} from './AmayaChat.styles';

const AmayaChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! How can I assist you today with your skincare needs or questions?',
    },
  ]);
  const [userImage, setUserImage] = useState('/default-avatar.png');
  const chatEndRef = useRef(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const image = res.data.profileImage;
        if (image) {
          setUserImage(image);
        }
      } catch (err) {
        console.error('❌ Error fetching profile image:', err);
        setUserImage('/default-avatar.png');
      }
    };

    fetchProfileImage();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/ask-gpt`,
        { message: input }
      );

      const botReply = {
        sender: 'bot',
        text: res.data.reply || "I'm here to help!",
      };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error('❌ GPT Error:', err);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Oops! Amaya is having a moment. Try again later.' },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
      {!isOpen && (
        <ToggleChatButton onClick={() => setIsOpen(true)}>Hi, I’m Amaya ✨</ToggleChatButton>
      )}

      {isOpen && (
        <ChatContainer>
          <ChatHeader>
            Hi, I’m Amaya ✨
            <span style={{ marginLeft: 'auto', cursor: 'pointer' }} onClick={() => setIsOpen(false)}>
              ✕
            </span>
          </ChatHeader>

          <ChatBody>
            {messages.map((msg, index) => (
              <MessageRow key={index} isUser={msg.sender === 'user'}>
                {msg.sender === 'user' ? (
                  <UserAvatar src={userImage} alt="User" />
                ) : (
                  <BotAvatar src="/bot-avatar.png" alt="Amaya" />
                )}
                <MessageBubble isUser={msg.sender === 'user'}>{msg.text}</MessageBubble>
              </MessageRow>
            ))}
            <div ref={chatEndRef} />
          </ChatBody>

          <ChatInputWrapper>
            <ChatInput
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <SendButton onClick={handleSend}>➜</SendButton>
            <InputAvatar src={userImage} alt="User" />
          </ChatInputWrapper>
        </ChatContainer>
      )}
    </>
  );
};

export default AmayaChat;
