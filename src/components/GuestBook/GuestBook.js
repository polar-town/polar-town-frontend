import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getMessageList } from "../../api/guestbook";
import { selectUserId } from "../../features/user/userSlice";
import MailModal from "../MailModal/MailModal";
import ModalPortals from "../ModalPortals/ModalPortals";
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
  const userId = useSelector(selectUserId);
  const isMyTown = id === userId;

  useEffect(async () => {
    try {
      const messages = await getMessageList(id);

      setMessageList(messages.data.result);
    } catch (error) {
      console.error(error);
    }
  }, [messageList]);

  return (
    <ModalPortals>
      <MailModal>
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
      </MailModal>
    </ModalPortals>
  );
}

export default GuestBook;
