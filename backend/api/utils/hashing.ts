const iterations = 25000;
const keylen = 100;
const digest = "sha512";
const crypto = require("crypto");

export function generateSalt() {
    return crypto.randomBytes(16).toString("hex");
}

export function hashPassword(salt: string, password: string) {
    return new Promise<string>((resolve, reject) => {
        crypto.pbkdf2(
            password,
            salt,
            iterations,
            keylen,
            digest,
            (err: Object, key: Buffer) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(key.toString("hex"));
                }
            },
        );
    });
}
