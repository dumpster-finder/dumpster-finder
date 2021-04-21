
const userNameStop = 4; //how many words the username should be
const iterations = 25000;
const keylen = 100;
const digest = 'sha512';
const crypto = require('crypto');

export function hashUser(userId : string){
    let userName = getUserName(userId);
    return crypto.createHash("sha512").update(userName).digest("hex");
}

function getUserName(userID : string){
    let words = userID.split(" ");
    words.length = userNameStop;
    let userName = stringifyArray(words);
    return userName;
}

export function stringifyArray(words : string[]) : string{
    return words.join(" ")
}

export function generateSalt(){
    return crypto.randomBytes(16).toString('hex');
}

export function hashPassword(salt : string, password : string){
    return new Promise<string>((resolve, reject) => {

        crypto.pbkdf2(password, salt, iterations, keylen, digest, (err : Object, key :Buffer) => {
            if (err) {
                reject(err);
            } else {
                resolve(key.toString('hex'));
            }
        })
    });
}