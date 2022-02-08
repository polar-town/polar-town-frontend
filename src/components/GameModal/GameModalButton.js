import proptypes from "proptypes";
import React from "react";
import styled from "styled-components";

const StyleGameModalBtn = styled.button`
  width: 60px;
  height: 30px;
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
