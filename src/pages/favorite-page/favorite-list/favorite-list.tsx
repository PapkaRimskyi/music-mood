import { useState } from "react";

import useZustandStore from "@zustand/zustandStore.ts";

import FavoriteItem from "@favorite-page/favorite-list/favorite-item/favorite-item.tsx";
import FavoriteLoadMore from "@favorite-page/favorite-list/favorite-item/favorite-load-more/favorite-load-more.tsx";

import { FAVORITE_ON_PAGE } from "@src/const/common.ts";

function FavoriteList() {
  const [page, setPage] = useState(1);
  const [currentPlayingAudio, setCurrentPlayingAudio] = useState<number | null>(null);

  const favoriteList = useZustandStore(state => Array.from(state.favoriteList.values()));

  const maxPage = Math.ceil(favoriteList.length / FAVORITE_ON_PAGE);
  const maxElem = page * FAVORITE_ON_PAGE;

  return (
    <div className="space-y-10 pb-4">
      <ul className="space-y-4 divide-y-2 divide-neonPurple">
        {favoriteList.slice(0, maxElem).map((favorite) => (
          <FavoriteItem
            key={favorite.id}
            data={favorite}
            isPlaying={Number(favorite.id) === currentPlayingAudio}
            setCurrentPlayingAudio={setCurrentPlayingAudio}
          />
        ))}
      </ul>
      {page < maxPage && <FavoriteLoadMore setPage={setPage} />}
    </div>
  );
}

export default FavoriteList;
