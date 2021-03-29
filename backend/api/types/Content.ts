/**
 * One item a user has found in a dumpster.
 *
 * Note that dates *do* appear as instances of Date.
 */
export default interface Content {
    name: string;
    amount?: number | null; // | null because that's what Sequelize gives.
    unit?: string | null;
    quality?: number | null;
    expiryDate?: Date | null;
    foundDate: Date;
}
