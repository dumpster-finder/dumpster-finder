import Position from "./Position";
import _ from "lodash";

export default class Place {
    readonly position: Position;
    readonly name?: string;
    readonly city?: string;
    readonly state?: string;
    readonly country?: string;

    constructor({
        position,
        name,
        city,
        state,
        country,
    }: {
        position: Position;
        name?: string;
        city?: string;
        state?: string;
        country?: string;
    }) {
        this.position = position;
        this.name = name;
        this.city = city;
        this.state = state;
        this.country = country;
    }

    toString() {
        return _.uniq(
            [this.name, this.city, this.state, this.country].filter(Boolean),
        ).join(", ");
    }
}
