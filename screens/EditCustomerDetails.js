import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import * as Yup from 'yup';

const EditCustomerDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params; // Get the customer ID passed from CustomerDetails

  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    // Fetch customer details based on the ID (replace with real API call)
    const fetchedCustomer = {
      id: '1',
      name: 'John Doe',
      age: '28',
      gender: 'Male',
      mobile: '123-456-7890',
      email: 'johndoe@example.com',
      address: '1234 Main St, Springfield, IL',
      joiningDate: '2022-01-15',
    };

    if (id === '1') {
      setCustomer(fetchedCustomer);
    }
    // Add logic to handle real API requests
  }, [id]);

  const handleUpdate = (values) => {
    // Replace with your update logic (API call, etc.)
    Alert.alert('Success', 'Customer details updated successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  if (!customer) {
    return <Text>Loading...</Text>;
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    age: Yup.number().required('Age is required').positive().integer(),
    gender: Yup.string().required('Gender is required'),
    mobile: Yup.string().required('Mobile number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    address: Yup.string().required('Address is required'),
    joiningDate: Yup.string().required('Joining date is required'),
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color="#4B6CB7" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Customer</Text>
      </View>

      <Formik
        initialValues={customer}
        validationSchema={validationSchema}
        onSubmit={(values) => handleUpdate(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.formContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              placeholder="Enter customer name"
            />
            {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={handleChange('age')}
              onBlur={handleBlur('age')}
              value={values.age}
              placeholder="Enter customer age"
            />
            {touched.age && errors.age && <Text style={styles.error}>{errors.age}</Text>}

            <Text style={styles.label}>Gender</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={values.gender}
                onValueChange={handleChange('gender')}
              >
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>
            {touched.gender && errors.gender && <Text style={styles.error}>{errors.gender}</Text>}

            <Text style={styles.label}>Mobile</Text>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              onChangeText={handleChange('mobile')}
              onBlur={handleBlur('mobile')}
              value={values.mobile}
              placeholder="Enter mobile number"
            />
            {touched.mobile && errors.mobile && <Text style={styles.error}>{errors.mobile}</Text>}

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="Enter email address"
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              value={values.address}
              placeholder="Enter address"
            />
            {touched.address && errors.address && <Text style={styles.error}>{errors.address}</Text>}

            <Text style={styles.label}>Joining Date</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('joiningDate')}
              onBlur={handleBlur('joiningDate')}
              value={values.joiningDate}
              placeholder="YYYY-MM-DD"
            />
            {touched.joiningDate && errors.joiningDate && <Text style={styles.error}>{errors.joiningDate}</Text>}

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Update Customer</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
  formContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#4B6CB7',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EditCustomerDetails;