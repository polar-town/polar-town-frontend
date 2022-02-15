import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import proptypes from "prop-types";
import styled from "styled-components";
import { nanoid } from "nanoid";

import { EVENTS } from "../../constants/socketEvents";
import { TYPE } from "../../constants/notification";
import {
  openNotification,
  setNotificationType,
} from "../../features/modal/modalSlice";
import { getTownHostInfo } from "../../api/user";

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

  .a {
    background-color: lemonchiffon;
    position: absolute;
  }
`;

const VisitorsContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 10px;
  z-index: 1;
`;

function Town({ socket }) {
  const [isLoading, setIsLoading] = useState(false);
  const [iceCount, setIceCount] = useState(1);
  const [outItems, setOutItems] = useState([]);
  const [guestbookMessages, setGuestbookMessages] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [from, setFrom] = useState([]);
  const [targetItem, setTargetItem] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    isMailOpen,
    isPostBoxOpen,
    isNotificatoinOpen,
    isFriendListOpen,
    isFriendSearchOpen,
    isItemBoxOpen,
    isShopOpen,
    isPresentFriendsOpen,
    notificationType,
  } = useSelector((state) => state.modal);
  const { user: loginUser } = useSelector((state) => state.user);
  const isMe = loginUser.id === id;

  useEffect(async () => {
    setIsLoading(true);
    const response = await getTownHostInfo(id);

    if (response.result === "error") {
      return navigate("/error");
    }

    const { iceCount, outItemBox, inItemBox } = response.result.user;

    setIceCount(iceCount);
    setOutItems([...outItemBox]);
    setGuestbookMessages([inItemBox]);

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    socket.on(EVENTS.JOIN, (data) => {
      setVisitors(data.visitors);
    });

    socket.on(EVENTS.GET_PRESENT, (data) => {
      setFrom([data.from]);
      dispatch(openNotification());
      dispatch(setNotificationType(TYPE.TYPE_PRESENT));
    });

    socket.emit(EVENTS.JOIN, { townId: id, user: loginUser });

    socket.on(EVENTS.LEFT, (data) => {
      setVisitors(data.visitors);
    });

    socket.on(EVENTS.FRIEND_REQUEST, (data) => {
      const { userName, email } = data;
      setFrom([userName, email]);
      dispatch(openNotification());
      dispatch(setNotificationType(TYPE.FRIEND_REQUEST));
    });

    return () => {
      socket.off(EVENTS.JOIN);
      socket.off(EVENTS.LEFT);
      socket.off(EVENTS.FRIEND_REQUEST);
    };
  }, [isLoading]);

  return (
    <>
      <Header socket={socket} />
      <VisitorsContainer>
        {!!visitors.length &&
          visitors.map((visitor) => {
            const key = nanoid();
            return <FriendProfile key={key} photo={visitor.photo} />;
          })}
      </VisitorsContainer>
      <TownDiv iceCount={iceCount}>
        <div className="a">{id}</div>
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
        <PostBox socket={socket} />
        {isMe && <InItemBox />}
        <ModalPortals>
          {isMailOpen && <Mail />}
          {isPostBoxOpen && <GuestBook socket={socket} />}
          {isShopOpen && <Shop getTargetItem={setTargetItem} />}
          {isFriendListOpen && <FriendList socket={socket} />}
          {isNotificatoinOpen && (
            <Notification
              notificationType={notificationType}
              targetItem={targetItem}
              from={from}
            />
          )}
          {isFriendSearchOpen && <FriendSearch socket={socket} />}
          {isPresentFriendsOpen && (
            <ShopFriendList targetItem={targetItem} socket={socket} />
          )}
          {isItemBoxOpen && <ItemBox setOutItems={setOutItems} />}
        </ModalPortals>
      </TownDiv>
    </>
  );
}

export default Town;

Town.propTypes = {
  socket: proptypes.object.isRequired,
};
