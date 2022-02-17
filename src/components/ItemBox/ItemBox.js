import React from "react";
import PropTypes from "prop-types";
import GameModal from "../GameModal/GameModal";
import HalfModal from "../GameModal/HalfModal";
import PresentBox from "./PresentBox";
import MyItemBox from "./MyItemBox";
import { useDispatch } from "react-redux";
import { toggleItemBox } from "../../features/modal/modalSlice";

function ItemBox({ setOutItems, setIsReceiveGift }) {
  const dispatch = useDispatch();

  return (
    <GameModal
      onClose={() => {
        dispatch(toggleItemBox());
      }}
    >
      <HalfModal
        category={["내 아이템", "선물함"]}
        setIsReceiveGift={setIsReceiveGift}
      >
        <MyItemBox setOutItems={setOutItems} />
        <PresentBox setOutItems={setOutItems} />
      </HalfModal>
    </GameModal>
  );
}

export default ItemBox;

ItemBox.propTypes = {
  setOutItems: PropTypes.func,
  setIsReceiveGift: PropTypes.func,
};
