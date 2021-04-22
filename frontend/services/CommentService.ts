import { AxiosInstance } from "axios";
import Comments, { RawComment } from "../models/Comment";

export default class CommentService {
    readonly axios;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

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

    addOne(
        comment: Omit<Comments, "commentID" | "date" | "rating">,
    ): Promise<Comments> {
        return this.axios
            .post(`/dumpsters/${comment.dumpsterID}/comments`, comment)
            .then(response => new Comments(response.data));
    }

    updateOne(
        dumpsterID: number,
        commentID: number,
        vote: number,
    ): Promise<Comments> {
        return this.axios
            .patch(`/dumpsters/${dumpsterID}/comments/${commentID}`, { vote })
            .then(response => response.data);
    }

    deleteOne(dumpsterID: number, commentID: number, userID: string) {
        return this.axios
            .delete(`/dumpsters/${dumpsterID}/comments/${commentID}/${userID}`)
            .then(response => response.data);
    }
}
