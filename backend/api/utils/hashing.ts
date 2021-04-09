const userNameStop = 4 //how many words the username should be
const iterations = 25000
const crypto = require('crypto')

export function hashUser(userId : string){
    let userName = getUserName(userId);
    return crypto.createHash("sha512").update(userName).digest("hex");
}

function getUserName(userID : string){
    let words = userID.split(" ")
    words.length = userNameStop
    let userName = stringifyArray(words)
    return userName;
}

export function stringifyArray(words : string[]) : string{
    let userName = "";
    userName += words.shift()
    while(words.length>0){
        userName += " " + words.shift()
    }
    return userName;
}

export function generateSalt(){
    return crypto.randomBytes(16).toString('hex');
}

export function hashPassword(salt : string, password : string){
    let userName = crypto.pbkdf2Sync(password, salt, iterations,100, "sha512")
    return userName.toString("hex");
}

