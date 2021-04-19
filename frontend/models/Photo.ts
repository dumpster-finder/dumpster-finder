export interface RawPhoto {
    photoID: number;
    url: string;
    dateAdded: string;
}

export default class Photo {
    photoID: number;
    url: string;
    dateAdded: Date;

    constructor({ photoID, url, dateAdded }: RawPhoto) {
        this.photoID = photoID;
        this.url = url;
        this.dateAdded = new Date(dateAdded);
    }
}
