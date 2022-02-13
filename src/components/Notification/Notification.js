import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import GameModal from "../GameModal/GameModal";
import GameModalButton from "../GameModal/GameModalButton";
import { nanoid } from "nanoid";
import { TYPE, MESSAGE, OPTION } from "../../constants/notification";
import proptype from "prop-types";
import { addItem } from "../../api/item";
import { decreaseCoke, selectUserId } from "../../features/user/userSlice";
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

function Notification({ toggleNotification, notificationType, targetItem }) {
  const dispatch = useDispatch();
  const [buttonContent, setButtonContent] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState("");
  const id = useSelector(selectUserId);

  useEffect(() => {
    if (notificationType === TYPE.CONFIRM_PURCHASE) {
      setButtonContent(OPTION.CONFIRM_PURCHASE);
      setNotificationMessage(MESSAGE.CONFIRM_PURCHASE);
    } else if (notificationType === TYPE.FRIEND_REQUEST) {
      setButtonContent(OPTION.FRIEND_REQUEST);
      setNotificationMessage(MESSAGE.FRIEND_REQUEST);
    } else {
      setButtonContent(OPTION.PRESENT);
      setNotificationMessage(MESSAGE.PRESENT);
    }
  }, [notificationType]);

  const handlePurchase = async (e) => {
    if (e.target.textContent === "예") {
      try {
        await addItem(id, targetItem, ITEM_PRICE_LIST[targetItem]);

        dispatch(decreaseCoke(ITEM_PRICE_LIST[targetItem]));
        toggleNotification(false);
      } catch (err) {
        console.error(err);
      }
    }
    if (e.target.textContent === "아니요") {
      toggleNotification(false);
    }
  };

  return (
    <GameModal
      subject={notificationType === "friendRequest" && "친구 요청"}
      onClose={() => {
        toggleNotification();
      }}
    >
      <NotificationContainer>
        <h3>{notificationMessage}</h3>
        <ButtonContainer notificationType={notificationType}>
          {buttonContent &&
            buttonContent.map((content) => {
              const key = nanoid();
              return (
                <GameModalButton
                  key={key}
                  content={content}
                  onSelect={handlePurchase}
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
};
