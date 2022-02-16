import React from "react";
import styled from "styled-components";
import proptypes from "prop-types";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { changeLocation } from "../../api/item";
import { selectUser } from "../../features/user/userSlice";
import OutItem from "./OutItem";
import possibleLocation from "../../utils/iceBackgroundLocation";

const IcePaletteContainer = styled.div`
  position: relative;
  width: 1200px;
  height: 580px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -40%);
  image-rendering: pixelated;
  background-image: url(${(props) =>
    `/images/ice-background/${props.iceCount}.png`});
  background-size: cover;
`;

function IcePalette({ iceCount, outItems, onOutItems }) {
  const { id } = useParams();
  const loginUser = useSelector(selectUser);
  const isMe = loginUser.id === id;

  return (
    <IcePaletteContainer
      iceCount={iceCount}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={async (e) => {
        e.preventDefault();

        const itemId = e.dataTransfer.getData("itemId");
        const targetItem = document.getElementsByClassName(itemId)[0];
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (possibleLocation(iceCount, x, y)) {
          const xCoordinate = x - targetItem.children[0].offsetWidth / 2;
          const yCoordinate = y - targetItem.children[0].offsetHeight / 2;

          targetItem.style.left = xCoordinate + "px";
          targetItem.style.top = yCoordinate + "px";

          try {
            await changeLocation(loginUser.id, itemId, [
              xCoordinate,
              yCoordinate,
            ]);
          } catch (err) {
            console.error(err);
          }
        }
      }}
    >
      {outItems?.map((item) => (
        <OutItem
          key={item._id}
          name={item.name}
          isMe={isMe}
          itemId={item._id}
          setOutItems={onOutItems}
          location={item.location}
        />
      ))}
    </IcePaletteContainer>
  );
}

IcePalette.propTypes = {
  iceCount: proptypes.number,
  outItems: proptypes.array,
  onOutItems: proptypes.func,
};

export default IcePalette;
