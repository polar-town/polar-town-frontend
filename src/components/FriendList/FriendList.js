import React from "react";
import { useDispatch } from "react-redux";
import { closeFriendList } from "../../features/modal/modalSlice";
import GameModal from "../GameModal/GameModal";
import HalfModal from "../GameModal/HalfModal";
import Friends from "./Friends";
import PendingFriends from "./PendingFriends";
import proptypes from "prop-types";

function FriendList({ toggleFriendList, visitFriend }) {
  const dispatch = useDispatch();

  const data = [
    {
      name: "조은별",
      id: "62026c8514ae0f388ed66708",
      url: "https://lh3.googleusercontent.com/a/AATXAJxxbHrLYUxCeas7MEWa79xgPZVVMHek_XFrhypx=s96-c",
    },
    {
      name: "최리",
      id: "62024632a669ed3ebbfbfe38",
      url: "https://lh3.googleusercontent.com/a/AATXAJxgk2MYxYmGTfM8LRWnEFbooyhzGrR7rJBpm3ve=s96-c",
    },
  ];

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
        />
        <PendingFriends />
      </HalfModal>
    </GameModal>
  );
}

export default FriendList;

FriendList.propTypes = {
  toggleFriendList: proptypes.func.isRequired,
  visitFriend: proptypes.func.isRequired,
};
