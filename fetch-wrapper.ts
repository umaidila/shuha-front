import {useRecoilState} from 'recoil';

import {accessToken, refreshToken} from './global';
import alert from './alert';
import {backUrl} from "./properties";
import {TokenDto} from "./dto";
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from './types';
import {StackNavigationProp} from "@react-navigation/stack";

export {FetchWrapper};


function FetchWrapper() {
    const [accessTokenValue, setAccessTokenValue] = useRecoilState(accessToken);
    const [refreshTokenValue] = useRecoilState(refreshToken);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return {
        get: request('GET'),
        post: request('POST'),
        put: request('PUT'),
        delete: request('DELETE')
    };

    function request(method: string): (url: string, body: unknown) => Promise<Response> {
        return async (url: string, body: unknown): Promise<Response> => {
            const headers = authHeader();

            const requestInit: RequestInit = {
                method
            }
            if (body) {
                headers.append('Content-Type', 'application/json');
                requestInit.body = JSON.stringify(body);
            }
            requestInit.headers = headers;
            const response = await fetch(backUrl + url, requestInit);
            if (response.status!=403){
                return response;
            } else {
                await updateRefreshToken();
                const newResponse =  await fetch(backUrl + url, requestInit);
                if (response.status == 403){
                    alert("Непредвиденная ошибка входа");
                }
                return newResponse;
            }

        }
    }

    // helper functions

    function authHeader(): Headers {
        const header = new Headers();
        header.append('Authorization', `Bearer ${accessTokenValue}`);
        return header;
    }

    async function updateRefreshToken() {
        const requestInit: RequestInit = {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'token': refreshTokenValue})
        }
        const response = await fetch(backUrl + '/refresh', requestInit);

        if (response.status == 200) {
            const token = await response.json() as unknown as TokenDto;
            setAccessTokenValue(token.token);
        } else {
            alert("Время логина истекло, войдите заново");
            navigation.navigate("Login");
        }
    }
}
