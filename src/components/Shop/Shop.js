import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Item from "../Item/Item";
import GameModal from "../GameModal/GameModal";
import { ITEM_LIST, ITEM_PRICE_LIST } from "../../constants/item";

const StyledDiv = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
`;

function Shop({ onClose }) {
  return (
    <GameModal onClose={onClose} subject="상점">
      <StyledDiv>
        {ITEM_LIST.map((item) => {
          return (
            <Item
              key={item}
              storageType="shop"
              content={ITEM_PRICE_LIST[item]}
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
