import React from "react";
import { useSelector } from "react-redux";
import PostBox from "./PostBox";
import Mail from "../Mail/Mail";
import GuestBook from "../GuestBook/GuestBook";
import {
  selectMailIsOpen,
  selectPostBoxIsOpen,
} from "../../features/modal/modalSlice";

function Town() {
  const mailIsClicked = useSelector(selectMailIsOpen);
  const postBoxIsClicked = useSelector(selectPostBoxIsOpen);

  return (
    <div>
      <PostBox />
      {mailIsClicked && <Mail />}
      {postBoxIsClicked && <GuestBook />}
    </div>
  );
}

export default Town;
