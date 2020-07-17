const express = require ('express');
const mongodb = require('mongodb');
const { text } = require('body-parser');

const router = express.Router();

//get posts
router.get('/', async (req, res) => {
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());
});
// add posts
router.post('/', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.insertOne({
        text : req.body.text,
        createdAt : new Date()
    });
    res.status(201).send();
});
// delete posts

router.delete('/:id', async (req, res) =>{
    const posts = await loadPostCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();

});

async function loadPostCollection () {
    const client = await mongodb.MongoClient.connect
    ("mongodb+srv://qwe123:qwe123@cluster0.7yc1r.mongodb.net/belajar?retryWrites=true&w=majority", {
        useNewUrlParser: true
    });

    return client.db('belajar').collection('posts');
}

module.exports = router;