const express = require("express");
const app = express();
const fs = require("fs");
const dayjs = require("dayjs");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/healthz", (req, res) => {
  const start = dayjs();

  const path = "./data.txt";

  if (!fs.existsSync(path)) {
    fs.writeFileSync("data.txt", start.toString(), (err) => console.log(err));
  }

  let readDateString = fs.readFileSync(path, "utf8");

  const readDate = dayjs(readDateString);

  const now = dayjs();

  let diff = now.diff(readDate, "seconds");

  console.log("diff", diff);

  if (diff < 10) {
    console.log("loading");
    return;
  }

  if (diff > 20) {
    console.log("fail");
    return res.status(500).send("Fail");
  }

  console.log("ok");
  res.status(200).send("Ok");
});

app.listen(3000, () => {
  console.log(
    `${process.env.DEMO_GREETING} ${process.env.NAME} ${process.env.AGE}`
  );
  console.log(`${process.env.USER} ${process.env.PASSWORD}`);
  try {
    const data = fs.readFileSync("/node/people/people.txt", "utf8");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
});
