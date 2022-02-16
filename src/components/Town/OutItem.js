import React from "react";
import proptypes from "prop-types";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { changeStorage } from "../../api/item";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const OutItemDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 48%;
  image-rendering: pixelated;
  z-index: 1;
`;

function OutItem({ name, itemId, setOutItems }) {
  const imageSrc = `/images/items/${name}.png`;
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const axiosInstance = useAxiosPrivate();

  const goToOutBox = async () => {
    const response = await changeStorage({
      userId: id,
      itemId,
      from: "outItemBox",
      to: "inItemBox",
      axiosInstance,
    });
    const { outBox } = response.result;
    setOutItems(outBox);
  };

  return (
    <OutItemDiv draggable>
      <img
        src={imageSrc}
        alt="item"
        onDoubleClick={() => {
          user.id === id && goToOutBox();
        }}
      />
    </OutItemDiv>
  );
}

OutItem.propTypes = {
  name: proptypes.string,
  itemId: proptypes.string,
  setOutItems: proptypes.func,
};

export default OutItem;
