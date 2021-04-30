import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Layout, Text } from "@ui-kitten/components";
import { useSelector } from "react-redux";
import { currentDumpsterSelector } from "../redux/slices/dumpsterSlice";
import ContentCard from "../components/cards/ContentCard";
import Content from "../models/Content";
import { useEffect, useState } from "react";
import EditContentModal from "../components/Modals/EditContentModal";
import AddContentModal from "../components/Modals/AddContentModal";
import { useTranslation } from "react-i18next";
import { ContentService } from "../services";
import Message from "../utils/Message";
import SelectMethodModal from "../components/Modals/SelectMethodModal";
import { StackNavigationProp } from "@react-navigation/stack";
import { PhotoButtonIcon } from "../components/basicComponents/Icons";

export default function ContentScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const dumpster = useSelector(currentDumpsterSelector);
    const [contents, setContents] = useState<Content[]>([]);
    const [selectedContent, setSelectedContent] = useState<Content>(
        new Content({ name: "Unknown", foundDate: "1997-04-01" }),
    );
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [pendingEdit, setPendingEdit] = useState(false);
    const [visibleSelect, setVisibleSelect] = useState(false);
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [pendingAdd, setPendingAdd] = useState(false);
    const { t }: { t: (s: string) => string } = useTranslation("contents");

    useEffect(() => {
        if (dumpster)
            ContentService.getContents(dumpster.dumpsterID)
                .then(cs => setContents(cs))
                .catch(e => Message.error(e, "Could not fetch contents"));
    }, [dumpster]);

    if (!dumpster) {
        return (
            <Layout style={styles.container}>
                <View>
                    <Text>{t("somethingWrong")}</Text>
                </View>
            </Layout>
        );
    } else {
        return (
            <Layout style={styles.container}>
                <View
                    style={{
                        alignItems: "center",
                        marginVertical: 10,
                        flexDirection: "row",
                    }}
                >
                    <Button
                        style={{ marginHorizontal: 5 }}
                        onPress={() => setVisibleSelect(true)}
                    >
                        {t("add")}
                    </Button>
                    <Button
                        style={{ marginHorizontal: 5 }}
                        accessoryLeft={PhotoButtonIcon}
                        onPress={() =>
                            navigation.navigate("PhotoGalleryScreen")
                        }
                    >
                        {t("photo:see")}
                    </Button>
                </View>
                <ScrollView style={styles.scrollView}>
                    {contents.map((value, i) => (
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
                    {visibleEdit && selectedContent && (
                        <EditContentModal
                            visible={visibleEdit}
                            setVisible={setVisibleEdit}
                            selectedContent={selectedContent}
                            pending={pendingEdit}
                            onSave={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}
                    {visibleAdd && (
                        <AddContentModal
                            visible={visibleAdd}
                            setVisible={setVisibleAdd}
                            pending={pendingAdd}
                            onAdd={handleAdd}
                        />
                    )}
                    {visibleSelect && (
                        <SelectMethodModal
                            visible={visibleSelect}
                            setVisible={setVisibleSelect}
                            onSelect={i => addSelect(i)}
                        />
                    )}
                </ScrollView>
            </Layout>
        );
    }

    function addSelect(i: number) {
        if (i === 1) {
            setVisibleSelect(false);
            navigation.navigate("AddPhotoScreen");
        } else if (i === 2) {
            setVisibleSelect(false);
            setVisibleAdd(true);
        }
    }

    async function handleAdd(
        content: Pick<Content, "name"> & Partial<Content>,
    ) {
        if (!dumpster) return;
        setPendingAdd(true);
        try {
            const addedContent = await ContentService.addContent(
                dumpster.dumpsterID,
                content,
            );
            setContents([addedContent, ...contents]);
            setVisibleAdd(false);
        } catch (e) {
            Message.error(e, "Couldn't add content");
        }
        setPendingAdd(false);
    }

    async function handleEdit(content: Content) {
        if (!dumpster) return;
        setPendingEdit(true);
        try {
            const updatedContent = await ContentService.updateContent(
                dumpster.dumpsterID,
                content,
            );
            setContents(
                contents.map(oldContent =>
                    oldContent.equals(content) ? updatedContent : oldContent,
                ),
            );
            setVisibleEdit(false);
        } catch (e) {
            Message.error(e, "Couldn't edit content");
        }
        setPendingEdit(false);
    }

    async function handleDelete(content: Content) {
        if (!dumpster) return;
        setPendingEdit(true);
        try {
            await ContentService.removeContent(dumpster.dumpsterID, content);
            setContents(
                contents.filter(oldContent => !oldContent.equals(content)),
            );
            setVisibleEdit(false);
        } catch (e) {
            Message.error(e, "Couldn't delete content");
        }
        setPendingEdit(false);
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
