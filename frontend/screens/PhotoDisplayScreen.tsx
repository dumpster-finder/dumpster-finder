import * as React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import { Layout, ViewPager, Text } from "@ui-kitten/components";
import { useState } from "react";

export default function PhotoDisplayScreen() {
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
    const [photoIndex, setPhotoIndex] = useState(1);
    return (
        <Layout>
            <ViewPager
                selectedIndex={photoIndex}
                onSelect={index => setPhotoIndex(index)}
            >
                {photos.map((photo, i) => (
                    <Layout style={styles.tab} key={i}>
                        <Image
                            style={{
                                display: "flex",
                                alignItems: "stretch",
                                width: windowWidth,
                                height: windowWidth,
                            }}
                            resizeMode="contain"
                            source={{
                                uri: photo,
                            }}
                        />
                        <Text style={styles.date} category={"h5"}>
                            I AM DATE
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
