import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import proptypes from "prop-types";
import { leaveNewMessage } from "../../api/guestbook";
import { EVENTS } from "../../constants/socketEvents";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useLogout from "../../hooks/useLogout";

const StyledInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
  background-color: #eae3d5;
  border-radius: 35px;

  input {
    width: 92%;
    height: 50px;
    font-size: 15px;
    border: 0;
    outline: none;
    padding-left: 20px;
    background: transparent;
  }

  .fa-envelope {
    font-size: 22px;
    color: #c48679;
    cursor: pointer;
  }
`;

function MessageInput({ socket }) {
  const { id } = useParams();
  const messageInput = useRef();
  const axiosInstance = useAxiosPrivate();
  const logout = useLogout();

  async function handleSendButtonClick() {
    const messageValue = messageInput.current.value;

    try {
      if (messageValue) {
        const { newMessage } = await leaveNewMessage({
          townId: id,
          message: messageValue,
          axiosInstance,
        });

        socket.emit(EVENTS.SEND_MESSAGE, { townId: id, message: newMessage });
        messageInput.current.value = "";
      }
    } catch (error) {
      console.error(error.response?.status);
      if (error.response?.status === 401) {
        logout();
      }
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
  socket: proptypes.object,
};

export default MessageInput;
