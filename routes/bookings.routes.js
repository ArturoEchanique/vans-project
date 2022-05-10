const router = require("express").Router();

const Booking = require("../models/Booking.model");

router.post("/create", (req, res) => {
    const { dateStart, dateEnd, price, van } = req.body;

    Booking.create({ dateStart, dateEnd, price, van })
        .then((response) => res.json(response))
        .catch((err) => res.status(500).json(err));
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
    const { dateStart, dateEnd, price, van } = req.body;

    Booking.findByIdAndUpdate(id, { dateStart, dateEnd, price, van })
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
