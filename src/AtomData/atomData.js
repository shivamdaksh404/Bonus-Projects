import { atom } from "recoil";

export const atomData = atom({
    key:'atomData',
    default:[],
})

export const atomPackageName = atom({
    key: "atomPackageName",
    default:[]
})

export const atomFav = atom({
    key: "atomFav",
    default:[]
})