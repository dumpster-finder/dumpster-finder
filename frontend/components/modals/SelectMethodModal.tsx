import * as React from "react";
import { Button, Card, Divider, Modal, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { CameraButtonIcon, EditButtonIcon } from "../basicComponents/Icons";
import { useTranslation } from "react-i18next";

/**
 * Modal that lets users decide if they want to add an item or add a photo of the contents.
 * @param visible
 * @param setVisible
 * @param onSelect
 *
 */
export default function SelectMethodModal({
    visible,
    setVisible,
    onSelect,
}: {
    visible: boolean;
    setVisible: (newVisible: boolean) => void;
    onSelect: (i: number) => void;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("common");
    return (
        <Modal
            visible={visible}
            onBackdropPress={() => setVisible(false)}
            backdropStyle={styles.backdrop}
        >
            <Card style={styles.card}>
                <Text category={"h5"}>{t("contents:add")}</Text>
                <Divider />
                <View style={styles.view}>
                    <Button
                        accessoryLeft={CameraButtonIcon}
                        style={styles.button}
                        onPress={() => onSelect(1)}
                    >
                        {t("photo:add")}
                    </Button>
                    <Button
                        accessoryLeft={EditButtonIcon}
                        style={styles.button}
                        onPress={() => onSelect(2)}
                    >
                        {t("contents:addItem")}
                    </Button>
                    <Button
                        style={styles.button}
                        status={"basic"}
                        onPress={() => setVisible(false)}
                    >
                        {t("back")}
                    </Button>
                </View>
            </Card>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    card: {
        width: "100%",
    },
    view: {
        // cursed styling because of the way it was before... but please bear with it
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
    },
    button: {
        margin: 5,
        width: "100%",
        flexDirection: "row",
    },
});
