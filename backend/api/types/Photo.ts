export default interface Photo {
    photoID: number;
    url: string;
    dateAdded: Date;
}

export interface PostPhoto {
    url: string;
    userID: number;
}
