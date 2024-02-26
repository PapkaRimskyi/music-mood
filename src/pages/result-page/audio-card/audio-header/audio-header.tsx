import { memo } from "react";

import { ISearch } from "@src/api/interfaces.ts";

type Props = {
  artistName: ISearch["artist"]['name'],
} & Pick<ISearch, "title" | "link">;

const AudioHeader = memo(({ title, link, artistName }: Props) => {
  return (
    <div>
      <a
        className="block overflow-hidden text-ellipsis whitespace-nowrap swiper-no-swiping underline cursor-pointer hover:opacity-80 active:opacity-60"
        href={link}
        onClick={(e) => e.stopPropagation()}
        title={`${artistName} - ${title}`}
        target="_blank"
      >
        {artistName} - {title}
      </a>
    </div>
  );
})

export default AudioHeader;