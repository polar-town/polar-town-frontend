import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import proptypes from "prop-types";
import { leaveNewMessage } from "../../api/guestbook";

const StyledInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
  background-color: #f5ecdb;
  border-radius: 10px;

  input {
    width: 90%;
    height: 50px;
    font-size: 15px;
    border: 0;
    outline: none;
    padding-left: 20px;
    background: transparent;
  }

  .fa-envelope {
    font-size: 25px;
  }
`;

function MessageInput({ onMessageListUpdate }) {
  const { id } = useParams();
  const messageInput = useRef();

  async function handleSendButtonClick() {
    const messageValue = messageInput.current.value;
    const { newMessage } = await leaveNewMessage(id, messageValue);

    onMessageListUpdate((prev) => [newMessage.data.result.newMessage, ...prev]);
  }

  return (
    <StyledInputContainer>
      <input ref={messageInput} type="text" />
      <i onClick={handleSendButtonClick} className="fas fa-envelope" />
    </StyledInputContainer>
  );
}

MessageInput.propTypes = {
  onMessageListUpdate: proptypes.func.isRequired,
};

export default MessageInput;
