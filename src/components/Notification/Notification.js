import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import GameModal from "../GameModal/GameModal";
import { selectNotificationType } from "../../features/modal/modalSlice";
import GameModalButton from "../GameModal/GameModalButton";
import { nanoid } from "nanoid";

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
  // const notificationType = useSelector(selectNotificationType);
  const notificationType = "friendRequest";
  const [buttonContent, setButtonContent] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    if (notificationType === "confirmPurchase") {
      setButtonContent(["네", "아니요"]);
      setNotificationMessage("아이템을 구매하시겠습니까?");
    } else if (notificationType === "friendRequest") {
      setButtonContent(["수락", "거절"]);
      setNotificationMessage("친구 신청이 왔습니다. 수락하시겠습니까?");
    } else {
      setButtonContent(["확인"]);
      setNotificationMessage("선물이 도착했습니다. 확인하시겠습니까?");
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
