import * as React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { Button } from "@ui-kitten/components";
import { ArrowLeftIcon, ArrowRightIcon } from "../basicComponents/Icons";
import Photo from "../../models/Photo";

export default function PhotoDisplay({
    photoList,
    onPress,
}: {
    photoList: Photo[];
    onPress: () => any;
}) {
    const [photoDisplay, onPhotoChange] = useState(0);
    return (
        <View style={styles.view}>
            <Button
                style={{ width: "15%" }}
                appearance="ghost"
                accessoryLeft={ArrowLeftIcon}
                onPress={() => backArrow()}
            />
            <TouchableOpacity style={styles.photoContainer} onPress={onPress}>
                <Image
                    style={styles.photo}
                    resizeMode="contain"
                    source={{
                        uri: photoList[photoDisplay]
                            ? photoList[photoDisplay].url
                            : "https://picsum.photos/400", // TODO insert an actual placeholder image here!
                    }}
                />
            </TouchableOpacity>
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
        flexDirection: "row",
        width: "100%",
    },
    photoContainer: {
        width: "70%",
    },
    photo: {
        width: "100%",
        height: "100%",
    },
});
