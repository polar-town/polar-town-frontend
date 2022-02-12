import React, { useEffect } from "react";
import styled from "styled-components";
import proptypes from "prop-types";
import {
  deleteTrashEmail,
  getMailList,
  moveEmailToTrash,
} from "../../api/mail";
import { useDispatch, useSelector } from "react-redux";
import { increseCoke, selectUserId } from "../../features/user/userSlice";

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
  const userId = useSelector(selectUserId);
  const count = deleteEmail?.length;

  const moveToTrash = async () => {
    await moveEmailToTrash(at, userId, deleteEmail);
    const { result } = await getMailList(at, userId, "CATEGORY_PROMOTIONS");

    checkedMails([]);
    setUserEmailList(result);
  };

  const deleteTrash = async () => {
    await deleteTrashEmail(at, userId, deleteEmail, count);
    const { result } = await getMailList(at, userId, "TRASH");

    checkedMails([]);
    dispatch(increseCoke(count));
    setUserEmailList(result);
  };

  return (
    <StyledDeleteButton onClick={isTrash ? deleteTrash : moveToTrash}>
      <i className="fas fa-trash-alt"></i>
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
