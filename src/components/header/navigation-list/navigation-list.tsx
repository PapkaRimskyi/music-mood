import Item from "@components/header/navigation-list/item/item.tsx";
import ApiIcon from "@src/icons/api-icon.tsx";

import data from './data.ts';

function NavigationList() {
  return (
    <ul className="flex space-x-4">
      {data.map((item) => <Item key={item.href} item={item} />)}
      <li>
        <a className="w-8 h-8 inline-block transition-transform hover:rotate-12 group" href="https://rapidapi.com/deezerdevs/api/deezer-1" target="_blank">
          <ApiIcon className="fill-neonDarkerPurple group-hover:fill-neonPurple group-active:opacity-60 transition-all" />
        </a>
      </li>
    </ul>
  );
}

export default NavigationList;
