import React, { useState } from "react";
import Header from "./Header";
import MailRow from "./MailRow";
import ModalPortals from "../ModalPortals/ModalPortals";
import MailModal from "../MailModal/MailModal";
import styled from "styled-components";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const mailExamples = [
  {
    id: 1,
    sender: "은별",
    title: "안녕 은별",
    content:
      "I'll be in the neighbourhood this week. Let's grab a bite to eat 안녕하세요 조은별 입니다 안녕하세요 조은별 입니다",
    date: "2022.1.1 13:11",
  },
  {
    id: 2,
    sender: "은별",
    title: "안녕 은별",
    content:
      "I'll be in the neighbourhood this week. Let's grab a bite to eat 안녕하세요 조은별 입니다 안녕하세요 조은별 입니다",
    date: "2022.1.1 13:11",
  },
  {
    id: 3,
    sender: "은별",
    title: "안녕 은별",
    content:
      "I'll be in the neighbourhood this week. Let's grab a bite to eat 안녕하세요 조은별 입니다 안녕하세요 조은별 입니다",
    date: "2022.1.1 13:11",
  },
  {
    id: 4,
    sender: "은별",
    title: "안녕 은별",
    content:
      "I'll be in the neighbourhood this week. Let's grab a bite to eat 안녕하세요 조은별 입니다 안녕하세요 조은별 입니다",
    date: "2022.1.1 13:11",
  },
  {
    id: 5,
    sender: "은별",
    title: "안녕 은별",
    content:
      "I'll be in the neighbourhood this week. Let's grab a bite to eat 안녕하세요 조은별 입니다 안녕하세요 조은별 입니다",
    date: "2022.1.1 13:11",
  },
  {
    id: 6,
    sender: "은별",
    title: "안녕 은별",
    content:
      "I'll be in the neighbourhood this week. Let's grab a bite to eat 안녕하세요 조은별 입니다 안녕하세요 조은별 입니다",
    date: "2022.1.1 13:11",
  },
  {
    id: 7,
    sender: "은별",
    title: "안녕 은별",
    content:
      "I'll be in the neighbourhood this week. Let's grab a bite to eat 안녕하세요 조은별 입니다 안녕하세요 조은별 입니다",
    date: "2022.1.1 13:11",
  },
  {
    id: 8,
    sender: "은별",
    title: "안녕 은별",
    content:
      "I'll be in the neighbourhood this week. Let's grab a bite to eat 안녕하세요 조은별 입니다 안녕하세요 조은별 입니다",
    date: "2022.1.1 13:11",
  },
];

const StyledMailDiv = styled.div`
  position: relative;
  width: 70vh;

  .allChechBox {
    position: relative;
    left: 48px;
  }

  .trashTooltip {
    position: relative;
    left: 50px;
  }
`;

const StyledMailDetailDiv = styled.div`
  position: relative;
  padding: 0 4vh;
  width: 60vh;
  height: 70vh;
  overflow: auto;
`;

const GmailLogo = styled.div`
  position: absolute;
  bottom: 20px;
  right: 60px;
  width: 70px;
  height: 70px;
  border-radius: 35px;
  background-color: #fff;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.12), 0 6px 6px rgba(0, 0, 0, 0.18);
  cursor: pointer;

  img {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
`;

function Mail() {
  const [checkedIds, setCheckedIds] = useState([]);

  return (
    <ModalPortals>
      <MailModal>
        <StyledMailDiv>
          <Header />
          <FormControlLabel
            className="allChechBox"
            label="전체 선택"
            control={
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked === true) {
                    const mailIdsArray = [];

                    mailExamples.forEach((mail) => mailIdsArray.push(mail.id));

                    setCheckedIds(mailIdsArray);
                  } else {
                    setCheckedIds([]);
                  }
                }}
                checked={checkedIds.length === mailExamples.length}
              />
            }
          />
          <Tooltip className="trashTooltip" title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <StyledMailDetailDiv>
            {mailExamples.map((mail) => (
              <MailRow
                key={mail.id}
                id={mail.id}
                sender={mail.sender}
                title={mail.title}
                content={mail.content}
                date={mail.date}
                onCheckedId={setCheckedIds}
                checkedIdList={checkedIds}
              />
            ))}
          </StyledMailDetailDiv>
          <Tooltip title="Gmail로 이동">
            <GmailLogo>
              <img src="images/gmail-logo.png" width="70" alt="gmail-logo" />
            </GmailLogo>
          </Tooltip>
        </StyledMailDiv>
      </MailModal>
    </ModalPortals>
  );
}

export default Mail;
