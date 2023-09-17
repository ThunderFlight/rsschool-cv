import { useContext } from "react";
import {Context} from "../contexts/context"

export function useAppContext() {
  return useContext(Context);
}