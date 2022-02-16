import React from "react";
import proptypes from "prop-types";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { changeStorage } from "../../api/item";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import SpriteImage from "../SpriteImage/SpriteImage";

const OutItemDiv = styled.div`
  position: absolute;
  left: ${(props) => props.location[0]}px;
  top: ${(props) => props.location[1]}px;
  image-rendering: pixelated;
  z-index: 1;
  cursor: pointer;
`;

const FixedImage = styled.img`
  position: absolute;

  &.outBoxIgloo {
    width: 150px;
  }

  &.outBoxFlower {
    width: 35px;
  }
`;

function OutItem({ name, itemId, setOutItems, location }) {
  const imageSrc = `/images/items/${name}.png`;
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const axiosInstance = useAxiosPrivate();

  const goToInBox = async () => {
    try {
      const response = await changeStorage({
        userId: id,
        itemId,
        from: "outItemBox",
        to: "inItemBox",
        axiosInstance,
      });
      const { outBox } = response.result;
      setOutItems(outBox);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <OutItemDiv
        location={location}
        onDoubleClick={(e) => {
          if (user.id === id) {
            goToInBox();
            e.currentTarget.parentNode.removeChild(e.currentTarget);
          }
        }}
        onDragStart={(e) => {
          const img = new Image();
          img.src = `/images/items/${name}.png`;

          e.currentTarget.classList.add(itemId);
          e.dataTransfer.setData("itemId", itemId);
          e.dataTransfer.setDragImage(img, 10, 0);
        }}
        onDragOver={(e) => {
          e.target.display = "none";
          e.stopPropagation();
        }}
        draggable
      >
        {name === "PolarBear" || name === "Penguin" || name === "Seal" ? (
          <SpriteImage
            imageName={name}
            width={name === "Seal" ? 80 : 70}
            height="100"
            size={{ PolarBear: 80, Penguin: 70, Seal: 59, sealMargin: 1 }}
            margin={{ PolarBear: 0, Penguin: 0, Seal: 0 }}
          />
        ) : (
          <FixedImage src={imageSrc} alt="item" className={`outBox${name}`} />
        )}
      </OutItemDiv>
    </div>
  );
}

OutItem.propTypes = {
  name: proptypes.string,
  itemId: proptypes.string,
  setOutItems: proptypes.func,
  location: proptypes.array,
};

export default OutItem;
