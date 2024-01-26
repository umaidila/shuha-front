import {useRecoilState} from 'recoil';

import {accessToken, refreshToken} from './global';
import alert from './alert';
import {backUrl} from "./properties";
import {TokenDto} from "./dto";
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './types';
import {StackNavigationProp} from "@react-navigation/stack";

export {useFetchWrapper};

type RequestHeaders = {
    [key: string]: string | number
}

type RequestOptions = {
    method: string,
    headers: RequestHeaders,
    body: string | undefined
}

function useFetchWrapper() {
    const [accessTokenValue, setAccessTokenValue] = useRecoilState(accessToken);
    const [refreshTokenValue, setRefreshTokenValue] = useRecoilState(refreshToken);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return {
        get: request('GET'),
        post: request('POST'),
        put: request('PUT'),
        delete: request('DELETE')
    };

    function request(method: string) {
        return (url: string, body: any) => {
            const headers = authHeader();

            const requestInit: RequestInit = {
                method
            }
            if (body) {
                headers.append('Content-Type',  'application/json');
                requestInit.body = JSON.stringify(body);
            }
            requestInit.headers = headers;
            return fetch(backUrl + url, requestInit).then(handleResponse);
        }
    }

    // helper functions

    function authHeader(): Headers {
        const header = new Headers();
        header.append('Authorization', `Bearer ${accessTokenValue}`);
        return header;
    }

    function handleResponse(response: Response) {
        return response.text().then(text => {
            const data = text && JSON.parse(text);

            if (response.status == 403) {



                if ([401, 403].includes(response.status)) {
                    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    localStorage.removeItem('user');
                    setAuth(null);
                    history.push('/account/login');
                }

                const error = (data && data.message) || response.statusText;
                alertActions.error(error);
                return Promise.reject(error);
            }

            return data;
        });
    }

    async function updateRefreshToken() {
        const requestInit: RequestInit = {
            method: 'post',
            headers: {'Content-Type':  'application/json'},
            body: JSON.stringify({'token': refreshTokenValue})
        }
        const response = await fetch(backUrl + '/refresh', requestInit);

        if (response.status == 200){
            let token = await response.json() as unknown as TokenDto;
            setAccessTokenValue(token.token);
        } else {
            alert("Время логина истекло, войдите заново");

        }
    }
}