import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: relative;
  width: 100vw;

  .modalBox {
    position: absolute;
    right: 0;
    top: 0;
    width: 45vw;
    height: 99.8vh;
    border-radius: 20px;
    background-color: #fff;
    border: 1px solid #000;
  }

  .modalCloseButton {
    all: unset;
    position: absolute;
    top: 4px;
    text-align: center;
    right: 15px;
    color: #666666;
    font-size: 25px;
    font-weight: 700;
    cursor: pointer;
  }
`;

function MailModal({ children }) {
  return (
    <ModalWrapper>
      <div className="modalBox">
        <button className="modalCloseButton" type="button">
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
