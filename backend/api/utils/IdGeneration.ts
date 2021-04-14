import {randomInt} from "crypto";
import {stringifyArray } from "./hashing";
import {logger} from "../server";
const fs = require("fs");

export let wordArray : string[] = [];
export let wordCount : number = 6;

export function readWordsFromFile(url : string){
    wordArray = fs.readFileSync(url, 'utf-8').split(/\r\n|\n|\r/);
    return wordArray
}

export function generateUserID() : string{
    let words : string[] = [];
    for(var i = 0; i < wordCount; i++){
        words.push(wordArray[randomInt(0, wordArray.length)]);
    }
    return stringifyArray(words);
}