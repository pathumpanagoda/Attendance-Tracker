import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const CustomerDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params; // Get the customer ID passed from ManageCustomers

  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    // Fetch customer details based on the ID (this is just an example, you would replace it with actual data fetching)
    const fetchedCustomer = {
      id: '1',
      name: 'John Doe',
      age: '28',
      gender: 'Male',
      mobile: '123-456-7890',
      profileImage: null,
      email: 'johndoe@example.com',
      address: '1234 Main St, Springfield, IL',
      joiningDate: '2023-05-15',
    };

    if (id === '1') {
      setCustomer(fetchedCustomer);
    } else if (id === '2') {
      setCustomer({ ...fetchedCustomer, id: '2', name: 'Jane Smith', gender: 'Female' }); // Example for another customer
    }
    // Add logic to handle real API request based on ID
  }, [id]);

  const handleDelete = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this customer?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Perform delete operation (API integration needed)
            console.log(`Customer with ID ${id} deleted.`);
            navigation.goBack(); // Navigate back after deletion
          },
        },
      ]
    );
  };

  if (!customer) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="arrow-left" size={24} color="#4B6CB7" />
        </TouchableOpacity>
        <Text style={styles.title}>Customer Details</Text>
      </View>

      {/* Customer Profile Information */}
      <View style={styles.profileSection}>
        <View style={styles.imageContainer}>
          {customer.profileImage ? (
            <Image source={{ uri: customer.profileImage }} style={styles.profileImage} />
          ) : (
            <FontAwesome name="user-circle" size={100} color="#888" />
          )}
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{customer.name}</Text>
          <Text style={styles.details}>Age: {customer.age}</Text>
          <Text style={styles.details}>Gender: {customer.gender}</Text>
          <Text style={styles.details}>Mobile: {customer.mobile}</Text>
          <Text style={styles.details}>Email: {customer.email}</Text>
          <Text style={styles.details}>Address: {customer.address}</Text>
          <Text style={styles.details}>Joining Date: {customer.joiningDate}</Text>
        </View>
      </View>

      {/* Edit Button */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditCustomerDetails', { id: customer.id })}
      >
        <Text style={styles.editButtonText}>Edit Customer</Text>
      </TouchableOpacity>

      {/* Delete Button */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
      >
        <Text style={styles.deleteButtonText}>Delete Customer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileSection: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  editButton: {
    backgroundColor: '#4B6CB7',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#D9534F',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CustomerDetails;
