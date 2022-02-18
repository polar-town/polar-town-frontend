import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
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
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

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
import IcePalette from "./IcePalette";
import { getMessageList } from "../../api/guestbook";

const TownDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background: url("/images/town-background-image.jpg");
  background-position: center center;
  background-size: cover;
  overflow: hidden;
  position: relative;
`;

const HostNameContainer = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
  background-color: #1e5269;
  color: var(--white);
  padding: 5px 10px;
  border-radius: 6px;
  font-family: "Jua", sans-serif;
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

const PostBoxContainer = styled.div`
  position: absolute;
  top: 40%;
  left: 10%;
  z-index: 1;

  i {
    position: absolute;
    top: 0px;
    left: 57px;
    font-size: 17px;
    color: red;
  }
`;

function Town({ socketInit }) {
  const [isLoading, setIsLoading] = useState(false);
  const [hostName, setHostName] = useState("");
  const [iceCount, setIceCount] = useState(1);
  const [outItems, setOutItems] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [from, setFrom] = useState([]);
  const [targetItem, setTargetItem] = useState("");
  const [isReceiveGift, setIsReceiveGift] = useState(false);
  const [isReceiveGuestBook, setIsReceiveGuestBook] = useState(false);
  const { id } = useParams();
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
  const axiosInstance = useAxiosPrivate();
  const socket = socketInit();

  useEffect(async () => {
    setIsLoading(true);

    try {
      const response = await getTownHostInfo({ axiosInstance, townId: id });
      const { name, iceCount, outItemBox, _id } = response.result.user;
      const lastName = name.substring(1);

      loginUser.id === _id ? setHostName("내") : setHostName(`${lastName}의`);
      setIceCount(iceCount);
      setOutItems([...outItemBox]);

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [id, loginUser.iceCount]);

  useEffect(() => {
    if (isLoading) return;

    socket.on(EVENTS.GET_PRESENT, (data) => {
      setFrom([data.from]);
      dispatch(openNotification());
      dispatch(setNotificationType(TYPE.TYPE_PRESENT));
      setIsReceiveGift(true);
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
      socket.off(EVENTS.GET_PRESENT);
    };
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;

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
  }, [isLoading, id]);

  useEffect(async () => {
    const response = await getMessageList({ townId: id, axiosInstance });

    const { guestBook } = response.data.result;
    const isExistNewGuestBook = guestBook.some((msg) => !msg.isChecked);
    setIsReceiveGuestBook(isExistNewGuestBook);
  }, [isReceiveGuestBook]);

  useEffect(() => {
    if (isLoading) return;

    socket.on(EVENTS.GET_MESSAGES, () => {
      setIsReceiveGuestBook(true);
    });

    return () => {
      socket.off(EVENTS.GET_MESSAGES);
    };
  }, [isLoading, isReceiveGuestBook]);

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
        <HostNameContainer>{hostName} 마을</HostNameContainer>
        <CokeCounter />
        <PostBoxContainer>
          <PostBox />
          {isReceiveGuestBook && loginUser.id === id && (
            <i className="fas fa-exclamation-circle guestBookNoti" />
          )}
        </PostBoxContainer>
        <IcePalette
          iceCount={iceCount}
          outItems={outItems}
          onOutItems={setOutItems}
        />
        {loginUser.id === id && (
          <GiftAndItemContainer>
            <InItemBox />
            {isReceiveGift && (
              <i className="fas fa-exclamation-circle giftNoti" />
            )}
          </GiftAndItemContainer>
        )}
        <ModalPortals>
          {isMailOpen && <Mail />}
          {isPostBoxOpen && (
            <GuestBook
              socket={socket}
              setIsReceiveGuestBook={setIsReceiveGuestBook}
            />
          )}
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
          {isItemBoxOpen && (
            <ItemBox
              setOutItems={setOutItems}
              setIsReceiveGift={setIsReceiveGift}
            />
          )}
        </ModalPortals>
      </TownDiv>
    </>
  );
}

export default Town;

Town.propTypes = {
  socketInit: proptypes.func.isRequired,
};
