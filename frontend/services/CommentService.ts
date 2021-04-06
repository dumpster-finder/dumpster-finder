import { AxiosInstance } from "axios";
import Comments, { RawComment } from "../models/Comment";

export default class CommentService {
    readonly axios;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    getAllForDumpster(dumpsterID: number): Promise<Comments[]> {
        return this.axios
            .get(`/dumpsters/${dumpsterID}/comments`)
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
}
