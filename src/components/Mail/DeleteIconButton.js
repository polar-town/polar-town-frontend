import React from "react";
import styled from "styled-components";
import proptypes from "prop-types";
import { deleteTrashEmail, moveEmailToTrash } from "../../api/mail";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseCoke,
  increseCoke,
  selectUserId,
} from "../../features/user/userSlice";

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

function DeleteIconButton({ deleteEmail, isTrash }) {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const count = deleteEmail?.length;

  console.log("안녕난쓰레기통", isTrash, deleteEmail, count);

  const moveToTrash = async () => {
    await moveEmailToTrash(userId, deleteEmail);
  };

  const deleteTrash = async () => {
    await deleteTrashEmail(userId, deleteEmail, count);
    dispatch(increseCoke(count));
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
};
