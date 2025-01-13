"use client";
import React, { ReactNode, useCallback, useMemo, useState } from "react";
import { defaultGlobalContextValue, GlobalContext, loggedUserProfile } from "./context";

function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [globalState, setGlobalState] = useState(defaultGlobalContextValue);

  const removeUser = useCallback(function () {
    setGlobalState({ isUserLoggedIn: false, user: null });
  }, []);

  const addUser = useCallback(function (user:loggedUserProfile) {
    setGlobalState({ isUserLoggedIn: true, user: {...user} });
  }, [globalState.user]);
  const globalContextValue = {
    globalContext: globalState,
    removeUser: removeUser,
    addUser: addUser,
  };

  const value = useMemo(() => globalContextValue, [globalState.isUserLoggedIn]);

  console.log("Provider",value.globalContext.isUserLoggedIn);

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
