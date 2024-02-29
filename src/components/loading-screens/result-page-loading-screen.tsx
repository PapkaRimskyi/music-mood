import { KeyedMutator } from "swr";

import MusicPlayerSkeleton from "@components/skeletons/music-player-skeleton.tsx";
import ButtonConstructor from "@components/buttons/button-constructor/button-constructor.tsx";

import { ISearch, ISearchResponse } from "@src/api/interfaces.ts";

type Props = {
  isLoading: boolean,
  isError: boolean,
  audioData: ISearch[] | undefined,
  mutate: KeyedMutator<ISearchResponse[]>,
}

function ResultPageLoadingScreen({ audioData, isLoading, isError, mutate }: Props) {
  const isInitRequestEndedWithError = !isLoading && isError && !audioData;

  const retryButtonHandler = () => mutate();

  return (
    <div className="relative">
      <MusicPlayerSkeleton />
      {isInitRequestEndedWithError
        && <ButtonConstructor
          extraClassName="absolute p-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neonDarkerPurple hover:bg-neonPurple active:opacity-30 rounded-lg"
          onClickHandler={retryButtonHandler}
          children="Error! Retry again"
        />
      }
    </div>
  );
}

export default ResultPageLoadingScreen;
