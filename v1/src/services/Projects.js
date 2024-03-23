const Project = require('../models/Projects');

const insertProject = async (projectData) => {
    const project = new Project(projectData)
    return project.save()
}
const getProjects = async () => {
    return Project.find({});
}

module.exports = {
    insertProject,
    getProjects
}
