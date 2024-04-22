const express = require("express");
const fs = require("fs");
var cors = require("cors");
const todos = require("./todos");
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

app.use("/todos", todos);
app.post("/", (req, res) => {
  var { id, name } = req.body;
  var data = readData();
  data = [...data, { id, name }];
  saveData(data);
  res.send("Process done");
});
app.get("/", (req, res) => {
  var data = readData();
  console.log(data);
  res.json(data);
});
app.get("/:id", (req, res) => {
  var id = req.params.id;
  var data = readData();
  var ele = data.filter((e) => e.id == id);
  res.json(ele);
});
app.get("/search/:para", (req, res) => {
  var para = req.params.para;
  var data = readData();
  var ele = data.filter((e) =>
    e.name.toUpperCase().startsWith(para.toUpperCase())
  );
  res.json(ele);
});
app.delete("/:id", (req, res) => {
  var id = req.params.id;
  var data = readData();
  var newdata = data.filter((e) => e.id != id);
  saveData(newdata);
  res.send("Operation done");
});
1;
app.put("/:id", (req, res) => {
  var name = req.body.name;
  var id = req.params.id;
  var data = readData();
  var newData = data.map((e) => (e.id != id ? e : { id, name }));
  saveData(newData);
  res.send("Operation done");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

function readData() {
  // var d = [];
  // fs.readFile("data.json", (err, data) => {
  //   if (err) {
  //     console.log(err);
  //     return [];
  //   } else return data;
  // });
  var data = fs.readFileSync("data.json");
  if (data) {
    return JSON.parse(data.toString());
  } else {
    return [];
  }
}
function saveData(data) {
  fs.writeFile("data.json", JSON.stringify(data), (err) => {
    if (err) console.log(err);
    else console.log("Done");
  });
}
