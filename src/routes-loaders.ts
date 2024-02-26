import { LoaderFunctionArgs, redirect } from "react-router-dom";

import { ROUTES } from "./const/routes.ts";

const routerLoaders = {
  [ROUTES.RESULT]: {
    loader: async ({ request }: LoaderFunctionArgs) => {
      const url = new URL(request.url);
      const searchParam = url.searchParams.get("q");

      if (!searchParam) {
        return redirect(ROUTES.INDEX);
      }

      return {};
    }
  }
}

export default routerLoaders;
