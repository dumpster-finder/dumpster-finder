import {TAlgorithm} from "jwt-simple";

export interface Session {
    id: number;
    /**
     * Timestamp indicating when the session should expire, in Unix milliseconds.
     */
    expires: number;
}

export function encodeToken(userID : string){
        // Always use HS512 to sign the token
        const algorithm: TAlgorithm = "HS512";
        // Determine when the token should expire
        const issued = Date.now();
        const fifteenMinutesInMs = 15 * 60 * 1000;
        const expires = issued + fifteenMinutesInMs;

}

export function decodeToken(token : string){

}

function check(){

}