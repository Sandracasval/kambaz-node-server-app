import UsersDao from "./dao.js";
//let currentUser = null;
//setup the routes as functions
let currentUser = null;
export default function UserRoutes(app) {
  const dao = UsersDao();
  //this function inserts a newuser into the database and returns the newly inserted
  //user which is sent back to the user interface in the response
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };

  //this route makes the deleteUser operation available to the rest of the API
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  //the route implemented below uses the findAllUsers function implemented by the DAO
  //to retrieve all users from the database
  //the route responds with the collection of users retrieved from the database
  //retrives users with that particual role
  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    if (name) {
      const users = await dao.findUsersByPartialName(name);
      res.json(users);
      return;
    }

    const users = await dao.findAllUsers();
    res.json(users);
  };

  //making the findUserbyId function available as a RESTful Web API
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  //make the DAO function available as a RESTFUL Web APi
  //make a route that accepts a user's primary key as a path parameter
  //passes the ID and request body to the DAO function and
  //responds with the status
  //IF THE USER UPDATES THEIR PROFILE, THEN THE SESSION MUST BE KEPT IN SYNCH
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const userUpdates = req.body;
    await dao.updateUser(userId, userUpdates);
    const currentUser = req.session["currentUser"];
    if (currentUser && currentUser._id === userId) {
      req.session["currentUser"] = { ...currentUser, ...userUpdates };
    }
    res.json(currentUser);
  };

  //expects a user with at least the properties username and password
  //if the user exists it throws an error
  //if the username is not already taken the user is inserted into the database and
  //stored in the currentUser server variable
  //the response includes the newly createdUser
  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }

    const currentUser = await dao.createUser(req.body);
    //storing the logged in user in the session
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  //extracts the username and password properties from the requests body and passes thn
  //to the findUserByCredentials function implemebted in the DAO.
  //the resulting user is stored in the server variable currentUser to remember the logged in user

  //an existing user can identify themselves by providing credentials
  //the signin route below looks up the user by their credentials, stores it in
  //current user session and responds with the user if they exists
  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };

  //IMPLENTING A ROUTE FOR USERS TO SIGNOUT THAT RESETS THE CURRENTUSER TO NULL IN THE
  //SERVER
  //users can be signed out by destroying the session
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  //CREATING A ROUTE ON THE SERVER TO PROVIDE ACCESS TO THE CURRENTUSER
  //if the user has already signed in, the currentUser can be retrieved from the
  //session by using the profile route as shown below, if there is no currentUserm
  //an error is returned
  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  //comment n

  app.get("/api/users", findAllUsers);
  app.get("/api/users", findAllUsers);
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}
