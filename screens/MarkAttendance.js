import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome } from "@expo/vector-icons";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from "../FirebaseConfig";

const MarkAttendance = ({ navigation }) => {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [amount, setAmount] = useState("");
  const [customers, setCustomers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track submission status
  const services = [
    "Hair Cut",
    "Hair Cut with Beard Shaving",
    "Hair Coloring",
    "Facial Treatment",
    "Hair Spa",
  ];

  // Fetch customers from Firebase Firestore
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIREBASE_DB, "customers"));
        const customerList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCustomers(customerList);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleSubmit = async () => {
    if (!selectedCustomer || !selectedService || !amount) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    const attendanceData = {
      customer: selectedCustomer,
      service: selectedService,
      amount: parseFloat(amount),
      date: new Date().toISOString(),
    };

    setIsSubmitting(true); // Set loading state to true before submission

    try {
      await addDoc(collection(FIREBASE_DB, "attendance"), attendanceData);
      Alert.alert("Success", "Attendance marked successfully!");

      // Navigate to Attendance History page (assuming it's set up in navigation)
      navigation.navigate("AttendanceHistory");

      // Reset form
      setSelectedCustomer("");
      setSelectedService("");
      setAmount("");
    } catch (error) {
      console.error("Error saving attendance:", error);
      Alert.alert("Error", "Failed to save attendance. Please try again.");
    } finally {
      setIsSubmitting(false); // Set loading state to false after submission (successful or failed)
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FontAwesome name="arrow-left" size={24} color="#4B6CB7" />
        <Text style={styles.backButtonText}>Mark Attendance</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Select Customer</Text>
      <Picker
        selectedValue={selectedCustomer}
        onValueChange={(itemValue) => setSelectedCustomer(itemValue)}
        style={styles.inputCommon} // Use the shared style
      >
        <Picker.Item label="Select Customer" value="" />
        {customers.map((customer) => (
          <Picker.Item
            key={customer.id}
            label={customer.customerName}
            value={customer.customerName}
          />
        ))}
      </Picker>

      <Text style={styles.label}>Select Service Type</Text>
      <Picker
        selectedValue={selectedService}
        onValueChange={(itemValue) => setSelectedService(itemValue)}
        style={styles.inputCommon} // Use the shared style
      >
        <Picker.Item label="Select Service" value="" />
        {services.map((service, index) => (
          <Picker.Item key={index} label={service} value={service} />
        ))}
      </Picker>

      <Text style={styles.label}>Enter Amount</Text>
      <TextInput
        style={styles.inputCommon} // Use the shared style
        placeholder="Enter Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity
        style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]} // Disable button during submission
        onPress={handleSubmit}
        disabled={isSubmitting} // Disable button while submitting
      >
        <Text style={styles.submitButtonText}>
          {isSubmitting ? "Submitting..." : "Submit"} {/* Show different text while submitting */}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F8F8F8",
    paddingTop: 50,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  backButtonText: {
    fontSize: 24,
    color: "black",
    marginLeft: "20%",
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  inputCommon: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderColor: "#DDD",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    height: 50, // Ensures a consistent height for both Picker and TextInput
    justifyContent: "center", // Center the text for Picker
  },
  submitButton: {
    backgroundColor: "#4B6CB7",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#B0C4DE", // Lighter color when disabled
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MarkAttendance;
