import styled from 'styled-components';

export const ToggleChatButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background-color: #e6007e;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  padding: 14px 20px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

export const ChatContainer = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 360px;
  max-height: 500px;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
  z-index: 1001;
  overflow: hidden;
`;

export const ChatHeader = styled.div`
  background-color: #e6007e;
  color: white;
  padding: 16px;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

export const ChatBody = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #f9f9f9;
`;

export const MessageRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
  gap: 10px;
`;

export const MessageBubble = styled.div`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 18px;
  font-size: 14px;
  background-color: ${(props) => (props.isUser ? '#e6007e' : '#eeeeee')};
  color: ${(props) => (props.isUser ? 'white' : 'black')};
  border-bottom-right-radius: ${(props) => (props.isUser ? '4px' : '18px')};
  border-bottom-left-radius: ${(props) => (props.isUser ? '18px' : '4px')};
  word-wrap: break-word;
`;

export const UserAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

export const BotAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ChatInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: #fff;
  border-top: 1px solid #ddd;
`;

export const ChatInput = styled.input`
  flex: 1;
  padding: 12px 40px 12px 16px;
  border-radius: 25px;
  border: 1px solid #ccc;
  font-size: 14px;
  outline: none;
  background: #fefefe;
`;

export const SendButton = styled.button`
  position: absolute;
  right: 60px;
  background: #000;
  color: white;
  border: none;
  font-size: 16px;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InputAvatar = styled.img`
  position: absolute;
  right: 16px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
`;
