import * as React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import { Layout, ViewPager, Text } from "@ui-kitten/components";
import { useState } from "react";
import usePhotos from "../hooks/usePhotos";
import { RouteProp } from "@react-navigation/native";
import { formatDate } from "../utils/date";

export default function PhotoDisplayScreen({
    route,
}: {
    route: RouteProp<any, any>;
}) {
    const windowWidth = Dimensions.get("window").width;
    const photos = usePhotos();
    const [photoIndex, setPhotoIndex] = useState(
        route.params ? route.params.index : 0,
    );
    return (
        <Layout>
            <ViewPager
                selectedIndex={photoIndex}
                onSelect={index => setPhotoIndex(index)}
            >
                {photos.map(photo => (
                    <Layout style={styles.tab} key={photo.url}>
                        <Image
                            style={{
                                display: "flex",
                                alignItems: "stretch",
                                width: windowWidth,
                                height: windowWidth,
                            }}
                            resizeMode="contain"
                            source={{
                                uri: photo.url,
                            }}
                        />
                        <Text style={styles.date} category={"h5"}>
                            {formatDate(photo.dateAdded)}
                        </Text>
                    </Layout>
                ))}
            </ViewPager>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    tab: {
        paddingTop: "10%",
        width: "100%",
        height: "100%",
        paddingVertical: "10%",
    },
    date: {
        alignSelf: "center",
        paddingVertical: 5,
    },
});
