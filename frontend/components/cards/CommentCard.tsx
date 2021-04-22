import * as React from "react";
import Comments from "../../models/Comment";
import { Button, Card, Text } from "@ui-kitten/components";
import { View } from "react-native";
import { RateDownIcon, RateUpIcon } from "../basicComponents/Icons";
import { useState } from "react";
import { CommentService } from "../../services";
import { useAppDispatch } from "../../redux/store";
import { setRatedComments } from "../../redux/slices/configSlice";
import { formatDate } from "../../utils/date";
import Message from "../../utils/Message";

export default function CommentCard({
    comment,
    voted,
}: {
    comment: Comments;
    voted?: number;
}) {
    const dispatch = useAppDispatch();
    const [rating, setRating] = useState(comment.rating);
    const [votedUp, setVotedUp] = useState(voted || 0);

    return (
        <Card style={{ width: "100%", marginVertical: 5 }}>
            <View style={{ flex: 1, flexDirection: "row", marginBottom: 5 }}>
                <View style={{ width: "50%" }}>
                    <Text category="h6">{comment.nickname}</Text>
                </View>
                <View style={{ width: "50%", alignItems: "flex-end" }}>
                    <Text>{formatDate(comment.date)}</Text>
                </View>
            </View>
            <Text>{comment.comment}</Text>
            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 5,
                }}
            >
                <Button
                    style={{ width: "10%", margin: 2 }}
                    appearance="outline"
                    status={votedUp === 1 ? "warning" : "basic"}
                    size={"small"}
                    accessoryLeft={RateUpIcon}
                    onPress={up}
                />
                <Button
                    style={{ width: "10%", margin: 2 }}
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
                );
                dispatch(
                    setRatedComments({ commentID: comment.commentID, rated }),
                );
            } catch (e) {
                // Reset local state if the request failed
                setRating(oldRating);
                setVotedUp(oldVotedUp);
                Message.error(e, "Could not update this comment");
            }
        }
    }
}
