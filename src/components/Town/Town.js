import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { currentCoke, selectUserId } from "../../features/user/userSlice";
import OutItem from "./OutItem";
import FriendList from "../FriendList/FriendList";
import Header from "../Header/header";
import CokeCounter from "../CokeCounter/CokeCounter";
import ItemBox from "../ItemBox/ItemBox";
import Shop from "../Shop/Shop";

const TownDiv = styled.div`
  /* background-image: url(${(props) => props.iceCount}),
    url("/images/town-background-image.jpg");
  background-position: center 40px, center center; */
  background-image: url("/images/town-background-image.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  image-rendering: pixelated;
  position: relative;

  .a {
    width: 1500px;
    position: absolute;
    bottom: 0;
    left: 10%;
  }
`;

const TownIceBackgroundDiv = styled.div`
  background-image: url(${(props) => props.iceCount});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 6vw 11vh;
  image-rendering: pixelated;
`;

// const StyledTownDiv = styled.div`
//   background-image: url("/images/town-background-image.jpg");
//   background-repeat: no-repeat;
//   background-size: 100%;
//   background-position: center 90%;
// `;

function action_coords(event) {
  var x1 = event.clientX;
  var y1 = event.clientY;
  var x2 = event.offsetX;
  var y2 = event.offsetY;
  var x3 = event.screenX;
  var y3 = event.screenY;

  console.log("client", x1, y1);
  console.log("screen", x3, y3);
}

function Town({ iceCount, onTownTransition }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [townHost, setTownHost] = useState({});
  const isMe = useSelector(selectUserId) === id;
  //
  const [onMail, setOnMail] = useState(false);
  const [onPostBox, setOnPostBox] = useState(false);
  const [onNotification, setOnNotification] = useState(false);
  const [onFriendList, setOnFriendList] = useState(false);
  const [onItemBoxOpen, setOnItemBoxOpen] = useState(false);
  const [onShopOpen, setOnShopOpen] = useState(false);

  useEffect(async () => {
    const user = await getTownHostInfo(id);

    setTownHost(user);
    dispatch(currentCoke(user.cokeCount));
  }, []);

  function clickEvent(e) {
    var rect = e.target.getBoundingClientRect();
    console.log("브라우저 안쪽 height", document.body.offsetHeight);
    console.log("브라우저 안쪽 width", document.body.offsetWidth);

    console.log(123, e);
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top; //y position within the element.
  }

  return (
    <>
      <Header
        toggleMail={setOnMail}
        toggleFindUser={() => {}}
        toggleFriendList={setOnFriendList}
        toggleShop={setOnShopOpen}
        onSignout={onTownTransition}
      />
      <TownDiv iceCount={iceCount}>
        <CokeCounter />
        <TownIceBackgroundDiv iceCount={iceCount} onClick={clickEvent}>
          {/* <img src="/images/ice-background/10.png" className="a" /> */}
          {townHost.outItemBox?.map((item) => (
            <OutItem key={item._id} name={item.name} />
          ))}
          <PostBox toggleGuestbook={setOnPostBox} />
          {isMe && <InItemBox toggleItemBox={setOnItemBoxOpen} />}
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
            {onItemBoxOpen && <ItemBox onClose={setOnItemBoxOpen} />}
            {onShopOpen && <Shop onClose={setOnShopOpen} />}
          </ModalPortals>
        </TownIceBackgroundDiv>
      </TownDiv>
    </>
  );
}

Town.propTypes = {
  iceCount: proptypes.string.isRequired,
  onTownTransition: proptypes.func.isRequired,
};

export default Town;
