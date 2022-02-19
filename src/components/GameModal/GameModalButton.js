import React from "react";
import styled from "styled-components";
import proptypes from "prop-types";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const StyleGameModalBtn = styled.button`
  width: 80px;
  height: 40px;
  border-radius: 5px;
  border: none;
  background-color: ${(props) => (props.disabled ? "#e7c2b8" : "#edd5cb")};
  cursor: pointer;

  &:hover {
    background-color: #e7c2b8;
  }
`;

function GameModalButton({ content, onSelect, disabled }) {
  return (
    <StyleGameModalBtn type="submit" onClick={onSelect} disabled={disabled}>
      {content}
    </StyleGameModalBtn>
  );
}

GameModalButton.defaultProps = {
  disabled: false,
};

GameModalButton.propTypes = {
  content: proptypes.string.isRequired,
  onSelect: proptypes.func,
  disabled: proptypes.bool,
};

export default GameModalButton;
