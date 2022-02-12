import React from "react";
import styled from "styled-components";
import proptypes from "prop-types";
import { nanoid } from "nanoid";
import GameModalButton from "../GameModal/GameModalButton";
import FriendProfile from "../FriendProfile/FriendProfile";
import { OPTION, TYPE } from "../../constants/friendList";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserId,
  selectFriendList,
  selectPendingFriendList,
  updateFriendList,
  updatePendingFriendList,
} from "../../features/user/userSlice";
import {
  deleteFriend,
  addFriendList,
  deletePendingFriend,
} from "../../api/friendlist";

const FriendRowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 20px;
  margin-bottom: 20px;

  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
`;

const FriendRowButtonContainer = styled.section`
  padding: 15px 0;

  button {
    margin-left: 10px;
  }
`;

const VISIT = 0;
const ACCEPT = 0;

function FriendRow({
  friend,
  type,
  visitFriend,
  toggleFriendList,
  handleResponse,
}) {
  const userId = useSelector(selectUserId);
  const prevFriendList = useSelector(selectFriendList);
  const prevPendingFriendList = useSelector(selectPendingFriendList);
  const dispatch = useDispatch();
  const { name, email, photo, id, iceCount } = friend;

  function visitFriendTown() {
    visitFriend(id, iceCount);
    toggleFriendList(false);
  }

  async function onDeletion() {
    const newFriendList = prevFriendList.filter((friend) => friend.id !== id);
    console.log(friend);

    await deleteFriend(userId, email);
    dispatch(updateFriendList(newFriendList));
    handleResponse(newFriendList);
  }

  async function acceptFriendRequest() {
    const newFriendList = [...prevFriendList].push(friend);
    const newPendingFriendList = prevPendingFriendList.filter(
      (friend) => friend.id !== id,
    );
    console.log(friend);
    await addFriendList(userId, email);
    dispatch(updatePendingFriendList(newPendingFriendList));
    dispatch(updateFriendList(newFriendList));
    handleResponse(newPendingFriendList);
  }

  async function declineFriendRequest() {
    const newPendingFriendList = prevPendingFriendList.filter(
      (friend) => friend.id !== id,
    );
    console.log(friend, newPendingFriendList, friend.id, id);
    await deletePendingFriend(userId, email);
    dispatch(updatePendingFriendList(newPendingFriendList));
    handleResponse(newPendingFriendList);
  }

  return (
    <FriendRowContainer>
      <FriendProfile name={name} photo={photo} />
      <FriendRowButtonContainer>
        {type === TYPE.MY_FRIEND &&
          OPTION.MY_FRIEND.map((option) => {
            const key = nanoid();
            const handleSelect =
              option === OPTION.MY_FRIEND[VISIT] ? visitFriendTown : onDeletion;

            return (
              <GameModalButton
                key={key}
                content={option}
                onSelect={handleSelect}
              />
            );
          })}
        {type === TYPE.PENDING_FRIEND &&
          OPTION.PENDING_FRIEND.map((option) => {
            const key = nanoid();
            const handleSelect =
              option === OPTION.PENDING_FRIEND[ACCEPT]
                ? acceptFriendRequest
                : declineFriendRequest;

            return (
              <GameModalButton
                key={key}
                content={option}
                onSelect={handleSelect}
              />
            );
          })}
      </FriendRowButtonContainer>
    </FriendRowContainer>
  );
}

FriendRow.propTypes = {
  friend: proptypes.object.isRequired,
  type: proptypes.string.isRequired,
  toggleFriendList: proptypes.func,
  visitFriend: proptypes.func,
  handleResponse: proptypes.func,
};

export default FriendRow;
