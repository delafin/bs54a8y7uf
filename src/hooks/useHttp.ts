import { useCallback, useContext } from "react";
import { dataContext } from "../store";

export const useHttp = () => {
    const {dispatchStore} = useContext(dataContext);
	
    const request = useCallback(async (url: string, method: 'GET' | 'POST' = 'GET' , body?: null | string | FormData, headers:HeadersInit = {'Content-Type': 'application/json'}) => {
        dispatchStore({type: 'LOADING'})

    try {
        const response = await fetch(url, {method, body, headers});
        if (!response.ok) {
            // dispatchStore({type: 'ERROR'})
            // throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            const data = await response.json();
            // return data.message;
            dispatchStore({type: 'ERROR_MESSAGE', payload:data.message})
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch(e) {
        dispatchStore({type: 'ERROR'})
        throw e
    }
    // await fetch(url, {method, body, headers})
    // .then(async (result) => {
    //     return await result.json();
    // }).catch((err) => {
    //     dispatchStore({type: 'ERROR'})
    //     // throw e
    // });

    }, []);
    
    return {request}

}

