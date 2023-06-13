import React from "react";
import { Document, Page, StyleSheet, Text, View, Image } from "@react-pdf/renderer";

import logo from "../../appfire logo.png";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#000",
    textTransform: "uppercase",
    letterSpacing: 2,
    fontWeight: "bold",
  },
  logo: {
    width: 100,
    marginBottom: 10,
    alignSelf: "center",
  },
  tableContainer: {
    marginTop: 10,
    border: "1 solid #000",
    borderRadius: 4,
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 30,
  },
  tableHeader: {
    backgroundColor: "#000",
    color: "#FFF",
    fontWeight: "bold",
    flex: 1,
    padding: 5,
    fontSize: 12,
    textTransform: "uppercase",
  },
  tableCell: {
    flex: 1,
    padding: 5,
    fontSize: 10,
    fontWeight: "bold",
    color: "#000",
  },
 
  color3: {
    backgroundColor: "#FFF",
  },
});

const TaskHistoryPDF = ({ taskHistory }) => (
  <Document>
    <Page style={styles.page}>
      <Image src={logo} style={styles.logo} />
      <Text style={styles.title}>Task History</Text>
      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Title</Text>
          <Text style={styles.tableHeader}>Description</Text>
          <Text style={styles.tableHeader}>Date & Time</Text>
        </View>
        {taskHistory.map((item, index) => (
          <View
            style={[
              styles.tableRow,
              styles.color3
            ]}
            key={item.id}
          >
            <Text style={styles.tableCell}>{item.title}</Text>
            <Text style={styles.tableCell}>{item.description}</Text>
            <Text style={styles.tableCell}>{item.currentDate}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default TaskHistoryPDF;
