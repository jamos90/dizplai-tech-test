const application = require("./src/app");
const PORT = process.env.PORT || 3100;
const { createTables } = require("./src/db/db-connection");

createTables()
  .then(() => {
    application.listen(PORT, () => {
      console.log(`Express app is running on ${PORT}`);
    });
  })
  .catch(err => {
    console.log("Error creating db tables, unable to start the serve", err);
  });
