import useZustandStore from "@zustand/zustandStore.ts";

import EmptyScreen from "@favorite-page/empty-screen/empty-screen.tsx";
import FavoriteList from "@favorite-page/favorite-list/favorite-list.tsx";

function FavoritePage() {
  const favoriteList = useZustandStore(state => Array.from(state.favoriteList.values()));

  return (
    <div>
      {!favoriteList.length
        ? <EmptyScreen />
        : <FavoriteList list={favoriteList} />
      }
    </div>
  );
}

export default FavoritePage;
