import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Input, Layout, Text } from "@ui-kitten/components";
import Comments from "../models/Comment";
import CommentCard from "../components/CommentCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { currentDumpsterSelector } from "../redux/slices/dumpsterSlice";
import { CommentService } from "../services";
import {
    nicknameSelector,
    ratedCommentsSelector,
} from "../redux/slices/configSlice";

export default function CommentScreen() {
    const ratedComments = useSelector(ratedCommentsSelector);

    const [commentList, setCommentList] = useState<Comments[]>([]);
    const [pending, setPending] = useState(false);
    const dumpster = useSelector(currentDumpsterSelector);
    const nickname = useSelector(nicknameSelector);

    useEffect(() => {
        if (dumpster)
            CommentService.getAllForDumpster(dumpster.dumpsterID).then(data =>
                setCommentList(data),
            );
    }, []);

    const [comment, setComment] = useState("");
    return (
        <Layout style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text>{nickname}</Text>
                <Input
                    multiline={true}
                    textStyle={{ minHeight: 64 }}
                    placeholder="Comment"
                    value={comment}
                    onChangeText={nextValue => setComment(nextValue)}
                />
                <Button disabled={pending} onPress={handleSave}>
                    Add comment
                </Button>
                {commentList.map(value => (
                    <CommentCard
                        comment={value}
                        key={value.commentID}
                        voted={ratedComments[value.commentID]}
                    />
                ))}
            </ScrollView>
        </Layout>
    );

    async function handleSave() {
        if (comment !== "" && dumpster) {
            const newComment: Omit<
                Comments,
                "commentID" | "date" | "rating"
            > = {
                dumpsterID: dumpster.dumpsterID,
                nickname: nickname,
                comment: comment,
            };
            try {
                setPending(true);
                await CommentService.addOne(newComment)
                    .then(data =>
                        setCommentList(oldArray => [...oldArray, data]),
                    )
                    .then(() => setPending(false))
                    .then(() => setComment(""));
            } catch (e) {
                // TODO Replace with better error handling
                console.error("Could not add this comment:", e);
                setPending(false);
            }
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    scrollView: {
        flex: 1,
        width: "95%",
        height: "70%",
    },
});
