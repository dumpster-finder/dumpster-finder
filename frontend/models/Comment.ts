class Comments {
    commentID: number;
    dumpsterID: number;
    nickname: string;
    comment: string;
    rating: number;
    date: string;

    constructor({
        commentID,
        dumpsterID,
        nickname,
        comment,
        rating,
        date,
    }: {
        commentID: number;
        dumpsterID: number;
        nickname: string;
        comment: string;
        rating: number;
        date: string;
    }) {
        this.commentID = commentID;
        this.dumpsterID = dumpsterID;
        this.nickname = nickname;
        this.comment = comment;
        this.rating = rating;
        this.date = date;
    }
}

export default Comments;
