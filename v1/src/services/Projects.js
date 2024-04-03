const Project = require('../models/Projects');

const insertProject = async (projectData) => {
    const project = new Project(projectData)
    return project.save()
}
const getProjects = async (where) => {
    return Project.find(where || {}).populate({
        path: 'user_id',
        select: 'full_name email'
    });
}
const updateProject = async (projectData) => {
    return  Project.findByIdAndUpdate(projectData.id, projectData, {new: true})
}
const removeProject = async (id) => {
    return Project.findByIdAndDelete(id, {new: true})
}

module.exports = {
    insertProject,
    getProjects,
    updateProject,
    removeProject
}
