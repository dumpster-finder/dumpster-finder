import { MyModels } from "../models";

export default function ({ Categories }: MyModels) {
    return {
        getAll: () =>
            Categories.findAll().then(data =>
                data.map(({ categoryID, name }) => ({ categoryID, name })),
            ),
    };
}
