import React, { useEffect, useState } from "react";
import styled from "styled-components";
import proptypes from "prop-types";
import NotificationCircle from "../NotificationCircle/NotificationCircle";
import { getPendingFriendList } from "../../api/friendlist";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useLogout from "../../hooks/useLogout";

const StyledHalfModal = styled.div`
  margin: 0 auto;
`;

const StyledHalfHeaderDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
`;

const StyledHalfNavDiv = styled.div`
  width: 50%;
  line-height: 50px;
  text-align: center;
  border-radius: 10px 10px 0 0;
  background-color: ${(props) => (props.checked ? "#d7e5e4" : "#c9d6d5")};
  display: flex;
  justify-content: center;
`;

const StyledHalfContentDiv = styled.div`
  width: 100%;
  background-color: #d7e5e4;
  border-radius: 0 0 10px 10px;
  padding: 20px;
`;

function HalfModal({ category, children, setIsReceiveGift }) {
  const { user } = useSelector((state) => state.user);
  const [hasNewPendingFriend, setHasNewPendingFriend] = useState(false);
  const [showFirstContent, setShowFirstContent] = useState(true);
  const axiosInstance = useAxiosPrivate();
  const logout = useLogout();

  useEffect(async () => {
    try {
      if (category[1] === "친구 요청") {
        const pendingFriendList = await getPendingFriendList({
          userId: user.id,
          axiosInstance,
        });
        const isExistNewPendingFriend = pendingFriendList.some(
          (friend) => !friend.isChecked,
        );

        setHasNewPendingFriend(isExistNewPendingFriend);
      }
    } catch (error) {
      console.error(error.response?.status);
      if (error.response?.status === 401) {
        logout();
      }
    }
  }, []);

  return (
    <StyledHalfModal>
      <StyledHalfHeaderDiv>
        <StyledHalfNavDiv
          checked={showFirstContent}
          onClick={() => setShowFirstContent(true)}
        >
          {category?.[0]}
        </StyledHalfNavDiv>
        <StyledHalfNavDiv
          checked={!showFirstContent}
          onClick={() => {
            if (setIsReceiveGift) {
              setIsReceiveGift(false);
            }

            setShowFirstContent(false);
            setHasNewPendingFriend(false);
          }}
        >
          {category?.[1]}
          {hasNewPendingFriend && <NotificationCircle />}
        </StyledHalfNavDiv>
      </StyledHalfHeaderDiv>
      <StyledHalfContentDiv>
        {showFirstContent ? (
          <div>{children?.[0]}</div>
        ) : (
          <div>{children?.[1]}</div>
        )}
      </StyledHalfContentDiv>
    </StyledHalfModal>
  );
}

HalfModal.propTypes = {
  category: proptypes.array,
  children: proptypes.array,
  setIsReceiveGift: proptypes.func,
};

export default HalfModal;
