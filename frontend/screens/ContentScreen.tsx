import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Layout, Text } from "@ui-kitten/components";
import { useSelector } from "react-redux";
import { currentDumpsterSelector } from "../redux/slices/dumpsterSlice";
import ContentCard from "../components/ContentCard";
import Content from "../models/Content";
import { useState } from "react";
import EditContentModal from "../components/EditContentModal";
import AddContentModal from "../components/AddContentModal";

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
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [visibleAdd, setVisibleAdd] = useState(false);
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
                    <Button onPress={() => setVisibleAdd(true)}>
                        Add content
                    </Button>
                </View>
                <ScrollView style={styles.scrollView}>
                    {list.map((value, i) => (
                        <View style={styles.view} key={i}>
                            <ContentCard
                                content={value}
                                onPress={() => {
                                    setSelectedContent(value);
                                    setVisibleEdit(true);
                                }}
                            />
                        </View>
                    ))}
                    {visibleEdit ? (
                        <EditContentModal
                            visible={visibleEdit}
                            setVisible={setVisibleEdit}
                            selectedContent={selectedContent}
                            onSave={(newVal: number) => console.log(newVal)}
                            onDelete={() => console.log("me")}
                        />
                    ) : null}
                    {visibleAdd ? (
                        <AddContentModal
                            visible={visibleAdd}
                            setVisible={setVisibleAdd}
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
