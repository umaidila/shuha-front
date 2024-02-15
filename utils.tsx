import {profileName} from './global';
import {LobbyDto} from "./dto";
import {useFetchWrapper} from "./fetch-wrapper";
import {useRecoilState} from "recoil";

export const getProfileName = async () => {
    const [profileNameValue, setProfileNameValue] = useRecoilState(profileName);
    try {
         useFetchWrapper().get("/profile",null).then(
             async response => {
                 setProfileNameValue(await response.text());
             }
        );

    } catch (error: any) {
        alert(error);
    }
}

export const getLobbyList = async (): Promise<LobbyDto[]> => {
    try {
        const response = await useFetchWrapper().get("/lobby", null);
        return await response.json() as unknown as LobbyDto[];
    } catch (error) {
        alert(error);
        return [];
    }
}