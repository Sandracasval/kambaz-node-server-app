import UsersDao from "./dao.js";
//let currentUser = null;
//setup the routes as functions
export default function UserRoutes(app, db) {
  const dao = UsersDao(db);
  const createUser = (req, res) => {};
  const deleteUser = (req, res) => {};
  const findAllUsers = (req, res) => {};
  const findUserById = (req, res) => {};
  //make the DAO function available as a RESTFUL Web APi
  //make a route that accepts a user's primary key as a path parameter
  //passes the ID and request body to the DAO function and
  //responds with the status
  //IF THE USER UPDATES THEIR PROFILE, THEN THE SESSION MUST BE KEPT IN SYNCH
  const updateUser = (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    dao.updateUser(userId, userUpdates);
    const currentUser = dao.findUserById(userId);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  //expects a user with at least the properties username and password
  //if the user exists it throws an error
  //if the username is not already taken the user is inserted into the database and
  //stored in the currentUser server variable
  //the response includes the newly createdUser
  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }

    const currentUser = dao.createUser(req.body);
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
  const signin = (req, res) => {
    const { username, password } = req.body;
    const currentUser = dao.findUserByCredentials(username, password);
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
