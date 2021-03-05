import Position from "./Position";

export default interface Place {
    readonly position: Position;
    readonly city: string;
    readonly name: string;
}
