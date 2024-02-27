import { StateCreator } from "zustand";

import getRandomNumber from "@src/helpers/get-random-number.ts";

import { ISearch } from "@src/api/interfaces.ts";
import { IAudioIndex } from "@zustand/slices/audio/createAudioIndex.ts";
import { IRepeatAndLoop } from "@zustand/slices/repeat-and-loop/createRepeatAndLoop.ts";

type SharedSlice = IAudioIndex & IRepeatAndLoop;

export interface ICreateAudioIndexAndShuffledList {
  generateShuffledList: (data: ISearch[] | undefined) => void,
}

const createAudioIndexAndShuffledList: StateCreator<SharedSlice, [], [], ICreateAudioIndexAndShuffledList> = (_, get) => ({
  generateShuffledList: (data: ISearch[] | undefined) => {
    if (data) {
      const numberCol = data.map((_, index) => index);
      const shuffledCol = data.map(() => {
        const randomNumber = getRandomNumber(0, numberCol.length);
        const randomIndex = numberCol.splice(randomNumber, 1)[0];
        return data[randomIndex];
      });
      get().changeCurrentAudio(Number(shuffledCol[0].id));
      get().setShuffledList(shuffledCol);
    }
  }
});

export default createAudioIndexAndShuffledList;
