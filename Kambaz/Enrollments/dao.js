import { v4 as uuidv4 } from "uuid";
//when a user is created, it needs to be associated with the creator
//this enrolls or associates a user to the course
export default function EnrollmentsDao(db) {
  function enrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
  }
  return { enrollUserInCourse };
}
