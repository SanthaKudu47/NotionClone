"user client";
import { createContext } from "react";

export type loggedUserProfile = {
  fullName: string | null;
  email: string | null;
  paymentMethod: unknown;
};

export type GlobalContextType = {
  isUserLoggedIn: boolean;
  user: loggedUserProfile | null;
};

export type ContextValueType = {
  globalContext: GlobalContextType;
  removeUser: () => void;
  addUser: (user: loggedUserProfile) => void;
};

const defaultGlobalContextValue: GlobalContextType = {
  isUserLoggedIn: false,
  user: null,
};
const GlobalContext = createContext<ContextValueType>({
  globalContext: { isUserLoggedIn: false, user: null },
  removeUser: () => {},
  addUser: () => {},
});

export { GlobalContext, defaultGlobalContextValue };
