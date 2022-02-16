export default function possibleLocation(ice, x, y) {
  let rightUp, rightDown, leftUp, leftDown;

  if (ice === 10) {
    if (x >= 600 && x <= 1200 && y >= 0 && y < 290) {
      rightUp = 0.48 * x - y - 288;
    }

    if (x >= 600 && x <= 1200 && y >= 290 && y <= 580) {
      rightDown = 0.48 * x + y - 825;
    }

    if (x >= 0 && x < 600 && y >= 0 && y < 290) {
      leftUp = 0.48 * x + y - 288;
    }

    if (x >= 0 && x < 600 && y >= 290 && y <= 580) {
      leftDown = 0.48 * x - y + 260;
    }
  }

  if (ice === 9) {
    if (x >= 600 && x <= 1200 && y >= 0 && y < 290) {
      rightUp = 0.48 * x - y - 288;
    }

    if (x >= 600 && x <= 1200 && y >= 290 && y <= 580) {
      rightDown = 0.48 * x + y - 780;
    }

    if (x >= 0 && x < 600 && y >= 0 && y < 290) {
      leftUp = 0.48 * x + y - 288;
    }

    if (x >= 0 && x < 600 && y >= 290 && y <= 580) {
      leftDown = 0.48 * x - y + 200;
    }
  }

  if (ice === 8) {
    if (x >= 600 && x <= 1200 && y >= 0 && y < 290) {
      rightUp = 0.48 * x - y - 250;
    }

    if (x >= 600 && x <= 1200 && y >= 290 && y <= 580) {
      rightDown = 0.48 * x + y - 750;
    }

    if (x >= 0 && x < 600 && y >= 0 && y < 290) {
      leftUp = 0.48 * x + y - 318;
    }

    if (x >= 0 && x < 600 && y >= 290 && y <= 580) {
      leftDown = 0.48 * x - y + 180;
    }
  }

  if (ice === 7) {
    if (x >= 600 && x <= 1200 && y >= 0 && y < 290) {
      rightUp = 0.48 * x - y - 220;
    }

    if (x >= 600 && x <= 1200 && y >= 290 && y <= 580) {
      rightDown = 0.48 * x + y - 740;
    }

    if (x >= 0 && x < 600 && y >= 0 && y < 290) {
      leftUp = 0.48 * x + y - 350;
    }

    if (x >= 0 && x < 600 && y >= 290 && y <= 580) {
      leftDown = 0.48 * x - y + 160;
    }
  }

  if (ice === 6) {
    if (x >= 600 && x <= 1200 && y >= 0 && y < 290) {
      rightUp = 0.48 * x - y - 200;
    }

    if (x >= 600 && x <= 1200 && y >= 290 && y <= 580) {
      rightDown = 0.48 * x + y - 700;
    }

    if (x >= 0 && x < 600 && y >= 0 && y < 290) {
      leftUp = 0.48 * x + y - 370;
    }

    if (x >= 0 && x < 600 && y >= 290 && y <= 580) {
      leftDown = 0.48 * x - y + 120;
    }
  }

  if (ice === 5) {
    if (x >= 600 && x <= 1200 && y >= 0 && y < 290) {
      rightUp = 0.48 * x - y - 175;
    }

    if (x >= 600 && x <= 1200 && y >= 290 && y <= 580) {
      rightDown = 0.48 * x + y - 670;
    }

    if (x >= 0 && x < 600 && y >= 0 && y < 290) {
      leftUp = 0.48 * x + y - 400;
    }

    if (x >= 0 && x < 600 && y >= 290 && y <= 580) {
      leftDown = 0.48 * x - y + 95;
    }
  }

  if (ice === 4) {
    if (x >= 600 && x <= 1200 && y >= 0 && y < 290) {
      rightUp = 0.48 * x - y - 155;
    }

    if (x >= 600 && x <= 1200 && y >= 290 && y <= 580) {
      rightDown = 0.48 * x + y - 640;
    }

    if (x >= 0 && x < 600 && y >= 0 && y < 290) {
      leftUp = 0.48 * x + y - 430;
    }

    if (x >= 0 && x < 600 && y >= 290 && y <= 580) {
      leftDown = 0.48 * x - y + 60;
    }
  }

  if (ice === 3) {
    if (x >= 600 && x <= 1200 && y >= 0 && y < 290) {
      rightUp = 0.48 * x - y - 125;
    }

    if (x >= 600 && x <= 1200 && y >= 290 && y <= 580) {
      rightDown = 0.48 * x + y - 620;
    }

    if (x >= 0 && x < 600 && y >= 0 && y < 290) {
      leftUp = 0.48 * x + y - 460;
    }

    if (x >= 0 && x < 600 && y >= 290 && y <= 580) {
      leftDown = 0.48 * x - y + 40;
    }
  }

  if (ice === 2) {
    if (x >= 600 && x <= 1200 && y >= 0 && y < 290) {
      rightUp = 0.48 * x - y - 90;
    }

    if (x >= 600 && x <= 1200 && y >= 290 && y <= 580) {
      rightDown = 0.48 * x + y - 580;
    }

    if (x >= 0 && x < 600 && y >= 0 && y < 290) {
      leftUp = 0.48 * x + y - 480;
    }

    if (x >= 0 && x < 600 && y >= 290 && y <= 580) {
      leftDown = 0.48 * x - y + 10;
    }
  }

  if (ice === 1) {
    if (x >= 600 && x <= 1200 && y >= 0 && y < 290) {
      rightUp = 0.48 * x - y - 70;
    }

    if (x >= 600 && x <= 1200 && y >= 290 && y <= 580) {
      rightDown = 0.48 * x + y - 50;
    }

    if (x >= 0 && x < 600 && y >= 0 && y < 290) {
      leftUp = 0.48 * x + y - 500;
    }

    if (x >= 0 && x < 600 && y >= 290 && y <= 580) {
      leftDown = 0.48 * x - y - 50;
    }
  }

  if (rightUp <= 0 || rightDown <= 0 || leftUp >= 0 || leftDown >= 0) {
    return true;
  }

  return false;
}
