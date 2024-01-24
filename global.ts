import {atom} from "recoil";


export const accessToken = atom({
    key: 'accessToken',
    default: ''
})

export const refreshToken = atom({
    key: 'refreshToken',
    default: ''
})

 export const profileName = atom({
    key: 'profileName',
    default: ''
})