import React from "react";
import proptypes from "prop-types";
import styled from "styled-components";

const SpriteImageContainer = styled.div`
  position: absolute;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  overflow: hidden;

  img {
    image-rendering: pixelated;
  }

  .PolarBear {
    margin-top: ${(props) => props.margin.PolarBear}px;
    height: ${(props) => props.imageSize.PolarBear}px;
    animation: moveSpritesheet 0.8s steps(3) infinite;
  }

  .Penguin {
    margin-top: ${(props) => props.margin.Penguin}px;
    height: ${(props) => props.imageSize.Penguin}px;
    animation: moveSpritesheet 0.5s steps(2) infinite;
  }

  .Seal {
    margin-top: ${(props) => props.margin.Seal}px;
    margin-left: ${(props) => props.imageSize.sealMargin || 15}px;
    height: ${(props) => props.imageSize.Seal}px;
    animation: moveSpritesheet 0.8s steps(5) infinite;
  }

  @keyframes moveSpritesheet {
    from {
      transform: translate3d(0px, 0, 0);
    }
    to {
      transform: translate3d(-100%, 0, 0);
    }
  }
`;

function InItemSpriteImage({ imageName, width, height, size, margin }) {
  return (
    <SpriteImageContainer
      width={width}
      height={height}
      imageSize={size}
      margin={margin}
    >
      <img
        src={`/images/sprite/${imageName}.png`}
        id={imageName}
        className={imageName}
      />
    </SpriteImageContainer>
  );
}

export default InItemSpriteImage;

InItemSpriteImage.propTypes = {
  imageName: proptypes.string.isRequired,
  width: proptypes.number.isRequired,
  height: proptypes.string.isRequired,
  size: proptypes.object,
  margin: proptypes.object,
};
