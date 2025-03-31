import styled from 'styled-components';

// Main floating chat container
export const ChatContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 9999;
  font-family: 'Inter', sans-serif;
`;

// Full chat box layout
export const ChatBox = styled.div`
  width: 360px;
  height: 480px;
  background: white;
  border-radius: 18px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

// Header at top of chat
export const Header = styled.div`
  background: #ff0077;
  color: white;
  padding: 16px;
  font-size: 17px;
  font-weight: bold;
  text-align: center;
`;

// Chat history area
export const Messages = styled.div`
  flex: 1;
  padding: 12px 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #fafafa;
`;

// Prompt box when chat starts
export const PromptBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

// Clickable suggestions
export const Prompt = styled.div`
  background: #f2f2f2;
  padding: 10px 14px;
  border-radius: 14px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #e0e0e0;
  }
`;

// Each message row (aligns avatar + text)
export const MessageRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  flex-direction: ${({ type }) => (type === 'user' ? 'row-reverse' : 'row')};
`;

// Chat bubble
export const MessageBubble = styled.div`
  max-width: 70%;
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.4;
  color: ${({ type }) => (type === 'user' ? 'white' : '#333')};
  background: ${({ type }) => (type === 'user' ? '#ff0077' : '#eeeeee')};
`;

// Avatar for both user and Amaya
export const Avatar = styled.img`
  width: ${({ small }) => (small ? '30px' : '36px')};
  height: ${({ small }) => (small ? '30px' : '36px')};
  border-radius: 50%;
  object-fit: cover;
`;

// Wrapper for input box + avatar + send button
export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 14px;
  border-top: 1px solid #eee;
  background: white;
`;

// Text input
export const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 10px 14px;
  font-size: 14px;
  margin: 0 10px;
  background: #f5f5f5;
  border-radius: 18px;
`;

// Send button
export const SendButton = styled.button`
  background: #ff0077;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #e6006c;
  }
`;
