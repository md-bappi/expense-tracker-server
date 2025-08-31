const exress = require("express");
const {
  getAllProjects,
  postNewProject,
  updateProject,
  getSingleProject,
} = require("../controllers/projectController");
const projectValidator = require("../middlewares/projectValidator");
const verifyToken = require("../middlewares/verifyToken");
const projectRoute = exress.Router();

// get all projects for a user
projectRoute.get("/all-projects", verifyToken, getAllProjects);

// create a new project for a user
projectRoute.post(
  "/create-project",
  projectValidator,
  verifyToken,
  postNewProject
);

// single project for a user by id
projectRoute.get("/all-projects/:id", verifyToken, getSingleProject);

projectRoute.put(
  "/update-project/:id",
  projectValidator,
  verifyToken,
  updateProject
);

module.exports = projectRoute;
