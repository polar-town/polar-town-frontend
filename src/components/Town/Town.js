import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import proptypes from "prop-types";
import styled from "styled-components";
import { io } from "socket.io-client";
import { nanoid } from "nanoid";

import { getTownHostInfo } from "../../api/user";
import { currentCoke, selectUser } from "../../features/user/userSlice";
import { EVENTS } from "../../constants/socketEvents";

import PostBox from "./PostBox";
import Mail from "../Mail/Mail";
import GuestBook from "../GuestBook/GuestBook";
import ModalPortals from "../ModalPortals/ModalPortals";
import Notification from "../Notification/Notification";
import InItemBox from "./InItemBox";
import { getTownHostInfo } from "../../api/user";
import { selectUserId } from "../../features/user/userSlice";
import OutItem from "./OutItem";
import FriendList from "../FriendList/FriendList";
import FriendSearch from "../FriendSearch/FriendSearch";
import Header from "../Header/header";
import CokeCounter from "../CokeCounter/CokeCounter";
import ItemBox from "../ItemBox/ItemBox";
import Shop from "../Shop/Shop";
import FriendProfile from "../FriendProfile/FriendProfile";
import ShopFriendList from "../FriendList/ShopFriendList";

const TownDiv = styled.div`
  background-image: url(${(props) => props.iceCount}),
    url("/images/town-background-image.jpg");
  background-position: center 40px, center center;
  background-repeat: no-repeat;
  background-size: cover;
  image-rendering: pixelated;
  position: relative;
`;

const VisitorsContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 10px;
  z-index: 1;
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
  const socketRef = useRef(null);

  useEffect(async () => {
    const user = await getTownHostInfo(id);

    setOutItems(user?.outItemBox);
  }, [id]);

  useEffect(() => {
    if (!loginUser.id) return;

    const socket = getSocketIO();

    socket.on(EVENTS.JOIN, (data) => {
      setVisitors(data.visitors);
    });

    socket.emit(EVENTS.JOIN, { townId: id, user: loginUser });

    socket.on(EVENTS.LEFT, (data) => {
      setVisitors(data.visitors);
    });

    return () => {
      socket.off(EVENTS.JOIN);
      socket.off(EVENTS.LEFT);
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
        {outItems?.map((item) => (
          <OutItem
            key={item._id}
            name={item.name}
            isMe={isMe}
            itemId={item._id}
            setOutItems={setOutItems}
          />
        ))}
        <PostBox toggleGuestbook={setOnPostBox} />
        {isMe && <InItemBox toggleItemBox={setOnItemBoxOpen} />}
        <ModalPortals>
          {onMail && <Mail toggleMail={setOnMail} />}
          {onPostBox && <GuestBook toggleGuestbook={setOnPostBox} />}
          {onShopOpen && (
            <Shop
              onClose={setOnShopOpen}
              toggleNotification={setOnNotification}
              getTargetItem={setTargetItem}
              getNotificationType={setNotificationType}
              toggleShopFriendList={setOnShopFriendList}
            />
          )}
          {onNotification && (
            <Notification
              toggleNotification={setOnNotification}
              notificationType={notificationType}
              targetItem={targetItem}
            />
          )}
          {onFriendList && (
            <FriendList
              visitFriend={onTownTransition}
              toggleFriendList={setOnFriendList}
              socket={getSocketIO()}
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
            />
          )}
          {onItemBoxOpen && (
            <ItemBox
              toggleItemBox={setOnItemBoxOpen}
              setOutItems={setOutItems}
            />
          )}
        </ModalPortals>
      </TownDiv>
    </>
  );
}

Town.propTypes = {
  townId: proptypes.string.isRequired,
  iceCount: proptypes.string.isRequired,
  onTownTransition: proptypes.func.isRequired,
};

export default Town;
