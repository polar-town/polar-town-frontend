import React from "react";
import proptypes from "prop-types";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { changeStorage } from "../../api/item";

const OutItemDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 48%;
  image-rendering: pixelated;
  z-index: 1;
`;

function OutItem({ name, isMe, itemId, setOutItems }) {
  const imageSrc = `/images/items/${name}.png`;
  const { id } = useParams();

  const goToOutBox = async () => {
    const response = await changeStorage(id, itemId, "outItemBox", "inItemBox");
    const { outBox } = response.result;
    setOutItems(outBox);
  };

  return (
    <OutItemDiv draggable>
      <img
        src={imageSrc}
        alt="item"
        onDoubleClick={() => {
          isMe && goToOutBox();
        }}
      />
    </OutItemDiv>
  );
}

OutItem.propTypes = {
  name: proptypes.string,
  isMe: proptypes.bool,
  itemId: proptypes.string,
  setOutItems: proptypes.func,
};

export default OutItem;
