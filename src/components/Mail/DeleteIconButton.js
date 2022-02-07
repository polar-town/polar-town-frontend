import React from "react";
import styled from "styled-components";

const StyledDeleteButton = styled.button`
  background: none;
  width: 40px;
  height: 40px;
  font-size: 18px;
  border: none;
  border-radius: 50%;
  color: var(--mail-basic);
  cursor: pointer;

  &:hover {
    color: var(--black);
    background-color: var(--mail-hover);
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
