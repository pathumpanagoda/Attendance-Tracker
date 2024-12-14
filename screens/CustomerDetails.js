import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { collection, getDocs, doc, deleteDoc} from 'firebase/firestore';
import { FIREBASE_DB } from '../FirebaseConfig'; // Firebase config file

const CustomerDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params; // Get the customer ID passed from ManageCustomers

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIREBASE_DB, 'customers'));
        const customers = [];
        querySnapshot.forEach((doc) => {
          if (doc.id === id) {
            customers.push({ id: doc.id, ...doc.data() });
          }
        });
        if (customers.length > 0) {
          setCustomer(customers[0]);
        } else {
          Alert.alert('Error', 'Customer not found');
        }
      } catch (error) {
        console.error('Error fetching customer details: ', error);
        Alert.alert('Error', 'Failed to fetch customer details');
      } finally {
        setLoading(false); // Set loading to false after the data is fetched
      }
    };
  
    fetchCustomerDetails();
  }, [id]);

  const handleDelete = async () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this customer?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(FIREBASE_DB, 'customers', id));
              console.log(`Customer with ID ${id} deleted.`);
              navigation.goBack(); // Navigate back after deletion
            } catch (error) {
              console.error('Error deleting customer: ', error);
              Alert.alert('Error', 'Failed to delete customer');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    // Show loading spinner while data is being fetched
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4B6CB7" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!customer) {
    return <Text style={styles.errorText}>Customer not found</Text>;
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
            <FontAwesome name="user-circle" size={100} color="#9EBCD4" />
          )}
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>Name: {customer.customerName}</Text>
          <Text style={styles.details}>Age: {customer.age}</Text>
          <Text style={styles.details}>Gender: {customer.gender}</Text>
          <Text style={styles.details}>Mobile: {customer.mobile}</Text>
          <Text style={styles.details}>Email: {customer.email}</Text>
          <Text style={styles.details}>Address: {customer.address}</Text>
          <Text style={styles.details}>Joining Date: {new Date(customer.joiningDate).toLocaleDateString()}</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#555',
  },
  errorText: {
    fontSize: 18,
    color: '#D9534F',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CustomerDetails;
