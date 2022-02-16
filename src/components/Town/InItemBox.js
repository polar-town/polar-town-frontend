import React from "react";
import styled from "styled-components";
import proptypes from "prop-types";

const ItemBoxDiv = styled.div`
  background-color: #013a4c;
  background-color: #2c5d70;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  i {
    font-size: 40px;
    color: var(--white);
  }
`;

function InItemBox({ toggleItemBox }) {
  return (
    <ItemBoxDiv
      onClick={() => {
        toggleItemBox(true);
      }}
    >
      <i className="fas fa-paw"></i>
    </ItemBoxDiv>
  );
}

InItemBox.propTypes = {
  toggleItemBox: proptypes.func.isRequired,
};

export default InItemBox;
