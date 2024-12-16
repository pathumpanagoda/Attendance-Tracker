import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/tabScreens/Home";
import Settings from "./screens/tabScreens/Settings";
import Reports from "./screens/tabScreens/Reports";
import AddCustomer from "./screens/AddCustomer";
import ManageCustomers from "./screens/ManageCustomers";
import CustomerDetails from "./screens/CustomerDetails";
import EditCustomerDetails from "./screens/EditCustomerDetails";
import MarkAttendance from "./screens/MarkAttendance";
import AttendanceHistory from "./screens/AttendanceHistory";
import UpdateAttendance from "./screens/UpdateAttendance";
import InsightsPage from "./screens/InsightsPage";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";


const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

// Stack navigator
function HomeStackGroup() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="TabGroup" component={TabGroup} />
      <HomeStack.Screen
        name="AddCustomer"
        component={AddCustomer}
        options={{ animation: "slide_from_right" }}
      />
      <HomeStack.Screen name="ManageCustomers" component={ManageCustomers}
        options={{ animation: "slide_from_right" }}
      />
       <HomeStack.Screen
        name="CustomerDetails"
        component={CustomerDetails}
        options={{ animation: "slide_from_right" }}
      />
      <HomeStack.Screen
        name="EditCustomerDetails"
        component={EditCustomerDetails}
        options={{ animation: "slide_from_right" }}
        />
      <HomeStack.Screen
        name="MarkAttendance"
        component={MarkAttendance}
        options={{ animation: "slide_from_right" }}
      />
      <HomeStack.Screen
        name="AttendanceHistory"
        component={AttendanceHistory}
        options={{ animation: "slide_from_right" }}
      />
      <HomeStack.Screen
        name="UpdateAttendance"
        component={UpdateAttendance}
        options={{ animation: "slide_from_right" }}
      />
      <HomeStack.Screen
        name="InsightsPage"
        component={InsightsPage}
        options={{ animation: "slide_from_right" }}
      />
    </HomeStack.Navigator>
  );
}

// bottom tab navigator
function TabGroup() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === "Reports") {
            iconName = focused ? "document-text" : "document-text-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: "#4B6CB7",
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false, tabBarLabel: "Home" }}
      />
      <Tab.Screen name="Reports" component={Reports} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <HomeStackGroup />
    </NavigationContainer>
  );
}
