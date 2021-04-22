import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Layout, ViewPager, Text, Button } from "@ui-kitten/components";
import { useState } from "react";
import ButtonGroupDisplay from "../components/basicComponents/ButtonGroupDisplay";
import Advice from "../components/textComponents/Advice";
import IconExplanation from "../components/textComponents/IconExplanation";
import { setFirstTime, setPosition } from "../redux/slices/configSlice";
import { useAppDispatch } from "../redux/store";
import { StackNavigationProp } from "@react-navigation/stack";
import LocationSearcher from "../components/compoundComponents/LocationSearcher";
import { StackActions } from "@react-navigation/native";

export default function IntroScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const dispatch = useAppDispatch();
    const buttons = ["1", "2", "3"];
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
        <Layout>
            <ViewPager
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}
            >
                <Layout style={styles.tab}>
                    <Text
                        style={{ alignSelf: "center", paddingTop: 5 }}
                        category="h3"
                    >
                        Dumpster Finder
                    </Text>
                    <View style={styles.infoDisplay}>
                        <Advice />
                    </View>
                </Layout>
                <Layout style={styles.tab}>
                    <Text
                        style={{ alignSelf: "center", paddingTop: 5 }}
                        category="h3"
                    >
                        Dumpster Finder
                    </Text>
                    <ScrollView>
                        <View style={styles.infoDisplay}>
                            <IconExplanation />
                        </View>
                    </ScrollView>
                </Layout>
                <Layout style={styles.positionSetting}>
                    <LocationSearcher
                        onSubmit={position => {
                            dispatch(setPosition(position));
                            dispatch(setFirstTime(false));
                            navigation.dispatch(StackActions.popToTop);
                        }}
                    />
                </Layout>
            </ViewPager>
            <Layout style={styles.container}>
                <ButtonGroupDisplay
                    value={selectedIndex}
                    values={buttons}
                    onSelect={setSelectedIndex}
                />
            </Layout>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "10%",
        alignItems: "center",
        justifyContent: "center",
    },
    tab: {
        paddingTop: "10%",
        width: "100%",
        height: "90%",
        paddingVertical: "10%",
    },
    infoDisplay: {
        paddingVertical: 100,
        alignItems: "center",
    },
    positionSetting: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingTop: "10%",
    },
});
