import React from "react";
import PropTypes from "prop-types";
import GameModal from "../GameModal/GameModal";
import HalfModal from "../GameModal/HalfModal";
import PresentBox from "./PresentBox";
import MyItemBox from "./MyItemBox";

function ItemBox({ onClose, setOutItems }) {
  return (
    <GameModal onClose={onClose}>
      <HalfModal category={["내 아이템", "선물함"]}>
        <MyItemBox onClose={onClose} setOutItems={setOutItems} />
        <PresentBox onClose={onClose} />
      </HalfModal>
    </GameModal>
  );
}

export default ItemBox;

ItemBox.propTypes = {
  onClose: PropTypes.func.isRequired,
  setOutItems: PropTypes.func,
};
