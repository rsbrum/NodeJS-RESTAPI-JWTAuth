const Post = require('../models/post');

exports.getByUserId = (req, res) => {
    Post.find({user_id: req.data.id}, (err, doc) => {
         if(doc.length > 0){
            return res.status(200).json({
                post: doc
            });
        } else {
            return res.status(409).json({
                error: "Post was not found"
            });
        } 
    });
};

exports.newPost = (req, res) => {
    Post.create({
        user_id: req.data.id,
        message: req.body.message
    }, (err, doc) => {
        if(err) {
            return res.status(409).json({
                error: err
            });
        }

        if(doc) {
            return res.status(201).json({
                message: doc
            });
        }
    });
};

