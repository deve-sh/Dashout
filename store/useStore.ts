/** Hook to use zustand store in reactive React Components. **/

import create from "zustand";
import store from "./index";

import State from "../types/storeState";

const useStore = create<State>(store);

export default useStore as (selector: (state: State) => any) => any;
