import {useRecoilState} from 'recoil';

import {accessToken, refreshToken} from './global';

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


    return {
        get: request('GET'),
        post: request('POST'),
        put: request('PUT'),
        delete: request('DELETE')
    };

    function request(method: string) {
        return (url: string, body: string) => {
            const requestOptions: RequestOptions = {
                method,
                headers: authHeader(url),
                body: undefined
            }
            if (body) {
                requestOptions.headers['Content-Type'] =  'application/json' ;
                requestOptions.body = JSON.stringify(body);
            }
            return fetch(url, requestOptions).then(handleResponse);
        }
    }

    // helper functions

    function authHeader(url: string): RequestHeaders {
        return {Authorization: `Bearer ${accessTokenValue}`};
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
}