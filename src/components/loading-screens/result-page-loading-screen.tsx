import { KeyedMutator } from "swr";

import MusicPlayerSkeleton from "@components/skeletons/music-player-skeleton.tsx";
import RetryAgainButton from "@components/buttons/retry-again-button/retry-again-button.tsx";

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
        && <RetryAgainButton text="Error! Retry again" onClickHandler={retryButtonHandler} />
      }
    </div>
  );
}

export default ResultPageLoadingScreen;
