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
  position: relative;
  left: 0;
  right: 0;
  margin: 3vh auto 0;
  width: 40vw;
`;

const StyledTitleDiv = styled.div`
  width: 40vw;
  height: 5vh;
  font-size: 20px;
  font-weight: 700;
`;

const StyledSenderDiv = styled.div`
  font-size: 14px;
  margin-top: 4vh;
`;

const StyledDateDiv = styled.div`
  font-size: 12px;
`;

const StyledDividerDiv = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  width: 40vw;
  border-top: 1px solid black;
`;

const StyledContentDiv = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  width: 35vw;
  font-size: 16px;
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
        <StyledTitleDiv>
          {
            targetEmail.headers.filter((item) => item.name === "Subject")[0]
              .value
          }
        </StyledTitleDiv>
        <StyledSenderDiv>
          {`보낸사람 - ${
            targetEmail.headers.filter((item) => item.name === "From")[0].value
          }`}
        </StyledSenderDiv>
        <StyledDateDiv>
          {organizeDate(
            targetEmail.headers.filter((item) => item.name === "Date")[0].value,
            true,
          )}
        </StyledDateDiv>
        <StyledDividerDiv />
        <StyledContentDiv>{targetEmail.snippet}</StyledContentDiv>
      </StyledInnerDiv>
    </>
  );
}

export default MailDetail;

MailDetail.propTypes = {
  targetEmail: PropTypes.object.isRequired,
  onToggleEmailView: PropTypes.func.isRequired,
};
