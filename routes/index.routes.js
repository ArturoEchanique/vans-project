const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
})

router.use("/vans", require('./vans.routes'));

router.use("/bookings", require("./bookings.routes"));


module.exports = router;
