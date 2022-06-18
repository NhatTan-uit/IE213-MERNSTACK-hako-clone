const express = require("express");
const router = express.Router();
const Users = require('../models/authentication');
const UserCart = require('../models/usercart');
const multer = require("multer");
const mongoose = require('mongoose');

//multer for image locate
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "../client/public/uploads/");
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})

const upload = multer({ storage: storage });

//REQUEST GET ALL USERS FOR ADMIN
router.get("/admin", (req, res) => {
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

//REQUEST FIND USER BY ID AND ONLY RETURN SOME FIELD
router.get("/tocomment/:id", (req, res) => {
    Users.findById(req.params.id, 'name usertype userImage aboutme')
        .then(user => res.json(user))
        .catch(err => res.status(400).json(`Err ${err}`))
});

//REQUEST FIND USER BY ID AND CHANGE PASSWORD
router.put("/changepassword/:id", (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            user.password = req.body.password

            user
                .save()
                .then(() => res.json("Password Changed Successfully"))
                .catch(err => res.status(400).json(`Err: ${err}`))
        })
        .catch(err => res.status(400).json(`Err: ${err}`))
});


//REQUEST FIND USER BY ID AND UPDATE USER AVATAR

router.put("/update/img/:id", upload.single("userImage"), (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            user.userImage = req.file.originalname;

            user
                .save()
                .then(() => res.json("User Image Updated Successfully"))
                .catch(err => res.status(400).json(`Err: ${err}`))
        })
        .catch(err => res.status(400).json(`Err: ${err}`))
});

//REQUEST FIND USER BY ID AND UPDATE USER NAME

router.put("/update/info/:id", (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            user.name = req.body.name;
            user.aboutme = req.body.aboutme;

            user
                .save()
                .then(() => res.json("User Name Updated Successfully"))
                .catch(err => res.status(400).json(`Err: ${err}`))
        })
        .catch(err => res.status(400).json(`Err: ${err}`))
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
    Users.findOne({ $or: [{ name: req.body.name }, { username: req.body.username }] })
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
    Users.findOne({ $or: [{ name: req.body.name }, { username: req.body.username }] })
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
        totalcartprice: req.body.totalcartprice,
        cartstatus: req.body.cartstatus
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

//REQUEST FIND USER BY ID AND UPDATE CART STATUS (SUBDOCUMENT)
router.put("/admin/cart/update/:id/:_id", (req, res) => {
    Users.findOneAndUpdate(
        { "_id": mongoose.Types.ObjectId(req.params.id), "cart._id": mongoose.Types.ObjectId(req.params._id) },
        {
            "$set": {
                "cart.$.cartstatus": req.body.cartstatus,
            }
        }
    )
        .then(() => res.json("Cart Status Updated Succesfully"))
        .catch(err => res.status(400).json(`Err: ${err}`))
});

module.exports = router;