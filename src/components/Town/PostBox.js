import React from "react";
import styled from "styled-components";
import proptype from "prop-types";

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
`;

function PostBox({ toggleGuestbook }) {
  return (
    <PostBoxContainer>
      <img
        onClick={() => {
          toggleGuestbook(true);
        }}
        src="/images/postbox.png"
      />
    </PostBoxContainer>
  );
}

export default PostBox;

PostBox.propTypes = {
  toggleGuestbook: proptype.func.isRequired,
};
