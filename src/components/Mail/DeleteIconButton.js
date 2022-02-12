import React, { useEffect } from "react";
import styled from "styled-components";
import proptypes from "prop-types";
import { deleteTrashEmail, moveEmailToTrash } from "../../api/mail";
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
  isRefreshMails,
  at,
}) {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const count = deleteEmail?.length;

  const moveToTrash = async () => {
    checkedMails([]);
    isRefreshMails((check) => !check);
    await moveEmailToTrash(at, userId, deleteEmail);
  };

  const deleteTrash = async () => {
    checkedMails([]);
    dispatch(increseCoke(count));
    isRefreshMails((check) => !check);
    await deleteTrashEmail(at, userId, deleteEmail, count);
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
  isRefreshMails: proptypes.func,
  at: proptypes.string,
};
