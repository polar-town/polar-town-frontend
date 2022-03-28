import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { togglePostBox } from "../../features/modal/modalSlice";

const PostBoxImg = styled.img`
  width: 75px;
  image-rendering: pixelated;
  cursor: pointer;
`;

function PostBox() {
  const dispatch = useDispatch();

  return (
    <PostBoxImg
      onClick={() => {
        dispatch(togglePostBox());
      }}
      src="/images/postbox.png"
    />
  );
}

export default PostBox;
