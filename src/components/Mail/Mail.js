import React, { useEffect, useRef, useState } from "react";
import NavButton from "./NavButton";
import MailRow from "./MailRow";
import ModalPortals from "../ModalPortals/ModalPortals";
import MailModal from "../MailModal/MailModal";
import styled from "styled-components";
import DeleteIconButton from "./DeleteIconButton";

const StyledMailDiv = styled.div`
  position: relative;
  width: 80vh;
`;

const StyledNavDiv = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  left: 0;
  right: 0;
  padding: 30px;
  margin: 10px auto 20px;
  width: 33vw;
  height: 2vh;
  color: #666666;
  cursor: pointer;

  .promotion {
    color: #1b72e8;
  }

  .spam {
    color: #d92f25;
  }

  .trash {
    color: #168037;
  }
`;

const StyledCheckBoxDiv = styled.div`
  position: absolute;
  left: 51px;
  margin-bottom: 5px;

  .allCheckBox {
    position: relative;
    width: 17px;
    height: 17px;
    margin-right: 15px;
    cursor: pointer;
  }

  .allCheckBoxLabel {
    position: absolute;
    width: 60px;
    top: 2px;
    cursor: pointer;
  }
`;

const StyledDeleteButtonDiv = styled.div`
  position: absolute;
  right: 20px;
  top: 90px;
`;

const StyledMailDetailDiv = styled.div`
  position: relative;
  right: 0;
  left: 0;
  margin: auto;
  padding: 0 4vh;
  margin-top: 65px;
  width: 39vw;
  height: 80vh;
  overflow: auto;
`;

const StyledGmailLogoButton = styled.button`
  position: absolute;
  bottom: 15px;
  right: 0;
  width: 70px;
  height: 70px;
  border: none;
  border-radius: 35px;
  background-color: #fff;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.12), 0 6px 6px rgba(0, 0, 0, 0.18);
  cursor: pointer;

  &:hover {
    background-color: #dadada;
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
  const navRef = useRef();

  useEffect(() => {
    navRef.current.childNodes[0].classList.add("promotion");
  }, []);

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
        <StyledMailDiv>
          <StyledNavDiv
            ref={navRef}
            onClick={(e) => {
              if (e.target.textContent === "Promotion") {
                e.target.classList.add("promotion");
                e.target.parentNode.children[1].classList.remove("spam");
                e.target.parentNode.children[2].classList.remove("trash");
              }
              if (e.target.textContent === "Spam") {
                e.target.classList.add("spam");
                e.target.parentNode.children[0].classList.remove("promotion");
                e.target.parentNode.children[2].classList.remove("trash");
              }
              if (e.target.textContent === "Trash") {
                e.target.classList.add("trash");
                e.target.parentNode.children[0].classList.remove("promotion");
                e.target.parentNode.children[1].classList.remove("spam");
              }
            }}
          >
            <NavButton category="Promotion" />
            <NavButton category="Spam" />
            <NavButton category="Trash" />
          </StyledNavDiv>
          <StyledCheckBoxDiv>
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
          </StyledCheckBoxDiv>
          <StyledDeleteButtonDiv>
            <DeleteIconButton />
          </StyledDeleteButtonDiv>
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
              />
            ))}
          </StyledMailDetailDiv>
          <StyledGmailLogoButton
            onClick={() => {
              window.open("https://mail.google.com/mail/u/1/#inbox");
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
      </MailModal>
    </ModalPortals>
  );
}

export default Mail;
