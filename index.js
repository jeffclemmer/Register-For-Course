// At Eloyce University, software is used to help students efficiently register for courses each semester. The course catalog is an array of course objects with this data structure is this:
// array of courses
/* 
let catalog = [
  {
    // unique integer
    id: 0,

    // string, unique course name
    name: "math200",

    prereqs: {
      // array of other course IDs that all need to be completed before this course
      allOf: ["math101", "math102", "math103"],

      // array of other course IDs where at least one needs to be completed before this course - could be empty
      oneOf: ["english101", "shortstories101"],
    },
  },
];
*/

// Write a canRegisterForCourse( catalog, courseId, completedCourseIds ) function which determines whether a student can register for a course based on their previously completed courses. This function should return a boolean, true if any/all prerequisite courses have been completed and otherwise false.

/* 
the way this is built, it could return a list of prereqs the 
student would still need to take because it filters out any
classes that the student has already taken.  if anything is left,
  number 1, we know that the student needs to complete prereqs, and 
  number 2, we know what prereqs are needed for them to complete
*/

function canRegisterForCourse(catalog, courseId, completedCourseIds) {
  let course = catalog.find((item) => item.name == courseId);

  // if we found an object
  if (course !== undefined) {
    // we filter out any courses that have been completed
    // and we're left with only prereqs that haven't
    // been completed. if we are left with an empty array,
    // then we know they are good to take the next course.
    let allOfFilter = course.prereqs.allOf.filter((item) => {
      return !completedCourseIds.includes(item);
    });

    // if the course has an array of "oneOf", check for
    // other prereqs
    if (course.prereqs.oneOf.length > 0) {
      let oneOfFilter = course.prereqs.oneOf.find((item) =>
        completedCourseIds.includes(item)
      );

      // if allOfFilter.length == 0 and oneOfFilter contains a
      // string, then we have no prereqs left so return true.
      // the student can take this class
      if (allOfFilter.length == 0 && oneOfFilter !== "") {
        return true;
      }
      return false;
    } else if (allOfFilter.length == 0) {
      // if allOfFilter.length == 0 then we have no prereqs left
      // so return true.  the student can take this class
      return true;
    }

    return false;
  }

  // course not found - should probably throw here
  return false;
}

export default canRegisterForCourse;
