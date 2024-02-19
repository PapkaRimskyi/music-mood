import { memo } from "react";

import { ISearch } from "../../../../api/interfaces.ts";

type Props = {
  artistName: ISearch["artist"]['name'],
} & Pick<ISearch, "title" | "link">;

const Header = memo(({ title, link, artistName }: Props) => {
  return (
    <div>
      <a
        className="block overflow-hidden text-ellipsis whitespace-nowrap swiper-no-swiping underline cursor-pointer"
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

export default Header;
