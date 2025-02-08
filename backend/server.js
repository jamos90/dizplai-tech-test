const application = require("./src/app");
const PORT = process.env.PORT || 3100;

application.listen(PORT, () => {
  console.log(`Express app is running on ${PORT}`);
});
