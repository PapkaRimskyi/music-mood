import { createContext, MouseEvent } from "react";

export type TMusicCardContext = {
  audioRef: React.RefObject<HTMLAudioElement>,
  timeBarClickHandler: (e: MouseEvent<HTMLDivElement>) => void,
  audioLinePos: number,
}

export const MusicCardContext = createContext<TMusicCardContext | null>(null);
