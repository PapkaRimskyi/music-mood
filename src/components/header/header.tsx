import { Link } from "react-router-dom";

import ApiLink from "./api-link/api-link.tsx";

import { ROUTES } from "@src/const/routes.ts";

function Header() {
  return (
    <header className="mb-6 pt-6 w-100 flex justify-between items-center">
      <div className="w-20">
        <ApiLink />
      </div>
      <div>
        <nav>
          <ul>
            <li>
              <Link to={ROUTES.FAVORITES}>Favorites</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
