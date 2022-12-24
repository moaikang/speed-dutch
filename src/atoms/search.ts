import { atom } from "recoil";

export const addressSearchListAtom = atom<string[]>({
  key: "addressSearchList",
  default: [],
});
