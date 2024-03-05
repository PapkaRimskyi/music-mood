import { NavLink } from "react-router-dom";

import data from "@components/header/navigation-list/data.ts";

type Props = {
  item: typeof data[0],
}

function Item({ item }: Props) {
  return (
    <li>
      <NavLink className="w-8 h-8 inline-block group" to={item.href}>
        {({ isActive }) => (
          <item.icon className={`${isActive ? 'fill-neonPink' : 'fill-neonDarkerPurple'} group-hover:fill-neonPurple group-active:opacity-60 `} />
        )}
      </NavLink>
    </li>
  );
}

export default Item;
