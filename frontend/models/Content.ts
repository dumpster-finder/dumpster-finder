export interface RawContent {
    dumpsterID: number;
    tagID: number;
    name: string;
    amount: number;
    unit: string;
    quality: number;
    foundDate: string;
    expiryDate: string;
}

class Content {
    dumpsterID: number;
    tagID: number;
    name: string;
    amount: number;
    unit: string;
    quality: number;
    foundDate: Date;
    expiryDate: Date;

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
        this.foundDate = new Date(foundDate);
        this.expiryDate = new Date(expiryDate);
    }
}

export default Content;
