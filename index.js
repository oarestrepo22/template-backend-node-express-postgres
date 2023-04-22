require('dotenv').config();
const server = require('./src/server');
const { conn } = require('./src/database/db.js');
const port = process.env.PORT || 3001;


conn.sync({ force: true }).then(() => {
    try {
        server.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
});
