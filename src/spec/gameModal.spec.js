import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import GameModal from "../components/GameModal/GameModal";
import { useSelector, useDispatch } from "react-redux";
import { closeAll } from "../features/modal/modalSlice";

jest.mock("react-redux");

afterEach(cleanup);

describe.skip("GameModal", () => {
  it("화면에 모달창이 켜진다.", () => {
    render(
      <GameModal
        onClose={() => {}}
        maskClosable={true}
        className={"shop"}
        subject={"상점"}
      >
        모달테스트
      </GameModal>,
    );

    expect(screen.getByText("상점")).toBeInTheDocument();
    expect(screen.getByText("모달테스트")).toBeInTheDocument();
  });

  it("모달 닫기버튼 누르면 모달창 꺼진다.", () => {
    const dispatch = jest.fn();
    // const useStateSpy = jest.spyOn(React, 'useState');

    // const { isNotificatoinOpen } = useSelector((state) => state.modal);
    useSelector.mockImplementation((selector) => selector({ modal }));
    const onClose = () => {
      dispatch(closeAll());
    };

    const utils = render(
      <GameModal
        onClose={onClose}
        maskClosable={true}
        className={"shop"}
        subject={"상점"}
      >
        모달테스트
      </GameModal>,
    );

    const clickWrapper = utils.getByTestId("wrapperdiv");
    fireEvent.click(clickWrapper);

    expect(screen.queryByText("상점")).not.toBeInTheDocument();
    expect(screen.queryByText("모달테스트")).not.toBeInTheDocument();
  });
});
