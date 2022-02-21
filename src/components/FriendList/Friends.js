import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import protypes from "prop-types";
import FriendRow from "./FriendRow";
import { TYPE } from "../../constants/friendList";
import { updateFriendList } from "../../features/user/userSlice";
import { getFriendList } from "../../api/friendlist";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useLogout from "../../hooks/useLogout";

function Friends({ type, targetItem, socket }) {
  const [friends, setFriends] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const axiosInstance = useAxiosPrivate();
  const logout = useLogout();

  useEffect(async () => {
    try {
      const friendList = await getFriendList({
        userId: user.id,
        axiosInstance,
      });
      setFriends(friendList);
      dispatch(updateFriendList(friendList));
    } catch (error) {
      console.error(error.response?.status);
      if (error.response?.status === 401) {
        logout();
      }
    }
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
