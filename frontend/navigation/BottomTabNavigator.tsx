import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    createStackNavigator,
    StackNavigationProp,
} from "@react-navigation/stack";
import * as React from "react";
import MapScreen from "../screens/MapScreen";
import ListScreen from "../screens/ListScreen";
import InfoScreen from "../screens/InfoScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CommentScreen from "../screens/CommentScreen";
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
import ContentScreen from "../screens/ContentScreen";
import EditContentScreen from "../screens/EditContentScreen";
import EditDumpsterScreen from "../screens/EditDumpsterScreen";
import SetPositionScreen from "../screens/SetPositionScreen";
import IntroScreen from "../screens/IntroScreen";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { firstTimeSelector } from "../redux/slices/configSlice";
import { useTheme } from "@ui-kitten/components";
import DetailsMenu from "../components/DetailsMenu";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const firstTime = useSelector(firstTimeSelector);
    const theme = useTheme();

    useEffect(() => {
        if (firstTime) {
            navigation.navigate("IntroScreen");
        }
    }, []);

    return (
        <BottomTab.Navigator
            initialRouteName="MapTab"
            tabBarOptions={{
                activeTintColor: theme["color-primary-hover"],
                activeBackgroundColor: theme["background-basic-color-2"],
                inactiveTintColor: theme["text-hint-color"],
                inactiveBackgroundColor: theme["background-basic-color-1"],
            }}
        >
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

const createStandardOptions = (theme: Record<string, string>) => ({
    headerTintColor: theme["text-basic-color"],
    headerStyle: {
        backgroundColor: theme["background-basic-color-1"],
    },
});

function MapTabNavigator() {
    const theme = useTheme();
    return (
        <MapTabStack.Navigator screenOptions={createStandardOptions(theme)}>
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
                options={{ headerTitle: "Details", headerRight: DetailsMenu }}
            />
            <ListTabStack.Screen
                name="CommentScreen"
                component={CommentScreen}
                options={{ headerTitle: "Comments" }}
            />

            <ListTabStack.Screen
                name="ContentScreen"
                component={ContentScreen}
                options={{ headerTitle: "Content" }}
            />
            <ListTabStack.Screen
                name="EditContentScreen"
                component={EditContentScreen}
                options={{ headerTitle: "Edit content" }}
            />
            <ListTabStack.Screen
                name="EditDumpsterScreen"
                component={EditDumpsterScreen}
                options={{ headerTitle: "Edit dumpster" }}
            />
        </MapTabStack.Navigator>
    );
}

const ListTabStack = createStackNavigator<ListTabParamList>();

function ListTabNavigator() {
    const theme = useTheme();
    return (
        <ListTabStack.Navigator screenOptions={createStandardOptions(theme)}>
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
                options={{ headerTitle: "Details", headerRight: DetailsMenu }}
            />
            <ListTabStack.Screen
                name="CommentScreen"
                component={CommentScreen}
                options={{ headerTitle: "Comments" }}
            />
            <ListTabStack.Screen
                name="ContentScreen"
                component={ContentScreen}
                options={{ headerTitle: "Content" }}
            />
            <ListTabStack.Screen
                name="EditContentScreen"
                component={EditContentScreen}
                options={{ headerTitle: "Edit content" }}
            />
            <ListTabStack.Screen
                name="EditDumpsterScreen"
                component={EditDumpsterScreen}
                options={{ headerTitle: "Edit dumpster" }}
            />
        </ListTabStack.Navigator>
    );
}

const InfoTabStack = createStackNavigator<InfoTabParamList>();

function InfoTabNavigator() {
    const theme = useTheme();
    return (
        <InfoTabStack.Navigator screenOptions={createStandardOptions(theme)}>
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
    const theme = useTheme();
    return (
        <SettingsTabStack.Navigator
            screenOptions={createStandardOptions(theme)}
        >
            <SettingsTabStack.Screen
                name="SettingsTabScreen"
                component={SettingsScreen}
                options={{ headerTitle: "Settings" }}
            />
            <SettingsTabStack.Screen
                name="SetPositionScreen"
                component={SetPositionScreen}
                options={{ headerTitle: "Set position" }}
            />
        </SettingsTabStack.Navigator>
    );
}
