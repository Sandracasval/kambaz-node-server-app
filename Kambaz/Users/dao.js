import { v4 as uuidv4 } from "uuid";
export default function UsersDao(db) {
  let { users } = db;
  //the createUser DAO function accepts a user ibject from the user interface and the 
  //inserts the user into the Database 
  const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    users = [...users, newUser];
    return newUser;
  };
  const findAllUsers = () => users;
  const findUserById = (userId) => users.find((user) => user._id === userId);
  //accepts a username from the user interface and finds the user with a matching username
  const findUserByUsername = (username) =>
    users.find((user) => user.username === username);
  const findUserByCredentials = (username, password) =>
    users.find(
      (user) => user.username === username && user.password === password
    );
    //this updates a single user by first identifying it by its primary key 
    //and then updating the matching field in the user paraemeter
  const updateUser = (userId, user) =>
    (users = users.map((u) => (u._id === userId ? user : u)));
  const deleteUser = (userId) =>
    (users = users.filter((u) => u._id !== userId));
  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    updateUser,
    deleteUser,
  };
}
