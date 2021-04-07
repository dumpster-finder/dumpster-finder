export interface RawComment {
    commentID: number;
    dumpsterID: number;
    nickname: string;
    comment: string;
    rating: number;
    date: string;
}

class Comments {
    commentID: number;
    dumpsterID: number;
    nickname: string;
    comment: string;
    rating: number;
    date: Date;

    constructor({
        commentID,
        dumpsterID,
        nickname,
        comment,
        rating,
        date,
    }: RawComment) {
        this.commentID = commentID;
        this.dumpsterID = dumpsterID;
        this.nickname = nickname;
        this.comment = comment;
        this.rating = rating;
        this.date = new Date(date);
    }
}

export default Comments;
