import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import GameModal from "../GameModal/GameModal";
import { selectNotificationType } from "../../features/modal/modalSlice";
import GameModalButton from "../GameModal/GameModalButton";
import { nanoid } from "nanoid";

import {
  NOTIFICATION_TYPE_CONFIRM_PURCHASE,
  NOTIFICATION_TYPE_FRIEND_REQUEST,
  NOTIFICATION_MESSAGE_CONFIRM_PURCHASE,
  NOTIFICATION_MESSAGE_FRIEND_REQUEST,
  NOTIFICATION_MESSAGE_PRESENT,
  NOTIFICATION_OPTION_CONFIRM_PURCHASE,
  NOTIFICATION_OPTION_FRIEND_REQUEST,
  NOTIFICATION_OPTION_PRESENT,
} from "../../constants/notification";

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

function Notification() {
  const notificationType = useSelector(selectNotificationType);
  const [buttonContent, setButtonContent] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    if (notificationType === NOTIFICATION_TYPE_CONFIRM_PURCHASE) {
      setButtonContent(NOTIFICATION_OPTION_CONFIRM_PURCHASE);
      setNotificationMessage(NOTIFICATION_MESSAGE_CONFIRM_PURCHASE);
    } else if (notificationType === NOTIFICATION_TYPE_FRIEND_REQUEST) {
      setButtonContent(NOTIFICATION_OPTION_FRIEND_REQUEST);
      setNotificationMessage(NOTIFICATION_MESSAGE_FRIEND_REQUEST);
    } else {
      setButtonContent(NOTIFICATION_OPTION_PRESENT);
      setNotificationMessage(NOTIFICATION_MESSAGE_PRESENT);
    }
  }, [notificationType]);

  return (
    <GameModal subject={notificationType === "friendRequest" && "친구 요청"}>
      <NotificationContainer>
        <h3>{notificationMessage}</h3>
        <ButtonContainer notificationType={notificationType}>
          {buttonContent &&
            buttonContent.map((content) => {
              const key = nanoid();
              return <GameModalButton key={key} content={content} />;
            })}
        </ButtonContainer>
      </NotificationContainer>
    </GameModal>
  );
}

export default Notification;
