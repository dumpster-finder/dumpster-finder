import * as React from "react";
import { StyleSheet, Switch } from "react-native";
import { View } from "../components/Themed";
import { Button, Input, SearchBar, Text } from "react-native-elements";
import useColorScheme from "../hooks/useColorScheme";
import { useSelector } from "react-redux";
import {
    darkModeSelector,
    nicknameSelector,
    setDarkMode,
    setNickname,
} from "../redux/slices/configSlice";
import { useAppDispatch } from "../redux/store";
import { useState } from "react";

export default function SettingsScreen() {
    const colorScheme = useColorScheme();
    const dispatch = useAppDispatch();
    const darkMode = useSelector(darkModeSelector);
    const nickname = useSelector(nicknameSelector);

    const [nicknameFieldText, setNicknameFieldText] = useState("");

    return (
        <View style={styles.container}>
            <View
                style={{
                    height: "100%",
                    width: 400,
                    flex: 1,
                    alignItems: "center",
                    flexDirection: "column",
                }}>
                <View
                    style={{
                        height: "16%",
                        width: "90%",
                        alignItems: "center",
                        justifyContent: "flex-end",
                    }}>
                    <Text h4>Set position</Text>
                </View>
                <View
                    style={{
                        height: "16%",
                        width: "90%",
                        justifyContent: "flex-start",
                    }}>
                    <SearchBar
                        lightTheme={colorScheme === "light"}
                        placeholder="Type Here..."
                        value={""}
                    />
                </View>
                <View
                    style={{
                        height: "33%",
                        width: "60%",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    <Text h4>Set nickname</Text>
                    <Text>{nickname}</Text>
                    <Input
                        placeholder="Nickname"
                        onChangeText={s => setNicknameFieldText(s)}
                    />
                    <Button
                        title="Set nickname"
                        style={{ width: " 50%" }}
                        onPress={() => dispatch(setNickname(nicknameFieldText))}
                    />
                </View>

                <View
                    style={{
                        height: "33%",
                        width: "90%",
                        alignItems: "flex-start",
                        justifyContent: "center",
                    }}>
                    <View
                        style={{
                            width: "90%",
                            alignItems: "center",
                            justifyContent: "center",
                            flex: 1,
                            flexDirection: "row",
                        }}>
                        <Switch
                            value={darkMode}
                            onValueChange={v => dispatch(setDarkMode(v))}
                        />
                        <Text>Dark mode</Text>
                    </View>
                    <View
                        style={{
                            width: "90%",
                            alignItems: "flex-start",
                            justifyContent: "center",
                            flex: 1,
                            flexDirection: "row",
                        }}>
                        <Switch value={true} />
                        <Text>Other shit</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    horizontalContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexGrow: 0,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    width: {
        width: "100%",
    },
});
