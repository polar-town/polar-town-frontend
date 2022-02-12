import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import GameModal from "../GameModal/GameModal";
import GameModalButton from "../GameModal/GameModalButton";
import { nanoid } from "nanoid";
import { TYPE, MESSAGE, OPTION } from "../../constants/notification";
import proptype from "prop-types";

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

function Notification({ toggleNotification }) {
  const notificationType = useSelector(selectNotificationType);
  const [buttonContent, setButtonContent] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState("");

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
              return <GameModalButton key={key} content={content} />;
            })}
        </ButtonContainer>
      </NotificationContainer>
    </GameModal>
  );
}

export default Notification;

Notification.propTypes = {
  toggleNotification: proptype.func.isRequired,
};
