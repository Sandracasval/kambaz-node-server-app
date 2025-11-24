import model from "./model.js";
import { v4 as uuidv4 } from "uuid";
export default function UsersDao(db) {
  //let { users } = db;
  //the createUser DAO function accepts a user ibject from the user interface and the
  //inserts the user into the Database

  //insert a new user oject into the users collection
  const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    return model.create(newUser);
  };

  const findAllUsers = () => model.find();
  //this function retrieves a user document by its primary key
  const findUserById = (userId) => model.findById(userId);
  const findUserByUsername = (username) =>
    model.findOne({ username: username });
  const findUserByCredentials = (username, password) =>
    model.findOne({ username, password });

  //updates a singl document by first identifying it by its primary key and then
  //updating the matching fields in the user parameter
  const updateUser = (userId, user) =>
    model.updateOne({ _id: userId }, { $set: user });

  const deleteUser = (userId) => model.findByIdAndDelete(userId);

  //findUsersByRole filters the users collection by the role propert
  //the find funcgion takes as argument a json oject in this case role
  const findUsersByRole = (role) => model.find({ role: role });
  //filtering users by their first or lastName by creating a regular
  //expression used to pattern match the firstName or lastName fields of the
  //documents in the users collection
  const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
    return model.find({
      $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
    });
  };

  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    updateUser,
    deleteUser,
    findUsersByRole,
    findUsersByPartialName,
  };
}
