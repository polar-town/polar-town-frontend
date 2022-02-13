import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import proptypes from "prop-types";
import styled from "styled-components";
import { io } from "socket.io-client";
import { nanoid } from "nanoid";

import { getTownHostInfo } from "../../api/user";
import { currentCoke, selectUser } from "../../features/user/userSlice";

import PostBox from "./PostBox";
import Mail from "../Mail/Mail";
import GuestBook from "../GuestBook/GuestBook";
import ModalPortals from "../ModalPortals/ModalPortals";
import Notification from "../Notification/Notification";
import InItemBox from "./InItemBox";
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
  const dispatch = useDispatch();
  const { id } = useParams();
  const loginUser = useSelector(selectUser);
  const isMe = loginUser.id === id;
  const [townHost, setTownHost] = useState({});
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
  const socket = useRef();

  useEffect(async () => {
    const user = await getTownHostInfo(id);

    setTownHost(user);
    dispatch(currentCoke(user.cokeCount));
  }, []);

  useEffect(() => {
    if (!loginUser.id) return;

    socket.current = io.connect(process.env.REACT_APP_BASE_URL);
    socket.current.on("newVisitor", (data) => {
      if (data.visitors.some((visitor) => visitor.id === loginUser.id)) {
        setVisitors(data.visitors);
      }
    });

    socket.current.emit("newVisitor", { townId: id, user: loginUser });

    socket.current.on("visitorLeft", (data) => {
      if (data.visitors.some((visitor) => visitor.id === loginUser.id)) {
        setVisitors(data.visitors);
      }
    });
  }, [id]);

  return (
    <>
      <Header
        toggleMail={setOnMail}
        toggleFriendSearch={setOnFriendSearch}
        toggleFriendList={setOnFriendList}
        toggleShop={setOnShopOpen}
        onSignout={onTownTransition}
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
        {townHost.outItemBox?.map((item) => (
          <OutItem key={item._id} name={item.name} />
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
            />
          )}
          {onFriendSearch && (
            <FriendSearch
              toggleFriendSearch={setOnFriendSearch}
              visitFriend={onTownTransition}
            />
          )}
          {onShopFriendList && (
            <ShopFriendList
              toggleShopFriendList={setOnShopFriendList}
              targetItem={targetItem}
            />
          )}
          {onItemBoxOpen && <ItemBox toggleItemBox={setOnItemBoxOpen} />}
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
