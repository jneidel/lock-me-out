import uuid from "uuid/v4";
import { DEFAULT_KEYID } from "../../../util/secrets";

/*
 * Each encrypted password is described as an item
 */

export default function createItem( sequelize, DataTypes ): {} {
  return sequelize.define( "Item", {
    id: {
      type        : DataTypes.STRING,
      defaultValue: uuid(),
      primaryKey  : true,
      allowNull   : false,
      validate    : {
        isUUID: 4,
      },
    },
    date: {
      type     : DataTypes.DATE,
      allowNull: false,
    },
    keyid: {
      type        : DataTypes.STRING,
      defaultValue: DEFAULT_KEYID,
      allowNull   : false,
      validate    : {
        len: [ 8, 16 ],
      },
    },
    name: {
      type        : DataTypes.STRING,
      defaultValue: null,
      allowNull   : true,
      get() {
        const name = this.getDataValue( "name" );
        const keyid = this.getDataValue( "keyid" );

        return name === null ? keyid : name;
      },
      validate: {
        notEmpty: true,
      },
    },
    default: { // Will never be accessed directly
      get() {
        return DEFAULT_KEYID === this.getDataValue( "keyid" );
      },
      type        : DataTypes.BOOLEAN,
      defaultValue: true,
    },
    user: { // User this item belongs to
      type        : DataTypes.STRING,
      defaultValue: null,
      allowNull   : true,
    },
  }, {
    tableName: "items",
    indexes  : [
      {
        unique: true,
        fields: [ "id" ],
      },
    ],
  } );
}
