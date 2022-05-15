const router = require("express").Router()
const User = require("../models/User.model")
const { isAuthenticated } = require('./../middlewares/jwt.middleware')


router.get("/get-all", (req, res) => {

    User
        .find()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})

router.post("/edit/:user_id", isAuthenticated, (req, res) => {

    const { user_id } = req.params;
    const { email, password, username, imageUrl, role } = req.body

    User
        .findByIdAndUpdate(user_id, { email, password, username, imageUrl, role })
        .then((response) => res.json(response))
        .catch((err) => res.status(500).json(err));
});

router.post("/delete/:user_id", isAuthenticated, (req, res) => {

    const { user_id } = req.params;
    User
        .findByIdAndDelete(user_id)
        .then((response) => res.json(response))
        .catch((err) => res.status(500).json(err));
});

router.get("/:user_id", isAuthenticated, (req, res) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})

router.post("/:user_id/addUserBookings", (req, res) => {

    const { user_id } = req.params
    const { userBookings } = req.body



    User
        .findByIdAndUpdate(user_id, { $push: { userBookings } },)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})

router.post("/:user_id/addOwnerBookings", (req, res) => {

    const { user_id } = req.params
    const { ownerBookings } = req.body

    User
        .findByIdAndUpdate(user_id, { $push: { ownerBookings } },)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router