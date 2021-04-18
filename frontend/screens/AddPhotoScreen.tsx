import * as React from "react";
import { Button, Layout, Text, Input } from "@ui-kitten/components";
import {
    Dimensions,
    Image,
    StyleSheet,
    View,
    Alert,
    Platform,
} from "react-native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    CameraButtonIcon,
    DeleteButtonIcon,
    SaveButtonIcon,
    PhotoButtonIcon,
} from "../components/basicComponents/Icons";
import { NavigationProp } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { PhotoService } from "../services";
import { useSelector } from "react-redux";
import { currentDumpsterSelector } from "../redux/slices/dumpsterSlice";
import { addPhoto } from "../redux/slices/photoSlice";
import { useAppDispatch } from "../redux/store";

export default function AddPhotoScreen({
    navigation,
}: {
    navigation: NavigationProp<any>;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("photo");
    const windowWidth = Dimensions.get("window").width;
    const [uploaded, setUploaded] = useState(false);
    const [pending, setPending] = useState(false);
    const dumpster = useSelector(currentDumpsterSelector);
    const dispatch = useAppDispatch();
    const [photoPath, setPhotoPath] = useState(
        "https://i.pinimg.com/originals/87/b2/ec/87b2ece63b4075dd6b294a4dc153f18c.jpg",
    );
    const [imageSource, setImageSource] = useState(null);

    useEffect(() => {
        // TODO this is just example code!
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

                {uploaded ? (
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
                                uri: photoPath,
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
                    <View
                        style={{
                            width: "50%",
                        }}
                    >
                        <Button
                            style={styles.buttonRow}
                            status={"danger"}
                            disabled={!uploaded || pending}
                            accessoryLeft={DeleteButtonIcon}
                        >
                            {t("delete")}
                        </Button>
                    </View>

                    <View style={{ width: "50%" }}>
                        <Button
                            style={styles.buttonRow}
                            disabled={!uploaded || pending}
                            accessoryLeft={SaveButtonIcon}
                            onPress={upload}
                        >
                            {t("add")}
                        </Button>
                    </View>
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
                // TODO get rid of this alert
                Alert.alert("You did not select any image");
            } else {
                setPhotoPath(response.uri);
                setUploaded(true);
            }
        } catch (e) {
            console.error(
                "Couldn't do anything about this image picking, I'm sorry",
                e,
            );
        }
    }

    async function upload() {
        if (!dumpster) return;
        try {
            const photo = await PhotoService.addPhoto(
                dumpster.dumpsterID,
                photoPath,
            );
            dispatch(addPhoto({ dumpsterID: dumpster.dumpsterID, photo }));
            navigation.goBack();
        } catch (e) {
            console.error(e);
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
