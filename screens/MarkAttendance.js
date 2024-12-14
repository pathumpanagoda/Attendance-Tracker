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
import { collection, addDoc, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from "../FirebaseConfig";

const MarkAttendance = ({ navigation }) => {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [amount, setAmount] = useState("");
  const [customers, setCustomers] = useState([]);
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
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mark Attendance</Text>

      <Text style={styles.label}>Select Customer</Text>
      <Picker
        selectedValue={selectedCustomer}
        onValueChange={(itemValue) => setSelectedCustomer(itemValue)}
        style={styles.picker}
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
        style={styles.picker}
      >
        <Picker.Item label="Select Service" value="" />
        {services.map((service, index) => (
          <Picker.Item key={index} label={service} value={service} />
        ))}
      </Picker>

      <Text style={styles.label}>Enter Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F8F8F8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  picker: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderColor: "#DDD",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderColor: "#DDD",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#4B6CB7",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MarkAttendance;
