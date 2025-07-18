import React from "react";

const TestPage = async () => {
   const movieResponse = await fetch(`${process.env.API_URL}/api/movies`);
   const movieRequests = await movieResponse.json();

   return (
      <div>
         {movieRequests.map((request, index) => (
            <div key={request._id}>
               {index + 1}: {request.data.Title}
            </div>
         ))}
      </div>
   );
};

export default TestPage;
