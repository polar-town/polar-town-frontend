import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import proptypes from "prop-types";
import { throttle } from "lodash";
import MailDetail from "./MailDetail";
import MailRow from "./MailRow";
import MailModal from "../MailModal/MailModal";
import DeleteIconButton from "./DeleteIconButton";
import { getMailList } from "../../api/mail";
import { useSelector } from "react-redux";
import { selectUserId } from "../../features/user/userSlice";
import { nanoid } from "nanoid";

const StyledMailDiv = styled.div`
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
  height: 82vh;
  overflow: auto;
`;

const StyledGmailLogoButton = styled.button`
  position: absolute;
  bottom: 30px;
  right: 30px;
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

const NavButton = styled.button`
  all: unset;
  color: var(--mail-basic);
  font-size: 25px;
  font-weight: 700;
  cursor: pointer;

  &.selectPromotion {
    color: red;
  }

  &.selectSpam {
    color: blue;
  }

  &.selectTrash {
    color: green;
  }
`;

const EmptyEmail = styled.div`
  text-align: center;
  margin: 100px auto;
`;

function Mail({ toggleMail }) {
  const at =
    "ya29.A0ARrdaM8s_SOVcrM-OFlOe3-462ycSv6s_DRQAfvOMgE0AfxW-wzUmUfxAEfDm4O-SD_tHpIKXuCBt9zQH_-50AbKaIqgWwZpAGVNMGeRmzmYvEo_joZROiRpGki8KIkSQYYSA_8mzpVFBrIYPK5c2fB9eaklPg";
  const loginUser = useSelector(selectUserId);
  const [userEmailList, setUserEmailList] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [checkedIds, setCheckedIds] = useState([]);
  const [targetEmailId, setTargetEmailId] = useState("");
  const [isPromotionActive, setIsPromotionActive] = useState(true);
  const [isSpamActive, setIsSpamActive] = useState(false);
  const [isTrashActive, setIsTrashActive] = useState(false);
  let inBoxId;

  if (isPromotionActive) {
    inBoxId = "CATEGORY_PROMOTIONS";
  } else if (isSpamActive) {
    inBoxId = "SPAM";
  } else {
    inBoxId = "TRASH";
  }

  useEffect(async () => {
    async function getUserEmailList() {
      const response = await getMailList(at, loginUser, inBoxId);

      setUserEmailList(response?.result);
      setNextPageToken(response?.nextPageToken);
    }

    getUserEmailList();
  }, []);

  const getCategoryEmails = async (e) => {
    const inBoxId = e.target.id;

    if (inBoxId === "CATEGORY_PROMOTIONS") {
      setIsPromotionActive(true);
      setIsSpamActive(false);
      setIsTrashActive(false);
    }

    if (inBoxId === "SPAM") {
      setIsSpamActive(true);
      setIsPromotionActive(false);
      setIsTrashActive(false);
    }

    if (inBoxId === "TRASH") {
      setIsTrashActive(true);
      setIsPromotionActive(false);
      setIsSpamActive(false);
    }

    const response = await getMailList(at, loginUser, inBoxId);

    setUserEmailList(response.result);
    setNextPageToken(response?.nextPageToken);
    document.querySelector(".emails").scrollTo(0, 0);
  };

  const handleScroll = throttle(async (e) => {
    const bodyHeight = e.target.scrollHeight;
    const showContentHeight = e.target.clientHeight;
    const scrolledHeight = e.target.scrollTop;

    if (bodyHeight === showContentHeight + scrolledHeight) {
      const response = await getMailList(at, loginUser, inBoxId, nextPageToken);

      setUserEmailList([...userEmailList, ...response.result]);
      setNextPageToken(response.nextPageToken);
    }
  }, 500);

  return (
    <MailModal onClose={toggleMail}>
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
            <NavButton
              onClick={getCategoryEmails}
              id="CATEGORY_PROMOTIONS"
              className={isPromotionActive ? "selectPromotion" : null}
            >
              Promotion
            </NavButton>
            <NavButton
              onClick={getCategoryEmails}
              id="SPAM"
              className={isSpamActive ? "selectSpam" : null}
            >
              Spam
            </NavButton>
            <NavButton
              onClick={getCategoryEmails}
              id="TRASH"
              className={isTrashActive ? "selectTrash" : null}
            >
              Trash
            </NavButton>
          </StyledNavDiv>
          {userEmailList?.length ? (
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
              <DeleteIconButton
                deleteEmail={checkedIds}
                isTrash={isTrashActive}
                checkedMails={setCheckedIds}
                setUserEmailList={setUserEmailList}
                at={at}
              />
            </StyledSubHeaderDiv>
          ) : (
            <EmptyEmail>메일함이 비었습니다.</EmptyEmail>
          )}
          <StyledMailDetailDiv onScroll={handleScroll} className="emails">
            {userEmailList?.map((mail) => {
              const key = nanoid();
              return (
                <MailRow
                  key={key}
                  mail={mail}
                  onCheckedId={setCheckedIds}
                  checkedIdList={checkedIds}
                  onTargetEmailId={setTargetEmailId}
                />
              );
            })}
          </StyledMailDetailDiv>
          <StyledGmailLogoButton
            onClick={() => {
              window.open(process.env.REACT_APP_USER_GMAIL);
            }}
          >
            <img
              src="/images/gmail-logo.png"
              width="70"
              title="Gmail로 이동"
              alt="gmail-logo"
            />
          </StyledGmailLogoButton>
        </StyledMailDiv>
      )}
    </MailModal>
  );
}

export default Mail;

Mail.propTypes = {
  toggleMail: proptypes.func.isRequired,
};
