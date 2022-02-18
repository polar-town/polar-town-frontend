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
import useLogout from "../../hooks/useLogout";

const StyledGuestBookContainer = styled.div`
  height: 350px;
  width: 100%;
  overflow: scroll;
  padding: 15px;
  background-color: var(--game-modal-background);
`;

function GuestBook({ socket, setIsReceiveGuestBook }) {
  const [messageList, setMessageList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const dispatch = useDispatch();
  const axiosInstance = useAxiosPrivate();
  const logout = useLogout();

  useEffect(async () => {
    setIsLoading(true);

    try {
      const messages = await getMessageList({ townId: id, axiosInstance });
      const sortedMessages = sortMessages(messages.data.result.guestBook);

      setMessageList(sortedMessages);

      if (user.id === id) {
        await changeCheckMessage({ userId: user.id, axiosInstance });
        setIsReceiveGuestBook(false);
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error.response?.status);
      if (error.response?.status === 401) {
        logout();
      }
    }
  }, []);

  useEffect(() => {
    if (isLoading) return;

    socket.on(EVENTS.GET_MESSAGES, (messages) => {
      const sortedUpdatedMessages = sortMessages(messages);
      setMessageList(sortedUpdatedMessages);
    });

    return () => {
      socket.off(EVENTS.READ_MESSAGES);
      socket.off(EVENTS.GET_MESSAGES);
    };
  }, [isLoading]);

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
