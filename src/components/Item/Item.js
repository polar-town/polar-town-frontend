import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TYPE } from "../../constants/notification";

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

  #PolarBear {
    width: 105px;
    margin-top: 20px;
  }

  #Penguin {
    width: 150px;
    margin-top: 35px;
  }

  #Seal {
    width: 165px;
    margin-top: 50px;
    margin-left: 50px;
  }

  #Igloo {
    width: 225px;
    margin-top: 20px;
  }

  #Ice {
    width: 90px;
    margin-top: 55px;
  }

  #Flower {
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
}) {
  return (
    <ItemContainerDiv
      onClick={(e) => {
        if (e.target == e.currentTarget) {
          {
            toggleNotification && toggleNotification(true);
          }
          {
            moveToOutBox && moveToOutBox(e.target.id);
          }
        }
      }}
    >
      <ItemOverlayDiv display={shouldOverlaid ? "block" : "none"}>
        <i className="fas fa-solid fa-lock lock" />
      </ItemOverlayDiv>
      <img src={`/images/${imageName}.png`} id={imageName} />
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
          <button className="giftButton">
            <i className="fas fa-solid fa-gift" />
          </button>
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
};
