import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { togglePostBox } from "../../features/modal/modalSlice";

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
`;

function PostBox() {
  const dispatch = useDispatch();

  return (
    <PostBoxContainer>
      <img
        onClick={() => {
          dispatch(togglePostBox());
        }}
        src="/images/postbox.png"
      />
    </PostBoxContainer>
  );
}

export default PostBox;
