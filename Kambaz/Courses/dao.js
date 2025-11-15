import { v4 as uuidv4 } from "uuid";
//IMPLEMENT A DAO TO RETRIEVE ALL COURSES FROM THE DATABASE
export default function CoursesDao(db) {
  function findAllCourses() {
    return db.courses;
  }

  //RETRIEVES THE COURSES THAT THE CURRENT USER IS ENROLLED IN
  function findCoursesForEnrolledUser(userId) {
    const { courses, enrollments } = db;
    const enrolledCourses = courses.filter((course) =>
      enrollments.some(
        (enrollment) =>
          enrollment.user === userId && enrollment.course === course._id
      )
    );
    return enrolledCourses;
  }

  //implement a route that creates a new course and adds it to the Database
  //this new course is passed in the HTTTP body from the client and is appended
  //to the end of the courses array in the Database
  //the new course is given a new unique identifier and sent back to the client in the
  //response
  function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    db.courses = [...db.courses, newCourse];
    return newCourse;
  }

  //implement a route that removes a course and all enrollments associated with
  //the course. First implement a deleteCourse DAO function that filters the course
  //by its ID and then filters out all enrollments by by the courses id.
  //the filter function removes the course and the associated enrollments
  function deleteCourse(courseId) {
    const { courses, enrollments } = db;
    db.courses = courses.filter((course) => course._id !== courseId);
    db.enrollments = enrollments.filter(
      (enrollment) => enrollment.course !== courseId
    );
  }

  //this function updates a course in the Database
  //by first looking up the course by its ID, then applying the updates to the course
  //as shown belo
  function updateCourse(courseId, courseUpdates) {
    const { courses } = db;
    const course = courses.find((course) => course._id === courseId);
    Object.assign(course, courseUpdates);
    return course;
  }

  return {
    findAllCourses,
    findCoursesForEnrolledUser,
    createCourse,
    deleteCourse,
    updateCourse,
  };
}
