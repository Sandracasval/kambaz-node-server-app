import CoursesDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";
import db from "../Database/index.js";
export default function CourseRoutes(app) {
  const dao = CoursesDao(db);

  //createCourse creates a new course and enrolls the currentUser in the newCourse
  //so that it can be rendered in the user interface
  const enrollmentsDao = EnrollmentsDao(db);

  const createCourse = async (req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = await dao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  };

  //since enrolled courses are retrieved within the context of the currently logged in user
  //implement the following route to retrieve the courses in the user route
  //calling the dao version of the function which reads from the database
  const findCoursesForEnrolledUser = async (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = await enrollmentsDao.findCoursesForUser(userId);
    res.json(courses);
  };

  //this delete route parses the course's ID from the url and uses the deleteCourse
  //DAO funciton as shown below.

  const deleteCourse = async (req, res) => {
    const { courseId } = req.params;
    await enrollmentsDao.unenrollAllUsersFromCourse(courseId);
    const status = await dao.deleteCourse(courseId);
    res.send(status);
  };

  //implementing  a put route that parses the id of the course as a path parameter
  //and uses the updateCourse DAO function to update the corresponding course
  //with the updates in HTTP request body
  //if the update is succesful, respond with a status 204
  const updateCourse = async (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = await dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  };

  app.put("/api/courses/:courseId", updateCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.get("/api/courses", findAllCourses);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/users/current/courses", createCourse);
}
