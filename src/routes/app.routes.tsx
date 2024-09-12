/* eslint-disable react/prop-types */
/* eslint-disable global-require */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect } from "react";
import {
  Image,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  View,
} from "react-native";

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

  function FloatingButton({ ...props }) {
    return (
      <View
        style={{
          width: activeTab === props.tabName ? "30%" : "16%",
          marginLeft: props.tabName === "dashboard" ? "5%" : "0%",
          marginRight: props.tabName === "menuStack" ? "5%" : "0%",
          backgroundColor:
            activeTab === props.tabName
              ? theme.colors.backgroundButton
              : theme.colors.background,
          borderRadius: 50,
          height: "70%",
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
          {...props} // This ensures default tab behavior is retained
          onPress={() => {
            handlePress("extract"); // Call the function to set the active tab
            props.onPress(); // Calls the default tab press behavior
          }}
        />
      </View>
    );
  }

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

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          width: "90%",
          height: "8%",
          borderRadius: 50,
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
          fontSize: 14,
          fontWeight: 500,
          color: theme.colors.textSecondary,
          marginLeft: "23%",
          alignSelf: "center",
        },
        tabBarIconStyle: {
          alignSelf: "center",
        },
      }}
    >
      <Tab.Screen
        name="dashboard"
        component={Dashboard}
        listeners={() => ({
          focus: () => {
            handlePress("dashboard");
          },
        })}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../../assets/home.png")}
              style={{ width: 22, height: 22 }}
            />
          ),
          tabBarButton: props => (
            <FloatingButton {...props} tabName="dashboard" />
          ),
          tabBarLabel: activeTab === "dashboard" ? "Início" : "",
          tabBarLabelPosition: "beside-icon",
        }}
      />
      <Tab.Screen
        name="extract"
        component={Extract}
        listeners={() => ({
          focus: () => {
            handlePress("extract");
          },
        })}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../../assets/saldo.png")}
              style={{ width: 22, height: 22 }}
            />
          ),
          tabBarLabel: activeTab === "extract" ? "Saldo" : "",
          tabBarLabelPosition: "beside-icon",
          tabBarButton: props => (
            <FloatingButton {...props} tabName="extract" />
          ),
        }}
      />
      <Tab.Screen
        name="documents"
        component={Documents}
        listeners={() => ({
          focus: () => {
            handlePress("documents");
          },
        })}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../../assets/docs.png")}
              style={{ width: 22, height: 22 }}
            />
          ),
          tabBarLabel: activeTab === "documents" ? "Docs" : "",
          tabBarLabelPosition: "beside-icon",
          tabBarButton: props => (
            <FloatingButton {...props} tabName="documents" />
          ),
        }}
      />
      <Tab.Screen
        name="register"
        component={RegisterData}
        listeners={() => ({
          focus: () => {
            handlePress("register");
          },
        })}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../../assets/dados.png")}
              style={{ width: 22, height: 22 }}
            />
          ),
          tabBarLabel: activeTab === "register" ? "Dados" : "",
          tabBarLabelPosition: "beside-icon",
          tabBarButton: props => (
            <FloatingButton {...props} tabName="register" />
          ),
        }}
      />
      <Tab.Screen
        name="menuStack"
        component={MenuStack}
        listeners={() => ({
          focus: () => {
            handlePress("menuStack");
          },
        })}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../../assets/menu.png")}
              style={{ width: 22, height: 22 }}
            />
          ),
          tabBarLabel: activeTab === "menuStack" ? "Menu" : "",
          tabBarLabelPosition: "beside-icon",
          tabBarButton: props => (
            <FloatingButton {...props} tabName="menuStack" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// <Tab.Screen name="configuration" component={Configuration} />
