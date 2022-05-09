const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
})

router.use("/auth", require('./auth.routes'))
router.use("/vans", require('./vans.routes'));
router.use("/bookings", require("./bookings.routes"));
router.use("/user", require("./user.routes"));


module.exports = router;
