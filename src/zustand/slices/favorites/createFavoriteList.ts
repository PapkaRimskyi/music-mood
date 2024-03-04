import { StateCreator } from "zustand";

import { ISearch } from "@src/api/interfaces.ts";

export interface IFavoriteList {
  favoriteList: Map<number, ISearch>,
  addToFavoriteList: (data: ISearch) => void,
  removeFromFavoriteList: (id: number) => void,
}

const createFavoriteList: StateCreator<IFavoriteList, [["zustand/devtools", never]]> = (set, get) => ({
  favoriteList: new Map<number, ISearch>(),
  addToFavoriteList: (data: ISearch) => set(({ favoriteList }) => ({ favoriteList: new Map<number, ISearch>(favoriteList).set(Number(data.id), data) }), false, "addToFavoriteList"),
  removeFromFavoriteList: (id: number) => {
    const favoriteListWithoutElement = new Map<number, ISearch>(get().favoriteList);
    favoriteListWithoutElement.delete(id);
    set({ favoriteList: favoriteListWithoutElement }, false, "removeFromFavoriteList");
  },
});

export default  createFavoriteList;
