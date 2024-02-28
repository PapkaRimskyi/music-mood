import { memo } from "react";

import useZustandStore from "@zustand/zustandStore.ts";

import FavoriteButton from "@components/buttons/favorite-button/favorite-button.tsx";

import { ISearch } from "@src/api/interfaces.ts";

type Props = {
  currentAudio: ISearch,
};

const AudioHeader = memo(({ currentAudio }: Props) => {
  const favoriteList = useZustandStore(state => state.favoriteList);
  const addToFavoriteList = useZustandStore(state => state.addToFavoriteList);
  const removeFromFavoriteList = useZustandStore(state => state.removeFromFavoriteList);

  const isFavorite = favoriteList.has(Number(currentAudio.id));

  const { artist, title, link } = currentAudio;

  const favoriteButtonHandler = () => {
    if (!isFavorite) {
      addToFavoriteList(currentAudio);
    } else {
      removeFromFavoriteList(Number(currentAudio.id));
    }
  }

  return (
    <div className="flex justify-between">
      <div className="w-10/12">
        <a
          className="block overflow-hidden text-ellipsis whitespace-nowrap swiper-no-swiping underline cursor-pointer hover:opacity-80 active:opacity-60"
          href={link}
          title={`${artist.name} - ${title}`}
          target="_blank"
        >
          {artist.name} - {title}
        </a>
      </div>
      <div>
        <FavoriteButton
          isActive={isFavorite}
          onClickHandler={favoriteButtonHandler}
        />
      </div>
    </div>
  );
})

export default AudioHeader;
