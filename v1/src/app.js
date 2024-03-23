const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const config = require('./config');
const { ProjectRoutes } = require('./api-routes');
config();

const app = express();
app.use(express.json())
app.use(helmet());
app.use(cors());

app.use(ProjectRoutes.path, ProjectRoutes.router);


app.listen(process.env.APP_PORT, () => {
       console.log('Server is running on port 3000');
});

