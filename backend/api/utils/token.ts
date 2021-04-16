import {encode, decode, TAlgorithm} from "jwt-simple";

export interface Session {
    id: number;
    /**
     * Timestamp indicating when the session should expire, in Unix milliseconds.
     */
    expires: number;
}

export function encodeToken(userID : number){
        // Always use HS512 to sign the token
        const algorithm: TAlgorithm = "HS512";
        // Determine when the token should expire
        const issued = Date.now();
        const thirtyMinutesInMs = 30 * 60 * 1000;
        const expires = issued + thirtyMinutesInMs;
        const session:Session={
            id: userID,
            expires: expires
        }
        let token = encode(session, process.env.TOKEN_SECRET || "you should get a token secret", algorithm);
        return token

}

export function decodeToken(token : string){

}

function check(){

}