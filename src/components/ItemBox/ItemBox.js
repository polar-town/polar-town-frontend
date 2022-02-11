import React from "react";
import PropTypes from "prop-types";
import GameModal from "../GameModal/GameModal";
import HalfModal from "../GameModal/HalfModal";
import PresentBox from "./PresentBox";
import MyItemBox from "./MyItemBox";

function ItemBox({ onClose }) {
  return (
    <GameModal onClose={onClose}>
      <HalfModal category={["내 아이템", "선물함"]}>
        <MyItemBox onClose={onClose} />
        <PresentBox />
      </HalfModal>
    </GameModal>
  );
}

export default ItemBox;

ItemBox.propTypes = {
  onClose: PropTypes.func.isRequired,
};
