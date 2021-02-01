// this is a stupid example!
import {Model, Sequelize} from "sequelize";
import {MyModels} from "../models";
import {ThingCreationAttributes} from "../models/example";

export default function ({Things}: MyModels) {
    return {
        getOne: (id: number) =>
            Things.findOne({
                where: {
                    id: id,
                },
            }).then((thing) => thing),

        getAll: () => Things.findAll().then((thing) => thing),

        addOne: (user: ThingCreationAttributes) =>
            Things.create(user).then((data) => data),
    };
}
