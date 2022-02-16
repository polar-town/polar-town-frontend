import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import GameModal from "../GameModal/GameModal";
import Friends from "./Friends";
import { TYPE } from "../../constants/friendList";
import { togglePresentFriends } from "../../features/modal/modalSlice";

function ShopFriendList({ targetItem, socket }) {
  const dispatch = useDispatch();

  return (
    <GameModal
      onClose={() => {
        dispatch(togglePresentFriends());
      }}
    >
      <Friends
        type={TYPE.SHOP_MY_FRIEND}
        targetItem={targetItem}
        socket={socket}
      />
    </GameModal>
  );
}

export default ShopFriendList;

ShopFriendList.propTypes = {
  targetItem: PropTypes.string,
  socket: PropTypes.object,
};
