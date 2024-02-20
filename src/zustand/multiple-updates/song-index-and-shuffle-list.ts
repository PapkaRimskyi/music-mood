import { StateCreator } from "zustand";

import getRandomNumber from "@src/helpers/get-random-number.ts";

import { ISearch } from "@src/api/interfaces.ts";
import { ISongIndex } from "@zustand/slices/song/createSongIndex.ts";
import { IRepeatAndLoop } from "@zustand/slices/repeat-and-loop/createRepeatAndLoop.ts";

type SharedSlice = ISongIndex & IRepeatAndLoop;

export interface ICreateSongIndexAndShuffleList {
  generateShuffleList: (data: ISearch[]) => void,
}

const createSongIndexAndShuffleList: StateCreator<SharedSlice, [], [], ICreateSongIndexAndShuffleList> = (_, get) => ({
  generateShuffleList: (data: ISearch[]) => {
    const numberCol = data.map((_, index) => index);
    const shuffledCol = data.map(() => {
      const randomNumber = getRandomNumber(0, numberCol.length);
      const randomIndex = numberCol.splice(randomNumber, 1)[0];
      return data[randomIndex];
    });
    get().changeCurrentSong(Number(shuffledCol[0].id));
    get().setShuffledList(shuffledCol);
  }
});

export default createSongIndexAndShuffleList;
