import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TYPE } from "../../constants/notification";
import SpriteImage from "../SpriteImage/SpriteImage";

const ItemOverlayDiv = styled.div`
  display: ${(props) => props.display};
  position: absolute;
  z-index: 999;
  width: 201px;
  height: 200px;
  background-color: #00000090;

  .lock {
    margin-left: 75px;
    margin-top: 70px;
    font-size: 60px;
    color: #ffffff99;
  }
`;

const ItemContainerDiv = styled.div`
  width: 49%;
  height: 220px;
  border: 10px solid #133a4d;
  border-radius: 7px;
  background-color: var(--game-modal-background);
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-content: center;

  &:nth-child(1) {
    margin-top: 0;
  }

  &:nth-child(2) {
    margin-top: 0;
  }

  .Igloo {
    width: 225px;
    margin-top: 20px;
  }

  .Ice {
    width: 90px;
    margin-top: 55px;
  }

  .Flower {
    width: 80px;
    margin-top: 65px;
  }

  img {
    position: absolute;
    image-rendering: pixelated;
  }

  p {
    margin-top: 160px;
    text-align: center;
    font-size: 18px;
  }
`;

const InItemImage = styled.img`
  position: absolute;
  image-rendering: pixelated;
`;

const CashContainerDiv = styled.div`
  display: flex;
  justify-content: center;
  justify-content: space-between;

  img {
    width: 18px;
    margin-top: 163px;
  }

  p {
    margin-left: 22px;
    margin-top: 164px;
  }

  .purchaseButton {
    all: unset;
    margin-top: 157px;
    margin-left: 8px;
    z-index: 999;
    cursor: pointer;
  }

  .giftButton {
    all: unset;
    margin-top: 157px;
    margin-left: 15px;
    z-index: 1;
    cursor: pointer;
  }
`;

function Item({
  storageType,
  content,
  imageName,
  shouldOverlaid,
  toggleNotification,
  moveToOutBox,
  onTargetItem,
  onNotificationType,
  toggleShopFriendList,
}) {
  return (
    <ItemContainerDiv
      onClick={(e) => {
        {
          moveToOutBox &&
            e.target.id &&
            e.target.id !== "Ice" &&
            moveToOutBox(e.target.id);
        }
      }}
    >
      <ItemOverlayDiv display={shouldOverlaid ? "block" : "none"}>
        <i className="fas fa-solid fa-lock lock" />
      </ItemOverlayDiv>
      {imageName === "PolarBear" ||
      imageName === "Seal" ||
      imageName === "Penguin" ? (
        <SpriteImage
          imageName={imageName}
          width={imageName === "Seal" ? 155 : 135}
          height="220"
          size={{ PolarBear: 140, Penguin: 120, Seal: 96 }}
          margin={{ PolarBear: 20, Penguin: 40, Seal: 60 }}
        />
      ) : (
        <InItemImage
          src={`/images/${imageName}.png`}
          id={imageName}
          className={imageName}
        />
      )}
      {storageType === "myItemBox" && <p>{`x ${content}`}</p>}
      {storageType === "presentBox" && <p>{`From ${content}`}</p>}
      {storageType === "shop" && (
        <CashContainerDiv>
          <>
            <img src="/images/coke.png" />
            <p>{content}</p>
          </>
          <button
            className="purchaseButton"
            onClick={() => {
              onNotificationType(TYPE.CONFIRM_PURCHASE);
              onTargetItem(imageName);
              toggleNotification(true);
            }}
          >
            구매하기
          </button>
          {imageName !== "Ice" && (
            <button
              className="giftButton"
              onClick={() => {
                toggleShopFriendList(true);
                onTargetItem(imageName);
              }}
            >
              <i className="fas fa-solid fa-gift" />
            </button>
          )}
        </CashContainerDiv>
      )}
    </ItemContainerDiv>
  );
}

export default Item;

Item.propTypes = {
  storageType: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
    PropTypes.string,
  ]),
  imageName: PropTypes.string.isRequired,
  shouldOverlaid: PropTypes.bool,
  toggleNotification: PropTypes.func,
  moveToOutBox: PropTypes.func,
  onTargetItem: PropTypes.func,
  onNotificationType: PropTypes.func,
  toggleShopFriendList: PropTypes.func,
};
