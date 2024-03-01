import { memo } from "react";

import { ISearch } from "@src/api/interfaces.ts";

type Props = {
  data: ISearch,
};

const FavoriteInfo = memo(({ data: { title, artist, album, link, rank } }: Props) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-3">
        <img width="36px" height="36px" src="public/images/music.svg" alt="Audio icon" />
        <a className="text-xl underline decoration-dashed hover:opacity-80 active:opacity-60" href={link} target="_blank">{title}</a>
        <span style={{ fontFamily: "Arial" }}>&#8226;</span>
        <p className="flex items-center space-x-2">
          <img width="36px" height="36px" src="public/images/rating.svg" title="Song rank" alt="rank icon" />
          <span>{rank}</span>
        </p>
      </div>
      <div className="flex space-x-2">
        <div className="w-12">
          <img className="w-full rounded-xl" src={artist.picture_small} alt="Artist image" loading="lazy" />
        </div>
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <img width="24px" height="24px" src="public/images/artist.svg" alt="artist icon" />
            <a className="underline decoration-dashed hover:opacity-80 active:opacity-60" href={artist.link} target="_blank">{artist.name}</a>
          </div>
          <div className="flex items-start space-x-2">
            <img width="24px" height="24px" src="public/images/album.svg" alt="Album icon" />
            <p>{album.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default FavoriteInfo;
