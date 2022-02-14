import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import proptypes from "prop-types";
import { selectUserId } from "../../features/user/userSlice";
import GameModal from "../GameModal/GameModal";
import MessageInput from "./MessageInput";
import MessageRow from "./MessageRow";
import { EVENTS } from "../../constants/socketEvents";
import { getMessageList } from "../../api/guestbook";

const StyledGuestBookContainer = styled.div`
  height: 350px;
  width: 100%;
  overflow: scroll;
  padding: 15px;
  background-color: var(--game-modal-background);
`;

function GuestBook({ isOpen, toggleGuestbook, socket }) {
  const [messageList, setMessageList] = useState([]);
  const { id } = useParams();
  const userId = useSelector(selectUserId);
  const isMyTown = id === userId;

  useEffect(async () => {
    try {
      const messages = await getMessageList(id);
      const sortedMessages = sortMessages(messages.data.result.guestBook);

      setMessageList(sortedMessages);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    socket.on(EVENTS.GET_MESSAGES, (messages) => {
      const sortedUpdatedMessages = sortMessages(messages);
      setMessageList(sortedUpdatedMessages);
    });

    return () => {
      socket.off(EVENTS.READ_MESSAGES);
      socket.off(EVENTS.GET_MESSAGES);
    };
  }, [isOpen]);

  function sortMessages(messages) {
    return messages.sort((a, b) => {
      if (a.date > b.date) return -1;
      if (a.date < b.date) return 1;
      if (a.date === b.date) return 0;
    });
  }

  return (
    <GameModal
      subject="방명록"
      onClose={() => {
        toggleGuestbook(false);
      }}
    >
      <StyledGuestBookContainer>
        {!isMyTown && (
          <MessageInput onMessageListUpdate={setMessageList} socket={socket} />
        )}
        {!!messageList.length &&
          messageList.map((post) => {
            const uniqueId = nanoid();
            return (
              <MessageRow
                key={uniqueId}
                name={post.name}
                message={post.message}
                date={post.date}
              />
            );
          })}
      </StyledGuestBookContainer>
    </GameModal>
  );
}

export default GuestBook;

GuestBook.propTypes = {
  isOpen: proptypes.bool.isRequired,
  toggleGuestbook: proptypes.func.isRequired,
  socket: proptypes.object,
};
