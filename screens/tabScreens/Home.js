import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import HandImg from "../../assets/hand.png"


const HomeScreen = () => {

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Danu Salon</Text>
        <Text style={styles.subtitle}>Welcome back!</Text>

      </View>
      
      {/* Container */}
      <View style={styles.sectionContainer}>
        {/* Clock Section */}
        <View style={styles.clockContainer}>
          <Text style={styles.time}>08:50 AM</Text>
          <Text style={styles.date}>Monday, 25 Nov 2024</Text>

          <TouchableOpacity style={styles.clockInButton}>
            <LinearGradient
              colors={['#C865DA', '#5C99D6']}
              style={styles.gradientButton}
            >
              <Image source={HandImg} style={{width: 70, height: 70}} />
              <Text style={styles.clockInText}>CHECK IN</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
         {/* Vertical Line */}
     <View style={styles.verticalLine} />


        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <LinearGradient
            colors={['#FF7EB3', '#FF758C']}
            style={styles.statBox}
          >
            <Text style={styles.statLabel}>Total Erning</Text>
            <Text style={styles.statValue}>Rs.5000</Text>
          </LinearGradient>
          <LinearGradient
            colors={['#4CA1AF', '#5C99D6']}
            style={styles.statBox}
          >
            <Text style={styles.statLabel}>Total Attendance</Text>
            <Text style={styles.statValue}>25</Text>
          </LinearGradient>
        </View>
        
      </View>
    

      {/* Button Grid Section */}
      <View style={styles.gridContainer}>
        <TouchableOpacity style={styles.gridButton}
          onPress={() => navigation.navigate('AddCustomer')}
        >
          <FontAwesome5 name="user-plus" size={24} color="#4B6CB7" />
          <Text style={styles.gridText}>Add Customer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridButton}
          onPress={() => navigation.navigate('ManageCustomers')}
        >
          <FontAwesome5 name="users" size={24} color="#4B6CB7" />
          <Text style={styles.gridText}>Manage Customers</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridButton}>
          <FontAwesome5 name="history" size={24} color="#4B6CB7" />
          <Text style={styles.gridText}>Attendance History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridButton}>
          <FontAwesome5 name="chart-bar" size={24} color="#4B6CB7" />
          <Text style={styles.gridText}>Chart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    paddingTop: 50,
    paddingBottom: 120,
    backgroundColor: '#4B6CB7',
    padding: 20,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },
  sectionContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    elevation: 3, // For Android shadow
    shadowColor: '#767676', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: -100,
    marginHorizontal: 20,
  },
  verticalLine: {
    width: '90%', // Thin line
    height: 2, // Adjust height
    backgroundColor: '#CCC', // Light gray color
    alignSelf: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
  },
  clockContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  time: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  date: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 20,
  },
  clockInButton: {
    alignItems: 'center',
  },
  gradientButton: {
    padding: 20,
    width: 150,
    height: 150,
    alignItems: 'center',
    borderRadius: 100,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderColor: 'lightgray',
    borderWidth: 4,
  },
  clockInText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'normal',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop: 20,
  },
  statBox: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '45%',
  },
  statLabel: {
    color: 'white',
    fontSize: 16,
  },
  statValue: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginHorizontal: 15,
    marginTop: 20,
  },
  gridButton: {
    width: '40%',
    backgroundColor: '#EEF2FA',
    padding: 1,
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    borderColor: '#9EBCD4',
    borderWidth: 2,
  },
  gridText: {
    marginTop: 10,
    fontSize: 14,
    color: '#4B6CB7',
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#E5E5E5',
  },
});

export default HomeScreen;
