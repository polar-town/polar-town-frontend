import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import organizeDate from "../../utils/date";

const StyledGoBackButton = styled.button`
  all: unset;
  margin: 15px 0 0 15px;
  color: var(--mail-basic);
  font-size: 22px;
  cursor: pointer;
`;

const StyledInnerDiv = styled.div`
  margin: 1vh auto 0;
  width: 40vw;
`;

const StyledTitleDiv = styled.div`
  width: 40vw;
  line-height: 5vh;
  font-size: 25px;
  font-weight: 700;
`;

const StyledSenderDiv = styled.div`
  font-size: 15px;
  margin-top: 1vh;
`;

const StyledDateDiv = styled.div`
  font-size: 15px;
  padding-bottom: 10px;
  margin-top: 10px;
  border-bottom: 1px solid #eee;
`;

const StyledContentDiv = styled.div`
  height: 83vh;
  overflow: auto;
`;

function MailDetail({ targetEmail, onToggleEmailView }) {
  return (
    <>
      <StyledGoBackButton
        onClick={() => {
          onToggleEmailView("");
        }}
        title="뒤로가기"
      >
        <i className="fas fa-arrow-left"></i>
      </StyledGoBackButton>
      <StyledInnerDiv>
        <StyledTitleDiv>{targetEmail.subject}</StyledTitleDiv>
        <StyledSenderDiv>{`보낸사람 : ${targetEmail.from}`}</StyledSenderDiv>
        <StyledDateDiv>{organizeDate(targetEmail.date, true)}</StyledDateDiv>
        <StyledContentDiv
          dangerouslySetInnerHTML={{ __html: targetEmail.content }}
        />
      </StyledInnerDiv>
    </>
  );
}

export default MailDetail;

MailDetail.propTypes = {
  targetEmail: PropTypes.object.isRequired,
  onToggleEmailView: PropTypes.func.isRequired,
};
