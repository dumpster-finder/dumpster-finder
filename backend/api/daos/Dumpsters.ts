// this is a stupid example!
import {MyModels} from "../models";

export default function ({Dumpsters}: MyModels) {
    return {
        getAllByDumpsterType: (id: number) => Dumpsters.findAll({ where: { dumpsterTypeID : id }}).then((thangs) => thangs),

        // this is why we want ThangCreationAttributes...
        addOne: (thang: any) =>
            Dumpsters.create(thang).then((data) => data),
    };
}
