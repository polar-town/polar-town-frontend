import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PostBox from "./PostBox";
import Mail from "../Mail/Mail";
import GuestBook from "../GuestBook/GuestBook";
import {
  selectIsNotificationOpen,
  selectMailIsOpen,
  selectPostBoxIsOpen,
  selectFriendListIsOpen,
} from "../../features/modal/modalSlice";
import ModalPortals from "../ModalPortals/ModalPortals";
import Notification from "../Notification/Notification";
import FriendList from "../FriendList/FriendList";

const StyledTownDiv = styled.div`
  background-image: url("/images/town-background-image.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center 90%;
`;

function Town() {
  const isMailOpen = useSelector(selectMailIsOpen);
  const isPostBoxOpen = useSelector(selectPostBoxIsOpen);
  const isNotificationOpen = useSelector(selectIsNotificationOpen);
  const isFrendListOpen = useSelector(selectFriendListIsOpen);

  return (
    <StyledTownDiv>
      <PostBox />
      <ModalPortals>
        {isMailOpen && <Mail />}
        {isPostBoxOpen && <GuestBook />}
        {isNotificationOpen && <Notification />}
        {isFrendListOpen && <FriendList />}
      </ModalPortals>
    </StyledTownDiv>
  );
}

export default Town;
