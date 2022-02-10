import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledItemOverlayDiv = styled.div`
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

const StyledItemContainerDiv = styled.div`
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

  #polarBear {
    width: 105px;
    margin-top: 20px;
  }

  #penguin {
    width: 150px;
    margin-top: 35px;
  }

  #seal {
    width: 165px;
    margin-top: 50px;
    margin-left: 50px;
  }

  #igloo {
    width: 225px;
    margin-top: 20px;
  }

  #ice {
    width: 90px;
    margin-top: 55px;
  }

  #flower {
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

const StyledCashContainerDiv = styled.div`
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

  button {
    all: unset;
    margin-top: 157px;
    margin-left: 15px;
  }
`;

function Item({ storageType, data, imageName, shouldOverlaid }) {
  function selectImage(imageName) {
    switch (imageName) {
      case "PolarBear":
        return { image: "/images/polarbear.png", id: "polarBear" };
      case "Penguin":
        return { image: "/images/penguin.png", id: "penguin" };
      case "Seal":
        return { image: "/images/seal.png", id: "seal" };
      case "Igloo":
        return { image: "/images/igloo.png", id: "igloo" };
      case "Ice":
        return { image: "/images/ice.png", id: "ice" };
      case "Flower":
        return { image: "/images/flower.png", id: "flower" };
      default:
        return "/images/logo.png";
    }
  }

  return (
    <StyledItemContainerDiv>
      <StyledItemOverlayDiv display={shouldOverlaid ? "block" : "none"}>
        <i className="fas fa-solid fa-lock lock" />
      </StyledItemOverlayDiv>
      <img src={selectImage(imageName).image} id={selectImage(imageName).id} />
      {storageType === "myItemBox" && <p>{`x ${data}`}</p>}
      {storageType === "presentBox" && <p>{`From ${data}`}</p>}
      {storageType === "shop" && (
        <StyledCashContainerDiv>
          <>
            <img src="/images/coke.png" />
            <p>{data}</p>
          </>

          <button>
            <i className="fas fa-solid fa-gift" />
          </button>
        </StyledCashContainerDiv>
      )}
    </StyledItemContainerDiv>
  );
}

export default Item;

Item.propTypes = {
  storageType: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
    PropTypes.string,
  ]),
  imageName: PropTypes.string.isRequired,
  shouldOverlaid: PropTypes.bool,
};
