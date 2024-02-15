import { LoaderFunctionArgs, redirect } from "react-router-dom";

import { ROUTES } from "./const/routes.ts";

const loadersCol = {
  [ROUTES.SEARCH_RESULT]: {
    loader: async ({ request }: LoaderFunctionArgs) => {
      const url = new URL(request.url);
      const searchParam = url.searchParams.get("q");
      if (!searchParam) {
        return redirect(ROUTES.MAIN);
      }
      return {};
    }
  }
}

export default loadersCol;
