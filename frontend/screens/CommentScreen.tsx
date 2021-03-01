import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Input, Layout, Text } from "@ui-kitten/components";
import Comments from "../models/Comment";
import CommentCard from "../components/CommentCard";
import { useState } from "react";

export default function CommentScreen() {
    const a = new Comments({
        comment: "This was great",
        date: "02.03.2021",
        nickname: "Bunde",
        rating: 13,
    });
    const b = new Comments({
        comment: "It was empty",
        date: "03.03.2021",
        nickname: "Tore på sporet",
        rating: 5,
    });
    const c = new Comments({
        comment: "Found some wine",
        date: "03.02.2021",
        nickname: "Jon",
        rating: 13,
    });
    const d = new Comments({
        comment: "Fight me",
        date: "04.03.2021",
        nickname: "Me",
        rating: 13,
    });
    const myNick = "Anonym";

    const [commentList, setCommentList] = useState([a, b, c]);
    const [comment, setComment] = useState("");
    return (
        <Layout style={styles.container}>
            <View style={styles.view}>
                <Text>{myNick}</Text>
                <Input
                    multiline={true}
                    textStyle={{ minHeight: 64 }}
                    placeholder="Comment"
                    value={comment}
                    onChangeText={nextValue => setComment(nextValue)}
                />
                <Button onPress={addComment}>Add comment</Button>
            </View>
            <ScrollView style={styles.scrollView}>
                {commentList.map((value, index) => (
                    <CommentCard comment={value} key={index} />
                ))}
            </ScrollView>
        </Layout>
    );

    function addComment() {
        if (comment !== "") {
            setComment("");
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, "0");
            const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
            const yyyy = today.getFullYear();
            const date = dd + "/" + mm + "/" + yyyy;
            const newComment = new Comments({
                comment: comment,
                date: date,
                nickname: myNick,
                rating: 0,
            });
            commentList.push(newComment);
            setCommentList(commentList);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    view: {
        width: "95%",
        height: "30%",
    },
    scrollView: {
        flex: 1,
        width: "95%",
        height: "70%",
    },
});
