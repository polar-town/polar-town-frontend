import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { openGuestBook } from "../../features/modal/modalSlice";

const PostBoxContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;

  img {
    width: 75px;
    position: absolute;
    top: 380px;
    left: 150px;
    image-rendering: pixelated;
  }
`;

function PostBox() {
  const dispatch = useDispatch();

  return (
    <PostBoxContainer>
      <img
        onClick={() => {
          dispatch(openGuestBook());
        }}
        src="/images/postbox.png"
      />
    </PostBoxContainer>
  );
}

export default PostBox;
