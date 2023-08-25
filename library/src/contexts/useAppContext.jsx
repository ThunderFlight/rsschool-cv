import { useContext } from "react";
import { Context } from "./context";
export function useAppContext() {
  return useContext(Context);
}
