import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator, // Import ActivityIndicator to show a loading spinner
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../FirebaseConfig"; // Your Firebase config file

const UpdateAttendance = ({ route, navigation }) => {
  const { recordId } = route.params;

  const [attendanceRecord, setAttendanceRecord] = useState({
    customer: "",
    service: "",
    amount: "",
    status: "",
  });
  const [loading, setLoading] = useState(false); // Track loading state

  // Fetch the record details from Firebase
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const recordRef = doc(FIREBASE_DB, "attendance", recordId);
        const recordSnap = await getDoc(recordRef);

        if (recordSnap.exists()) {
          setAttendanceRecord(recordSnap.data());
        } else {
          Alert.alert("Error", "Record not found.");
        }
      } catch (error) {
        console.error("Error fetching record:", error);
        Alert.alert("Error", "Failed to load record.");
      }
    };

    fetchRecord();
  }, [recordId]);

  // Handle changes to input fields
  const handleInputChange = (field, value) => {
    setAttendanceRecord({ ...attendanceRecord, [field]: value });
  };

  // Handle update
  const handleUpdate = async () => {
    setLoading(true); // Set loading to true while saving

    try {
      const recordRef = doc(FIREBASE_DB, "attendance", recordId);
      await updateDoc(recordRef, attendanceRecord);
      Alert.alert("Success", "Record updated successfully.");
      navigation.goBack(); // Navigate back to the history page
    } catch (error) {
      console.error("Error updating record:", error);
      Alert.alert("Error", "Failed to update record.");
    } finally {
      setLoading(false); // Set loading to false once saving is done
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#4B6CB7" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Attendance Record</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Customer"
        value={attendanceRecord.customer}
        onChangeText={(text) => handleInputChange("customer", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Service"
        value={attendanceRecord.service}
        onChangeText={(text) => handleInputChange("service", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={String(attendanceRecord.amount)}
        onChangeText={(text) => handleInputChange("amount", text)}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]} // Apply disabled style when loading
        onPress={handleUpdate}
        disabled={loading} // Disable the button while loading
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" /> // Show loading indicator when saving
        ) : (
          <Text style={styles.buttonText}>Save Changes</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#F8F8F8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#4B6CB7",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonDisabled: {
    backgroundColor: "#B0C4DE", // Change button color when disabled
  },
});

export default UpdateAttendance;
