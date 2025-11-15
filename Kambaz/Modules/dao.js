import { v4 as uuidv4 } from "uuid";

export default function ModulesDao(db) {
  //updateModule updates a module in the Datbase by its ID.
  //First lookup the module by its ID
  //and then apply the updates to the module as shown
  function updateModule(moduleId, moduleUpdates) {
    const { modules } = db;
    const module = modules.find((module) => module._id === moduleId);
    Object.assign(module, moduleUpdates);
    return module;
  }

  //deleteModule removes a module from the Database by its ID as shown below
  function deleteModule(moduleId) {
    const { modules } = db;
    db.modules = modules.filter((module) => module._id !== moduleId);
  }

  //This retrievers a courses modules by its id
  //createModule accepts the new Module as a parameter, sets its primary key
  //and then appends the new Module to the Databases module array
  function createModule(module) {
    const newModule = { ...module, _id: uuidv4() };
    db.modules = [...db.modules, newModule];
    return newModule;
  }
  function findModulesForCourse(courseId) {
    const { modules } = db;
    return modules.filter((module) => module.course === courseId);
  }

  return {
    createModule,
    findModulesForCourse,
    deleteModule,
    updateModule
  };
}
