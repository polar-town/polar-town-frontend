import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import GameModal from "../GameModal/GameModal";
import GameModalButton from "../GameModal/GameModalButton";
import { nanoid } from "nanoid";
import { TYPE, MESSAGE, OPTION } from "../../constants/notification";
import proptype from "prop-types";
import { addItem } from "../../api/item";
import { addFriendList, deletePendingFriend } from "../../api/friendlist";
import {
  decreaseCoke,
  selectCokeCount,
  selectUserId,
  updateIceCount,
} from "../../features/user/userSlice";
import { ITEM_PRICE_LIST } from "../../constants/item";

const NotificationContainer = styled.div`
  height: 300px;
  overflow: actions;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.notificationType === "present" ? "center" : "space-between"};
  width: 50%;

  .button {
    margin-right: 30px;
    color: red;
  }
`;

function Notification({
  toggleNotification,
  notificationType,
  targetItem,
  toggleItemBox,
  from,
}) {
  const dispatch = useDispatch();
  const [buttonContent, setButtonContent] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState("");
  const id = useSelector(selectUserId);
  const cokeCount = useSelector(selectCokeCount);

  useEffect(() => {
    if (notificationType === TYPE.CONFIRM_PURCHASE) {
      setButtonContent(OPTION.CONFIRM_PURCHASE);
      setNotificationMessage(MESSAGE.CONFIRM_PURCHASE);
    } else if (notificationType === TYPE.FRIEND_REQUEST) {
      setButtonContent(OPTION.FRIEND_REQUEST);
      setNotificationMessage(
        `${from[0]}(${from[1]})님으로부터 ${MESSAGE.FRIEND_REQUEST}`,
      );
    } else {
      setButtonContent(OPTION.TYPE_PRESENT);
      setNotificationMessage(`"${from[0]}"님 으로부터 ${MESSAGE.TYPE_PRESENT}`);
    }
  }, [notificationType]);

  const handlePurchase = async (e) => {
    if (e.target.textContent === "예") {
      try {
        if (cokeCount - Number(ITEM_PRICE_LIST[targetItem]) >= 0) {
          if (targetItem === "Ice") {
            dispatch(updateIceCount());
          }
          await addItem(id, targetItem, ITEM_PRICE_LIST[targetItem]);

          dispatch(decreaseCoke(ITEM_PRICE_LIST[targetItem]));
          return toggleNotification(false);
        }

        setNotificationMessage("콜라가 부족합니다🥲");
        setButtonContent([]);
      } catch (err) {
        console.error(err);
      }
    }
    if (e.target.textContent === "아니요") {
      toggleNotification(false);
    }
  };

  const openItemBox = () => {
    toggleNotification(false);
    toggleItemBox(true);
  }
  
  const handleAcceptFriend = async () => {
    await addFriendList(id, from[1], true);

    toggleNotification(false);
  };

  const handleRejectFriend = async () => {
    await deletePendingFriend(id, from[1]);

    toggleNotification(false);
  };

  return (
    <GameModal
      subject={notificationType === "friendRequest" && "친구 요청"}
      onClose={() => {
        toggleNotification();
      }}
    >
      <NotificationContainer>
        <div>{notificationMessage}</div>
        <ButtonContainer notificationType={notificationType}>
          {buttonContent &&
            buttonContent.map((content) => {
              const key = nanoid();
              let handleFriendRequest;

              if (content === "수락") {
                handleFriendRequest = handleAcceptFriend;
              }
              if (content === "거절") {
                handleFriendRequest = handleRejectFriend;
              }
              return (
                <GameModalButton
                  key={key}
                  content={content}
                  onSelect={
                    notificationType === TYPE.CONFIRM_PURCHASE
                      ? handlePurchase
                      : notificationType === TYPE.FRIEND_REQUEST
                      ? handleFriendRequest
                      : openItemBox
                  }
                />
              );
            })}
        </ButtonContainer>
      </NotificationContainer>
    </GameModal>
  );
}

export default Notification;

Notification.propTypes = {
  toggleNotification: proptype.func.isRequired,
  notificationType: proptype.string,
  targetItem: proptype.string,
  toggleItemBox: proptype.func,
  from: proptype.array,
};
