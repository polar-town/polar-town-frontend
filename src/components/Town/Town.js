import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import proptypes from "prop-types";
import styled from "styled-components";
import { io } from "socket.io-client";
import { nanoid } from "nanoid";

import { getTownHostInfo } from "../../api/user";
import { selectUser } from "../../features/user/userSlice";
import { EVENTS } from "../../constants/socketEvents";

import PostBox from "./PostBox";
import Mail from "../Mail/Mail";
import GuestBook from "../GuestBook/GuestBook";
import ModalPortals from "../ModalPortals/ModalPortals";
import Notification from "../Notification/Notification";
import InItemBox from "./InItemBox";
import FriendList from "../FriendList/FriendList";
import FriendSearch from "../FriendSearch/FriendSearch";
import Header from "../Header/header";
import CokeCounter from "../CokeCounter/CokeCounter";
import ItemBox from "../ItemBox/ItemBox";
import Shop from "../Shop/Shop";
import FriendProfile from "../FriendProfile/FriendProfile";
import ShopFriendList from "../FriendList/ShopFriendList";
import { TYPE } from "../../constants/notification";
import IcePalette from "./IcePalette";

const TownDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background: url("/images/town-background-image.jpg");
  background-position: center center;
  background-size: cover;
  overflow: "hidden";
  position: relative;
`;

const VisitorsContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 10px;
  z-index: 1;
`;

const GiftAndItemContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  width: 200px;
  height: 170px;
  position: absolute;
  bottom: 0;
  right: 20px;

  .giftNoti {
    font-size: 22px;
    color: red;
    position: absolute;
    right: -5px;
  }
`;

function Town({ iceCount, onTownTransition }) {
  const { id } = useParams();
  const [outItems, setOutItems] = useState([]);
  const loginUser = useSelector(selectUser);
  const isMe = loginUser.id === id;
  const [onMail, setOnMail] = useState(false);
  const [onPostBox, setOnPostBox] = useState(false);
  const [onNotification, setOnNotification] = useState(false);
  const [onFriendList, setOnFriendList] = useState(false);
  const [onFriendSearch, setOnFriendSearch] = useState(false);
  const [onItemBoxOpen, setOnItemBoxOpen] = useState(false);
  const [onShopOpen, setOnShopOpen] = useState(false);
  const [visitors, setVisitors] = useState([]);
  const [notificationType, setNotificationType] = useState("");
  const [targetItem, setTargetItem] = useState("");
  const [onShopFriendList, setOnShopFriendList] = useState(false);
  const [from, setFrom] = useState([]);
  const [isReceiveGift, setIsReceiveGift] = useState(false);
  const [isReceiveGuestBook, setIsReceiveGuestBook] = useState(false);
  const socketRef = useRef(null);

  useEffect(async () => {
    const user = await getTownHostInfo(id);

    setOutItems(user?.outItemBox);
  }, [id, iceCount]);

  useEffect(() => {
    if (!loginUser.id) return;

    const socket = getSocketIO();

    socket.on(EVENTS.JOIN, (data) => {
      setVisitors(data.visitors);
    });

    socket.on(EVENTS.GET_PRESENT, (data) => {
      setFrom([data.from]);
      setNotificationType(TYPE.TYPE_PRESENT);
      setOnNotification(true);
      setIsReceiveGift(true);
    });

    socket.emit(EVENTS.JOIN, { townId: id, user: loginUser });

    socket.on(EVENTS.LEFT, (data) => {
      setVisitors(data.visitors);
    });

    socket.on(EVENTS.FRIEND_REQUEST, (data) => {
      const { userName, email } = data;
      setFrom([userName, email]);
      setOnNotification(true);
      setNotificationType(TYPE.FRIEND_REQUEST);
    });

    return () => {
      socket.off(EVENTS.JOIN);
      socket.off(EVENTS.LEFT);
      socket.off(EVENTS.FRIEND_REQUEST);
      socket.off(EVENTS.GET_PRESENT);
    };
  }, [id, loginUser.id]);

  function getSocketIO() {
    if (socketRef.current === null) {
      socketRef.current = io.connect(process.env.REACT_APP_BASE_URL);
    }

    return socketRef.current;
  }
  return (
    <>
      <Header
        toggleMail={setOnMail}
        toggleFriendSearch={setOnFriendSearch}
        toggleFriendList={setOnFriendList}
        toggleShop={setOnShopOpen}
        onTownTransition={onTownTransition}
        onSignout={onTownTransition}
        socket={getSocketIO()}
      />
      <VisitorsContainer>
        {!!visitors.length &&
          visitors.map((visitor) => {
            const key = nanoid();
            return <FriendProfile key={key} photo={visitor.photo} />;
          })}
      </VisitorsContainer>
      <TownDiv iceCount={iceCount}>
        <CokeCounter />
        <IcePalette
          iceCount={iceCount}
          outItems={outItems}
          onOutItems={setOutItems}
        />
        <PostBox
          toggleGuestbook={setOnPostBox}
          isMe={isMe}
          isReceiveGuestBook={isReceiveGuestBook}
          setIsReceiveGuestBook={setIsReceiveGuestBook}
        />
        {isMe && (
          <GiftAndItemContainer>
            <InItemBox toggleItemBox={setOnItemBoxOpen} />
            {isReceiveGift && (
              <i className="fas fa-exclamation-circle giftNoti" />
            )}
          </GiftAndItemContainer>
        )}
        <ModalPortals>
          {onMail && <Mail toggleMail={setOnMail} />}
          {onPostBox && (
            <GuestBook
              isOpen={onPostBox}
              toggleGuestbook={setOnPostBox}
              socket={getSocketIO()}
              setIsReceiveGuestBook={setIsReceiveGuestBook}
            />
          )}
          {onShopOpen && (
            <Shop
              onClose={setOnShopOpen}
              toggleNotification={setOnNotification}
              getTargetItem={setTargetItem}
              getNotificationType={setNotificationType}
              toggleShopFriendList={setOnShopFriendList}
            />
          )}
          {onFriendList && (
            <FriendList
              visitFriend={onTownTransition}
              toggleFriendList={setOnFriendList}
              socket={getSocketIO()}
            />
          )}
          {onNotification && (
            <Notification
              onTownTransition={onTownTransition}
              toggleNotification={setOnNotification}
              notificationType={notificationType}
              targetItem={targetItem}
              toggleItemBox={setOnItemBoxOpen}
              from={from}
            />
          )}
          {onFriendSearch && (
            <FriendSearch
              toggleFriendSearch={setOnFriendSearch}
              visitFriend={onTownTransition}
              socket={getSocketIO()}
            />
          )}
          {onShopFriendList && (
            <ShopFriendList
              toggleShopFriendList={setOnShopFriendList}
              targetItem={targetItem}
              socket={getSocketIO()}
            />
          )}
          {onItemBoxOpen && (
            <ItemBox
              toggleItemBox={setOnItemBoxOpen}
              setOutItems={setOutItems}
              setIsReceiveGift={setIsReceiveGift}
            />
          )}
        </ModalPortals>
      </TownDiv>
    </>
  );
}

Town.propTypes = {
  townId: proptypes.string.isRequired,
  iceCount: proptypes.number.isRequired,
  onTownTransition: proptypes.func.isRequired,
};

export default Town;
