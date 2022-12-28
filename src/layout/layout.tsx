import { ReactNode } from 'react';

// export default function variable(req: NextApiRequest, res: NextApiResponse) {
//     const { method, query, cookies, body } = req;
//     const { status, json, send, redirect, revalidate } = res;
// }

declare const variable: string;

export default function Layout({ children, home }: { children: ReactNode; home?: boolean }) {}
