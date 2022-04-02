import userReducer, {
  saveLoginUser,
  resetLoginUser,
  increseCoke,
  decreaseCoke,
  updateItemCount,
  updateIceCount,
} from "../features/user/userSlice";

describe("user reducer", () => {
  const initialState = userReducer(undefined, {});
  let state = initialState;

  it("has initial stste", () => {
    expect(initialState).toEqual({
      user: {},
      isAuth: false,
      accessToken: null,
      hasLogoutHistory: false,
      itemCount: {
        PolarBear: 0,
        Penguin: 0,
        Seal: 0,
        Igloo: 0,
        Flower: 0,
      },
    });
  });

  it("saveLoginUser", () => {
    const response = {
      accessToken: "jwt",
      user: {
        _id: "12345",
        cokeCount: 100,
        email: "test@gmail.com",
        iceCount: 1,
        name: "testUser",
        photo: "photoUrl",
      },
    };

    state = userReducer(initialState, saveLoginUser(response));
    expect(state.user.id).toEqual("12345");
    expect(state.user.name).toEqual("testUser");
    expect(state.user.email).toEqual("test@gmail.com");
    expect(state.user.photo).toEqual("photoUrl");
    expect(state.user.cokeCount).toEqual(100);
    expect(state.user.iceCount).toEqual(1);
    expect(state.isAuth).toEqual(true);
    expect(state.accessToken).toEqual("jwt");
  });

  it("updateItemCount", () => {
    const itemCounter = {
      PolarBear: 1,
      Penguin: 2,
      Seal: 3,
      Igloo: 4,
      Flower: 5,
    };
    state = userReducer(state, updateItemCount(itemCounter));
    expect(state.itemCount.PolarBear).toEqual(1);
    expect(state.itemCount.Penguin).toEqual(2);
    expect(state.itemCount.Seal).toEqual(3);
    expect(state.itemCount.Igloo).toEqual(4);
    expect(state.itemCount.Flower).toEqual(5);
  });

  it("increaseCoke", () => {
    state = userReducer(state, increseCoke(10));
    expect(state.user.cokeCount).toEqual(110);
    state = userReducer(state, increseCoke(50));
    expect(state.user.cokeCount).toEqual(160);
    state = userReducer(state, increseCoke(100));
    expect(state.user.cokeCount).toEqual(260);
  });

  it("decreaseCoke", () => {
    state = userReducer(state, decreaseCoke(10));
    expect(state.user.cokeCount).toEqual(250);
    state = userReducer(state, decreaseCoke(100));
    expect(state.user.cokeCount).toEqual(150);
    state = userReducer(state, decreaseCoke(20));
    expect(state.user.cokeCount).toEqual(130);
  });

  it("updateIceCount", () => {
    state = userReducer(state, updateIceCount());
    expect(state.user.iceCount).toEqual(2);
    state = userReducer(state, updateIceCount());
    expect(state.user.iceCount).toEqual(3);
    state = userReducer(state, updateIceCount());
    expect(state.user.iceCount).toEqual(4);
  });

  it("resetLoginUser", () => {
    state = userReducer(state, resetLoginUser());
    expect(state).toEqual({ ...initialState, hasLogoutHistory: true });
  });
});
