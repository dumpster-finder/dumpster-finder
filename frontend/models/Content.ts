export interface RawContent {
    name: string;
    amount?: number | null;
    unit?: string | null;
    quality?: number | null;
    expiryDate?: string | Date | null;
    foundDate: string | Date;
}

class Content {
    readonly name: string;
    readonly amount?: number | null;
    readonly unit?: string | null;
    readonly quality?: number | null;
    readonly expiryDate?: Date | null;
    readonly foundDate: Date;

    constructor({
        name,
        amount,
        unit,
        quality,
        foundDate,
        expiryDate,
    }: RawContent) {
        this.name = name;
        this.amount = amount;
        this.unit = unit;
        this.quality = quality;
        this.foundDate = new Date(foundDate);
        if (expiryDate) this.expiryDate = new Date(expiryDate);
    }

    equals(other: Content) {
        return (
            other === this ||
            (other.name === this.name &&
                other.foundDate.getTime() === this.foundDate.getTime())
        );
    }
}

export default Content;
