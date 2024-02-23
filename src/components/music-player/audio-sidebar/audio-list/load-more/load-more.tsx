import useSearch from "@src/api/swr-api/useSearch/useSearch.ts";

function LoadMore() {
  const { setSize, size, isValidating } = useSearch();

  const loadMoreClickHandler = () => {
    if (!isValidating) {
      setSize((num) => num + 1);
    }
  }

  return (
    <li className="border-b-2 hover:bg-neonPurple active:opacity-30 bg-neonDarkerPurple border-b-neonDarkerPurple cursor-pointer">
      <button
        className="p-2 w-full text-center"
        title="Load next 20 audio"
        disabled={isValidating}
        onClick={loadMoreClickHandler}
      >
        {isValidating ? 'Loading...' : 'Load more'}
      </button>
    </li>
  );
}

export default LoadMore;
