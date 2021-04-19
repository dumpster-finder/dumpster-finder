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
import EditDumpsterScreen from "../screens/EditDumpsterScreen";
import SetPositionScreen from "../screens/SetPositionScreen";
import IntroScreen from "../screens/IntroScreen";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { firstTimeSelector } from "../redux/slices/configSlice";
import { useTheme } from "@ui-kitten/components";
import DetailsMenu from "../components/basicComponents/DetailsMenu";
import RevisionScreen from "../screens/RevisionScreen";
import { useTranslation } from "react-i18next";
import PhotoGalleryScreen from "../screens/PhotoGalleryScreen";
import PhotoDisplayScreen from "../screens/PhotoDisplayScreen";
import AddPhotoHeader from "../components/basicComponents/AddPhotoHeader";
import AddPhotoScreen from "../screens/AddPhotoScreen";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("titles");
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
                    title: t("mapBar"),
                }}
            />
            <BottomTab.Screen
                name="ListTab"
                component={ListTabNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="menu" color={color} />
                    ),
                    title: t("listBar"),
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
                    title: t("settings"),
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
    const { t }: { t: (s: string) => string } = useTranslation("titles");
    const theme = useTheme();
    return (
        <MapTabStack.Navigator screenOptions={createStandardOptions(theme)}>
            <MapTabStack.Screen
                name="MapTabScreen"
                component={MapScreen}
                options={{ headerTitle: t("map") }}
            />
            <MapTabStack.Screen
                name="AddPositionScreen"
                component={AddPositionScreen}
                options={{ headerTitle: t("addPos") }}
            />
            <MapTabStack.Screen
                name="AddInfoScreen"
                component={AddInfoScreen}
                options={{ headerTitle: t("addInfo") }}
            />
            <MapTabStack.Screen
                name="DetailsScreen"
                component={DetailsScreen}
                options={{
                    headerTitle: t("details"),
                    headerRight: DetailsMenu,
                }}
            />
            <MapTabStack.Screen
                name="CommentScreen"
                component={CommentScreen}
                options={{ headerTitle: t("comment") }}
            />

            <MapTabStack.Screen
                name="ContentScreen"
                component={ContentScreen}
                options={{ headerTitle: t("content") }}
            />
            <MapTabStack.Screen
                name="EditDumpsterScreen"
                component={EditDumpsterScreen}
                options={{ headerTitle: t("edit") }}
            />
            <MapTabStack.Screen
                name="RevisionScreen"
                component={RevisionScreen}
                options={{ headerTitle: t("revision") }}
            />
            <MapTabStack.Screen
                name="PhotoGalleryScreen"
                component={PhotoGalleryScreen}
                options={{
                    headerTitle: t("gallery"),
                    headerRight: AddPhotoHeader,
                }}
            />
            <MapTabStack.Screen
                name="PhotoDisplayScreen"
                component={PhotoDisplayScreen}
                options={{
                    headerTitle: t("display"),
                    headerRight: AddPhotoHeader,
                }}
            />
            <MapTabStack.Screen
                name="AddPhotoScreen"
                component={AddPhotoScreen}
                options={{
                    headerTitle: t("addPhoto"),
                }}
            />
        </MapTabStack.Navigator>
    );
}

const ListTabStack = createStackNavigator<ListTabParamList>();

function ListTabNavigator() {
    const { t }: { t: (s: string) => string } = useTranslation("titles");
    const theme = useTheme();
    return (
        <ListTabStack.Navigator screenOptions={createStandardOptions(theme)}>
            <ListTabStack.Screen
                name="ListTabScreen"
                component={ListScreen}
                options={{ headerTitle: t("list") }}
            />
            <ListTabStack.Screen
                name="AddPositionScreen"
                component={AddPositionScreen}
                options={{ headerTitle: t("addPos") }}
            />
            <ListTabStack.Screen
                name="AddInfoScreen"
                component={AddInfoScreen}
                options={{ headerTitle: t("addInfo") }}
            />
            <ListTabStack.Screen
                name="DetailsScreen"
                component={DetailsScreen}
                options={{
                    headerTitle: t("details"),
                    headerRight: DetailsMenu,
                }}
            />
            <ListTabStack.Screen
                name="CommentScreen"
                component={CommentScreen}
                options={{ headerTitle: t("comment") }}
            />
            <ListTabStack.Screen
                name="ContentScreen"
                component={ContentScreen}
                options={{ headerTitle: t("content") }}
            />
            <ListTabStack.Screen
                name="EditDumpsterScreen"
                component={EditDumpsterScreen}
                options={{ headerTitle: t("edit") }}
            />
            <ListTabStack.Screen
                name="RevisionScreen"
                component={RevisionScreen}
                options={{ headerTitle: t("revision") }}
            />
            <ListTabStack.Screen
                name="PhotoGalleryScreen"
                component={PhotoGalleryScreen}
                options={{
                    headerTitle: t("gallery"),
                    headerRight: AddPhotoHeader,
                }}
            />
            <ListTabStack.Screen
                name="PhotoDisplayScreen"
                component={PhotoDisplayScreen}
                options={{
                    headerTitle: t("display"),
                    headerRight: AddPhotoHeader,
                }}
            />
            <ListTabStack.Screen
                name="AddPhotoScreen"
                component={AddPhotoScreen}
                options={{
                    headerTitle: t("addPhoto"),
                }}
            />
        </ListTabStack.Navigator>
    );
}

const InfoTabStack = createStackNavigator<InfoTabParamList>();

function InfoTabNavigator() {
    const { t }: { t: (s: string) => string } = useTranslation("titles");
    const theme = useTheme();
    return (
        <InfoTabStack.Navigator screenOptions={createStandardOptions(theme)}>
            <InfoTabStack.Screen
                name="InfoTabScreen"
                component={InfoScreen}
                options={{ headerTitle: t("info") }}
            />
        </InfoTabStack.Navigator>
    );
}

const SettingsTabStack = createStackNavigator<SettingsTabParamList>();

function SettingsTabNavigator() {
    const { t }: { t: (s: string) => string } = useTranslation("titles");
    const theme = useTheme();
    return (
        <SettingsTabStack.Navigator
            screenOptions={createStandardOptions(theme)}
        >
            <SettingsTabStack.Screen
                name="SettingsTabScreen"
                component={SettingsScreen}
                options={{ headerTitle: t("settings") }}
            />
            <SettingsTabStack.Screen
                name="SetPositionScreen"
                component={SetPositionScreen}
                options={{ headerTitle: t("yourPos") }}
            />
        </SettingsTabStack.Navigator>
    );
}
