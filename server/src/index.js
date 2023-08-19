const express = require("express");
const cors = require("cors");
const path = require("path");

const { PORT, WEB_BUILD_DIR } = require("./constants");
const { apiRouter } = require("./routes/api");
const { errorHandler } = require("./middlewares/error-handler");
const main = async () => {
  const app = express();
  app.use(express());
  app.use(express.static(path.resolve(__dirname, WEB_BUILD_DIR)));
  app.use(express.json())
  app.use(cors());
  app.listen(PORT, () =>
    console.log(`Server started on http://localhost:${PORT}`)
  );
  app.use('/api', apiRouter)
  app.use(errorHandler)
  app.get("*", (_, res) => {
    try{
        res.sendFile(path.resolve(__dirname, WEB_BUILD_DIR, "index.html"));
    }catch(err){

    }
  });
};

main().catch((err) => console.log(err));
