const express = require("express");
const router = express.Router();
const Novels = require("../models/novels");
const Chapters = require("../models/chapters");
const Comments = require("../models/usercomment");
const mongoose = require('mongoose');
const multer = require("multer");


//multer for image locate
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "../client/public/uploads/");
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    } 
})

const upload = multer({storage: storage});

//REQUEST GET ALL NOVELS
router.get("/", (req, res) => {
    Novels.find()
        .then(novel => res.json(novel))
        .catch(err => res.status(400).json(`Error: ${err}`))
});

//REQUEST GET NOVEL BY SEARCH RESULT
router.post("/search", (req, res) => {
    Novels.find({noveltitle : {$regex: req.body.searchResult}})
        .then(novel => res.json(novel))
        .catch(err => res.status(400).json(`Error: ${err}`))
});

//REQUEST ADD NEW NOVEL
router.post("/add", upload.single("novelImage"), (req, res) => {
    const newNovel = new Novels({
        noveltitle: req.body.noveltitle,
        novelcontent: req.body.novelcontent,
        authorname: req.body.authorname,
        novelImage: req.file.originalname,
        novelprice: req.body.novelprice
    })

    newNovel.save()
        .then(() => res.json("Posted Successfully"))
        .catch(err => res.status(400).json(`Error: ${err}`))
});

//REQUEST FIND NOVEL BY ID
router.get("/:id", (req, res) => {
    Novels.findById(req.params.id)
        .then(novel => res.json(novel))
        .catch(err => res.status(400).json(`Err ${err}`))
});

//REQUEST FIND NOVEL BY ID AND UPDATE
router.put("/update/:id", upload.single("novelImage"), (req, res) => {
    Novels.findById(req.params.id)
        .then(novel => {
            novel.noveltitle = req.body.noveltitle;
            novel.novelcontent = req.body.novelcontent;
            novel.authorname = req.body.authorname;
            novel.novelImage = req.file.originalname;
            novel.novelprice = req.body.novelprice;

            novel
                .save()
                .then(() => res.json("Updated Successfully"))
                .catch(err => res.status(400).json(`Err: ${err}`))
        })
        .catch(err => res.status(400).json(`Err: ${err}`))
});

//REQUEST FIND NOVEL BY ID AND DELETE
router.delete("/:id", (req, res) => {
    Novels.findByIdAndDelete(req.params.id)
        .then(() => res.json("Deleted Succesfully"))
        .catch(err => res.status(400).json(`Err: ${err}`))
});



//CHAPTER SUBDOCUMENT

//REQUEST FIND NOVEL BY ID AND ADD CHAPTER (SUBDOCUMENT)

router.post("/add/:id", (req, res) => {
    const newChapter = new Chapters({
        chaptername: req.body.chaptername,
        chaptercontent: req.body.chaptercontent
    })

    Novels.findById(req.params.id)
        .then(novel => {
            novel.chapter.push(newChapter);
            novel.save()
                .then(() => res.json("Chapter Posted Success!!!"))
                .catch(err => res.status(400).json(`Error: ${err}`))
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
})

//REQUEST FIND NOVEL BY ID AND ADD COMMENT (SUBDOCUMENT)

router.post("/add/comment/:id", (req, res) => {
    const newComment = new Comments({
        userid: req.body.userid,
        crrusername: req.body.crrusername,
        crruserImg: req.body.crruserImg,
        usercomment: req.body.usercomment
    })

    Novels.findById(req.params.id)
        .then(novel => {
            novel.comments.push(newComment);
            novel.save()
                .then(() => res.json("Comment Posted Success!!!"))
                .catch(err => res.status(400).json(`Error: ${err}`))
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
})

//REQUEST FIND CHAPTER BY ID AND UPDATE
router.put("/update/:id/:_id", (req, res) => {
    Novels.findOneAndUpdate(
        { "_id": mongoose.Types.ObjectId(req.params.id), "chapter._id": mongoose.Types.ObjectId(req.params._id) },
        {
            "$set": {
                "chapter.$.chaptername": req.body.chaptername,
                "chapter.$.chaptercontent": req.body.chaptercontent,
            }
        }
    )
        .then(() => res.json("Chapter Updated Succesfully"))
        .catch(err => res.status(400).json(`Err: ${err}`))
});

//REQUEST FIND CHAPTER BY ID AND DELETE
router.put("/:id/:_id", (req, res) => {
    Novels.findOneAndUpdate(
        { "_id": mongoose.Types.ObjectId(req.params.id)},
        {
            "$pull": {
                "chapter": {
                    "_id": mongoose.Types.ObjectId(req.params._id)
                }
            }
        }
    )
        .then(() => res.json("Chapter Deleted Succesfully"))
        .catch(err => res.status(400).json(`Err: ${err}`))
});

module.exports = router;





