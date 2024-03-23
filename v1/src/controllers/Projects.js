
const create = async (req, res) => {
    res.status(200).send('Project created');
};

const index = async (req, res) => {
    res.status(200).send('Project index');
}

module.exports = {
    create,
    index
}
