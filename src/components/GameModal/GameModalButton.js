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

function GameModalButton({ content, onSelect }) {
  return (
    <StyleGameModalBtn type="submit" onClick={onSelect}>
      {content}
    </StyleGameModalBtn>
  );
}

GameModalButton.propTypes = {
  content: proptypes.string.isRequired,
  onSelect: proptypes.func,
};

export default GameModalButton;
