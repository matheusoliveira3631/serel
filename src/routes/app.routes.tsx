/* eslint-disable react/prop-types */
/* eslint-disable global-require */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect } from "react";
import { Image, Dimensions, TouchableOpacity, BackHandler } from "react-native";

// import { useFonts, Roboto_500Medium } from "@expo-google-fonts/roboto";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useTheme } from "styled-components"; // Hook to access the theme

import Dashboard from "../screens/Dashboard";
import Documents from "../screens/Documents";
import Extract from "../screens/Extract";
import MenuStack from "../screens/Menu";
import RegisterData from "../screens/RegisterData";

const Tab = createBottomTabNavigator();

export default function AppRoutes() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState("dashboard"); // Track the active button
  const [lastActiveTab, setLastActiveTab] = useState("dashboard");

  const handlePress = tab => {
    setLastActiveTab(activeTab); // Set the last active tab
    setActiveTab(tab); // Set the active tab when clicked
  };

  useEffect(() => {
    const backAction = () => {
      setActiveTab(lastActiveTab);
      return false;
    };

    // Add event listener for hardware back button
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove(); // Cleanup the event listener
  }, [lastActiveTab]);

  // handlePress("dashboard");

  return (
    /* <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="dashboard" component={Dashboard} />
      <Screen name="extract" component={Extract} />
      <Screen name="menu" component={Menu} />
      <Screen name="documents" component={Documents} />
      <Screen name="register" component={RegisterData} />
      <Screen name="configuration" component={Configuration} />
    </Navigator> */
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          width: "90%",
          height: "8%",
          borderRadius: 50,
          // paddingVertical: 10,
          paddingHorizontal: 0,
          backgroundColor: theme.colors.background,
          position: "absolute",
          left:
            Dimensions.get("window").width / 2 -
            (0.9 * Dimensions.get("window").width) / 2,
          bottom: 20,
          borderWidth: 2,
          borderTopWidth: 2,
          borderColor: theme.colors.inputBorder,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 500,
          // fontFamily: "Roboto_500Medium",
          color: theme.colors.textSecondary,
          marginLeft: "20%",
          alignSelf: "center",
        },
        tabBarActiveBackgroundColor: theme.colors.backgroundButton,
        tabBarIconStyle: {
          alignSelf: "center",
          marginLeft: 5,
        },
      }}
    >
      <Tab.Screen
        name="dashboard"
        component={Dashboard}
        listeners={({ navigation }) => ({
          focus: () => {
            handlePress("dashboard");
          },
        })}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../../assets/home.png")}
              style={{ width: 20, height: 20 }}
            />
          ),
          tabBarLabel: activeTab === "dashboard" ? "Início" : "",
          tabBarLabelPosition: "beside-icon",
          tabBarItemStyle:
            activeTab === "dashboard"
              ? {
                  borderRadius: 50,
                  height: "70%",
                  alignSelf: "center",
                  marginHorizontal: 10,
                }
              : {},
          tabBarButton: props => (
            <TouchableOpacity
              {...props} // This ensures default tab behavior is retained
              onPress={() => {
                handlePress("dashboard"); // Call the function to set the active tab
                props.onPress(); // Calls the default tab press behavior
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="extract"
        component={Extract}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../../assets/saldo.png")}
              style={{ width: 22, height: 22 }}
            />
          ),
          tabBarLabel: activeTab === "extract" ? "Saldo" : "",
          tabBarLabelPosition: "beside-icon",
          tabBarItemStyle:
            activeTab === "extract"
              ? {
                  borderRadius: 50,
                  height: "70%",
                  alignSelf: "center",
                  marginHorizontal: 10,
                }
              : {},
          tabBarButton: props => (
            <TouchableOpacity
              {...props} // This ensures default tab behavior is retained
              onPress={() => {
                handlePress("extract"); // Call the function to set the active tab
                props.onPress(); // Calls the default tab press behavior
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="documents"
        component={Documents}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../../assets/docs.png")}
              style={{ width: 22, height: 22 }}
            />
          ),
          tabBarLabel: activeTab === "documents" ? "Docs" : "",
          tabBarLabelPosition: "beside-icon",
          tabBarItemStyle:
            activeTab === "documents"
              ? {
                  borderRadius: 50,
                  height: "70%",
                  alignSelf: "center",
                  marginHorizontal: 10,
                }
              : {},
          tabBarButton: props => (
            <TouchableOpacity
              {...props} // This ensures default tab behavior is retained
              onPress={() => {
                handlePress("documents"); // Call the function to set the active tab
                props.onPress(); // Calls the default tab press behavior
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="register"
        component={RegisterData}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../../assets/dados.png")}
              style={{ width: 22, height: 22 }}
            />
          ),
          tabBarLabel: activeTab === "register" ? "Dados" : "",
          tabBarLabelPosition: "beside-icon",
          tabBarItemStyle:
            activeTab === "register"
              ? {
                  borderRadius: 50,
                  height: "70%",
                  alignSelf: "center",
                  marginHorizontal: 10,
                }
              : {},
          tabBarButton: props => (
            <TouchableOpacity
              {...props} // This ensures default tab behavior is retained
              onPress={() => {
                handlePress("register"); // Call the function to set the active tab
                props.onPress(); // Calls the default tab press behavior
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="menuStack"
        component={MenuStack}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../../assets/menu.png")}
              style={{ width: 22, height: 22 }}
            />
          ),
          tabBarLabel: activeTab === "menuStack" ? "Menu" : "",
          tabBarLabelPosition: "beside-icon",
          tabBarItemStyle:
            activeTab === "menuStack"
              ? {
                  borderRadius: 50,
                  height: "70%",
                  alignSelf: "center",
                  marginHorizontal: 10,
                }
              : {},
          tabBarButton: props => (
            <TouchableOpacity
              {...props} // This ensures default tab behavior is retained
              onPress={() => {
                handlePress("menuStack"); // Call the function to set the active tab
                props.onPress(); // Calls the default tab press behavior
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// <Tab.Screen name="configuration" component={Configuration} />
