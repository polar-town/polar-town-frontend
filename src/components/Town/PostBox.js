import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { openGuestBook } from "../../features/modal/modalSlice";

const StypedPostBoxContainer = styled.div`
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
    <StypedPostBoxContainer>
      <img
        onClick={() => {
          dispatch(openGuestBook());
        }}
        src="/images/postbox.png"
      />
    </StypedPostBoxContainer>
  );
}

export default PostBox;
