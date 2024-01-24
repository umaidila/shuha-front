import Variables from "./global";
import {backUrl} from "./properties";
import {TokenDto} from "./dto";

export const getProfileName = async () => {
    try {
        const response = await fetch(backUrl + "/profile", {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + Variables.getAccessToken(),
            }
        })
        const profileName = response.text();
        switch (response.status) {
            case 200:
                let token = await response.json() as unknown as TokenDto;
                Variables.setProfileName(token.token);
        }
    } catch (error: any) {
        alert(error);
    }
}