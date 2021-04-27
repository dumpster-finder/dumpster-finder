import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";

export interface UserAttributes {
    userID : number;
    passwordHash : string;
    userName : string;
    salt : string;
}

export interface UserCreationAttributes
    extends Optional<UserAttributes, "userID"> {}

class Users
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
    userID!: number;
    passwordHash!: string;
    userName!: string;
    salt!: string;
}


// Inject Sequelize
export function init(sequelize: Sequelize) {
    Users.init(
        {
            userID : {
                type: DataTypes.NUMBER,
                primaryKey: true,
                autoIncrement: true,
            },
            passwordHash : {
                type: DataTypes.STRING,
                unique: true,
            },
            userName : {
                type: DataTypes.STRING,
                unique: true,
            },
            salt : {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            tableName: "Users",
        },
    );
    // do associations like
    // Thing.hasMany()
    return Users;
}
export function associate({
                              Dumpsters,
    Photos,
    Ratings,
    PhotoReports,
    DumpsterReports
                          }: {
    Dumpsters: ModelStatic<Model<any, any>>;
    Photos: ModelStatic<Model<any, any>>;
    Ratings: ModelStatic<Model<any, any>>;
    PhotoReports: ModelStatic<Model<any, any>>;
    DumpsterReports: ModelStatic<Model<any, any>>;
}) {
    // do associations like
    // Thing.hasMany()
    // using the supplied Models object
    Users.hasMany(Dumpsters, { foreignKey: "userID"});
    Users.hasMany(Photos, { foreignKey: "userID"});
    Users.hasMany(Ratings, { foreignKey: "userID"});
    Users.hasMany(PhotoReports, { foreignKey: "userID"});
    Users.hasMany(DumpsterReports, { foreignKey: "userID"});
}