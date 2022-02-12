import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import DeleteIconButton from "./DeleteIconButton";
import organizeDate from "../../utils/date";

const StyledMailRowDiv = styled.div`
  position: relative;
  width: 38vw;
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

  &:hover .content {
    width: 30vw;
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

  .sender {
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

  .title {
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

const StyledDeleteButtonDiv = styled.div`
  position: absolute;
  right: -2vw;
  top: 30px;
`;

function MailRow({ mail, onCheckedId, checkedIdList, onTargetEmailId }) {
  const [isHover, setIsHover] = useState(false);
  const { id, from, subject, snippet, date } = mail;

  return (
    <>
      <StyledMailRowDiv
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
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
          <p className="sender">{from}</p>
          <p className="date">{organizeDate(date, false)}</p>
          <p className="title">{subject}</p>
          <p className="content">{snippet}</p>
          <StyledDeleteButtonDiv>
            {isHover && <DeleteIconButton />}
          </StyledDeleteButtonDiv>
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
