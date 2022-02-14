import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import protypes from "prop-types";
import FriendRow from "./FriendRow";
import { TYPE } from "../../constants/friendList";
import { selectUserId, updateFriendList } from "../../features/user/userSlice";
import { getFriendList } from "../../api/friendlist";

function Friends({
  visitFriend,
  toggleFriendList,
  type,
  targetItem,
  toggleShopFriendList,
  socket,
}) {
  const [friends, setFriends] = useState([]);
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  useEffect(async () => {
    const friendList = await getFriendList(userId);
    setFriends(friendList);
    dispatch(updateFriendList(friendList));
  }, []);

  return (
    <div>
      {!!friends?.length &&
        friends.map((friend) => {
          const key = nanoid();
          return (
            <FriendRow
              key={key}
              friend={friend}
              type={type ? type : TYPE.MY_FRIEND}
              visitFriend={visitFriend}
              toggleFriendList={toggleFriendList}
              handleDeletion={setFriends}
              targetItem={targetItem}
              toggleShopFriendList={toggleShopFriendList}
              socket={socket}
            />
          );
        })}
    </div>
  );
}

export default Friends;

Friends.propTypes = {
  visitFriend: protypes.func.isRequired,
  toggleFriendList: protypes.func.isRequired,
  type: protypes.string,
  targetItem: protypes.string,
  toggleShopFriendList: protypes.func,
  socket: protypes.object,
};
