import useSearch from "@src/api/swr-api/useSearch/useSearch.ts";

import LoadingIcon from "@src/icons/loading-icon.tsx";

function LoadMore() {
  const { setSize, isValidating, isError } = useSearch();

  const buttonText = isValidating ? <LoadingIcon /> : isError ? 'Error! Try again' : 'Load more';

  const loadMoreClickHandler = () => {
    if (!isValidating) {
      setSize((num) => num + 1);
    }
  }

  return (
    <li className="border-b-2 hover:bg-neonPurple active:opacity-30 bg-neonDarkerPurple border-b-neonDarkerPurple cursor-pointer">
      <button
        className="p-2 w-full min-h-[54px] flex justify-center text-center"
        title="Load next 25 audio"
        disabled={isValidating}
        onClick={loadMoreClickHandler}
      >
        {buttonText}
      </button>
    </li>
  );
}

export default LoadMore;
