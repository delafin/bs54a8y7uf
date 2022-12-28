import { type NextApiRequest, type NextApiResponse } from "next";

export default function variable(req: NextApiRequest, res: NextApiResponse) {
    const { method, query, cookies, body } = req;

    if(method == 'GET'){

    } else {

    } 


    // const { status, json, send, redirect, revalidate } = res;
}   