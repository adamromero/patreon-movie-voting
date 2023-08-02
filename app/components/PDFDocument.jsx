import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const PDFDocument = ({ filteredMoviesList }) => {
   return filteredMoviesList.map((movie) => (
      <View key={movie._id} style={styles.section}>
         <Text>{movie.data.Title}</Text>
         <Text>{movie.data.imdbRating}</Text>
         <Text>{movie.voters.length}</Text>
         <Text>{movie.isWatched ? "Watched" : "Unwatched"}</Text>
      </View>
   ));
};

export default PDFDocument;
