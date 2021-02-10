'use strict';

import sequelize from "sequelize";
import {DataTypes} from "sequelize/types";

module.exports = (sequelize, DataTypes) => {
    const Dumpster = sequelize.define('Dumpsters', {

    }, {});
Dumpster.associate = function(models) {
    Dumpster.belongsTo(models)
}
}