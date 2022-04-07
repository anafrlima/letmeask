import { ReactNode } from "react";
import { AuthContextProvider } from "./auth";

type GlobalProps = {
  children: ReactNode;
};

export default function GlobalContext({ children }: GlobalProps) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
