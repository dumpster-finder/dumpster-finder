/**
 * One item a user has found in a dumpster.
 *
 * Note that dates *do* appear as instances of Date.
 */
export default interface Content {
    name: string;
    amount?: number;
    unit?: string;
    expiryDate?: Date;
    foundDate: Date;
}
