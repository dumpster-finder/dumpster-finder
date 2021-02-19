import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import MapScreen from "../screens/MapScreen";
import ListScreen from "../screens/ListScreen";
import InfoScreen from "../screens/InfoScreen";
import SettingsScreen from "../screens/SettingsScreen";
import {
    BottomTabParamList,
    InfoTabParamList,
    ListTabParamList,
    MapTabParamList,
    SettingsTabParamList,
} from "../types";

import AddInfoScreen from "../screens/AddInfoScreen";
import AddPositionScreen from "../screens/AddPositionScreen";
import DetailsScreen from "../screens/DetailsScreen";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="MapTab"
            tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
            <BottomTab.Screen
                name="MapTab"
                component={MapTabNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="navigate" color={color} />
                    ),
                    title: "Map",
                }}
            />
            <BottomTab.Screen
                name="ListTab"
                component={ListTabNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="menu" color={color} />
                    ),
                    title: "List",
                }}
            />
            <BottomTab.Screen
                name="InfoTab"
                component={InfoTabNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="information-circle" color={color} />
                    ),
                    title: "Info",
                }}
            />
            <BottomTab.Screen
                name="SettingsTab"
                component={SettingsTabNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="settings" color={color} />
                    ),
                    title: "Settings",
                }}
            />
        </BottomTab.Navigator>
    );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
    // @ts-ignore
    return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const MapTabStack = createStackNavigator<MapTabParamList>();

function MapTabNavigator() {
    return (
        <MapTabStack.Navigator>
            <MapTabStack.Screen
                name="MapTabScreen"
                component={MapScreen}
                options={{ headerTitle: "Map View" }}
            />
            <MapTabStack.Screen
                name="AddPositionScreen"
                component={AddPositionScreen}
                options={{ headerTitle: "Set dumpster position" }}
            />
            <MapTabStack.Screen
                name="AddInfoScreen"
                component={AddInfoScreen}
                options={{ headerTitle: "Set dumpster info" }}
            />
            <ListTabStack.Screen
                name="DetailsScreen"
                component={DetailsScreen}
                options={{ headerTitle: "Details" }}
            />
        </MapTabStack.Navigator>
    );
}

const ListTabStack = createStackNavigator<ListTabParamList>();

function ListTabNavigator() {
    return (
        <ListTabStack.Navigator>
            <ListTabStack.Screen
                name="ListTabScreen"
                component={ListScreen}
                options={{ headerTitle: "List View" }}
            />
            <ListTabStack.Screen
                name="AddPositionScreen"
                component={AddPositionScreen}
                options={{ headerTitle: "Set dumpster position" }}
            />
            <ListTabStack.Screen
                name="AddInfoScreen"
                component={AddInfoScreen}
                options={{ headerTitle: "Set dumpster info" }}
            />
            <ListTabStack.Screen
                name="DetailsScreen"
                component={DetailsScreen}
                options={{ headerTitle: "Details" }}
            />
        </ListTabStack.Navigator>
    );
}

const InfoTabStack = createStackNavigator<InfoTabParamList>();

function InfoTabNavigator() {
    return (
        <InfoTabStack.Navigator>
            <InfoTabStack.Screen
                name="InfoTabScreen"
                component={InfoScreen}
                options={{ headerTitle: "Info" }}
            />
        </InfoTabStack.Navigator>
    );
}

const SettingsTabStack = createStackNavigator<SettingsTabParamList>();

function SettingsTabNavigator() {
    return (
        <SettingsTabStack.Navigator>
            <SettingsTabStack.Screen
                name="SettingsTabScreen"
                component={SettingsScreen}
                options={{ headerTitle: "Settings" }}
            />
        </SettingsTabStack.Navigator>
    );
}
