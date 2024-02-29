import FavoriteAudioLine
  from "@favorite-page/favorite-list/favorite-item/favorite-audio-line/favorite-audio-line.tsx";
import FavoriteInfo from "@favorite-page/favorite-list/favorite-item/favorite-info/favorite-info.tsx";

import { ISearch } from "@src/api/interfaces.ts";

type Props = {
  data: ISearch,
}

function FavoriteItem({ data }: Props) {
  return (
    <li className="flex pt-4">
      <div className="flex flex-wrap flex-1 space-y-2">
        <FavoriteInfo data={data} />
        <FavoriteAudioLine />
      </div>
    </li>
  );
}

export default FavoriteItem;
