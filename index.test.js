import canRegisterForCourse from "./index.js";

// array of courses
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
  {
    // unique integer
    id: 1,

    // string, unique course name
    name: "english200",

    prereqs: {
      // array of other course IDs that all need to be completed before this course
      allOf: ["english101", "english102", "english103"],

      // array of other course IDs where at least one needs to be completed before this course - could be empty
      oneOf: ["shortstories101"],
    },
  },
  {
    // unique integer
    id: 2,

    // string, unique course name
    name: "science200",

    prereqs: {
      // array of other course IDs that all need to be completed before this course
      allOf: ["science101", "science102", "science103"],

      // array of other course IDs where at least one needs to be completed before this course - could be empty
      oneOf: [],
    },
  },
];

test("can a user register for math200 - yes", () => {
  let completedCourseIds = ["math101", "math102", "math103", "shortstories101"];

  let res = canRegisterForCourse(catalog, "math200", completedCourseIds);
  expect(res).toBe(true);
});

test("can a user register for math200 - no", () => {
  let completedCourseIds = ["math101", "math103", "shortstories101"];

  let res = canRegisterForCourse(catalog, "math200", completedCourseIds);
  expect(res).toBe(false);
});

test("can a user register for english200 - no", () => {
  let completedCourseIds = ["english101", "shortstories101"];

  let res = canRegisterForCourse(catalog, "english200", completedCourseIds);
  expect(res).toBe(false);
});

test("can a user register for science200 - yes", () => {
  let completedCourseIds = ["science101", "science102", "science103"];

  let res = canRegisterForCourse(catalog, "science200", completedCourseIds);
  expect(res).toBe(true);
});

test("can a user register for science200 - no", () => {
  let completedCourseIds = ["science103", "science101"];

  let res = canRegisterForCourse(catalog, "science200", completedCourseIds);
  expect(res).toBe(false);
});
