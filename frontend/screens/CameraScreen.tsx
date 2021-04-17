import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { Camera } from "expo-camera";
import { Layout, Button } from "@ui-kitten/components";
import {
    CameraButtonIcon,
    FlipButtonIcon,
    PendingButtonIcon,
} from "../components/basicComponents/Icons";

export default function CameraScreen({
    navigation,
}: {
    navigation: NavigationProp<any>;
}) {
    const [camera, setCamera] = useState<Camera | null>(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [hasCaptured, setHasCaptured] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    if (hasPermission === null) {
        return <Layout />;
    }
    if (!hasPermission) {
        return (
            <Layout>
                <Text>No access to camera</Text>
            </Layout>
        );
    }

    return (
        <Layout>
            <Camera
                style={styles.camera}
                type={type}
                onCameraReady={() => setIsReady(true)}
                ref={ref => setCamera(ref)}
            >
                <View style={styles.aligner}>
                    <View style={styles.buttonRow}>
                        <Button
                            status="basic"
                            accessoryLeft={FlipButtonIcon}
                            onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back,
                                );
                            }}
                        />
                        <Button
                            status="basic"
                            size="large"
                            accessoryLeft={
                                hasCaptured
                                    ? PendingButtonIcon
                                    : CameraButtonIcon
                            }
                            disabled={!isReady || hasCaptured}
                            onPress={takePicture}
                        />
                    </View>
                </View>
            </Camera>
        </Layout>
    );

    async function takePicture() {
        if (camera && isReady) {
            setHasCaptured(true);
            const photo = await camera.takePictureAsync();
            console.log("took pic", photo);
            navigation.goBack();
        }
        console.log("Camera not ready…");
    }
}

const styles = StyleSheet.create({
    aligner: {
        flexDirection: "column",
        justifyContent: "flex-end",
        height: "100%",
    },
    camera: {
        width: "100%",
        height: "100%",
    },
    buttonRow: {
        justifyContent: "center",
        flexDirection: "row",
    },
});
