import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Item from "../Item/Item";
import GameModal from "../GameModal/GameModal";

const StyledDiv = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
`;

function Shop({ onClose }) {
  const itemList = {
    PolarBear: "200",
    Penguin: "300",
    Seal: "400",
    Igloo: "500",
    Flower: "50",
    Ice: "200",
  };

  return (
    <GameModal onClose={onClose} subject="상점">
      <StyledDiv>
        {Object.keys(itemList).map((item) => {
          return (
            <Item
              key={item}
              storageType="shop"
              data={itemList[item]}
              imageName={item}
            />
          );
        })}
      </StyledDiv>
    </GameModal>
  );
}

export default Shop;

Shop.propTypes = {
  onClose: PropTypes.func.isRequired,
};
