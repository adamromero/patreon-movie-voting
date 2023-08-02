import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
   page: {
      padding: 20,
   },
   itemContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
      fontSize: 12,
   },
});

const PDFFile = ({ filteredMoviesList }) => {
   return (
      <Document>
         <Page size="A4">
            <View style={styles.page}>
               {/* {filteredMoviesList.map((movie) => (
                  <View key={movie._id} style={styles.itemContainer}>
                     <Text
                        style={{
                           textDecoration: movie.isWatched
                              ? "line-through"
                              : "none",
                        }}
                     >
                        {movie.data.Title} ({movie.data.Year})
                     </Text>
                  </View>
               ))} */}
            </View>
         </Page>
      </Document>
   );
};

export default PDFFile;
