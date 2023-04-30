import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  const getLayout =
    //@ts-ignore
    (Component?.getLayout as unknown) ?? ((page: unknown) => page);
  return (
    <SessionProvider session={session}>
      {
        //@ts-ignore
        getLayout(<Component {...pageProps} />)
      }

    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
