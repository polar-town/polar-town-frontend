import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GameModal from "../GameModal/GameModal";
import GameModalButton from "../GameModal/GameModalButton";
import { nanoid } from "nanoid";
import { TYPE, MESSAGE, OPTION } from "../../constants/notification";
import proptype from "prop-types";
import { addItem } from "../../api/item";
import { addFriendList, deletePendingFriend } from "../../api/friendlist";
import { decreaseCoke, updateIceCount } from "../../features/user/userSlice";
import {
  closeNotification,
  toggleItemBox,
} from "../../features/modal/modalSlice";
import { ITEM_PRICE_LIST } from "../../constants/item";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useLogout from "../../hooks/useLogout";

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

function Notification({ notificationType, targetItem, from }) {
  const dispatch = useDispatch();
  const [buttonContent, setButtonContent] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState("");
  const { user } = useSelector((state) => state.user);
  const axiosInstance = useAxiosPrivate();
  const logout = useLogout();

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
        if (user.cokeCount - Number(ITEM_PRICE_LIST[targetItem]) >= 0) {
          if (targetItem === "Ice") {
            if (user.iceCount === 10) {
              setNotificationMessage(
                "🐻‍❄️ 이미 제일 큰 얼음을 가지고 있어요🤍",
              );

              return setButtonContent([]);
            }

            dispatch(updateIceCount());
          }

          await addItem({
            userId: user.id,
            name: targetItem,
            price: ITEM_PRICE_LIST[targetItem],
            axiosInstance,
          });

          dispatch(decreaseCoke(ITEM_PRICE_LIST[targetItem]));
          toast(`${targetItem} 구매완료 🤍`, {
            className: "toast",
          });

          return dispatch(closeNotification());
        }

        setNotificationMessage("콜라가 부족합니다💦");
        setButtonContent([]);
      } catch (error) {
        console.error(error.response?.status);
        if (error.response?.status === 401) {
          logout();
        }
      }
    }
    if (e.target.textContent === "아니요") {
      dispatch(closeNotification());
    }
  };

  const openItemBox = () => {
    dispatch(closeNotification());
    dispatch(toggleItemBox());
  };

  const handleAcceptFriend = async () => {
    try {
      await addFriendList({
        userId: user.id,
        email: from[1],
        isAlarm: true,
        axiosInstance,
      });

      dispatch(closeNotification());
      toast("친구가 생겼어요 🐻‍❄️", {
        className: "toast",
      });
    } catch (error) {
      console.error(error.response?.status);
      if (error.response?.status === 401) {
        logout();
      }
    }
  };

  const handleRejectFriend = async () => {
    try {
      await deletePendingFriend({
        userId: user.id,
        email: from[1],
        axiosInstance,
      });

      dispatch(closeNotification());
    } catch (error) {
      console.error(error.response?.status);
      if (error.response?.status === 401) {
        logout();
      }
    }
  };

  return (
    <GameModal
      subject={notificationType === "friendRequest" ? "친구 요청" : ""}
      onClose={() => {
        dispatch(closeNotification());
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
  notificationType: proptype.string,
  targetItem: proptype.string,
  from: proptype.array,
};
