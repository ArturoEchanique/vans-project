const router = require("express").Router();

router.use("/auth", require('./auth.routes'))
router.use("/vans", require('./vans.routes'));
router.use("/bookings", require("./bookings.routes"));
router.use("/user", require("./user.routes"));
router.use("/database", require("./database.routes"));
router.use("/upload", require("./upload.routes"));
router.use("/checkout", require("./payment.routes"));



module.exports = router;
