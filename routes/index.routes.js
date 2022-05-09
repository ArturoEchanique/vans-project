const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
})

router.use("/vans", require('./vans.routes'));



module.exports = router;
