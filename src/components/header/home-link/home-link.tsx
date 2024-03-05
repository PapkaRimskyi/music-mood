import { NavLink } from "react-router-dom";

import HomeIcon from "@src/icons/home-icon.tsx";

import { ROUTES } from "@src/const/routes.ts";

function HomeLink() {
  return (
    <div>
      <NavLink className="w-8 h-8 inline-block group" to={ROUTES.INDEX}>
        {({ isActive }) => (
          <HomeIcon className={`${isActive ? "fill-neonPink" : "fill-neonDarkerPurple"} group-hover:fill-neonPurple group-active:opacity-60`} />
        )}
      </NavLink>
    </div>
  );
}

export default HomeLink;
