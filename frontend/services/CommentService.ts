import { AxiosInstance } from "axios";
import Comments, { RawComment } from "../models/Comment";
import { packToken } from "../utils/token";

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
     * @param token   The current authentication token

     */
    addOne(
        comment: Omit<Comments, "commentID" | "userID" | "date" | "rating">,
        token: string,
    ): Promise<Comments> {
        return this.axios
            .post(
                `/dumpsters/${comment.dumpsterID}/comments`,
                comment,
                packToken(token),
            )
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
     * @param token      The current authentication token
     */
    updateOne(
        dumpsterID: number,
        commentID: number,
        vote: number,
        token: string,
    ): Promise<Comments> {
        return this.axios
            .patch(
                `/dumpsters/${dumpsterID}/comments/${commentID}`,
                { vote },
                packToken(token),
            )
            .then(response => response.data);
    }

    deleteOne(dumpsterID: number, commentID: number, token: string) {
        return this.axios
            .delete(
                `/dumpsters/${dumpsterID}/comments/${commentID}`,
                packToken(token),
            )
            .then(response => response.data);
    }
}
