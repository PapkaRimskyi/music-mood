import { KeyedMutator } from "swr";

import Skeleton from "./skeleton/skeleton.tsx";
import ButtonConstructor from "@components/buttons/button-constructor/button-constructor.tsx";

import { ISearch, ISearchResponse } from "@src/api/interfaces.ts";

type Props = {
  isLoading: boolean,
  isError: boolean,
  audioData: ISearch[] | undefined,
  mutate: KeyedMutator<ISearchResponse[]>,
}

function LoadingScreen({ audioData, isLoading, isError, mutate }: Props) {
  const isInitRequestEndedWithError = !isLoading && isError && !audioData;

  const retryButtonHandler = () => mutate();

  return (
    <div className="relative">
      <Skeleton />
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

export default LoadingScreen;
