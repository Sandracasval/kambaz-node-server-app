//yhis example declares an assignment object accessible at the route /lab5/assignment
const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};

//making a module object
const module = {
  id: 5,
  name: "September Module",
  description: "Where the assignments for September will be stored",
  course: "ARTF 2000",
};

//THE SERVER ISNT USING ANYTHING FROM THE REQUEST (LIKE PARAMETERS OR QUERY)
//IT JUST SENDS BACK THE JSON OBJECT
export default function WorkingWithObjects(app) {
  const getAssignment = (req, res) => {
    res.json(assignment);
  };
  //this is where we add the new code
  const getAssignmentTitle = (req, res) => {
    res.json(assignment.title);
  };
  //new function that modifyes objects in a server
  //this one retruves the new title from the path and updates the assignments object title
  //property
  const setAssignmentTitle = (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  };
  //CHANGING THE MODULE NAME FUNCTION
  const setModuleName = (req, res) => {
    const { newName } = req.params;
    module.name = newName;
    res.json(module);
  };
  //CHANGING THE SCORE OF THE ASSIGNMENT
  const setAssignmentScore = (req, res) => {
    const { newScore } = req.params;
    assignment.score = newScore;
    res.json(assignment);
  };
  //CHANGING THE COMPLETED PROPERTY OF THE ASSIGNMENT
  const setAssignmentCompleted = (req, res) => {
    const { newCompleted } = req.params;
    assignment.completed = newCompleted;
    res.json(assignment);
  };
  //CHANGING THE DESCRIPTION OF THE MODULE
  const setModuleDescription = (req, res) => {
    const { newDescription } = req.params;
    module.description = newDescription;
    res.json(module);
  };

  //making get module
  const getModule = (req, res) => {
    res.json(module);
  };
  //making get name
  const getModuleName = (req, res) => {
    res.json(module.name);
  };
  app.get("/lab5/module/description/:newDescription", setModuleDescription);
  app.get("/lab5/assignment/score/:newScore", setAssignmentScore);
  app.get("/lab5/assignment/completed/:newCompleted", setAssignmentCompleted);
  app.get("/lab5/module/name", getModuleName);
  app.get("/lab5/module", getModule);
  app.get("/lab5/assignment/title/:newTitle", setAssignmentTitle);
  app.get("/lab5/module/name/:newName", setModuleName);
  app.get("/lab5/assignment/title", getAssignmentTitle);
  app.get("/lab5/assignment", getAssignment);
}
