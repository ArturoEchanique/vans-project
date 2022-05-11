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
    const { email, password, username, imageUrl } = req.body

    User
        .findByIdAndUpdate(user_id, { email, password, username, imageUrl })
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


module.exports = router