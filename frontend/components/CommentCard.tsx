import * as React from "react";
import Comments from "../models/Comment";
import { Button, Card, Text } from "@ui-kitten/components";
import { View } from "react-native";
import { ArrowDownIcon, ArrowUpIcon } from "./Icons";
import { useState } from "react";

export default function CommentCard({ comment }: { comment: Comments }) {
    const [rating, setRating] = useState(comment.rating);
    const [votedUp, setVotedUp] = useState(0);
    return (
        <Card style={{ width: "100%", marginVertical: 5 }}>
            <View style={{ flex: 1, flexDirection: "row", marginBottom: 5 }}>
                <View style={{ width: "50%" }}>
                    <Text category='h6'>{comment.nickname}</Text>
                </View>
                <View style={{ width: "50%", alignItems: "flex-end"}}>
                    <Text>{comment.date}</Text>
                </View>
            </View>
            <Text>{comment.comment}</Text>
            <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center", marginTop: 5}}
            >
                <Button
                    style={{ width: "10%", margin: 2 }}
                    appearance="outline"
                    status={votedUp === 1 ? "warning":"basic"}
                    size={"small"}
                    accessoryLeft={ArrowUpIcon}
                    onPress={up}
                />
                <Button
                    style={{ width: "10%", margin: 2 }}
                    appearance="outline"
                    size={"small"}
                    status={votedUp === -1 ? "warning":"basic"}
                    accessoryLeft={ArrowDownIcon}
                    onPress={down}
                />
                <View style={{marginHorizontal: 5}}>
                    <Text>{rating}</Text>
                </View>
            </View>
        </Card>
    );

    function up() {
        if (votedUp === -1) {
            setRating(rating + 2);
            setVotedUp(1)
        }else if (votedUp === 0){
            setRating(rating + 1);
            setVotedUp(1)
        }else{
            setRating(comment.rating)
            setVotedUp(0)
        }

    }

    function down() {
        if (votedUp === 1) {
            setRating(rating - 2);
            setVotedUp(-1)
        }else if (votedUp === 0){
            setRating(rating - 1);
            setVotedUp(-1)
        }else{
            setRating(comment.rating)
            setVotedUp(0)
        }

    }
}
