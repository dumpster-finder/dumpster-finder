import * as React from "react";
import { Button, Layout, Text, Input } from "@ui-kitten/components";
import { Dimensions, Image, StyleSheet, View, Alert } from "react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    CameraIcon,
    DeleteButtonIcon,
    SaveButtonIcon,
    UploadIcon,
} from "../components/Icons";
import ImagePicker, { launchImageLibrary } from "react-native-image-picker";

export default function AddPhotoScreen() {
    const { t }: { t: (s: string) => string } = useTranslation("photo");
    const windowWidth = Dimensions.get("window").width;
    const [uploaded, setUploaded] = useState(true);
    const [pending, setPending] = useState(false);
    const photoPath =
        "https://i.pinimg.com/originals/87/b2/ec/87b2ece63b4075dd6b294a4dc153f18c.jpg";
    const [imageSource, setImageSource] = useState(null);
    return (
        <Layout style={styles.container}>
            <View style={styles.view}>
                <Button
                    style={styles.button}
                    accessoryLeft={UploadIcon}
                    onPress={selectImage}
                >
                    {t("upload")}
                </Button>
                <Button style={styles.button} accessoryLeft={CameraIcon}>
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
                        >
                            {t("add")}
                        </Button>
                    </View>
                </View>
            </View>
        </Layout>
    );

    function selectImage() {
        let options = {
            title: "You can choose one image",
            maxWidth: 256,
            maxHeight: 256,
            storageOptions: {
                skipBackup: true,
            },
        };

        launchImageLibrary(
            { mediaType: "photo", maxWidth: 256, maxHeight: 256 },
            response => {
                console.log({ response });

                if (response.didCancel) {
                    console.log("User cancelled photo picker");
                    Alert.alert("You did not select any image");
                } else {
                    let source = { uri: response.uri };
                    console.log({ source });
                }
            },
        );
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
