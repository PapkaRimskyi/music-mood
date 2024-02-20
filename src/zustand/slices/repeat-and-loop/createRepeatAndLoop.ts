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

const createRepeatAndLoop: StateCreator<IRepeatAndLoop> = (set, get) => ({
  isRepeating: false,
  changeRepeatingFlag: () => set({ isRepeating: !get().isRepeating }),
  isBeingShuffled: false,
  changeShuffleFlag: () => set({ isBeingShuffled: !get().isBeingShuffled }),
  shuffledList: null,
  setShuffledList: (data: ISearch[] | null) => set({ shuffledList: data }),
});

export default createRepeatAndLoop;
