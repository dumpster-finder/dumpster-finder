export interface RawComment {
    commentID: number;
    dumpsterID: number;
    nickname: string;
    userID: number;
    comment: string;
    rating: number;
    date: string;
}

class Comments {
    commentID: number;
    dumpsterID: number;
    nickname: string;
    userID: number;
    comment: string;
    rating: number;
    date: Date;

    constructor({
        commentID,
        dumpsterID,
        nickname,
        userID,
        comment,
        rating,
        date,
    }: RawComment) {
        this.commentID = commentID;
        this.dumpsterID = dumpsterID;
        this.nickname = nickname;
        this.userID = userID;
        this.comment = comment;
        this.rating = rating;
        this.date = new Date(date);
    }
}

export default Comments;
