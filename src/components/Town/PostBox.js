import React, { useEffect, useState } from "react";
import styled from "styled-components";
import proptype, { bool } from "prop-types";
import { getMessageList } from "../../api/guestbook";
import { useSelector } from "react-redux";
import { selectUserId } from "../../features/user/userSlice";

const PostBoxContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;

  img {
    width: 75px;
    position: absolute;
    top: 260px;
    left: 70px;
    image-rendering: pixelated;
    cursor: pointer;
  }

  i {
    position: absolute;
    top: 260px;
    left: 132px;
    font-size: 17px;
    color: red;
  }
`;

function PostBox({
  toggleGuestbook,
  isReceiveGuestBook,
  setIsReceiveGuestBook,
  isMe,
}) {
  const loginUserId = useSelector(selectUserId);
  // const [isReceiveGuestBook, setIsReceiveGuestBook] = useState(false);

  useEffect(async () => {
    const response = await getMessageList(loginUserId);
    const { guestBook } = response.data.result;
    const isExistNewGuestBook = guestBook.some((msg) => !msg.isChecked);
    setIsReceiveGuestBook(isExistNewGuestBook);
  }, []);

  return (
    <PostBoxContainer>
      <img
        onClick={() => {
          toggleGuestbook(true);
        }}
        src="/images/postbox.png"
      />
      {isMe && isReceiveGuestBook && (
        <i className="fas fa-exclamation-circle guestBookNoti" />
      )}
    </PostBoxContainer>
  );
}

export default PostBox;

PostBox.propTypes = {
  toggleGuestbook: proptype.func.isRequired,
  isReceiveGuestBook: proptype.bool,
  setIsReceiveGuestBook: proptype.func,
  isMe: proptype.bool,
};
