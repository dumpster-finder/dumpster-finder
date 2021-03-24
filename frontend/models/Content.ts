class Content {
    dumpsterID: number;
    tagID: number;
    name: string;
    amount: number;
    unit: string;
    quality: number;
    foundDate: string;
    expiryDate: string;

    constructor({
        dumpsterID,
        tagID,
        name,
        amount,
        unit,
        quality,
        foundDate,
        expiryDate,
    }: {
        dumpsterID: number;
        tagID: number;
        name: string;
        amount: number;
        unit: string;
        quality: number;
        foundDate: string;
        expiryDate: string;
    }) {
        this.dumpsterID = dumpsterID;
        this.tagID = tagID;
        this.name = name;
        this.amount = amount;
        this.unit = unit;
        this.quality = quality;
        this.foundDate = foundDate;
        this.expiryDate = expiryDate;
    }
}

export default Content;
