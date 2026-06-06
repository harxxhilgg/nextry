"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "./store";
import { setUser } from "./features/user/userSlice";

export default function StoreProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: unknown;
}) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
    if (initialUser) {
      storeRef.current.dispatch(setUser(initialUser));
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
