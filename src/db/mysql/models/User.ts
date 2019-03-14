import reservedUsernames from "../../reserved-usernames";
import { DEFAULT_KEYID } from "../../../util/secrets";

export default function createItem( sequelize, DataTypes ): {} {
  return sequelize.define( "User", {
    id: {
      type      : DataTypes.STRING,
      primaryKey: true,
      allowNull : false,
      validate  : {
        notIn: [ reservedUsernames ],
      },
    },
    keyid: {
      type        : DataTypes.STRING,
      defaultValue: DEFAULT_KEYID,
      allowNull   : false,
      validate    : {
        len: [ 8, 16, 40 ],
      },
    },
  }, {
    tableName: "users",
    indexes  : [
      {
        unique: true,
        fields: [ "id" ],
      },
    ],
  } );
}
