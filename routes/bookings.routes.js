const router = require("express").Router();

const { isAuthenticated } = require("../middlewares/jwt.middleware");
const Booking = require("../models/Booking.model");
const UserModel = require("../models/User.model");

// TODO: Mejor asi o explicitamente en cada ruta?
router.use(isAuthenticated);

router.post("/create", (req, res) => {
    const { _id: userId } = req.payload;
    const { startDate, endDate, price, bookedVan } = req.body;
    let booking;

    Booking.create({ startDate, endDate, price, bookedVan })
        .then((_booking) => {
            booking = _booking;

            return UserModel.findOneAndUpdate({ _id: userId }, { $push: { userBookings: booking._id } });
        })
        .then(() => res.json(booking))
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

router.get("/get-all", (req, res) => {
    Booking.find()
        .then((response) => res.json(response))
        .catch((err) => res.status(500).json(err));
});

router.get("/:booking_id", (req, res) => {
    const { booking_id } = req.params;

    Booking.findById(booking_id)
        .then((response) => res.json(response))
        .catch((err) => res.status(500).json(err));
});

router.post("/edit/:bookings_id", (req, res, next) => {
    const { id } = req.params;
    const { startDate, endDate, price, van } = req.body;

    Booking.findByIdAndUpdate(id, { startDate, endDate, price, van })
        .then((response) => res.json(response))
        .catch((err) => res.status(500).json(err));
});

router.post("/delete/:booking_id", (req, res, next) => {
    const { booking_id } = req.params;
    Booking.findByIdAndDelete(booking_id)
        .then((response) => res.json(response))
        .catch((err) => res.status(500).json(err));
});
module.exports = router;
