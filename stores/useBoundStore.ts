// stores/useBoundStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { createMovieDataSlice, MovieDataSlice } from "./slices/movieDataSlice";
import { createVotingSlice, VotingSlice } from "./slices/votingSlice";
import {
   createRequestMetaSlice,
   RequestMetaSlice,
} from "./slices/requestMetaSlice";

export type StoreState = MovieDataSlice & VotingSlice & RequestMetaSlice;

export const useBoundStore = create<StoreState>()(
   devtools((...a) => ({
      ...createMovieDataSlice(...a),
      ...createVotingSlice(...a),
      ...createRequestMetaSlice(...a),
   }))
);
