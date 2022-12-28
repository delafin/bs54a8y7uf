import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Head from "../layout/head";

import Header from "../layout/header";
import { ContextProvider } from '../store'

import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
        <ContextProvider>
        <Head>
          <Header>
            <Component {...pageProps} />
          </Header>
        </Head>
    </ContextProvider>
      </SessionProvider>
  );
};

export default MyApp;
