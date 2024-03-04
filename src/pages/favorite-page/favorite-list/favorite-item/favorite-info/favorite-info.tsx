import { memo } from "react";

import { ISearch } from "@src/api/interfaces.ts";

type Props = {
  data: ISearch,
};

const FavoriteInfo = memo(({ data: { title, artist, album, link, rank } }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <div className="flex items-start space-x-2">
          <img width="40px" height="40px" src="public/images/music.svg" alt="Audio icon" />
          <a className="text-base md:text-xl underline decoration-dashed hover:opacity-80 active:opacity-60" href={link} target="_blank" title={title}>{title}</a>
        </div>

      </div>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="max-w-72 md:max-w-none md:w-4/12 lg:w-3/12 xl:w-2/12 flex-shrink-0">
          <picture>
            <source width={300} srcSet={artist.picture_xl} media="(min-width: 1280px)" />
            <img width={288} className="w-full rounded-xl" src={artist.picture_big} alt="Artist image" loading="lazy" />
          </picture>
        </div>

        <div className="space-y-4 md:space-y-2 md:max-w-xs">
          <div className="flex items-start space-x-2">
            <img width="24px" height="24px" src="public/images/artist.svg" alt="Artist icon" />
            <a className="underline decoration-dashed hover:opacity-80 active:opacity-60 whitespace-nowrap text-ellipsis overflow-hidden" href={artist.link} target="_blank" title={artist.name}>{artist.name}</a>
          </div>

          <div className="flex items-start space-x-2">
            <img width="24px" height="24px" src="public/images/album.svg" alt="Album icon" />
            <p title={album.title}>{album.title}</p>
          </div>

          <div className="flex flex-shrink-0 items-center space-x-2">
            <img width="24px" height="24px" src="public/images/rating.svg" alt="Rank icon" />
            <span title="Rank of the song">{rank}</span>
          </div>
        </div>

      </div>
    </div>
  );
});

export default FavoriteInfo;
