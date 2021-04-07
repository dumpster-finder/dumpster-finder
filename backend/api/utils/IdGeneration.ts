import {randomInt} from "crypto";

const fs = require("fs")
export let WordArray = [];
const wordCount = 6;
export function readWordsFromFile(){
    return WordArray = fs.readFileSync("wordsEnglish.txt").split('\n');
}

export function generateUserID(){
    const words = []
    for(var i = 0; i < wordCount; i++){
        words.push(WordArray[randomInt(0, WordArray.length)]);
    }
}


