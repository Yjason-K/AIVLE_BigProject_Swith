import { atom } from "recoil";

//  로그인 상태관리
export const loginState = atom({
  key: "loginState",
  default: false,
});
