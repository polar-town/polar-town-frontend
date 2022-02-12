import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import organizeDate from "../../utils/date";

const StyledMailRowDiv = styled.div`
  position: relative;
  width: 40vw;
  padding: 10px 5px;
  border-bottom: 1px solid #66666650;
  line-height: 23px;
  cursor: pointer;

  &:first-child {
    margin-top: 0;
  }

  &:hover {
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.12), 0 6px 6px rgba(0, 0, 0, 0.18);
  }

  &:hover .title {
    width: 30vw;
  }
`;

const StyledCheckBoxInput = styled.input`
  position: absolute;
  left: 0.8vw;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 17px;
  height: 17px;
  cursor: pointer;
`;

const StyledMailDetailDiv = styled.div`
  position: relative;
  width: 31vw;
  margin-left: 50px;

  .title {
    width: 30vw;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-weight: 700;
  }

  .date {
    position: absolute;
    top: 0;
    right: -3vw;
    font-size: 12px;
  }

  .sender {
    width: 33vw;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .content {
    width: 33vw;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 14px;
    color: #666666;
    margin-top: 3px;
  }
`;

function MailRow({ mail, onCheckedId, checkedIdList, onTargetEmailId }) {
  const { id, from, subject, snippet, date } = mail;

  return (
    <>
      <StyledMailRowDiv
        onClick={(e) => {
          if (e.target.tagName === "INPUT") return;
          onTargetEmailId(id);
        }}
      >
        <StyledCheckBoxInput
          type="checkbox"
          onChange={(e) => {
            if (e.target.checked) {
              onCheckedId((prev) => [...prev, id]);
            }
            if (!e.target.checked) {
              onCheckedId((prev) => [...prev.filter((item) => item !== id)]);
            }
          }}
          checked={checkedIdList.includes(id)}
        />
        <StyledMailDetailDiv>
          <p className="title">{subject}</p>
          <p className="sender">{from}</p>
          <p className="date">{organizeDate(date, false)}</p>
          <p className="content">{snippet}</p>
        </StyledMailDetailDiv>
      </StyledMailRowDiv>
    </>
  );
}

export default MailRow;

MailRow.propTypes = {
  mail: PropTypes.object,
  onCheckedId: PropTypes.func.isRequired,
  checkedIdList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onTargetEmailId: PropTypes.func,
};
