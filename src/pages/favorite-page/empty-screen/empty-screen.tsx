import { Link } from "react-router-dom";

import { ROUTES } from "@src/const/routes.ts";

function EmptyScreen() {
  return (
    <div>
      <figure className="flex flex-col items-center">
        <div className="max-w-64">
          <img src="public/images/empty-favorite.png" alt="Empty favorite img illustration" />
        </div>
        <figcaption className="mt-4 text-center">
          <p>Favorite list is empty, <Link to={ROUTES.INDEX} className="underline hover:opacity-80 active:opacity-60">go back</Link></p>
        </figcaption>
      </figure>
    </div>
  );
}

export default EmptyScreen;
