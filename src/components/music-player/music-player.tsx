import { useState } from "react";

import MusicCard from "./music-card/music-card.tsx";

import { ISearch } from "../../api/interfaces.ts";

type Props = {
  results: ISearch[],
}

function MusicPlayer({ results }: Props) {
  const [currentAudio, setCurrentAudio] = useState(results[0]);

  return (
    <div>
      <MusicCard data={currentAudio} />
    </div>
  );
}

export default MusicPlayer;
