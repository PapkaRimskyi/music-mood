import { useState } from "react";

import FavoriteItem from "@favorite-page/favorite-list/item/favorite-item.tsx";
import LoadMore from "@favorite-page/favorite-list/item/load-more/load-more.tsx";

import { ISearch } from "@src/api/interfaces.ts";
import { FAVORITE_ON_PAGE } from "@src/const/common.ts";

type Props = {
  list: ISearch[],
}

function FavoriteList({ list }: Props) {
  const [page, setPage] = useState(1);
  const [currentPlayingAudio, setCurrentPlayingAudio] = useState<number | null>(null);

  const maxPage = Math.ceil(list.length / FAVORITE_ON_PAGE);
  const maxElem = page * FAVORITE_ON_PAGE;

  return (
    <div className="space-y-10 pb-4">
      <ul className="space-y-4 divide-y-2 divide-neonPurple">
        {list.slice(0, maxElem).map((item) => (
          <FavoriteItem
            key={item.id}
            data={item}
            isPlaying={Number(item.id) === currentPlayingAudio}
            setCurrentPlayingAudio={setCurrentPlayingAudio}
          />
        ))}
      </ul>
      {page < maxPage && <LoadMore setPage={setPage} />}
    </div>
  );
}

export default FavoriteList;
