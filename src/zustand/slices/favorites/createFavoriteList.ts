import superjson from 'superjson';

import { StateCreator } from "zustand";
import { PersistOptions, PersistStorage } from "zustand/middleware";

import { ISearch } from "@src/api/interfaces.ts";

export interface IFavoriteList {
  favoriteList: Map<number, ISearch>,
  addToFavoriteList: (data: ISearch) => void,
  removeFromFavoriteList: (id: number) => void,
}

type TPersistStorageValue = Pick<IFavoriteList, 'favoriteList'>;

const createFavoriteList: StateCreator<IFavoriteList, [["zustand/devtools", never]]> = (set, get) => ({
  favoriteList: new Map<number, ISearch>(),
  addToFavoriteList: (data: ISearch) => set(({ favoriteList }) => ({ favoriteList: new Map<number, ISearch>(favoriteList).set(Number(data.id), data) }), false, "addToFavoriteList"),
  removeFromFavoriteList: (id: number) => {
    const favoriteListWithoutElement = new Map<number, ISearch>(get().favoriteList);
    favoriteListWithoutElement.delete(id);
    set({ favoriteList: favoriteListWithoutElement }, false, "removeFromFavoriteList");
  },
});

const favoriteListPersistStorage: PersistStorage<TPersistStorageValue> = {
  getItem: (name) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    return superjson.parse(str);
  },
  setItem: (name, newValue) => {
    localStorage.setItem(name, superjson.stringify(newValue));
  },
  removeItem: (name) => localStorage.removeItem(name),
}

export const favoriteListPersistOptions: PersistOptions<IFavoriteList, TPersistStorageValue> = {
  name: "favorite-list",
  storage: favoriteListPersistStorage,
  partialize: (state) => ({ favoriteList: state.favoriteList }),
}

export default createFavoriteList;
