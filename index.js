// implement your API here
const express = require('express');

const Hobbits = require('./data/db.js');

const server = express();

const cors =require('cors');

server.use(express.json());

server.use(cors());


//POST
server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;

    if (!name || !bio) {
        return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    Hobbits.insert({ name, bio })
        .then(id => {
            Hobbits.findById(id)
                .then(user => {
                    res.status(201).json( user )
                });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
        });
});

//GET
server.get('/api/users', (req, res) => {
    Hobbits.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "The users information could not be retrieved."})
        })
})

//GET BY ID
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    Hobbits.findById(id)
        .then(user => {
            if (user === undefined){
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }else{
            res.status(200).json(user)
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "The user information could not be retrieved."})
        });
});

//DELETE
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = Hobbits.findById(id);

    if (user) {
        Hobbits.remove(id)
            .then(() => 
                res.status(200).json({ message: "Acoount deleted."}))
            .catch(err => {
                console.log(err)
                res.status(500).json({ errorMessage: "The user could not be removed" })
            });
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    };
});

//PUT
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id
    const { name, bio } = req.body;

    if (!name || !bio) {
        return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    Hobbits.update(id, { name, bio })
        .then(updated => {
            if (updated === 1){
                Hobbits.findById(id)
                    .then(user => {
                        res.status(200).json(user)
                    })
                    .catch(err =>{
                        console.log(err)
                        res.status(500).json({ errorMessage: "The user information could not be modified." })
                    });
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
        };
    });
});

const port = 8000;
server.listen(port, () => console.log(`\n ** api on port ${port} ** \n`))