import ModulesDao from "../Modules/dao.js";
export default function ModulesRoutes(app, db) {
  const dao = ModulesDao(db);
  //this parses the courseID from the path and then uses the function from the DAO
  //to retrieve the moduesl for that course 22
  const findModulesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const modules = await dao.findModulesForCourse(courseId);
    res.json(modules);
  };
  //parse the course's id from the path and the new module from the
  //request's body.
  //set the new module's course;s property to the courseID so that the module
  //knows what course it belongs to
  //use the module's DAO's createModule function to create the new module
  //and then respond with the new module
  const createModuleForCourse = async (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
    };
    const newModule = await dao.createModule(courseId, module);
    res.send(newModule);
  };
  //implement a route that handles an HTTP DELETE t o remove a module by its ID. Parse
  //the modules ID from the path and use the DAO's deleteModule function
  //to remove the module from the Database
  const deleteModule = async (req, res) => {
    const { courseId, moduleId } = req.params;
    const status = await dao.deleteModule(courseId, moduleId);
    res.send(status);
  };

  const updateModule = async (req, res) => {
    const { courseId, moduleId } = req.params;
    const moduleUpdates = req.body;
    const status = await dao.updateModule(courseId, moduleId, req.body);
    res.send(status);
  };

  //prrses the ID of the cuorse from the URL and the module updates
  //from the HTTP request body. Use the DAO's updateModule function
  //to apply the updates to the modu

  app.put("/api/courses/:courseId/modules/:moduleId", updateModule);

  app.delete("/api/courses/:courseId/modules/:moduleId", deleteModule);

  app.post("/api/courses/:courseId/modules", createModuleForCourse);
  app.get("/api/courses/:courseId/modules", findModulesForCourse);
}
