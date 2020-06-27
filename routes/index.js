var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Hi");
});

router.post("/getTweets", (req, res) => {
  const query = req.body.q;
  if (query.includes("#")) {
    const params = { q: encodeURI(query), count: 20 };
    client.get("search/tweets", params, (error, tweets, response) => {
      res.status(200).send(tweets.statuses);
    });
  } else {
    const params = { q: query, count: 1 };
    client.get("users/search", params, (error, users, response) => {
      if (users.length === 0) {
        res.send([]);
        return;
      }
      client.get(
        "statuses/user_timeline",
        { screen_name: users[0].screen_name, count: 20 },
        (err, tweets, resp) => {
          res.send(tweets);
        }
      );
    });
  }
});

router.get("/getUsers", (req, res) => {
  const query = req.query.q;
  if (!query.includes("#")) {
    client.get(
      "users/search",
      { q: encodeURI(query), count: 5 },
      (error, users, response) => {
        res.status(200).send(users);
      }
    );
  } else {
    res.send([]);
  }
});

module.exports = router;
