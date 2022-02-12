import React from "react";
import PropTypes from "prop-types";
import GameModal from "../GameModal/GameModal";
import HalfModal from "../GameModal/HalfModal";
import PresentBox from "./PresentBox";
import MyItemBox from "./MyItemBox";

function ItemBox({ toggleItemBox }) {
  return (
    <GameModal
      onClose={() => {
        toggleItemBox(false);
      }}
    >
      <HalfModal category={["내 아이템", "선물함"]}>
        <MyItemBox onClose={toggleItemBox} />
        <PresentBox onClose={toggleItemBox} />
      </HalfModal>
    </GameModal>
  );
}

export default ItemBox;

ItemBox.propTypes = {
  toggleItemBox: PropTypes.func.isRequired,
};
