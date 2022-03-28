import React from "react";
import "@testing-library/jest-dom";
import possibleLocation from "../utils/validateItemLocation";

describe.only("utils/validateItemLocation", () => {
  it("1단계 아이템 좌표 유효성 판단.", () => {
    const possibleCoordinate = possibleLocation(1, 600, 258);
    const impossibleCoordinate = possibleLocation(1, 1200, 580);

    expect(possibleCoordinate).toBeTruthy();
    expect(impossibleCoordinate).toBeFalsy();
  });

  it("2단계 아이템 좌표 유효성 판단.", () => {
    const possibleCoordinate = possibleLocation(2, 535, 260);
    const impossibleCoordinate = possibleLocation(2, 665, 315);

    expect(possibleCoordinate).toBeTruthy();
    expect(impossibleCoordinate).toBeFalsy();
  });

  it("3단계 아이템 좌표 유효성 판단.", () => {
    const possibleCoordinate = possibleLocation(3, 470, 258);
    const impossibleCoordinate = possibleLocation(3, 520, 170);

    expect(possibleCoordinate).toBeTruthy();
    expect(impossibleCoordinate).toBeFalsy();
  });

  it("4단계 아이템 좌표 유효성 판단.", () => {
    const possibleCoordinate = possibleLocation(4, 425, 250);
    const impossibleCoordinate = possibleLocation(4, 450, 200);

    expect(possibleCoordinate).toBeTruthy();
    expect(impossibleCoordinate).toBeFalsy();
  });

  it("5단계 아이템 좌표 유효성 판단.", () => {
    const possibleCoordinate = possibleLocation(5, 355, 260);
    const impossibleCoordinate = possibleLocation(5, 530, 130);

    expect(possibleCoordinate).toBeTruthy();
    expect(impossibleCoordinate).toBeFalsy();
  });

  it("6단계 아이템 좌표 유효성 판단.", () => {
    const possibleCoordinate = possibleLocation(6, 290, 265);
    const impossibleCoordinate = possibleLocation(6, 390, 380);

    expect(possibleCoordinate).toBeTruthy();
    expect(impossibleCoordinate).toBeFalsy();
  });

  it("7단계 아이템 좌표 유효성 판단.", () => {
    const possibleCoordinate = possibleLocation(7, 215, 270);
    const impossibleCoordinate = possibleLocation(7, 335, 140);

    expect(possibleCoordinate).toBeTruthy();
    expect(impossibleCoordinate).toBeFalsy();
  });

  it("8단계 아이템 좌표 유효성 판단.", () => {
    const possibleCoordinate = possibleLocation(8, 150, 256);
    const impossibleCoordinate = possibleLocation(8, 200, 381);

    expect(possibleCoordinate).toBeTruthy();
    expect(impossibleCoordinate).toBeFalsy();
  });

  it("9단계 아이템 좌표 유효성 판단.", () => {
    const possibleCoordinate = possibleLocation(9, 90, 250);
    const impossibleCoordinate = possibleLocation(9, 255, 108);

    expect(possibleCoordinate).toBeTruthy();
    expect(impossibleCoordinate).toBeFalsy();
  });

  it("10단계 아이템 좌표 유효성 판단.", () => {
    const possibleCoordinate = possibleLocation(10, 595, 500);
    const impossibleCoordinate = possibleLocation(10, 188, 480);

    expect(possibleCoordinate).toBeTruthy();
    expect(impossibleCoordinate).toBeFalsy();
  });
});
