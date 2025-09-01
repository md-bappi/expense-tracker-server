const mongoose = require("mongoose");
const Project = require("../models/projectModel");
const { successResponse, errorResponse } = require("./ResponseController");

// Get all projects
const getAllProjects = async (req, res, next) => {
  try {
    const { _id } = req.user;
    // Get all projects from the database
    const allProjects = await Project.find({ userId: _id });

    // Check if any projects were found
    if (!allProjects || allProjects.length === 0) {
      return errorResponse(res, {
        statusCode: 404,
        message: "No projects found",
      });
    }

    // Return a success response
    return successResponse(res, {
      statusCode: 200,
      message: "All projects retrieved successfully",
      payload: allProjects,
    });
  } catch (error) {
    next("GetAllProjects Error:", error);
  }
};

// Get single project
const getSingleProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if the project ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    // Get the project from the database
    const project = await Project.findById({ _id: id });

    // Check if the project was found
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Return a success response
    return successResponse(res, {
      statusCode: 200,
      message: "Project retrieved successfully",
      payload: project,
    });
  } catch (error) {
    next("GetSingleProject Error:", error);
  }
};

// Create a new project
const postNewProject = async (req, res, next) => {
  try {
    const {
      projectName,
      clientName,
      budget,
      category,
      startDate,
      dateLine,
      projectNotes,
    } = req.body;
    const { _id } = req.user;

    // Create a new project
    const newProject = new Project({
      projectName,
      clientName,
      budget,
      category,
      startDate,
      dateLine,
      projectNotes,
      userId: _id,
    });

    // Save the new project to the database
    await newProject.save();

    // Return a success response
    return successResponse(res, {
      statusCode: 201,
      message: "Project created successfully",
      payload: { newProject },
    });
  } catch (error) {
    next(error);
  }
};

// Update a project
const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      projectName,
      clientName,
      budget,
      category,
      startDate,
      dateLine,
      projectNotes,
    } = req.body;

    // Check if the project ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    // Update the project in the database
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        projectName,
        clientName,
        budget,
        category,
        startDate,
        dateLine,
        projectNotes,
      },
      { new: true }
    );

    // Check if the project was updated
    if (!updatedProject) {
      return res.status(404).json({ message: "Project data not updated" });
    }

    // Return a success response
    return successResponse(res, {
      statusCode: 200,
      message: "Project data updated successfully",
      payload: updatedProject,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProjects,
  getSingleProject,
  postNewProject,
  updateProject,
};
