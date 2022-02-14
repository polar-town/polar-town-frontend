import React from "react";
import PropTypes from "prop-types";
import GameModal from "../GameModal/GameModal";
import Friends from "./Friends";
import { TYPE } from "../../constants/friendList";

function ShopFriendList({ toggleShopFriendList, targetItem, socket }) {
  return (
    <GameModal
      onClose={() => {
        toggleShopFriendList(false);
      }}
    >
      <Friends
        type={TYPE.SHOP_MY_FRIEND}
        targetItem={targetItem}
        toggleShopFriendList={toggleShopFriendList}
        socket={socket}
      />
    </GameModal>
  );
}

export default ShopFriendList;

ShopFriendList.propTypes = {
  toggleShopFriendList: PropTypes.func.isRequired,
  targetItem: PropTypes.string,
  socket: PropTypes.object,
};
