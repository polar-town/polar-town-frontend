import React, { useState } from "react";
import styled from "styled-components";
import proptypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteTrashEmail,
  getMailList,
  moveEmailToTrash,
} from "../../api/mail";
import { useDispatch, useSelector } from "react-redux";
import { increseCoke } from "../../features/user/userSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loading from "../Loading/Loading";

const StyledDeleteButton = styled.button`
  background: none;
  width: 40px;
  height: 40px;
  font-size: 18px;
  border: none;
  border-radius: 50%;
  color: var(--mail-basic);
  cursor: pointer;

  &:hover {
    color: var(--black);
    background-color: var(--mail-hover);
  }
`;

function DeleteIconButton({
  deleteEmail,
  isTrash,
  checkedMails,
  setUserEmailList,
  at,
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const count = deleteEmail?.length;
  const axiosInstance = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);

  const moveToTrash = async () => {
    setIsLoading(true);

    await moveEmailToTrash({
      at,
      userId: user.id,
      mailId: deleteEmail,
      axiosInstance,
    });

    const { result } = await getMailList({
      at,
      userId: user.id,
      inboxId: "CATEGORY_PROMOTIONS",
      axiosInstance,
    });

    checkedMails([]);
    setUserEmailList(result);
    toast.success("휴지통으로 이동 완료 !", {
      className: "toast",
    });
    setIsLoading(false);
  };

  const deleteTrash = async () => {
    setIsLoading(true);

    await deleteTrashEmail({
      at,
      userId: user.id,
      mailId: deleteEmail,
      count,
      axiosInstance,
    });

    const { result } = await getMailList({
      at,
      userId: user.id,
      inboxId: "TRASH",
      axiosInstance,
    });

    checkedMails([]);
    dispatch(increseCoke(count));
    setUserEmailList(result);
    toast.success("불필요한 메일을 삭제했네요👍", {
      className: "toast",
    });
    setIsLoading(false);
  };

  return (
    <StyledDeleteButton onClick={isTrash ? deleteTrash : moveToTrash}>
      <i className="fas fa-trash-alt"></i>
      {isLoading && <Loading isDelete={true} />}
    </StyledDeleteButton>
  );
}

export default DeleteIconButton;

DeleteIconButton.propTypes = {
  deleteEmail: proptypes.array,
  isTrash: proptypes.bool,
  checkedMails: proptypes.func,
  setUserEmailList: proptypes.func,
  at: proptypes.string,
};
