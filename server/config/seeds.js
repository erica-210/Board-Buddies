const db = require('../config/connection');
const { User, Posts, Comments, BoardGames } = require('../models');
const cleanDB = require('./cleanDb');

db.once('open', async () => {
    // await cleanDB('User', 'users');
    // await cleanDB('Post', 'posts');
    // await cleanDB('Comment', 'comments');
    // console.log('Database has been cleaned!');

    // const comments = await Comments.insertMany([
    //     {
    //         user: 'test',
    //         gameName: 'Catan',
    //         commentText: 'This is a test comment!',
    //         postId: '60f3b9b3e3b3e3e3e3b3e3',
    //         boardGameId: '60f3b9b3e3b3e3e3e3b3e3',
            
    //     },
    // ]);

    // const posts = await Posts.insertMany([
    //     {
    //         title: 'Test Post',
    //         content: 'This is a test post!',
    //         user: 'test',
    //         comments: [
    //             comments[0]._id,
    //         ],  
    //     },
    // ]);

    // const boardgames = await BoardGames.insertMany([
    //     {
    //         creators: 'Klaus Teuber',
    //         description: 'Catan is a game where you build settlements and cities to get points.',
    //         gameName: 'Catan',
    //         post: posts[0]._id,
    //     },
    // ]);



    console.log('User created!');
    process.exit();
});