import React from "react";
import styled from "styled-components";
import proptype from "prop-types";

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
