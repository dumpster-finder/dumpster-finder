import { AxiosInstance } from "axios";
import Comments, { PostComment, RawComment } from "../models/Comment";

export default class CommentService {
    readonly axios;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    /**
     * Fetches all comments for a dumpster
     *
     * @param dumpsterID   ID of the dumpster
     * @param showNegative boolean to tell if negative rated comments should be shown
     */
    getAllForDumpster(
        dumpsterID: number,
        { showNegative = false },
    ): Promise<Comments[]> {
        return this.axios
            .get(
                `/dumpsters/${dumpsterID}/comments?showNegative=${showNegative ||
                    false}`,
            )
            .then(response =>
                response.data.map(
                    (comment: RawComment) => new Comments(comment),
                ),
            );
    }

    /**
     * Adds a comment from a given user
     *
     * @param comment A comment with the data sent by the user
     */
    addOne(comment: PostComment): Promise<Comments> {
        return this.axios
            .post(`/dumpsters/${comment.dumpsterID}/comments`, comment)
            .then(response => {
                console.log(response.data.date);
                return new Comments(response.data);
            });
    }

    /**
     * Fetches all reports for given dumpster
     *
     * @param dumpsterID ID of the dumpster the comment belongs to
     * @param commentID  ID of the comment that is rated
     * @param vote       The number the registered rating should be changed with
     */
    updateOne(
        dumpsterID: number,
        commentID: number,
        vote: number,
    ): Promise<Comments> {
        return this.axios
            .patch(`/dumpsters/${dumpsterID}/comments/${commentID}`, { vote })
            .then(response => response.data);
    }

    deleteOne(dumpsterID: number, commentID: number) {
        return this.axios
            .delete(`/dumpsters/${dumpsterID}/comments/${commentID}`)
            .then(response => response.data);
    }
}
