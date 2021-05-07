import { MyModels } from "../models";

export default function ({ DumpsterTypes }: MyModels) {
    return {
        getAll: () =>
            DumpsterTypes.findAll().then(data =>
                data.map(({ dumpsterTypeID, name }) => ({ dumpsterTypeID, name })),
            ),
    };
}
