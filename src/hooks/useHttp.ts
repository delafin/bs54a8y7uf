import { useCallback, useContext } from "react";
import { dataContext } from "../store";

export const useHttp = () => {
    const {dispatchStore} = useContext(dataContext);
	
    const request = useCallback(async (url: string, method: 'GET' | 'POST' = 'GET' , body?: null | string | FormData, headers:HeadersInit = {'Content-Type': 'application/json'}) => {
        dispatchStore({type: 'LOADING'})

    try {
        const response = await fetch(url, {method, body, headers});
        if (!response.ok) {
            dispatchStore({type: 'ERROR'})
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch(e) {
        dispatchStore({type: 'ERROR'})
        throw e
    }

    }, []);
    
    return {request}

}

