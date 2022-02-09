import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getMessageList } from "../../api/guestbook";
import { closeGuestBook } from "../../features/modal/modalSlice";
import { selectUserId } from "../../features/user/userSlice";
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

function GuestBook() {
  const [messageList, setMessageList] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const isMyTown = id === userId;

  useEffect(async () => {
    try {
      const messages = await getMessageList(id);

      setMessageList(messages.data.result.guestBook);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <GameModal
      subject="방명록"
      onClose={() => {
        dispatch(closeGuestBook());
      }}
    >
      <StyledGuestBookContainer>
        {!isMyTown && <MessageInput onMessageListUpdate={setMessageList} />}
        {messageList &&
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
