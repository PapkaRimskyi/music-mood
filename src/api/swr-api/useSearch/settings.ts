import concatSongDataIntoOneArrMiddleware from "@src/api/swr-api/useSearch/middleware.ts";

const swrOptions = { revalidateOnFocus: false, revalidateFirstPage: false, use: [concatSongDataIntoOneArrMiddleware] };

export default swrOptions;
