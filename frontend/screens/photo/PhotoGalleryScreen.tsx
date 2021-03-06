import * as React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { Layout } from "@ui-kitten/components";
import { Dimensions } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import usePhotos from "../../hooks/usePhotos";

/**
 * Displays photos in a gallery
 * @param navigation
 *
 */
export default function PhotoGalleryScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const windowWidth = Dimensions.get("window").width;
    const photos = usePhotos();

    return (
        <Layout style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
                    {photos.map((photo, index) => (
                        <TouchableOpacity
                            style={{
                                width: windowWidth / 3,
                                height: windowWidth / 3,
                            }}
                            onPress={() =>
                                navigation.navigate("PhotoDisplayScreen", {
                                    index,
                                })
                            }
                            key={photo.url}
                        >
                            <Image
                                style={{
                                    display: "flex",
                                    alignItems: "stretch",
                                    width: windowWidth / 3,
                                    height: windowWidth / 3,
                                }}
                                resizeMode="cover"
                                source={{
                                    uri: photo.url,
                                }}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    scrollView: {
        width: "100%",
        height: "100%",
    },
    row: {
        flexDirection: "row",
    },
    photo: {
        display: "flex",
        alignItems: "stretch",
        width: "33%",
        height: "100%",
    },
});
