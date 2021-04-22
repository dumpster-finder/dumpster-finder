import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Input, Layout, Text } from "@ui-kitten/components";
import Comments from "../models/Comment";
import CommentCard from "../components/cards/CommentCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { currentDumpsterSelector } from "../redux/slices/dumpsterSlice";
import { CommentService } from "../services";
import {
    hideNegativeRatingSelector,
    nicknameSelector,
    ratedCommentsSelector,
} from "../redux/slices/configSlice";
import {
    CommentButtonIcon,
    PendingButtonIcon,
} from "../components/basicComponents/Icons";
import { useTranslation } from "react-i18next";

export default function CommentScreen() {
    const { t }: { t: (s: string) => string } = useTranslation("comment");
    const ratedComments = useSelector(ratedCommentsSelector);
    const hideNegativeRating = useSelector(hideNegativeRatingSelector);
    const [commentList, setCommentList] = useState<Comments[]>([]);
    const [pending, setPending] = useState(false);
    const dumpster = useSelector(currentDumpsterSelector);
    const nickname = useSelector(nicknameSelector);
    const myUserID = "temp1";

    useEffect(() => {
        if (dumpster)
            CommentService.getAllForDumpster(dumpster.dumpsterID, {
                showNegative: !hideNegativeRating,
            })
                .then(data => setCommentList(data))
                .catch(e => console.error("Could not fetch comments", e));
    }, [dumpster, hideNegativeRating]);

    const [comment, setComment] = useState("");
    return (
        <Layout>
            <ScrollView style={styles.scrollView}>
                <Text style={{ marginVertical: 4 }}>{nickname}</Text>
                <Input
                    multiline={true}
                    size="large"
                    textStyle={{ minHeight: 64, textAlignVertical: "top" }}
                    placeholder={t("comment")}
                    value={comment}
                    onChangeText={nextValue => setComment(nextValue)}
                />
                <Button
                    disabled={pending}
                    accessoryLeft={
                        pending ? PendingButtonIcon : CommentButtonIcon
                    }
                    onPress={handleSave}
                >
                    {t("add")}
                </Button>
                {commentList.map(value => (
                    <CommentCard
                        comment={value}
                        key={value.commentID}
                        voted={ratedComments[value.commentID]}
                        mine={value.userID === myUserID}
                        onDelete={removeComment}
                    />
                ))}
            </ScrollView>
        </Layout>
    );

    function removeComment(commentID: number) {
        setCommentList(oldArray =>
            [...oldArray].filter(comment => comment.commentID !== commentID),
        );
    }

    async function handleSave() {
        if (comment !== "" && dumpster) {
            const newComment: Omit<
                Comments,
                "commentID" | "date" | "rating"
            > = {
                dumpsterID: dumpster.dumpsterID,
                nickname: nickname,
                userID: myUserID,
                comment: comment,
            };
            try {
                setPending(true);
                await CommentService.addOne(newComment)
                    .then(data =>
                        setCommentList(oldArray => [data, ...oldArray]),
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
    scrollView: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        minHeight: "100%",
    },
});
