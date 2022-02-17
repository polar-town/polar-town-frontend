import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import proptypes from "prop-types";

import { EVENTS } from "../../constants/socketEvents";
import { getMessageList, changeCheckMessage } from "../../api/guestbook";
import { togglePostBox } from "../../features/modal/modalSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import GameModal from "../GameModal/GameModal";
import MessageInput from "./MessageInput";
import MessageRow from "./MessageRow";

const StyledGuestBookContainer = styled.div`
  height: 350px;
  width: 100%;
  overflow: scroll;
  padding: 15px;
  background-color: var(--game-modal-background);
`;

function GuestBook({ socket, setIsReceiveGuestBook }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const { isPostBoxOpen } = useSelector((state) => state.modal);
  const [messageList, setMessageList] = useState([]);
  const axiosInstance = useAxiosPrivate();

  useEffect(async () => {
    try {
      const messages = await getMessageList({ townId: id, axiosInstance });
      const sortedMessages = sortMessages(messages.data.result.guestBook);

      setMessageList(sortedMessages);

      if (user.id === id) {
        await changeCheckMessage({ userId: user.id, axiosInstance });
        setIsReceiveGuestBook(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (!isPostBoxOpen) return;

    socket.on(EVENTS.GET_MESSAGES, (messages) => {
      const sortedUpdatedMessages = sortMessages(messages);
      setMessageList(sortedUpdatedMessages);
    });

    return () => {
      socket.off(EVENTS.READ_MESSAGES);
      socket.off(EVENTS.GET_MESSAGES);
    };
  }, [isPostBoxOpen]);

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
        dispatch(togglePostBox());
      }}
    >
      <StyledGuestBookContainer>
        {user.id !== id && (
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
                post={post}
              />
            );
          })}
      </StyledGuestBookContainer>
    </GameModal>
  );
}

export default GuestBook;

GuestBook.propTypes = {
  socket: proptypes.object,
  setIsReceiveGuestBook: proptypes.func,
};
