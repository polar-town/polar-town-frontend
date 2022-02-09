import React from "react";
import styled from "styled-components";
import proptypes from "prop-types";
import { closeAll } from "../../features/modal/modalSlice";
import { useDispatch } from "react-redux";

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #30c8c8;
  border-radius: 10px;
  width: 550px;
  max-width: 550px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 60px 20px 40px 20px;
`;

const ModalInnerSubject = styled.div`
  position: absolute;
  left: 30px;
  top: 20px;
  color: #1b7272;
`;

const ModalInnerContent = styled.div`
  width: 98%;
  margin: 0 auto;
  padding: 10px;
  border-radius: 10px;
  background-color: #d6f5f5;
`;

const CloseButton = styled.button`
  width: 25px;
  height: 25px;
  color: var(--white);
  font-size: 17px;
  font-weight: bold;
  position: absolute;
  right: 10px;
  top: 15px;
  background-color: #1b7272;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

function GameModal({ onClose, children, maskClosable, className, subject }) {
  const dispatch = useDispatch();
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(closeAll());
    }
  };

  return (
    <>
      <ModalOverlay />
      <ModalWrapper
        className={className}
        onClick={maskClosable ? onMaskClick : null}
        tabIndex={-1}
      >
        <ModalInner tabIndex={0} className="modal-inner">
          <CloseButton className="modal-close" onClick={() => onClose()}>
            <i className="fas fa-times"></i>
          </CloseButton>
          {subject && <ModalInnerSubject>{subject}</ModalInnerSubject>}
          <ModalInnerContent>{children}</ModalInnerContent>
        </ModalInner>
      </ModalWrapper>
    </>
  );
}

GameModal.defaultProps = {
  maskClosable: true,
};

GameModal.propTypes = {
  visible: proptypes.bool,
  className: proptypes.string,
  onClose: proptypes.func,
  maskClosable: proptypes.bool,
  subject: proptypes.string,
  children: proptypes.node,
};

export default GameModal;
