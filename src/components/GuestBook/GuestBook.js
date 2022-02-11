import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getMessageList } from "../../api/guestbook";
import { selectUserId } from "../../features/user/userSlice";
import GameModal from "../GameModal/GameModal";
import MessageInput from "./MessageInput";
import MessageRow from "./MessageRow";
import proptypes from "prop-types";

const StyledGuestBookContainer = styled.div`
  height: 350px;
  width: 100%;
  overflow: scroll;
  padding: 15px;
  background-color: var(--game-modal-background);
`;

function GuestBook({ toggleGuestbook }) {
  const [messageList, setMessageList] = useState([]);
  const { id } = useParams();
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
        toggleGuestbook(false);
      }}
    >
      <StyledGuestBookContainer>
        {!isMyTown && <MessageInput onMessageListUpdate={setMessageList} />}
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
  toggleGuestbook: proptypes.func.isRequired,
};
