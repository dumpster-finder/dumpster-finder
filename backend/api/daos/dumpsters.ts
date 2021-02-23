// this is a stupid example!
import {MyModels} from "../models";

export default function ({Dumpsters}: MyModels) {
    return {
        getAll: () => Dumpsters.findAll().then((dumpsters) => dumpsters),

        getAllByDumpsterType: (id: number) => Dumpsters.findAll({ where: { dumpsterTypeID : id }}).then((dumpsters) => dumpsters),

        // this is why we want ThangCreationAttributes...
        addOne: (thang: any) =>
            Dumpsters.create(thang).then((data) => data),
    };
}
