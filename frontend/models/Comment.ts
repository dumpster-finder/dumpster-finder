class Comments {
    comment: string;
    date: string;
    nickname: string;
    rating: number;

    constructor({
        comment,
        date,
        nickname,
        rating,
    }: {
        comment: string;
        date: string;
        nickname: string;
        rating: number;
    }) {
        this.comment = comment;
        this.date = date;
        this.nickname = nickname;
        this.rating = rating;
    }
}

export default Comments;
