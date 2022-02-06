import React from "react";
import styled from "styled-components";

const StyledDeleteButton = styled.button`
  background: none;
  width: 40px;
  height: 40px;
  font-size: 18px;
  border: none;
  border-radius: 50%;
  color: #666666;
  cursor: pointer;

  &:hover {
    color: #000000;
    background-color: #66666630;
  }
`;

function DeleteIconButton() {
  return (
    <StyledDeleteButton>
      <i className="fas fa-trash-alt"></i>
    </StyledDeleteButton>
  );
}

export default DeleteIconButton;
