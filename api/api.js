const express = require("express");
const app = express();
const cron = require("node-cron");
const axios = require("axios");
const fs = require("fs");
const cors = require("cors");
const port = 5124;

// const corsOptions = {
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

app.use(cors());

app.get("/", (req, res) => {
  res.send("test");
});

const getData = async () => {
  const resp = await axios.get(
    "https://mee6.xyz/api/plugins/levels/leaderboard/699754090674257921?limit=10&page=0"
  );
  fs.readFile("./api/data.json", "utf8", (err, json) => {
    if (err) {
      console.log(err);
    } else {
      let data = JSON.parse(json) || {};
      let date = new Date();
      data[date] = resp.data.players;
      for (const user of resp.data.players) {
        console.log(user);
      }

      fs.writeFile("./api/data.json", JSON.stringify(data), (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  });
};
// getData();

cron.schedule("0 6,15 * * * *", () => {
  console.log("cron");
});

app.get("/data", (req, res) => {
  fs.readFile("./api/data.json", "utf8", (err, json) => {
    if (err) {
      console.log(err);
    } else {
      res.send(json);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
