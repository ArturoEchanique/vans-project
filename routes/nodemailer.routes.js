const router = require("express").Router()
const transporter = require("../config/mailing.config");


// router.get('/contacto', (req, res) => res.render('pages/contact'))

router.post('/bookingmail', (req, res) => {

    const { email, subject, message, name } = req.body

    transporter.sendMail({
        from: name + ' <vanmeup@project.com>',
        to: email,
        subject,
        text: 'You have a new booking ' + message,
        html: '<p> You have a message form <b>' + name + '</b> this is the message: ' + message + '</p>'
    })
        .then(info => res.json(info))
        .catch(error => console.log(error))

})

module.exports = router;