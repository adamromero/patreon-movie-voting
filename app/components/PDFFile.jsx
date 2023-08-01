import React, { useEffect, useContext } from "react";
import { MovieContext } from "@/context/MovieContext";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
   page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
   },
   section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
   },
});

const PDFFile = () => {
   return (
      <Document>
         <Page size="A4" style={styles.page}>
            <View style={styles.section}>
               hello!
               {/* {moviesList.map((movie) => (
                  <Text key={movie._id}>
                     {movie.data.Title} - {movie.data.imdbRating} -{" "}
                     {movie.voters.length} -{" "}
                     {movie.isWatched ? "Watched" : "Unwatched"}
                  </Text>
               ))} */}
            </View>
         </Page>
      </Document>
   );
};

export default PDFFile;
