import Item from "./models/Item";
import User from "./models/User";

export function findUser( userId ) {
  return User.aggregate( [
    { $match: { id: userId } },
    { $project: { id: 1, keyid: 1, _id: 0 } },
  ] );
}

export function findItem( itemId ) {
  return Item.aggregate( [
    { $match: { id: itemId } },
    { $project: { date: 1, name: 1, user: 1, keyid: 1, encryptedValue: 1, _id: 0 } },
  ] );
}

export function findUserItems( userId ) {
  return Item.aggregate( [
    { $match: { user: userId } },
    { $project: { id: 1, date: 1, name: 1, _id: 0 } },
  ] );
}

