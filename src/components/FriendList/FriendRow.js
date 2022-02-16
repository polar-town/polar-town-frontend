import React from "react";
import styled from "styled-components";
import proptypes from "prop-types";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { decreaseCoke } from "../../features/user/userSlice";
import {
  closeAll,
  togglePresentFriends,
} from "../../features/modal/modalSlice";

import {
  deleteFriend,
  addFriendList,
  deletePendingFriend,
} from "../../api/friendlist";
import { sendItem } from "../../api/item";
import { ITEM_PRICE_LIST } from "../../constants/item";
import { OPTION, TYPE } from "../../constants/friendList";
import { EVENTS, LEFT_TYPE } from "../../constants/socketEvents";

import GameModalButton from "../GameModal/GameModalButton";
import FriendProfile from "../FriendProfile/FriendProfile";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

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
  handleDeletion,
  handleResponse,
  targetItem,
  socket,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: townId } = useParams();
  const { user } = useSelector((state) => state.user);
  const { name, email, photo, id } = friend;
  const axiosInstance = useAxiosPrivate();

  function visitFriendTown() {
    socket.emit(EVENTS.LEFT, {
      prevTownId: townId,
      user,
      type: LEFT_TYPE.TRANSITION,
    });
    dispatch(closeAll());
    navigate(`/users/${id}`);
  }

  async function onDeletion() {
    await deleteFriend({ userId: user.id, email, deleteFriend, axiosInstance });
    handleDeletion((prev) => prev.filter((friend) => friend.id !== id));
  }

  async function acceptFriendRequest() {
    await addFriendList({ userId: user.id, email, axiosInstance });
    handleResponse((prev) => prev.filter((friend) => friend.id !== id));
  }

  async function declineFriendRequest() {
    await deletePendingFriend({ userId: user.id, email, axiosInstance });
    handleResponse((prev) => prev.filter((friend) => friend.id !== id));
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
                disabled={handleSelect === visitFriendTown && townId === id}
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
        {type === TYPE.SHOP_MY_FRIEND &&
          OPTION.SHOP_MY_FRIEND.map((option) => {
            const isAffordable = user.cokeCount >= ITEM_PRICE_LIST[targetItem];
            const key = nanoid();
            const handleSelect = async () => {
              await sendItem({
                townId: user.id,
                presentTo: id,
                name: targetItem,
                price: ITEM_PRICE_LIST[targetItem],
                axiosInstance,
              });

              socket.emit(EVENTS.SEND_PRESENT, {
                to: email,
                from: user.username,
              });
              dispatch(togglePresentFriends());
              dispatch(decreaseCoke(ITEM_PRICE_LIST[targetItem]));
            };

            return (
              <GameModalButton
                key={key}
                content={option}
                onSelect={handleSelect}
                disabled={!isAffordable}
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
  handleDeletion: proptypes.func,
  handleResponse: proptypes.func,
  targetItem: proptypes.string,
  socket: proptypes.object,
};

export default FriendRow;
