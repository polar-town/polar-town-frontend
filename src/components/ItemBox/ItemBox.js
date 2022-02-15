import React from "react";
import PropTypes, { func } from "prop-types";
import GameModal from "../GameModal/GameModal";
import HalfModal from "../GameModal/HalfModal";
import PresentBox from "./PresentBox";
import MyItemBox from "./MyItemBox";

function ItemBox({ toggleItemBox, setOutItems, setIsReceiveGift }) {
  return (
    <GameModal
      onClose={() => {
        toggleItemBox(false);
      }}
    >
      <HalfModal
        category={["내 아이템", "선물함"]}
        setIsReceiveGift={setIsReceiveGift}
      >
        <MyItemBox onClose={toggleItemBox} setOutItems={setOutItems} />
        <PresentBox onClose={toggleItemBox} setOutItems={setOutItems} />
      </HalfModal>
    </GameModal>
  );
}

export default ItemBox;

ItemBox.propTypes = {
  toggleItemBox: PropTypes.func.isRequired,
  setOutItems: PropTypes.func,
  setIsReceiveGift: PropTypes.func,
};
