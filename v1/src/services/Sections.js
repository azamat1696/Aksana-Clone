const Section = require('../models/Sections');

const insertSection = async (sectionData) => {
    const section = new Section(sectionData)
    return section.save()
}
const getSections = async (where) => {
    return Section.find(where || {}).populate({
        path: 'user_id',
        select: 'full_name email profile_image'
    }).populate({
        path: 'project_id',
        select: 'name'
    });
}
const updateSection = async (sectionData) => {
    return  Section.findByIdAndUpdate(sectionData.id, sectionData, {new: true})
}
const removeSection = async (id) => {
    return Section.findByIdAndDelete(id, {new: true})
}

module.exports = {
    insertSection,
    getSections,
    updateSection,
    removeSection
}
