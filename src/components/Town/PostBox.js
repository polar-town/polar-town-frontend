import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { togglePostBox } from "../../features/modal/modalSlice";
import proptype from "prop-types";
import { getMessageList } from "../../api/guestbook";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const PostBoxContainer = styled.div`
  position: absolute;
  top: 40%;
  left: 10%;
  z-index: 1;

  img {
    width: 75px;
    image-rendering: pixelated;
    cursor: pointer;
  }

  i {
    position: absolute;
    top: 0px;
    left: 57px;
    font-size: 17px;
    color: red;
  }
`;

function PostBox({ isReceiveGuestBook, setIsReceiveGuestBook }) {
  const dispatch = useDispatch();
  const axiosInstance = useAxiosPrivate();
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);

  useEffect(async () => {
    const response = await getMessageList({ townId: id, axiosInstance });
    const { guestBook } = response.data.result;
    const isExistNewGuestBook = guestBook.some((msg) => !msg.isChecked);
    setIsReceiveGuestBook(isExistNewGuestBook);
  }, []);

  return (
    <PostBoxContainer>
      <img
        onClick={() => {
          dispatch(togglePostBox());
        }}
        src="/images/postbox.png"
      />
      {user.id === id && isReceiveGuestBook && (
        <i className="fas fa-exclamation-circle guestBookNoti" />
      )}
    </PostBoxContainer>
  );
}

export default PostBox;

PostBox.propTypes = {
  isReceiveGuestBook: proptype.bool,
  setIsReceiveGuestBook: proptype.func,
};
