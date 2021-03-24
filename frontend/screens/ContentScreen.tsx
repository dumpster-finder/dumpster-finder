import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
    Button,
    Card,
    Divider,
    Input,
    Layout,
    Modal,
    Text,
} from "@ui-kitten/components";
import { useSelector } from "react-redux";
import {
    currentDumpsterSelector,
    setCurrentDumpster,
} from "../redux/slices/dumpsterSlice";
import ContentCard from "../components/ContentCard";
import Content from "../models/Content";
import { useState } from "react";
import { ArrowUpIcon, ArrowDownIcon, TrashIcon } from "../components/Icons";
import EditContentModal from "../components/EditContentModal";

export default function ContentScreen() {
    const dumpster = useSelector(currentDumpsterSelector);
    const a = new Content({
        dumpsterID: 1,
        tagID: 1,
        name: "",
        amount: 0,
        unit: "",
        quality: 2,
        foundDate: "",
        expiryDate: "",
    });
    const aa = new Content({
        dumpsterID: 1,
        tagID: 1,
        name: "Milk",
        amount: 3,
        unit: "1 liter",
        quality: 2,
        foundDate: "21-04-14",
        expiryDate: "23-05-15",
    });
    const ab = new Content({
        dumpsterID: 1,
        tagID: 1,
        name: "Butter",
        amount: 3,
        unit: "3",
        quality: 2,
        foundDate: "",
        expiryDate: "23-05-15",
    });
    const list = [aa, ab, aa, ab, aa, ab, aa, ab, aa, ab, aa, ab];
    const [selectedContent, setSelectedContent] = useState(a);
    const [visible, setVisible] = useState(false);
    if (dumpster === null) {
        return (
            <Layout style={styles.container}>
                <View>
                    <Text>Cry</Text>
                </View>
            </Layout>
        );
    } else {
        return (
            <Layout style={styles.container}>
                <View
                    style={{
                        alignItems: "center",
                        paddingBottom: 5,
                    }}
                >
                    <Text category={"h4"}>{dumpster.name}</Text>
                    <Text category={"h6"}>{dumpster.storeType}</Text>
                </View>
                <ScrollView style={styles.scrollView}>
                    {list.map((value, i) => (
                        <View style={styles.view} key={i}>
                            <ContentCard
                                content={value}
                                onPress={() => {
                                    setSelectedContent(value);
                                    setVisible(true);
                                }}
                            />
                        </View>
                    ))}
                    {visible ? (
                        <EditContentModal
                            visible={visible}
                            setVisible={setVisible}
                            selectedContent={selectedContent}
                            onSave={(newVal: number) => console.log(newVal)}
                            onDelete={() => console.log("me")}
                        />
                    ) : null}
                </ScrollView>
            </Layout>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    scrollView: {
        width: "100%",
    },
    view: {
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    backdrop: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
});
