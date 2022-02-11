import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import proptypes from "prop-types";
import PostBox from "./PostBox";
import Mail from "../Mail/Mail";
import GuestBook from "../GuestBook/GuestBook";
import {
  selectIsNotificationOpen,
  selectMailIsOpen,
  selectPostBoxIsOpen,
} from "../../features/modal/modalSlice";
import ModalPortals from "../ModalPortals/ModalPortals";
import Notification from "../Notification/Notification";
import styled from "styled-components";
import InItemBox from "./InItemBox";
import { useParams } from "react-router-dom";
import { getTownHostInfo } from "../../api/user";
import { currentCoke, selectUserId } from "../../features/user/userSlice";
import OutItem from "./OutItem";

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

function Town({ iceCount }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const isMailOpen = useSelector(selectMailIsOpen);
  const isPostBoxOpen = useSelector(selectPostBoxIsOpen);
  const isNotificationOpen = useSelector(selectIsNotificationOpen);
  const [townHost, setTownHost] = useState({});
  const isMe = useSelector(selectUserId) === id;

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
    <TownDiv iceCount={iceCount}>
      {/* <TownIceBackgroundDiv iceCount={iceCount} onClick={clickEvent}> */}
      {/* <img src="/images/ice-background/10.png" className="a" /> */}
      {townHost.outItemBox?.map((item) => (
        <OutItem key={item._id} name={item.name} />
      ))}
      <PostBox />
      {isMe && <InItemBox />}
      <ModalPortals>
        {isMailOpen && <Mail />}
        {isPostBoxOpen && <GuestBook />}
        {isNotificationOpen && <Notification />}
      </ModalPortals>
      {/* </TownIceBackgroundDiv> */}
    </TownDiv>
  );
}

Town.propTypes = {
  iceCount: proptypes.string,
};

export default Town;
