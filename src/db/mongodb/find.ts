// Import Item from "./models/Item";
import User from "./models/User";

export function findUser( userId ) {
  return User.aggregate( [
    { $match: { id: userId } },
    { $project: { id: 1, _id: 0 } },
  ] );
}

