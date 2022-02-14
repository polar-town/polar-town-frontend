import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import proptypes from "prop-types";
import styled from "styled-components";
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

function Town({ iceCount, onTownTransition }) {
  const { id } = useParams();
  const isMe = useSelector(selectUserId) === id;
  const [outItems, setOutItems] = useState([]);
  const [onMail, setOnMail] = useState(false);
  const [onPostBox, setOnPostBox] = useState(false);
  const [onNotification, setOnNotification] = useState(false);
  const [onFriendList, setOnFriendList] = useState(false);
  const [onFriendSearch, setOnFriendSearch] = useState(false);
  const [onItemBoxOpen, setOnItemBoxOpen] = useState(false);
  const [onShopOpen, setOnShopOpen] = useState(false);
  const [notificationType, setNotificationType] = useState("");
  const [targetItem, setTargetItem] = useState("");
  const [onShopFriendList, setOnShopFriendList] = useState(false);

  useEffect(async () => {
    const user = await getTownHostInfo(id);

    setOutItems(user?.outItemBox);
  }, [id]);

  return (
    <>
      <Header
        toggleMail={setOnMail}
        toggleFriendSearch={setOnFriendSearch}
        toggleFriendList={setOnFriendList}
        toggleShop={setOnShopOpen}
        onTownTransition={onTownTransition}
      />
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
  iceCount: proptypes.string.isRequired,
  townId: proptypes.string.isRequired,
  onTownTransition: proptypes.func.isRequired,
  socket: proptypes.object,
};

export default Town;
