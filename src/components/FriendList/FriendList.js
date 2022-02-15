import React from "react";
import GameModal from "../GameModal/GameModal";
import HalfModal from "../GameModal/HalfModal";
import Friends from "./Friends";
import PendingFriends from "./PendingFriends";
import proptypes from "prop-types";
import { useDispatch } from "react-redux";
import { toggleFriendList } from "../../features/modal/modalSlice";

function FriendList({ socket }) {
  const dispatch = useDispatch();

  return (
    <GameModal
      onClose={() => {
        dispatch(toggleFriendList());
      }}
    >
      <HalfModal category={["친구 목록", "친구 요청"]}>
        <Friends socket={socket} />
        <PendingFriends />
      </HalfModal>
    </GameModal>
  );
}

export default FriendList;

FriendList.propTypes = {
  socket: proptypes.object,
};
