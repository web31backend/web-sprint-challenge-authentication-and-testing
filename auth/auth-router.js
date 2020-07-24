const router = require('express').Router();
let bcryptjs = require("bcryptjs");
let { handleError } = require("../utils/services");
let Users = require("../users/users-model");

router.post("/register", (req, res) => {
  let { username, password } = req.body;

  // hashing password
  let rounds = process.env.HASH_ROUNDS || 10;
  let hash = bcryptjs.hashSync(password, rounds);
  if(username && password) {
    Users.add({username, password: hash})
    .then(newUser => { // new user returned
        res.status(201).json({ data: newUser })
    })
    .catch( err => {
        handleError(err, res)
    })
  } else {
    res.status(400).json({ message: "All fields are necessary"})
  }
})


router.post("/login", (req, res) => {
  let { username, password } = req.body;

  if(username, password) {
      Users.findBy({ username })
        .then(([user]) => {
          if (user && bcryptjs.compareSync(password, user.password)) {
              req.session.username = user.username;
              req.session.loggedIn = true;
    
            res.status(200).json({ welcome: "Welcome", session: req.session, user: user });
          } else {
            res.status(401).json({ message: "Invalid Credentials" });
          }
        })
        .catch(err => {
          console.log("error on login", err);
          res.status(500).send(err);
        });
  } else {
      res.status(400).json({ message: "Credentials needed" })
  }
});

router.get("/logout", (req, res) => { 
  if (req.session) {
      req.session.destroy(err => {
          if (err) {
              res.status(500).json({ message: "error logging out, please try later" });
          } else {
              res.status(204).end();
          }
      });
  } else {
      res.status(200).json({ message: "already logged out" });
  }
});

module.exports = router;
