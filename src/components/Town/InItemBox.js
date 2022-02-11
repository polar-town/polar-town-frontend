import React from "react";
import styled from "styled-components";

const ItemBoxDiv = styled.div`
  background-color: #013a4c;
  background-color: #2c5d70;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  position: absolute;
  bottom: 100px;
  right: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  i {
    font-size: 40px;
    color: var(--white);
  }
`;

function InItemBox() {
  return (
    <ItemBoxDiv>
      <i className="fas fa-paw"></i>
    </ItemBoxDiv>
  );
}

export default InItemBox;
