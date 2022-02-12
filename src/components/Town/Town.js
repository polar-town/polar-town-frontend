import React, { useState, useEffect } from "react";
import proptypes from "prop-types";
import styled from "styled-components";
import PostBox from "./PostBox";
import Mail from "../Mail/Mail";
import GuestBook from "../GuestBook/GuestBook";
import ModalPortals from "../ModalPortals/ModalPortals";
import Notification from "../Notification/Notification";
import FriendList from "../FriendList/FriendList";
import Header from "../Header/header";
import CokeCounter from "../CokeCounter/CokeCounter";
import ItemBox from "../ItemBox/ItemBox";
import Shop from "../Shop/Shop";

const StyledTownDiv = styled.div`
  background-image: url("/images/town-background-image.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center 90%;
`;

function Town({ townId, onTownTransition, socketService }) {
  const [onMail, setOnMail] = useState(false);
  const [onPostBox, setOnPostBox] = useState(false);
  const [onNotification, setOnNotification] = useState(false);
  const [onFriendList, setOnFriendList] = useState(false);
  const [isItemBoxOpen, setIsItemBoxOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!townId) return;

    console.log(process.env.REACT_APP_BASE_URL);

    const connection = socketService.connect(process.env.REACT_APP_BASE_URL);
    setSocket(connection);

    return () => {
      socketService.disconnect(connection);
    };
  }, [townId]);

  return (
    <>
      <Header
        toggleMail={setOnMail}
        toggleFindUser={() => {}}
        toggleFriendList={setOnFriendList}
        toggleShop={() => {}}
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
          {isItemBoxOpen && <ItemBox onClose={setIsItemBoxOpen} />}
          {isShopOpen && <Shop onClose={setIsShopOpen} />}
        </ModalPortals>
      </StyledTownDiv>
    </>
  );
}

Town.propTypes = {
  townId: proptypes.string.isRequired,
  onTownTransition: proptypes.func.isRequired,
  socketService: proptypes.object,
};

export default Town;
