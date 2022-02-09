import React from "react";
import { useSelector } from "react-redux";
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

function Town() {
  const isMailOpen = useSelector(selectMailIsOpen);
  const isPostBoxOpen = useSelector(selectPostBoxIsOpen);
  const isNotificationOpen = useSelector(selectIsNotificationOpen);

  return (
    <div>
      <PostBox />
      <ModalPortals>
        {isMailOpen && <Mail />}
        {isPostBoxOpen && <GuestBook />}
        {isNotificationOpen && <Notification />}
      </ModalPortals>
    </div>
  );
}

export default Town;
