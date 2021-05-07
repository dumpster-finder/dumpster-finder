export interface RawComment {
    commentID: number;
    dumpsterID: number;
    nickname: string;
    userID: number;
    comment: string;
    rating: number;
    date: string;
    mine: boolean;
}

class Comments {
    commentID: number;
    dumpsterID: number;
    nickname: string;
    userID: number;
    comment: string;
    rating: number;
    date: Date;
    mine: boolean;

    constructor({
        commentID,
        dumpsterID,
        nickname,
        userID,
        comment,
        rating,
        date,
        mine,
    }: RawComment) {
        this.commentID = commentID;
        this.dumpsterID = dumpsterID;
        this.nickname = nickname;
        this.userID = userID;
        this.comment = comment;
        this.rating = rating;
        this.date = new Date(date);
        this.mine = mine;
    }
}

export default Comments;

export type PostComment = Omit<
    Comments,
    "commentID" | "userID" | "date" | "rating" | "mine"
>;
