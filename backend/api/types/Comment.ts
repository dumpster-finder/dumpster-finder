export default interface Comment {
    commentID: number;
    dumpsterID: number;
    nickname: string;
    comment: string;
    rating: number;
    date: Date;
    mine: boolean;
}

export interface PostComment
    extends Omit<Comment, "commentID" | "mine" | "date" | "rating"> {
    userID: number;
}
