import React, { useState } from "react";
import proptypes from "prop-types";
import styled from "styled-components";
import PostBox from "./PostBox";
import Mail from "../Mail/Mail";
import GuestBook from "../GuestBook/GuestBook";
import ModalPortals from "../ModalPortals/ModalPortals";
import Notification from "../Notification/Notification";
import FriendList from "../FriendList/FriendList";
import FriendSearch from "../FriendSearch/FriendSearch";
import Header from "../Header/header";
import CokeCounter from "../CokeCounter/CokeCounter";

const StyledTownDiv = styled.div`
  background-image: url("/images/town-background-image.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center 90%;
`;

function Town({ onTownTransition }) {
  const [onMail, setOnMail] = useState(false);
  const [onPostBox, setOnPostBox] = useState(false);
  const [onNotification, setOnNotification] = useState(false);
  const [onFriendList, setOnFriendList] = useState(false);
  const [onFriendSearch, setOnFriendSearch] = useState(false);

  return (
    <>
      <Header
        toggleMail={setOnMail}
        toggleFriendSearch={setOnFriendSearch}
        toggleFriendList={setOnFriendList}
        toggleShop={() => {}}
        onSignout={onTownTransition}
      />
      <CokeCounter />
      <StyledTownDiv>
        <PostBox toggleGuestbook={setOnPostBox} />
        <ModalPortals>
          {onMail && <Mail toggleMail={setOnMail} />}
          {onPostBox && <GuestBook toggleGuestbook={setOnPostBox} />}
          {onNotification && (
            <Notification toggleNotification={setOnNotification} />
          )}
          {onFriendList && (
            <FriendList
              visitFriend={onTownTransition}
              toggleFriendList={setOnFriendList}
            />
          )}
          {onFriendSearch && (
            <FriendSearch
              toggleFriendSearch={setOnFriendSearch}
              visitFriend={onTownTransition}
            />
          )}
        </ModalPortals>
      </StyledTownDiv>
    </>
  );
}

Town.propTypes = {
  onTownTransition: proptypes.func.isRequired,
};

export default Town;
