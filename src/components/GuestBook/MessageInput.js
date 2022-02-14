import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import proptypes from "prop-types";
import { leaveNewMessage } from "../../api/guestbook";
import { EVENTS } from "../../constants/socketEvents";

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

function MessageInput({ onMessageListUpdate, socket }) {
  const { id } = useParams();
  const messageInput = useRef();

  async function handleSendButtonClick() {
    const messageValue = messageInput.current.value;

    try {
      const { newMessage } = await leaveNewMessage(id, messageValue);
      socket.emit(EVENTS.SEND_MESSAGE, { townId: id, message: newMessage });
      messageInput.current.value = "";
    } catch (error) {
      console.error(error);
    }
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
  socket: proptypes.object,
};

export default MessageInput;
