import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import protypes from "prop-types";
import FriendRow from "./FriendRow";
import { TYPE } from "../../constants/friendList";
import { updateFriendList } from "../../features/user/userSlice";
import { getFriendList } from "../../api/friendlist";

function Friends({ type, targetItem, socket }) {
  const [friends, setFriends] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(async () => {
    const friendList = await getFriendList(user.id);
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
              handleDeletion={setFriends}
              targetItem={targetItem}
              socket={socket}
            />
          );
        })}
    </div>
  );
}

export default Friends;

Friends.propTypes = {
  type: protypes.string,
  targetItem: protypes.string,
  socket: protypes.object,
};
