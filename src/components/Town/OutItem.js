import React from "react";
import proptypes from "prop-types";
import styled from "styled-components";

const OutItemDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 48%;
  image-rendering: pixelated;
`;

function OutItem({ name }) {
  const imageSrc = `/images/items/${name}.png`;

  return (
    <OutItemDiv draggable>
      <img src={imageSrc} alt="item" />
    </OutItemDiv>
  );
}

OutItem.propTypes = {
  name: proptypes.string,
};

export default OutItem;
