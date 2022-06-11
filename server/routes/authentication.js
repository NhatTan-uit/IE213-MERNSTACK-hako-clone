const express = require("express");
const router = express.Router();
const Users = require('../models/authentication');
const UserCart = require('../models/usercart');

//REQUEST ALL USERS

router.get("/admin/", (req, res) => {
    Users.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json(`Error: ${err}`))
});

//REQUEST FIND USER BY ID
router.get("/:id", (req, res) => {
    Users.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json(`Err ${err}`))
});

//REQUEST FOR LOGIN 
router.post("/login", (req, res) => {
    Users.findOne({ username: req.body.username })
        .then(user => {
            if (user) {
                if (req.body.password === user.password) {
                    res.send({ message: "Login successfully", user: user });
                }
                else {
                    res.json("Wrong password");
                }
            }
            else {
                res.json("Not register");
            }
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

//REQUEST FOR REGISTER 
router.post("/register", (req, res) => {
    Users.findOne({ $or: [{name: req.body.name},{ username: req.body.username }]})
        .then(user => {
            if (user) {
                res.json("User is already existed");
            }
            else {
                const user = new Users({
                    name: req.body.name,
                    username: req.body.username,
                    password: req.body.password
                });

                user.save()
                    .then(() => res.json("Registered Successfully"))
                    .catch(err => res.status(400).json(`Error: ${err}`));
            }
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
})

//REQUEST FOR ADMIN REGISTER
router.post("/admin/register", (req, res) => {
    Users.findOne({ $or: [{name: req.body.name},{ username: req.body.username }]})
        .then(user => {
            if (user) {
                res.json("User is already existed");
            }
            else {
                const user = new Users({
                    name: req.body.name,
                    username: req.body.username,
                    password: req.body.password,
                    usertype: req.body.usertype
                });

                user.save()
                    .then(() => res.json("Admin Registered Successfully"))
                    .catch(err => res.status(400).json(`Error: ${err}`));
            }
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
})



//CART SUBDOCUMENT

//REQUEST FIND USER BY ID AND ADD CART (SUBDOCUMENT)

router.post("/addcart/:id", (req, res) => {
    const newUserCart = new UserCart({
        usercart: req.body.usercart,
        totalcartprice: req.body.totalcartprice
    })

    Users.findById(req.params.id)
        .then(user => {
            user.cart.push(newUserCart);
            user.save()
                .then(() => res.json("Cart Added To User!!!"))
                .catch(err => res.status(400).json(`Error: ${err}`))
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
})

module.exports = router;