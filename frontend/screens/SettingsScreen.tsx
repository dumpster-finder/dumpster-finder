import * as React from "react";
import { StyleSheet, View } from "react-native";

import { Button, Layout, Text, Toggle, Input } from "@ui-kitten/components";
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
    const dispatch = useAppDispatch();
    const darkMode = useSelector(darkModeSelector);
    const nickname = useSelector(nicknameSelector);

    const [nicknameFieldText, setNicknameFieldText] = useState("");

    return (
        <Layout style={styles.container}>
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
                    <Text category="h2">Set position</Text>
                </View>
                <View
                    style={{
                        height: "16%",
                        width: "90%",
                        justifyContent: "flex-start",
                    }}>
                    {/* TODO: Make this a searchbar *or something else* */}
                    <Input placeholder="Type Here..." value={""} />
                </View>
                <View
                    style={{
                        height: "33%",
                        width: "60%",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    <Text category="h2">Set nickname</Text>
                    <Input
                        placeholder="Nickname"
                        value={nickname}
                        onChangeText={s => setNicknameFieldText(s)}
                    />
                    <Button
                        onPress={() =>
                            dispatch(setNickname(nicknameFieldText))
                        }>
                        Set nickname
                    </Button>
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
                        <Toggle
                            checked={darkMode}
                            onChange={v => dispatch(setDarkMode(v))}>
                            Dark mode
                        </Toggle>
                    </View>
                    <View
                        style={{
                            width: "90%",
                            alignItems: "flex-start",
                            justifyContent: "center",
                            flex: 1,
                            flexDirection: "row",
                        }}>
                        <Toggle checked>Other shit</Toggle>
                    </View>
                </View>
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
