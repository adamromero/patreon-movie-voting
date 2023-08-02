"use client";
import React, { useState, useContext } from "react";
import RequestMovies from "./RequestMovies";
import MovieList from "./MovieList";
import FilterMovieList from "./FilterMovieList";
import SearchMoviesList from "./SearchMoviesList";
import MovieCount from "./MovieCount";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFFile from "./PDFFile";
import { MovieContext } from "@/context/MovieContext";

const VotingApp = ({ user }) => {
   const [searchTitle, setSearchTitle] = useState("");
   const { filteredMoviesList } = useContext(MovieContext);

   return (
      <div>
         <div className="flex flex-col sm:flex-row gap-[10px]">
            {user && <RequestMovies currentUser={user && user.id} />}
            <SearchMoviesList
               searchTitle={searchTitle}
               setSearchTitle={setSearchTitle}
            />
            {user && user.creatorId === user.id && (
               <PDFDownloadLink
                  document={<PDFFile filteredMoviesList={filteredMoviesList} />}
                  fileName="MovieList"
               >
                  {({ loading }) =>
                     loading ? (
                        <button className="bg-black px-[10px] py-[5px] mb-[15px]">
                           Loading
                        </button>
                     ) : (
                        <button className="bg-black px-[10px] py-[5px] mb-[15px]">
                           Download PDF
                        </button>
                     )
                  }
               </PDFDownloadLink>
            )}
         </div>
         <MovieCount />
         <FilterMovieList />
         <MovieList
            currentUser={user && user.id}
            isCreator={user && user.creatorId === user.id}
            searchTitle={searchTitle}
         />
      </div>
   );
};

export default VotingApp;
