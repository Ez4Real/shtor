import {createContext} from "react";
import isMobile from "../utils/isMobile";

export const APIContext = createContext({
  state: {
    cart: [],
    lang: '',
    currency: '',
    products: [],
    isMobile,
  },
  dispatch: () => {},
});
