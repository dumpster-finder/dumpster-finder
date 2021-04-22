import * as React from "react";
import { Button, Layout, Text } from "@ui-kitten/components";
import { Dimensions, Image, StyleSheet, View, Platform } from "react-native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    CameraButtonIcon,
    SaveButtonIcon,
    PhotoButtonIcon,
    PendingButtonIcon,
} from "../components/basicComponents/Icons";
import { NavigationProp } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { PhotoService } from "../services";
import { useSelector } from "react-redux";
import { currentDumpsterSelector } from "../redux/slices/dumpsterSlice";
import {
    addPhoto,
    setUploadURI,
    uploadURISelector,
} from "../redux/slices/photoSlice";
import { useAppDispatch } from "../redux/store";
import Message from "../utils/Message";

export default function AddPhotoScreen({
    navigation,
}: {
    navigation: NavigationProp<any>;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("photo");
    const windowWidth = Dimensions.get("window").width;
    const [pending, setPending] = useState(false);
    const dumpster = useSelector(currentDumpsterSelector);
    const dispatch = useAppDispatch();
    const uploadURI = useSelector(uploadURISelector);

    useEffect(() => {
        // This part is just example code from Expo documentation
        (async () => {
            if (Platform.OS !== "web") {
                const {
                    status,
                } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    alert(
                        "Sorry, we need camera roll permissions to make this work!",
                    );
                }
            }
        })();
    }, []);

    return (
        <Layout style={styles.container}>
            <View style={styles.view}>
                <Button
                    style={styles.button}
                    accessoryLeft={PhotoButtonIcon}
                    onPress={selectImage}
                >
                    {t("upload")}
                </Button>
                <Button
                    style={styles.button}
                    accessoryLeft={CameraButtonIcon}
                    onPress={() => navigation.navigate("CameraScreen")}
                >
                    {t("take")}
                </Button>

                {uploadURI ? ( // TODO add placeholder / empty thing here
                    <View style={{ alignItems: "center", marginVertical: 10 }}>
                        <Text category={"h6"}>{t("photo")}:</Text>
                        <Image
                            style={{
                                display: "flex",
                                alignItems: "stretch",
                                width: windowWidth / 2,
                                height: windowWidth / 2,
                            }}
                            resizeMode="contain"
                            source={{
                                uri: uploadURI,
                            }}
                        />
                    </View>
                ) : null}

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                    }}
                >
                    <Button
                        style={styles.buttonRow}
                        disabled={!uploadURI || pending}
                        accessoryLeft={
                            pending ? PendingButtonIcon : SaveButtonIcon
                        }
                        onPress={upload}
                    >
                        {t("add")}
                    </Button>
                </View>
            </View>
        </Layout>
    );

    async function selectImage() {
        try {
            const response = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
            });

            if (response.cancelled) {
                console.log("User cancelled photo picker");
            } else {
                dispatch(setUploadURI(response.uri));
            }
        } catch (e) {
            Message.error(
                e,
                "Couldn't do anything about this image picking, I'm sorry",
            );
        }
    }

    async function upload() {
        if (!dumpster) return;
        setPending(true);
        try {
            const photo = await PhotoService.addPhoto(
                dumpster.dumpsterID,
                uploadURI,
            );
            dispatch(addPhoto({ dumpsterID: dumpster.dumpsterID, photo }));
            dispatch(setUploadURI(""));
            navigation.goBack();
        } catch (e) {
            Message.error(e, "Could not upload photo");
            setPending(false);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    view: {
        width: "98%",
        height: "100%",
    },
    button: {
        margin: 10,
    },
    buttonRow: {
        width: "95%",
        alignSelf: "center",
    },
});
