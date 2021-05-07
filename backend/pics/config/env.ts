// Make sure that upload folder ends with a forward slash, since that's what the code uses
export const UPLOAD_FOLDER = process.env.PIC_FOLDER
    ? process.env.PIC_FOLDER + (process.env.PIC_FOLDER.endsWith("/") ? "" : "/")
    : "uploads/";

export const PIC_MAX_SIZE = process.env.PIC_MAX_SIZE
    ? parseInt(process.env.PIC_MAX_SIZE)
    : 4_000_000;
