import { StateCreator } from 'zustand';

import { ISearch } from "@src/api/interfaces.ts";

export interface IRepeatAndLoop {
  isRepeating: boolean,
  changeRepeatingFlag: () => void,
  isBeingShuffled: boolean,
  changeShuffleFlag: () => void,
  shuffledList: ISearch[] | null,
  setShuffledList: (data: ISearch[] | null) => void,
}

const createRepeatAndLoop: StateCreator<IRepeatAndLoop, [["zustand/devtools", never]]> = (set, get) => ({
  isRepeating: false,
  changeRepeatingFlag: () => set({ isRepeating: !get().isRepeating }, false, "changeRepeatingFlag"),
  isBeingShuffled: false,
  changeShuffleFlag: () => set({ isBeingShuffled: !get().isBeingShuffled }, false, "changeShuffleFlag"),
  shuffledList: null,
  setShuffledList: (data: ISearch[] | null) => set({ shuffledList: data }, false, "setShuffledList"),
});

export default createRepeatAndLoop;
