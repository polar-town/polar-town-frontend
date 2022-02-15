import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { ITEM_LIST, ITEM_PRICE_LIST } from "../../constants/item";
import { toggleShop } from "../../features/modal/modalSlice";

import Item from "../Item/Item";
import GameModal from "../GameModal/GameModal";

const StyledDiv = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
`;

function Shop({ getTargetItem }) {
  const dispatch = useDispatch();

  return (
    <GameModal
      onClose={() => {
        dispatch(toggleShop());
      }}
      subject="상점"
    >
      <StyledDiv>
        {ITEM_LIST.map((item) => {
          return (
            <Item
              key={item}
              storageType="shop"
              content={ITEM_PRICE_LIST[item]}
              imageName={item}
              onTargetItem={getTargetItem}
            />
          );
        })}
      </StyledDiv>
    </GameModal>
  );
}

export default Shop;

Shop.propTypes = {
  getTargetItem: PropTypes.func,
};
