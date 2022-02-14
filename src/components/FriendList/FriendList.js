import React, { useState } from "react";
import GameModal from "../GameModal/GameModal";
import HalfModal from "../GameModal/HalfModal";
import Friends from "./Friends";
import PendingFriends from "./PendingFriends";
import proptypes from "prop-types";

function FriendList({ toggleFriendList, visitFriend, socket }) {
  return (
    <GameModal
      onClose={() => {
        toggleFriendList(false);
      }}
    >
      <HalfModal category={["친구 목록", "친구 요청"]}>
        <Friends
          visitFriend={visitFriend}
          toggleFriendList={toggleFriendList}
          socket={socket}
        />
        <PendingFriends />
      </HalfModal>
    </GameModal>
  );
}

export default FriendList;

FriendList.propTypes = {
  toggleFriendList: proptypes.func,
  visitFriend: proptypes.func.isRequired,
  socket: proptypes.object,
};
