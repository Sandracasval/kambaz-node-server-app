import { v4 as uuidv4 } from "uuid";
import model from "../Courses/model.js";

export default function ModulesDao(db) {
  //updateModule updates a module in the Datbase by its ID.
  //First lookup the module by its ID
  //and then apply the updates to the module as shown
  async function updateModule(courseId, moduleId, moduleUpdates) {
    const course = await model.findById(courseId);
    const module = course.modules.id(moduleId);
    Object.assign(module, moduleUpdates);
    await course.save();
    return module;
  }

  //deleteModule removes a module from the Database by its ID as shown below
  async function deleteModule(courseId, moduleId) {
    const status = await model.updateOne(
      { _id: courseId },
      { $pull: { modules: { _id: moduleId } } }
    );
    return status;
  }

  //This retrievers a courses modules by its id
  //createModule accepts the new Module as a parameter, sets its primary key
  //and then appends the new Module to the Databases module array

  async function createModule(courseId, module) {
    const newModule = { ...module, _id: uuidv4() };
    const status = await model.updateOne(
      { _id: courseId },
      { $push: { modules: newModule } }
    );
    return newModule;
  }

  async function findModulesForCourse(courseId) {
    const course = await model.findById(courseId);
    return course.modules;
  }

  return {
    createModule,
    findModulesForCourse,
    deleteModule,
    updateModule,
  };
}
