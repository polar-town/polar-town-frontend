import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MailDetail from "./MailDetail";
import NavButton from "./NavButton";
import MailRow from "./MailRow";
import ModalPortals from "../ModalPortals/ModalPortals";
import MailModal from "../MailModal/MailModal";
import DeleteIconButton from "./DeleteIconButton";

const StyledMailDiv = styled.div`
  position: relative;
  width: 80vh;
`;

const StyledNavDiv = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  left: 4vw;
  top: 1vh;
  padding: 20px;
  width: 34vw;
  height: 1vh;
  cursor: pointer;
`;

const StyledSubHeaderDiv = styled.div`
  display: flex;
  position: absolute;
  left: 3vw;
  top: 9vh;
  width: 38vw;
  padding: 5px;
  justify-content: space-between;
  align-content: center;

  .allCheckBox {
    position: relative;
    top: 0;
    bottom: 0;
    margin: auto 0;
    width: 17px;
    height: 17px;
    cursor: pointer;
  }

  .allCheckBoxLabel {
    position: absolute;
    top: 15px;
    left: 2.2vw;
    width: 60px;
    cursor: pointer;
  }
`;

const StyledMailDetailDiv = styled.div`
  position: relative;
  left: 0.5vw;
  top: 1vh;
  padding: 0 2vw;
  margin-top: 9vh;
  width: 42vw;
  height: 81vh;
  overflow: auto;
`;

const StyledGmailLogoButton = styled.button`
  position: absolute;
  bottom: 1vh;
  right: 50px;
  width: 70px;
  height: 70px;
  border: none;
  border-radius: 35px;
  background-color: var(--white);
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.12), 0 6px 6px rgba(0, 0, 0, 0.18);
  cursor: pointer;

  &:hover {
    background-color: var(--mail-hover);
  }

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
  const [userEmailList, setUserEmailList] = useState([]);
  const [checkedIds, setCheckedIds] = useState([]);
  const [targetEmailId, setTargetEmailId] = useState("");

  useEffect(() => {
    async function getUserEmailList() {
      const res = await fetch("/data.json");
      const data = await res.json();
      setUserEmailList(data);
    }

    getUserEmailList();
  }, []);

  return (
    <ModalPortals>
      <MailModal>
        {targetEmailId && (
          <MailDetail
            targetEmail={
              userEmailList.filter((email) => email.id === targetEmailId)[0]
            }
            onToggleEmailView={setTargetEmailId}
          />
        )}
        {!targetEmailId && (
          <StyledMailDiv>
            <StyledNavDiv>
              <NavButton category="Promotion" />
              <NavButton category="Spam" />
              <NavButton category="Trash" />
            </StyledNavDiv>
            <StyledSubHeaderDiv>
              <input
                type="checkbox"
                className="allCheckBox"
                id="allCheckBox"
                onChange={(e) => {
                  if (e.target.checked === true) {
                    const mailIdsArray = [];
                    userEmailList.forEach((mail) => mailIdsArray.push(mail.id));
                    setCheckedIds(mailIdsArray);
                  } else {
                    setCheckedIds([]);
                  }
                }}
                checked={checkedIds.length === userEmailList.length}
              />
              <label className="allCheckBoxLabel" htmlFor="allCheckBox">
                전체 선택
              </label>
              <DeleteIconButton />
            </StyledSubHeaderDiv>
            <StyledMailDetailDiv>
              {userEmailList.map((mail) => (
                <MailRow
                  key={mail.id}
                  id={mail.id}
                  sender={
                    mail.headers.filter((item) => item.name === "From")[0].value
                  }
                  title={
                    mail.headers.filter((item) => item.name === "Subject")[0]
                      .value
                  }
                  content={mail.snippet}
                  date={
                    mail.headers.filter((item) => item.name === "Date")[0].value
                  }
                  onCheckedId={setCheckedIds}
                  checkedIdList={checkedIds}
                  onTargetEmailId={setTargetEmailId}
                />
              ))}
            </StyledMailDetailDiv>
            <StyledGmailLogoButton
              onClick={() => {
                window.open(process.env.REACT_APP_USER_GMAIL);
              }}
            >
              <img
                src="images/gmail-logo.png"
                width="70"
                title="Gmail로 이동"
                alt="gmail-logo"
              />
            </StyledGmailLogoButton>
          </StyledMailDiv>
        )}
      </MailModal>
    </ModalPortals>
  );
}

export default Mail;
