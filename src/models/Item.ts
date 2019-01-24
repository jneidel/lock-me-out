import Base from "./Base";

export default class Item extends Base {
  date: Date;

  validateDate( date ) {
    function isValidDate( date ) {
      return date && Object.prototype.toString.call( date ) === "[object Date]" && !isNaN( date );
    }

    if ( isValidDate( date ) )
      return date;
    else
      throw new Error( `The provided date '${date}' is not valid` );
  }

  private _name = "";

  get name(): string {
    return this._name === "" ? this.keyid : this._name;
  }

  set name( value: string ) {
    this._name = value;
  }

  constructor( date, keyid, name = "" ) {
    super( keyid );

    this.date = this.validateDate( date );
    this.name = name;
  }
}

