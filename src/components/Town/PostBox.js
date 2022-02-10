import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

const StypedPostBoxContainer = styled.div`
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
    <StypedPostBoxContainer>
      <img onClick={() => {}} src="/images/postbox.png" />
    </StypedPostBoxContainer>
  );
}

export default PostBox;
