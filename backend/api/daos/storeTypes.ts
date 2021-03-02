import { MyModels } from "../models";

export default function ({ StoreTypes }: MyModels) {
    return {
        getAll: () =>
            StoreTypes.findAll().then(data =>
                data.map(({ storeTypeID, name }) => ({ storeTypeID, name })),
            ),
    };
}
