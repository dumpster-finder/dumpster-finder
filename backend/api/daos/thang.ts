// this is a stupid example!
import {MyModels} from "../models";

export default function ({Thangs}: MyModels) {
    return {
        getAllByThing: (id: number) => Thangs.findAll({ where: { thingID: id }}).then((thangs) => thangs),

        // this is why we want ThangCreationAttributes...
        addOne: (thang: any) =>
            Thangs.create(thang).then((data) => data),
    };
}
