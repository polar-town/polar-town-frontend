import React from "react";
import styled from "styled-components";
import proptypes from "prop-types";

const StyleGameModalBtn = styled.button`
  width: 80px;
  height: 40px;
  border-radius: 5px;
  border: none;
  background-color: #edd5cb;
  cursor: pointer;

  &:hover {
    background-color: #e7c2b8;
  }
`;

function GameModalButton({ content }) {
  return <StyleGameModalBtn type="submit">{content}</StyleGameModalBtn>;
}

GameModalButton.propTypes = {
  content: proptypes.string,
};

export default GameModalButton;
