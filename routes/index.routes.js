const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/bookings", require("./bookings.routes"));


module.exports = router;
