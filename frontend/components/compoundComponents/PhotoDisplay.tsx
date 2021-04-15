import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useState } from "react";
import { Button } from "@ui-kitten/components";
import { ArrowLeftIcon, ArrowRightIcon } from "../basicComponents/Icons";
import Photo from "../../models/Photo";

export default function PhotoDisplay({ photoList }: { photoList: Photo[] }) {
    const [photoDisplay, onPhotoChange] = useState(0);
    return (
        <View style={styles.view}>
            <Button
                style={{ width: "15%" }}
                appearance="ghost"
                accessoryLeft={ArrowLeftIcon}
                onPress={() => backArrow()}
            />
            <Image
                style={styles.photo}
                resizeMode="contain"
                source={{
                    uri: photoList[photoDisplay]
                        ? photoList[photoDisplay].url
                        : "https://picsum.photos/400", // TODO insert an actual placeholder image here!
                }}
            />
            <Button
                style={{ width: "15%" }}
                appearance="ghost"
                accessoryLeft={ArrowRightIcon}
                onPress={() => forwardArrow()}
            />
        </View>
    );
    function backArrow() {
        if (photoDisplay - 1 >= 0) {
            onPhotoChange(photoDisplay - 1);
        } else {
            onPhotoChange(photoList.length - 1);
        }
    }

    function forwardArrow() {
        if (photoDisplay + 1 >= photoList.length) {
            onPhotoChange(0);
        } else {
            onPhotoChange(photoDisplay + 1);
        }
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
    },
    photo: {
        display: "flex",
        alignItems: "stretch",
        width: "70%",
        height: "100%",
    },
});
