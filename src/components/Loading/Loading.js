import React from "react";
import proptypes from "prop-types";
import styled, { keyframes } from "styled-components";

const spinner = keyframes`
  0%,
  100% {
    box-shadow: 0em -2.6em 0em 0em #716f6f, 1.8em -1.8em 0 0em rgba(113,111,111, 0.2), 2.5em 0em 0 0em rgba(113,111,111, 0.2), 1.75em 1.75em 0 0em rgba(113,111,111, 0.2), 0em 2.5em 0 0em rgba(113,111,111, 0.2), -1.8em 1.8em 0 0em rgba(113,111,111, 0.2), -2.6em 0em 0 0em rgba(113,111,111, 0.5), -1.8em -1.8em 0 0em rgba(113,111,111, 0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(113,111,111, 0.7), 1.8em -1.8em 0 0em #716f6f, 2.5em 0em 0 0em rgba(113,111,111, 0.2), 1.75em 1.75em 0 0em rgba(113,111,111, 0.2), 0em 2.5em 0 0em rgba(113,111,111, 0.2), -1.8em 1.8em 0 0em rgba(113,111,111, 0.2), -2.6em 0em 0 0em rgba(113,111,111, 0.2), -1.8em -1.8em 0 0em rgba(113,111,111, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(113,111,111, 0.5), 1.8em -1.8em 0 0em rgba(113,111,111, 0.7), 2.5em 0em 0 0em #716f6f, 1.75em 1.75em 0 0em rgba(113,111,111, 0.2), 0em 2.5em 0 0em rgba(113,111,111, 0.2), -1.8em 1.8em 0 0em rgba(113,111,111, 0.2), -2.6em 0em 0 0em rgba(113,111,111, 0.2), -1.8em -1.8em 0 0em rgba(113,111,111, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(113,111,111, 0.2), 1.8em -1.8em 0 0em rgba(113,111,111, 0.5), 2.5em 0em 0 0em rgba(113,111,111, 0.7), 1.75em 1.75em 0 0em #716f6f, 0em 2.5em 0 0em rgba(113,111,111, 0.2), -1.8em 1.8em 0 0em rgba(113,111,111, 0.2), -2.6em 0em 0 0em rgba(113,111,111, 0.2), -1.8em -1.8em 0 0em rgba(113,111,111, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(113,111,111, 0.2), 1.8em -1.8em 0 0em rgba(113,111,111, 0.2), 2.5em 0em 0 0em rgba(113,111,111, 0.5), 1.75em 1.75em 0 0em rgba(113,111,111, 0.7), 0em 2.5em 0 0em #716f6f, -1.8em 1.8em 0 0em rgba(113,111,111, 0.2), -2.6em 0em 0 0em rgba(113,111,111, 0.2), -1.8em -1.8em 0 0em rgba(113,111,111, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(113,111,111, 0.2), 1.8em -1.8em 0 0em rgba(113,111,111, 0.2), 2.5em 0em 0 0em rgba(113,111,111, 0.2), 1.75em 1.75em 0 0em rgba(113,111,111, 0.5), 0em 2.5em 0 0em rgba(113,111,111, 0.7), -1.8em 1.8em 0 0em #716f6f, -2.6em 0em 0 0em rgba(113,111,111, 0.2), -1.8em -1.8em 0 0em rgba(113,111,111, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(113,111,111, 0.2), 1.8em -1.8em 0 0em rgba(113,111,111, 0.2), 2.5em 0em 0 0em rgba(113,111,111, 0.2), 1.75em 1.75em 0 0em rgba(113,111,111, 0.2), 0em 2.5em 0 0em rgba(113,111,111, 0.5), -1.8em 1.8em 0 0em rgba(113,111,111, 0.7), -2.6em 0em 0 0em #716f6f, -1.8em -1.8em 0 0em rgba(113,111,111, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(113,111,111, 0.2), 1.8em -1.8em 0 0em rgba(113,111,111, 0.2), 2.5em 0em 0 0em rgba(113,111,111, 0.2), 1.75em 1.75em 0 0em rgba(113,111,111, 0.2), 0em 2.5em 0 0em rgba(113,111,111, 0.2), -1.8em 1.8em 0 0em rgba(113,111,111, 0.5), -2.6em 0em 0 0em rgba(113,111,111, 0.7), -1.8em -1.8em 0 0em #716f6f;
  }
`;

const Contaniner = styled.div`
  width: 80px;
  margin: 0 auto;
`;

const LoadingSpinner = styled.div`
  margin: 100px auto;
  font-size: 10px;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: absolute;
  text-indent: -9999em;
  top: ${(props) => (props.isDelete ? "500%" : "35%")};
  right: 50%;
  animation: ${spinner} 1.1s infinite ease;
  transform: translateZ(0);
  z-index: 2;
`;

function Loading({ isDelete }) {
  return (
    <Contaniner>
      <LoadingSpinner isDelete={isDelete} />
    </Contaniner>
  );
}

export default Loading;

Loading.propTypes = {
  isDelete: proptypes.bool,
};
