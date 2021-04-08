import * as React from "react";
import Comments from "../models/Comment";
import { Button, Card, Text } from "@ui-kitten/components";
import { View } from "react-native";
import { RateDownIcon, RateUpIcon } from "./Icons";
import { useState } from "react";
import { CommentService } from "../services";
import { useAppDispatch } from "../redux/store";
import { setRatedComments } from "../redux/slices/configSlice";
import { formatDate } from "../utils/date";

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

    function up() {
        if (votedUp === -1) {
            setRating(rating + 2);
            setVotedUp(1);
            handleSave(2).then(r => r);
            dispatch(
                setRatedComments({ commentID: comment.commentID, rated: 1 }),
            );
        } else if (votedUp === 0) {
            setRating(rating + 1);
            setVotedUp(1);
            handleSave(1).then(r => r);
            dispatch(
                setRatedComments({ commentID: comment.commentID, rated: 1 }),
            );
        } else {
            setRating(rating - 1);
            setVotedUp(0);
            handleSave(-1).then(r => r);
            dispatch(
                setRatedComments({ commentID: comment.commentID, rated: 0 }),
            );
        }
    }

    function down() {
        if (votedUp === 1) {
            setRating(rating - 2);
            setVotedUp(-1);
            handleSave(-2).then(r => r);
            dispatch(
                setRatedComments({ commentID: comment.commentID, rated: -1 }),
            );
        } else if (votedUp === 0) {
            setRating(rating - 1);
            setVotedUp(-1);
            handleSave(-1).then(r => r);
            dispatch(
                setRatedComments({ commentID: comment.commentID, rated: -1 }),
            );
        } else {
            setRating(rating + 1);
            setVotedUp(0);
            handleSave(1).then(r => r);
            dispatch(
                setRatedComments({ commentID: comment.commentID, rated: 0 }),
            );
        }
    }

    async function handleSave(vote: number) {
        if (vote != 0 && vote < 3 && vote > -3) {
            try {
                const updatedComment = await CommentService.updateOne(
                    comment.dumpsterID,
                    comment.commentID,
                    vote,
                );
                console.log(updatedComment);
            } catch (e) {
                // TODO Replace with better error handling
                console.error("Could not update this comment:", e);
            }
        }
    }
}
