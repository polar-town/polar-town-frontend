import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: relative;
  width: 100vw;

  .modalBox {
    position: absolute;
    right: 0;
    top: 0;
    width: 44vw;
    height: 100vh;
    border-radius: 20px;
    background-color: var(--white);
    border: 1px solid black;
  }

  .modalCloseButton {
    all: unset;
    z-index: 9;
    position: absolute;
    top: 4px;
    text-align: center;
    right: 15px;
    color: var(--mail-basic);
    font-size: 27px;
    font-weight: 700;
    cursor: pointer;
  }
`;

function MailModal({ children }) {
  const navigate = useNavigate();

  return (
    <ModalWrapper>
      <div className="modalBox">
        <button
          onClick={() => navigate(-1)}
          className="modalCloseButton"
          type="button"
          title="닫기"
        >
          x
        </button>
        {children}
      </div>
    </ModalWrapper>
  );
}

export default MailModal;

MailModal.propTypes = {
  children: PropTypes.node.isRequired,
};
