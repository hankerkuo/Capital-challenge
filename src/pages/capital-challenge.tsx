import type { NextPage } from "next";
import Head from "next/head";
import { createContext, useState, Dispatch, SetStateAction } from "react";

import CapitalMainWidget from "src/components/CapitalMainWidget";

export const CurrentUserContext = createContext<{
  user: string;
  setUser: Dispatch<SetStateAction<string>>;
}>({ user: "", setUser: () => {} });

const Capital: NextPage = () => {
  const [user, setUser] = useState<string>("");
  return (
    <div>
      <Head>
        <title>Capital Challenge</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <CurrentUserContext.Provider value={{ user, setUser }}>
          <CapitalMainWidget />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
};

export default Capital;
