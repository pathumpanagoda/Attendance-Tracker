import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { FIREBASE_DB } from "../FirebaseConfig";
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';

const AttendanceHistory = ({ navigation }) => { // Accept navigation prop
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [startDate, setStartDate] = useState(startOfMonth);
  const [endDate, setEndDate] = useState(today);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // Fetch attendance records from Firebase
  const fetchAttendanceRecords = async () => {
    try {
      const querySnapshot = await getDocs(collection(FIREBASE_DB, "attendance"));
      const records = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAttendanceRecords(records);
      setFilteredRecords(records); // Initially set filtered records to all records
    } catch (error) {
      console.error("Error fetching attendance records:", error);
      Alert.alert("Error", "Failed to load attendance records.");
    } finally {
      setLoading(false);
    }
  };

  // Filter records by date range and search text
  const filterRecords = () => {
    const filtered = attendanceRecords.filter((item) => {
      const recordDate = new Date(item.date);
      return (
        recordDate >= startDate &&
        recordDate <= endDate &&
        item.customer.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setFilteredRecords(filtered);
  };

  // Handle search text change
  const handleSearchChange = (text) => {
    setSearchText(text);
    filterRecords(); // Re-filter records when search text changes
  };

  // Handle date range change
  const handleDateChange = (type, selectedDate) => {
    if (type === 'start') {
      setStartDate(selectedDate || startDate);
      fetchStats(selectedDate || startDate, endDate);
    } else if (type === 'end') {
      setEndDate(selectedDate || endDate);
      fetchStats(startDate, selectedDate || endDate);
    }
  };

  // Handle delete of a specific record
  const handleDelete = (id) => {
    Alert.alert(
      "Delete Record",
      "Are you sure you want to delete this record?",
      [
        {
          text: "No",
          onPress: () => console.log("Deletion canceled"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await deleteDoc(doc(FIREBASE_DB, "attendance", id));
              Alert.alert("Success", "Record deleted successfully.");
              fetchAttendanceRecords(); // Refresh the list after deletion
            } catch (error) {
              console.error("Error deleting record:", error);
              Alert.alert("Error", "Failed to delete record.");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  useEffect(() => {
    filterRecords(); // Re-filter records when the search text or date range changes
  }, [attendanceRecords, searchText, startDate, endDate]);

  const renderItem = ({ item }) => (
    <View style={styles.recordContainer}>
      <Text style={styles.recordText}>Customer: {item.customer}</Text>
      <Text style={styles.recordText}>Service: {item.service}</Text>
      <Text style={styles.recordText}>Amount: Rs. {item.amount}</Text>
      <Text style={styles.recordText}>Date: {new Date(item.date).toLocaleDateString()}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)} // Call handleDelete on button press
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.whiteContainer}>
        {/* Header with Back Button and Title */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()} // Navigate back
          >
            <FontAwesome name="arrow-left" size={24} color="#4B6CB7" />
          </TouchableOpacity>

          <Text style={styles.title}>Attendance History</Text>
        </View>

        {/* Date Filter and Search Bar */}
        <View style={styles.searchSortContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by Name"
            value={searchText}
            onChangeText={handleSearchChange}
          />
        </View>

        {/* Date Pickers */}
        <View style={styles.datePickerContainer}>
          <TouchableOpacity onPress={() => setShowStartPicker(true)}>
            <Text style={styles.dateText}>Start Date: {startDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showStartPicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowStartPicker(false);
                handleDateChange("start", selectedDate);
              }}
            />
          )}

          <TouchableOpacity onPress={() => setShowEndPicker(true)}>
            <Text style={styles.dateText}>End Date: {endDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showEndPicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowEndPicker(false);
                handleDateChange("end", selectedDate);
              }}
            />
          )}
        </View>
      </View>

      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={filteredRecords}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.emptyText}>No records found.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  whiteContainer: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 20,
    paddingTop: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    textAlign: "ledt",
  },
  recordContainer: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 15,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  recordText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: "#E63946",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  deleteButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  loadingText: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 20,
  },
  searchSortContainer: {
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    backgroundColor: "#FFF",
  },
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  dateText: {
    fontSize: 16,
    color: "#4B6CB7",
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default AttendanceHistory;
