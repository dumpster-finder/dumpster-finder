export interface RawContent {
    dumpsterID: number;
    tagID: number;
    name: string;
    amount: number;
    unit: string;
    quality: number;
    foundDate?: string;
    expiryDate: string;
}

class Content {
    readonly dumpsterID: number;
    readonly tagID: number;
    readonly name: string;
    readonly amount: number;
    readonly unit: string;
    readonly quality: number;
    readonly foundDate?: Date;
    readonly expiryDate?: Date;

    constructor({
        dumpsterID,
        tagID,
        name,
        amount,
        unit,
        quality,
        foundDate,
        expiryDate,
    }: RawContent) {
        this.dumpsterID = dumpsterID;
        this.tagID = tagID;
        this.name = name;
        this.amount = amount;
        this.unit = unit;
        this.quality = quality;
        if (foundDate) this.foundDate = new Date(foundDate);
        if (expiryDate) this.expiryDate = new Date(expiryDate);
    }
}

export default Content;
