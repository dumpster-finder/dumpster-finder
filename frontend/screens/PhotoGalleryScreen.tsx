import * as React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { Dimensions } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

export default function PhotoGalleryScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const windowWidth = Dimensions.get("window").width;
    const photos = [
        "https://images1.westword.com/imager/u/745xauto/11871566/cover_no_copy.jpg",
        "https://cdn.shopify.com/s/files/1/1133/3328/products/dumpster-2020_600x.jpg?v=1594250607",
        "https://i.pinimg.com/originals/87/b2/ec/87b2ece63b4075dd6b294a4dc153f18c.jpg",
        "https://images1.westword.com/imager/u/745xauto/11871566/cover_no_copy.jpg",
        "https://cdn.shopify.com/s/files/1/1133/3328/products/dumpster-2020_600x.jpg?v=1594250607",
        "https://i.pinimg.com/originals/87/b2/ec/87b2ece63b4075dd6b294a4dc153f18c.jpg",
        "https://images1.westword.com/imager/u/745xauto/11871566/cover_no_copy.jpg",
        "https://cdn.shopify.com/s/files/1/1133/3328/products/dumpster-2020_600x.jpg?v=1594250607",
        "https://i.pinimg.com/originals/87/b2/ec/87b2ece63b4075dd6b294a4dc153f18c.jpg",
        "https://images1.westword.com/imager/u/745xauto/11871566/cover_no_copy.jpg",
        "https://cdn.shopify.com/s/files/1/1133/3328/products/dumpster-2020_600x.jpg?v=1594250607",
        "https://i.pinimg.com/originals/87/b2/ec/87b2ece63b4075dd6b294a4dc153f18c.jpg",
        "https://images1.westword.com/imager/u/745xauto/11871566/cover_no_copy.jpg",
        "https://cdn.shopify.com/s/files/1/1133/3328/products/dumpster-2020_600x.jpg?v=1594250607",
        "https://i.pinimg.com/originals/87/b2/ec/87b2ece63b4075dd6b294a4dc153f18c.jpg",
        "https://i.pinimg.com/originals/87/b2/ec/87b2ece63b4075dd6b294a4dc153f18c.jpg",
        "https://i.pinimg.com/originals/87/b2/ec/87b2ece63b4075dd6b294a4dc153f18c.jpg",
        "https://i.pinimg.com/originals/87/b2/ec/87b2ece63b4075dd6b294a4dc153f18c.jpg",
    ];

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
                                navigation.navigate("PhotoDisplayScreen")
                            }
                            key={index}
                        >
                            <Image
                                style={{
                                    display: "flex",
                                    alignItems: "stretch",
                                    width: windowWidth / 3,
                                    height: windowWidth / 3,
                                }}
                                resizeMode="contain"
                                source={{
                                    uri: photo,
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
