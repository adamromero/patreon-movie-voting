import React from "react";
import VotingApp from "./VotingApp";

const RetrieveMovieList = async ({ user }) => {
   const response = await fetch(`${process.env.API_URL}/api/movies`);
   const movies = await response.json();

   return <VotingApp user={user} movies={movies} />;
};

export default RetrieveMovieList;
