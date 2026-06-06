"use client";

import { useMemo } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./store";
import { setUser } from "./features/user/userSlice";

export default function StoreProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: unknown;
}) {
  const store = useMemo(() => {
    const s = makeStore();
    if (initialUser) {
      // initialUser comes from the server (unknown) — cast to any to satisfy
      // the `setUser` payload shape expected by the slice. If you have a
      // concrete user type, replace `any` with that type and normalize here.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      s.dispatch(setUser(initialUser as any));
    }

    return s;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
