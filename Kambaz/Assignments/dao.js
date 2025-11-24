//create a find assignments dao function
import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {
  function findAllAssignments() {
    return db.assignments;
  }

  function findAssignmentsForCourse(courseId) {
    const { assignments } = db;
    return assignments.filter((assignment) => assignment.course === courseId);
  }
  //creating assignments function
  function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    db.assignments = [...db.assignments, newAssignment];
    return newAssignment;
  }

  return {
    createAssignment,
    findAllAssignments,
    findAssignmentsForCourse,
  };
}
