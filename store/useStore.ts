/** Hook to use zustand store in reactive React Components. **/

import create from "zustand";
import store from "./index";

const useStore = create(store);

export default useStore;
