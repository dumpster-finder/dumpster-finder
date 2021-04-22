import * as React from "react";
import Comments from "../../models/Comment";
import { Button, Card, Divider, Modal, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import {
    DeleteButtonIcon,
    RateDownIcon,
    RateUpIcon,
} from "../basicComponents/Icons";
import { useState } from "react";
import { CommentService } from "../../services";
import { useAppDispatch } from "../../redux/store";
import { setRatedComments } from "../../redux/slices/configSlice";
import { formatDate } from "../../utils/date";
import { useTranslation } from "react-i18next";
import Message from "../../utils/Message";
import useToken from "../../hooks/useToken";

export default function CommentCard({
    comment,
    voted,
    mine,
    onDelete,
}: {
    comment: Comments;
    voted?: number;
    mine: boolean;
    onDelete: (commentID: number) => void;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("comment");
    const dispatch = useAppDispatch();
    const [rating, setRating] = useState(comment.rating);
    const [votedUp, setVotedUp] = useState(voted || 0);
    const [modalVis, setModalVis] = useState(false);
    const { token, onTokenFailure } = useToken();

    return (
        <Card style={{ width: "100%", marginVertical: 5 }}>
            <View style={styles.row}>
                <View style={{ width: "50%" }}>
                    <Text category="h6">{comment.nickname}</Text>
                </View>
                <View style={{ width: "50%", alignItems: "flex-end" }}>
                    <Text>{formatDate(comment.date)}</Text>
                </View>
            </View>
            <Text>{comment.comment}</Text>

            <View style={styles.row}>
                <View style={styles.rate}>
                    <Button
                        style={styles.smallBtn}
                        appearance="outline"
                        status={votedUp === 1 ? "warning" : "basic"}
                        size={"small"}
                        accessoryLeft={RateUpIcon}
                        onPress={up}
                    />
                    <Button
                        style={styles.smallBtn}
                        appearance="outline"
                        size={"small"}
                        status={votedUp === -1 ? "warning" : "basic"}
                        accessoryLeft={RateDownIcon}
                        onPress={down}
                    />
                    <View style={{ marginHorizontal: 5 }}>
                        <Text>{rating}</Text>
                    </View>
                </View>
                {mine && (
                    <View style={{ width: "50%", alignItems: "flex-end" }}>
                        <Button
                            style={styles.smallBtn}
                            appearance="outline"
                            size={"small"}
                            status={"danger"}
                            accessoryLeft={DeleteButtonIcon}
                            onPress={() => setModalVis(true)}
                        />
                    </View>
                )}
            </View>
            <Modal
                visible={modalVis}
                onBackdropPress={() => setModalVis(false)}
                backdropStyle={styles.backdrop}
            >
                <Card
                    style={{
                        alignSelf: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        maxWidth: "90%",
                    }}
                >
                    <Text category={"h5"}>{t("delComment")}</Text>
                    <Divider />
                    <View style={styles.modalBtn}>
                        <Button
                            style={{ minWidth: "40%", marginRight: 5 }}
                            status={"basic"}
                            onPress={() => setModalVis(false)}
                        >
                            {t("cancel")}
                        </Button>
                        <Button
                            style={{ minWidth: "40%", marginLeft: 5 }}
                            status={"danger"}
                            onPress={delComment}
                        >
                            {t("delete")}
                        </Button>
                    </View>
                </Card>
            </Modal>
        </Card>
    );

    async function up() {
        if (votedUp === -1) {
            await handleSave(2, 1);
        } else if (votedUp === 0) {
            await handleSave(1, 1);
        } else {
            await handleSave(-1, 0);
        }
    }

    async function down() {
        if (votedUp === 1) {
            await handleSave(-2, -1);
        } else if (votedUp === 0) {
            await handleSave(-1, -1);
        } else {
            await handleSave(1, 0);
        }
    }

    async function handleSave(voteDelta: number, rated: number) {
        if (voteDelta != 0 && voteDelta < 3 && voteDelta > -3) {
            const oldRating = rating;
            const oldVotedUp = votedUp;
            // Set local state before submitting
            setRating(rating + voteDelta);
            setVotedUp(rated);
            try {
                const updatedComment = await CommentService.updateOne(
                    comment.dumpsterID,
                    comment.commentID,
                    voteDelta,
                    token,
                );
                dispatch(
                    setRatedComments({ commentID: comment.commentID, rated }),
                );
            } catch (e) {
                // Reset local state if the request failed
                setRating(oldRating);
                setVotedUp(oldVotedUp);
                onTokenFailure(e);
                Message.error(e, "Could not update this comment");
            }
        }
    }

    async function delComment() {
        try {
            const updatedComment = await CommentService.deleteOne(
                comment.dumpsterID,
                comment.commentID,
                token,
            );
            onDelete(comment.commentID);
            console.log(updatedComment);
        } catch (e) {
            onTokenFailure(e);
            Message.error(e, "Could not delete this comment");
        }
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        marginVertical: 2,
    },
    backdrop: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    rate: {
        width: "50%",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },
    smallBtn: {
        width: "10%",
        margin: 2,
    },
    modalBtn: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 5,
    },
});
