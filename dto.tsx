export interface LoginResponse {
    accessToken: string,
    refreshToken: string
}

export interface TokenDto {
    token: string
}

export enum LobbyType {
    PUBLIC,
    PRIVATE
}

export interface LobbyDto {
    id: number,
    type: LobbyType,
    creationDate: string,
    size: number
}
