import useZustandStore from "@zustand/zustandStore.ts";

import FavoriteItem from "@favorite-page/favorite-list/favorite-item/favorite-item.tsx";

function FavoriteList() {
  const favoriteList = useZustandStore(state => Array.from(state.favoriteList.values()));

  return (
    <div>
      <ul className="space-y-4 divide-y-2 divide-neonPurple">
        {favoriteList.map((favorite) => (
          <FavoriteItem key={favorite.id} data={favorite} />
        ))}
      </ul>
    </div>
  );
}

export default FavoriteList;
