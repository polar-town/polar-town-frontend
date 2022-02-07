import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import DeleteIconButton from "./DeleteIconButton";

const StyledMailRowDiv = styled.div`
  p {
    margin: 0;
    padding: 0;
  }

  position: relative;
  width: 38vw;
  height: 110px;
  padding: 10px;
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
    right: -2vw;
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
  }
`;

const StyledDeleteButtonDiv = styled.div`
  position: absolute;
  right: -2vw;
  top: 30px;
`;

function MailRow({
  id,
  sender,
  title,
  content,
  date,
  onCheckedId,
  checkedIdList,
  onTargetEmailId,
}) {
  const [isHover, setIsHover] = useState(false);

  function organizeDate(data) {
    const newDate = new Date(data);
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const date = newDate.getDate();

    return `${year}.${month}.${date}`;
  }

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
          <p className="sender">{sender}</p>
          <p className="date">{organizeDate(date)}</p>
          <p className="title">{title}</p>
          <p className="content">{` - ${content}`}</p>
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
  id: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onCheckedId: PropTypes.func.isRequired,
  checkedIdList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onTargetEmailId: PropTypes.func,
};
