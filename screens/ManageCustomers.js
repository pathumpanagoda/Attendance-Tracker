import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ManageCustomers = () => {
  const navigation = useNavigation();

  const [customers, setCustomers] = useState([
    // Example customers data
    { id: '1', name: 'John Doe', age: '28', mobile: '123-456-7890', profileImage: null },
    { id: '2', name: 'Jane Smith', age: '34', mobile: '987-654-3210', profileImage: null },
    // Add more example customers as needed
  ]);
  const [searchText, setSearchText] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  useEffect(() => {
    // Filter customers based on search text
    const filtered = customers.filter((customer) =>
      customer.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [searchText, customers]);



  const handleSort = () => {
    const sortedCustomers = [...filteredCustomers].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setFilteredCustomers(sortedCustomers);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <View style={styles.container}>
      {/* White Container */}
      <View style={styles.whiteContainer}>
        {/* Header with Back Button and Title */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome name="arrow-left" size={24} color="#4B6CB7" /> 
          </TouchableOpacity>

          <Text style={styles.title}>Customers</Text>

          <Text style={styles.totalCustomers}>
            ({filteredCustomers.length})
          </Text>
        </View>

        {/* Search Bar */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Name"
          value={searchText}
          onChangeText={setSearchText}
        />

        {/* Sort Button */}
        <TouchableOpacity style={styles.sortButton} onPress={handleSort}>
          <Text style={styles.sortButtonText}>
            Sort by Name ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
          </Text>
        </TouchableOpacity>
        </View>
        {/* Customers List */}
        <FlatList
          data={filteredCustomers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.customerCard}
              onPress={() => navigation.navigate('CustomerDetails', { id: item.id })}
            >
              <View style={styles.customerInfo}>
                <View style={styles.imageContainer}>
                  {item.profileImage ? (
                    <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
                  ) : (
                    <FontAwesome name="user-circle" size={40} color="#888" />
                  )}
                </View>
                <View style={styles.textInfo}>
                  <Text style={styles.customerName}>{item.name}</Text>
                  <Text style={styles.customerDetails}>{item.age} years old</Text>
                  <Text style={styles.customerDetails}>{item.mobile}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: '#F8F8F8',
  },
  whiteContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    paddingTop: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#555',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  totalCustomers: {
    fontSize: 16,
    color: '#888',
  },
  searchInput: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  sortButton: {
    backgroundColor: '#4B6CB7',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  sortButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  customerCard: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#DDD',
    marginHorizontal: 5,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 15,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  customerDetails: {
    color: '#555',
  },
});

export default ManageCustomers;
