# Zustand Store Documentation

This directory contains the Zustand store implementation that replaces the React Context API for state management.

## Structure

### `useBoundStore.ts`

The main store that combines all slices using Zustand's `create` function with devtools middleware.

### `slices/`

Contains individual slices that manage specific parts of the application state:

#### `movieDataSlice.ts`

Manages movie-related data and operations:

-  `moviesList`: Array of all movies
-  `moviesMap`: Record of movies indexed by `${id}-${type}`
-  `moviesByDateMap`: Movies filtered by date for current user
-  `rankedMovies`: Ranking of movies based on votes
-  `filteredMoviesList`: Filtered movies for display
-  `searchTitle`, `searchDirector`, `searchActor`, `searchComposer`: Search fields
-  `filterOptions`: Filter configuration
-  `fetchMovies()`: Fetch all movies from API
-  `addRequestToList()`: Add a new movie request
-  `removeRequestFromList()`: Remove a movie request
-  `processUserRequestsByDate()`: Process user requests for current month
-  Search and filter setters

#### `votingSlice.ts`

Manages voting functionality:

-  `addVoteToRequest()`: Add a vote to a movie request
-  `removeVoteFromRequest()`: Remove a vote from a movie request

#### `requestMetaSlice.ts`

Manages request metadata and status:

-  `isUserUnderRequestLimit`: Whether user is under request limit
-  `requestsRemaining`: Number of requests remaining
-  `requestsThisMonth`: Requests made this month
-  `requestWatchStatus`: Watch status for movies
-  `requestHolidayStatus`: Holiday status for movies
-  `onChannelRequestLinks`: Links for channel requests
-  `disableButton`: Whether to disable buttons
-  `isRankingOn`: Whether ranking is enabled
-  `updateRequestLimits()`: Update request limits for user
-  `setWatchStatus()`: Set watch status for a movie
-  `setHolidayStatus()`: Set holiday status for a movie
-  `setReactionLink()`: Set reaction links for a movie
-  `toggleRanking()`: Toggle ranking mode
-  `setDisableButton()`: Set button disabled state

## Usage

### Basic Usage

```typescript
import { useBoundStore } from "@/stores/useBoundStore";

// In a component
const { moviesList, fetchMovies, addVoteToRequest } = useBoundStore();

// Fetch movies on component mount
useEffect(() => {
   fetchMovies();
}, [fetchMovies]);

// Add a vote
const handleVote = (movieId: string, voters: string[], currentUser: string) => {
   addVoteToRequest(movieId, voters, currentUser);
};
```

### Accessing State

```typescript
// Get specific state
const moviesList = useBoundStore((state) => state.moviesList);
const isUserUnderRequestLimit = useBoundStore(
   (state) => state.isUserUnderRequestLimit
);

// Get multiple state values
const { moviesList, moviesMap, rankedMovies } = useBoundStore();
```

### Actions

```typescript
// All actions are available directly from the store
const {
   fetchMovies,
   addRequestToList,
   removeRequestFromList,
   addVoteToRequest,
   removeVoteFromRequest,
   setWatchStatus,
   setHolidayStatus,
   setReactionLink,
   toggleRanking,
   processUserRequestsByDate,
} = useBoundStore();
```

## Migration from Context

The Zustand store replaces the `MovieContext` with the following benefits:

-  Better performance (no unnecessary re-renders)
-  Simpler API (no need for Context.Provider)
-  Better TypeScript support
-  Easier testing
-  More modular structure with slices

### Key Changes:

1. Replace `useContext(MovieContext)` with `useBoundStore()`
2. Remove `MovieProvider` wrapper
3. Use direct state access instead of context values
4. Actions are now methods on the store instead of context functions

## Types

All types are defined in `app/types/`:

-  `Movie`: Movie interface
-  `APIMovieData`: API movie data interface
-  `StoreState`: Combined store state interface

## Error Handling

All async operations include proper error handling and logging. Check the browser console for error messages if operations fail.
