import { AxiosInstance } from "axios";
import Content, { RawContent } from "../models/Content";

export default class DumpsterService {
    readonly axios;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    /**
     * Fetches contents for a given dumpster
     *
     * @param dumpsterID ID of the dumpster to fetch contents for
     * @return           A promise which resolves to a list of dumpsters
     */
    getContents(dumpsterID: number) {
        console.log("Fetched content for dumpster", dumpsterID);
        return this.axios
            .get(`/dumpsters/${dumpsterID}/contents`)
            .then(response =>
                response.data.map((c: RawContent) => new Content(c)),
            );
    }

    /**
     * Updates a content entry for a dumpster
     *
     * @param dumpsterID ID of the dumpster that the entry is part of
     * @param content    An edited version of an existing content entry
     * @return           A promise which resolves to the updated content entry
     */
    updateContent(dumpsterID: number, content: Content): Promise<Content> {
        console.log("Updated content:", content);
        return this.axios
            .put(
                `/dumpsters/${dumpsterID}/contents/${
                    content.name
                }-${content.foundDate.toISOString()}`,
                content,
            )
            .then(response => new Content(response.data));
    }

    /**
     * Adds a content entry to a dumpster
     *
     * @param dumpsterID ID of the dumpster that the content will be added to
     * @param content    A content object without ID or found date
     */
    addContent(
        dumpsterID: number,
        content: Pick<Content, "name"> & Partial<Content>,
    ): Promise<Content> {
        console.log("Posted content:", content);
        return this.axios
            .post(`/dumpsters/${dumpsterID}/contents`, content)
            .then(response => new Content(response.data));
    }

    /**
     * Deletes a content entry from a dumpster
     *
     * @param dumpsterID ID of the dumpster that the content will be deleted from
     * @param content    A content object without ID or found date
     */
    removeContent(dumpsterID: number, content: Content): Promise<void> {
        console.log("Deleting content:", content);
        return this.axios
            .delete(
                `/dumpsters/${dumpsterID}/contents/${
                    content.name
                }-${content.foundDate.toISOString()}`,
            )
            .then(response => response.data);
    }
}
